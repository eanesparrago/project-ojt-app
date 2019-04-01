const Task = require("../models/task");
const User = require("../models/user/user");
const { validationResult } = require("express-validator/check");

function testRoute(req, res) {
  res.status(200).send("Task route test");
}

/**
 * Create a task
 * @route   POST /api/tasks
 * @param   {String}  req.body.content
 * @param   {Number}  [req.body.ticketNumber]
 */
function createTask(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json(errors.mapped());
  }

  const newTask = new Task({
    user: req.user._id,
    content: req.body.content,
    ticketNumber: req.body.ticketNumber
  });

  newTask.save((err, task) => {
    if (err) {
      return res.status(500).send(err);
    }

    User.findById(req.user._id).then(user => {
      user.roleData.tasks.push(task);

      user.save((err, user) => {
        if (err) {
          return res.status(500).send(err);
        }

        res.status(200).json({ user, task });
      });
    });
  });
}

/**
 * Get own tasks
 * @route   GET /api/tasks/own
 */
function getOwnTasks(req, res) {
  User.findById(req.user._id)
    .populate({ path: "roleData.tasks" })
    .then(user => {
      res.status(200).json(user.roleData.tasks);
    });
}

/**
 * Get all tasks
 * @route   GET /api/tasks
 */
function getAllTasks(req, res) {
  Task.find().then(tasks => {
    if (!tasks) {
      res.status(404).send("No tasks found");
    }
    res.status(200).json(tasks);
  });
}

/**
 * Update a task
 * @route   POST /api/tasks/task/:id
 * @param   {String}  req.params.id - Task id
 * @param   {String}  req.body.content
 * @param   {Number}  [req.body.ticketNumber]
 */
function updateTask(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json(errors.mapped());
  }

  Task.findById(req.params.id).then(task => {
    if (!task.user.equals(req.user._id)) {
      return res.status(403).send("Forbidden");
    }

    task.set(req.body);

    task.save((err, task) => {
      if (err) {
        return res.status(500).send(err);
      }

      res.status(200).json(task);
    });
  });
}

/**
 * Delete a task
 * @route   DELETE /api/tasks/task/:id
 * @param   {String}  req.params.id - Task id
 */
function deleteTask(req, res) {
  Task.findById(req.params.id).then(task => {
    if (!task.user.equals(req.user._id)) {
      return res.status(403).send("Forbidden");
    }

    if (!task) {
      res.status(404).send("Task not found");
    }

    task.remove((err, task) => {
      if (err) {
        return res.status(500).send(err);
      }

      User.findById(task.user).then(user => {
        user.roleData.tasks.remove(task._id);
        user.save((err, user) => {
          if (err) {
            return res.status(500).send(err);
          }

          res.status(200).json({ user, task });
        });
      });
    });
  });
}

module.exports = {
  testRoute,
  createTask,
  getAllTasks,
  getOwnTasks,
  updateTask,
  deleteTask
};
