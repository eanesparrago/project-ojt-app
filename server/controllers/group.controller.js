const Group = require("../models/group");
const Announcement = require("../models/announcement");
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

  Group.findOne({ name: req.body.name })
    .then(group => {
      if (group) {
        errors.name = { msg: "Group name already exists" };
        return res.status(400).json(errors);
      } else {
        newGroup
          .save()
          .then(group => res.status(201).json(group))
          .catch(err => console.log(err));
      }
    })
    .catch(err => res.status(500).json({ message: "Error occurred" }));
}

/**
 * Get all groups
 * @route   GET api/groups
 * @access  private (role: administrator)
 */
function getGroups(req, res) {
  const errors = {};

  Group.find()
    .select(req.query.field)
    .populate({
      path: "users",
      select:
        "username profilePictureUrl roleData.isClockedIn roleData.schedule roleData.lastClockInTime roleData.clocks",
      populate: { path: "roleData.clocks", options: { limit: 1 } },
      modal: "Users"
    })
    .then(groups => {
      if (!groups) {
        errors.groups = "There are no groups";
        return res.status(404).json(errors);
      }

      res.json(groups);
    })
    .catch(err => res.status(500).json({ message: "Error occurred" }));
}

/**
 * Get a group by id
 * @route   GET api/groups?name
 * @access  private (role: administrator)
 */
function getGroup(req, res) {
  Group.findById(req.params.id)
    .populate({
      path: "announcements",
      model: "Announcement",
      populate: { path: "user" }
    })
    .populate({
      path: "users",
      select:
        "username profilePictureUrl roleData.isClockedIn roleData.schedule roleData.lastClockInTime roleData.clocks",
      populate: { path: "roleData.clocks", options: { limit: 1 } },
      modal: "Users"
    })
    .then(group => {
      if (!group) {
        return res.status(404).json({ group: "Group not found" });
      }
      return res.json(group);
    })
    .catch(err => res.status(500).json({ message: "Error occurred" }));
}

/**
 * Get own group
 * @route   GET api/groups/own
 */
function getOwnGroup(req, res) {
  Group.findById(req.user.roleData.group._id)
    .populate("users", "profilePictureUrl firstName lastName username")
    .then(group => {
      if (!group) {
        return res.status(404).json({ group: "Group not found" });
      }
      return res.json(group);
    })
    .catch(err => res.status(500).json({ message: "Error occurred" }));
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

          group.save((err, group) => {
            res.send(group);
          });
        }
      });
    })
    .catch(err => res.status(500).json({ message: "Error occurred" }));
}

/**
 * Delete a group by id
 * @route   DELETE api/groups/:id
 * @access  private (role: administrator)
 */
function deleteGroup(req, res) {
  Group.findById(req.params.id)
    .then(group => {
      Announcement.deleteMany({ group: group._id }, err => {
        if (err) {
          return res.status(500).send("Error");
        }

        group.remove((err, user) => {
          if (err) {
            return res.status(500).send("Error");
          }

          res.send({ data: user });
        });
      });
    })
    .catch(err => res.status(500).json({ message: "Error occurred" }));
}

module.exports = {
  testRoute,
  createGroup,
  getGroups,
  getGroup,
  getOwnGroup,
  deleteGroup,
  editGroup
};
