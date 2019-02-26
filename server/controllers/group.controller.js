const Group = require("../models/group");
const { validationResult } = require("express-validator/check");

function testRoute(req, res) {
  res.status(200).json({ message: "Groups test" });
}

/**
 * Create a group
 * @route   POST api/groups
 * @param   {Object}  req.body.name (required)
 * @param   {string}  req.body.location
 * @param   {string}  req.body.phoneNumber
 * @access  private   (role: administrator)
 */
function createGroup(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json(errors.mapped());
  }

  const newGroup = new Group({
    name: req.body.name,
    location: req.body.location,
    phoneNumber: req.body.phoneNumber
  });

  Group.findOne({ name: req.body.name }).then(group => {
    if (group) {
      errors.name = { msg: "Group name already exists" };
      return res.status(400).json(errors);
    } else {
      newGroup
        .save()
        .then(group => res.status(201).json(group))
        .catch(err => console.log(err));
    }
  });
}

/**
 * Get all groups
 * @route   GET api/groups
 * @access  private (role: administrator)
 */
function getGroups(req, res) {
  const errors = {};

  Group.find()
    .then(groups => {
      if (!groups) {
        errors.groups = "There are no groups";
        return res.status(404).json(errors);
      }

      res.json(groups);
    })
    .catch(err => {
      console.log(err);
    });
}

/**
 * Get a group by id
 * @route   GET api/groups/:id
 * @access  private (role: administrator)
 */
function getGroup(req, res) {
  Group.findById(req.params.id)
    .then(group => res.json(group))
    .catch(err => res.status(404).json({ group: "Group not found" }));
}

/**
 * Edit a group by id
 * @route   PUT api/groups/:id
 * @param   res.body.name
 * @param   res.body.location
 * @param   res.body.phoneNumber
 * @access  private (role: administrator)
 */
function editGroup(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json(errors.mapped());
  }

  Group.findById(req.params.id)
    .then(group => {
      Group.findOne({ name: req.body.name }).then(duplicate => {
        if (duplicate && group.name !== req.body.name) {
          errors.name = { msg: "Group name already exists" };
          return res.status(400).json(errors);
        } else {
          group.name = req.body.name;
          group.location = req.body.location;
          group.phoneNumber = req.body.phoneNumber;

          group.save((err, user) => {
            res.send({ data: user });
          });
        }
      });
    })
    .catch(err => res.status(404).json({ group: "Group not found" }));
}

/**
 * Delete a group by id
 * @route   GET api/groups/:id
 * @access  private (role: administrator)
 */
function deleteGroup(req, res) {
  Group.findById(req.params.id).then(group => {
    group.remove((err, user) => {
      res.send({ data: user });
    });
  });
}

module.exports = {
  testRoute,
  createGroup,
  getGroups,
  getGroup,
  deleteGroup,
  editGroup
};
