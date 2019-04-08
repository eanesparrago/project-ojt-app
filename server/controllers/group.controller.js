const Group = require("../models/group");
const Announcement = require("../models/announcement");
const { validationResult } = require("express-validator/check");
const GroupUtils = require("./utils/group");

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
    .populate(GroupUtils.usersPopulate)
    .then(groups => {
      if (!groups) {
        errors.groups = "There are no groups";
        return res.status(404).json(errors);
      }

      res.json(groups);
    })
    .catch(err => {
      console.log(err);
      return res.status(500).json({ message: "An error occurred." });
    });
}

/**
 * Get a group by id
 * @route   GET api/groups/group/:id
 * @param   {String} req.param.id
 */
function getGroup(req, res) {
  GroupUtils.returnGroup(req.params.id)
    .then(group => {
      if (!group) {
        return res.status(404).json({ message: "Group not found." });
      }
      return res.json({ message: "Group found successfully.", group });
    })
    .catch(err => {
      console.log(err);
      return res.status(500).json({ message: "An error occurred." });
    });
}

/**
 * Get own group
 * @route   GET api/groups/own
 */
function getOwnGroup(req, res) {
  GroupUtils.returnGroup(req.user.roleData.group._id)
    .then(group => {
      if (!group) {
        return res.status(404).json({ message: "Group not found." });
      }
      return res.json({ message: "Group found successfully.", group });
    })
    .catch(err => {
      console.log(err);
      return res.status(500).json({ message: "An error occurred." });
    });
}

/**
 * Edit a group by id
 * @route   PUT api/groups/:id
 * @param   res.body.name
 * @param   res.body.location
 * @param   res.body.phoneNumber
 */
function editGroup(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json(errors.mapped());
  }

  let globalGroup;
  Group.findById(req.params.id)
    .then(group => {
      globalGroup = group;
      return Group.findOne({ name: req.body.name });
    })
    .then(duplicate => {
      if (duplicate && globalGroup.name !== req.body.name) {
        errors.name = { msg: "Group name already exists." };
        return res.status(400).json(errors);
      } else {
        globalGroup.name = req.body.name;
        globalGroup.location = req.body.location;
        globalGroup.phoneNumber = req.body.phoneNumber;

        globalGroup.save((err, group) => {
          if (err) {
            console.log(err);
            return res.status(500).send({ message: "An error occurred." });
          }

          GroupUtils.returnGroup(group._id)
            .then(group => {
              return res
                .status(200)
                .json({ message: "Group edited successfully.", group });
            })
            .catch(err => {
              console.log(err);
              res.status(500).json({ message: "An error occurred" });
            });
        });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: "An error occurred" });
    });
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

        group.remove((err, group) => {
          if (err) {
            return res.status(500).send("Error");
          }

          res
            .status(200)
            .json({ message: "Group deleted successfully.", group });
        });
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: "An error occurred" });
    });
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
