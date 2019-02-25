const Group = require("../models/group");
const { validationResult } = require("express-validator/check");

function testRoute(req, res) {
  res.status(200).json({ message: "Groups test" });
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
    return res.status(422).json({ errors: errors.array() });
  }

  const newGroup = new Group({
    name: req.body.name,
    location: req.body.location,
    phoneNumber: req.body.phoneNumber
  });

  Group.findOne({ name: req.body.name }).then(group => {
    if (group) {
      errors.group = "Group already exists";
      return res.status(400).json(errors);
    }
  });

  newGroup
    .save()
    .then(group => res.status(201).json(group))
    .catch(err => console.log(err));
}

module.exports = {
  testRoute,
  createGroup,
  getGroups
};
