const Group = require("../models/group");
const User = require("../models/user/user");
const UserAdministrator = require("../models/user/userAdministrator");
const UserSupervisor = require("../models/user/userSupervisor");
const UserEmployee = require("../models/user/userEmployee");
const UserTrainee = require("../models/user/userTrainee");
const bcrypt = require("bcryptjs");
const keys = require("../config/keys");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator/check");
const _ = require("lodash");
const enums = require("../enums");

/**
 * Test route
 * GET api/users/test
 * @param  req
 * @param  res
 * @private
 */
function testRoute(req, res) {
  res.status(200).json({ message: "User test" });
}

/**
 * Create user
 * @route   POST api/users/register
 * @param   {string}  req.body.username (required)
 * @param   {string}  req.body.password (required)
 * @param   {string}  req.body.confirmPassword (required)
 * @param   {string}  req.body.username (required)
 * @param   {string}  req.body.firstName
 * @param   {string}  req.body.middleName
 * @param   {string}  req.body.lastName
 * @param   {string}  req.body.nickname
 * @param   {string}  req.body.gender
 * @param   {string}  req.body.group (role: supervisor, trainee, employee)
 * @param   {Date}    req.body.dateOfBirth (role: trainee)
 * @param   {string}  req.body.address (role: trainee)
 * @param   {string}  req.body.contactNumber (role: trainee)
 * @param   {string}  req.body.school (role: trainee)
 * @param   {string}  req.body.adviserName (role: trainee)
 * @param   {string}  req.body.adviserContactNumber (role: trainee)
 * @param   {string}  req.body.guardianName (role: trainee)
 * @param   {string}  req.body.guardianContactNumber (role: trainee)
 * @access  private   (role: administrator)
 */
function createUser(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json(errors.mapped());
  }

  User.findOne({ username: req.body.username }).then(user => {
    if (user) {
      errors.username = { msg: "Username already exists" };
      return res.status(400).json(errors);
    } else {
      const userData = req.body;
      userData.roleData = {};

      let newUser;

      switch (req.body.role) {
        case enums.roles.ADMINISTRATOR:
          newUser = new UserAdministrator(userData);
          break;

        case enums.roles.SUPERVISOR:
          userData.roleData.group = req.body.group;
          newUser = new UserSupervisor(userData);
          break;

        case enums.roles.TRAINEE:
          userData.roleData.trainingDuration = req.body.trainingDuration * 3600;
          userData.roleData.dateOfBirth = req.body.dateOfBirth;
          userData.roleData.address = req.body.address;
          userData.roleData.contactNumber = req.body.contactNumber;
          userData.roleData.school = req.body.school;
          userData.roleData.adviserName = req.body.adviserName;
          userData.roleData.adviserContactNumber =
            req.body.adviserContactNumber;
          userData.roleData.guardianName = req.body.guardianName;
          userData.roleData.guardianContactNumber =
            req.body.guardianContactNumber;
          userData.roleData.group = req.body.group;
          newUser = new UserTrainee(userData);
          break;

        case enums.roles.EMPLOYEE:
          userData.roleData.group = req.body.group;
          newUser = new UserEmployee(userData);
          break;
        default:
          return res.status(500).send("Error");
      }

      bcrypt.genSalt(12, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;

          newUser.password = hash;
          newUser
            .save()
            .then(user => {
              if (user.role !== enums.roles.ADMINISTRATOR) {
                Group.findById(user.roleData.group, (err, group) => {
                  if (err) return res.send(err);
                  group.users.push(user._id);
                  group.save(err => {
                    if (err) return res.send(err);
                    return res.status(200).send(user.username);
                  });
                });
              } else {
                return res.status(200).send(user.username);
              }
            })
            .catch(err => res.status(500).send("Error"));
        });
      });
    }
  });
}

/**
 * Login user
 * POST api/users/login
 * @param  req
 * @param  res
 * @access  public
 */
function loginUser(req, res) {
  const username = req.body.username;
  const password = req.body.password;

  User.findOne({ username: username })
    .select("+password")
    .then(user => {
      if (!user) {
        return res.status(404).json({ error: "Invalid login information" });
      }

      user.set({ dateLastLoggedIn: Date.now() });
      user.save();

      bcrypt.compare(password, user.password).then(isMatch => {
        if (isMatch) {
          const payload = {
            id: user.id,
            role: user.role,
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            profilePictureUrl: user.profilePictureUrl,
            roleData: user.roleData
          };

          jwt.sign(
            payload,
            keys.secretOrKey,
            { expiresIn: 36000 },
            (err, token) => {
              res.json({
                success: true,
                token: "Bearer " + token
              });
            }
          );
        } else {
          return res.status(400).json({ error: "Invalid login information" });
        }
      });
    });
}

/**
 * Get all users
 * GET api/users/
 * @access  private
 */
function getUsers(req, res) {
  const errors = {};

  let conditions = {};
  if (req.user.role !== enums.roles.ADMINISTRATOR) {
    conditions = { "roleData.group": req.user.roleData.group._id };
  }

  User.find(conditions)
    .select("-roleData")
    .then(users => {
      if (!users) {
        errors.users = "There are no users";
        return res.status(404).json(errors);
      }
      res.json(users);
    })
    .catch(err => res.status(500).json({ message: "Error occurred" }));
}

/**
 * Get user by id
 * POST api/users/:id
 * @param  req.params.id
 * @param  res
 * @access  private
 */
function getUser(req, res) {
  User.findById(req.params.id)
    .select("-password")
    .populate("roleData.group", "name")
    .then(user => {
      if (!user) {
        return res.status(404).json({ user: "User not found" });
      }
      res.json(user);
    })
    .catch(err => res.status(500).json({ message: "Error occurred" }));
}

/**
 * Get current user
 * POST api/users/current
 * @access  private
 */
function getCurrentUser(req, res) {
  User.findById(req.user._id)
    .select("-password")
    .populate("roleData.group", "name")
    .then(user => {
      if (!user) {
        return res.status(404).json({ user: "User not found" });
      }
      res.json(user);
    })
    .catch(err => res.status(404).json({ user: "User not found" }));
}

/**
 * Update user
 * PUT api/users/:id
 * @param  req.params.id
 * @param  res
 * @access  private
 */
function updateUser(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json(errors.mapped());
  }

  User.findById(req.params.id)
    .then(user => {
      let oldGroupId;

      if (user.role !== enums.roles.ADMINISTRATOR) {
        oldGroupId = user.roleData.group._id;
      }

      user.set(req.body);

      user.roleData.isInitialized = req.body.isInitialized;
      user.roleData.school = req.body.school ? req.body.school : "";
      user.roleData.trainingDuration = req.body.trainingDuration
        ? req.body.trainingDuration * 3600
        : "";
      user.roleData.dateOfBirth = req.body.dateOfBirth
        ? req.body.dateOfBirth
        : "";
      user.roleData.address = req.body.address;
      user.roleData.contactNumber = req.body.contactNumber
        ? req.body.contactNumber
        : "";
      user.roleData.adviserName = req.body.adviserName
        ? req.body.adviserName
        : "";
      user.roleData.adviserContactNumber = req.body.adviserContactNumber
        ? req.body.adviserContactNumber
        : "";
      user.roleData.guardianName = req.body.guardianName
        ? req.body.guardianName
        : "";
      user.roleData.guardianContactNumber = req.body.guardianContactNumber
        ? req.body.guardianContactNumber
        : "";

      req.body.group && (user.roleData.group = req.body.group);

      user.save((err, user) => {
        if (err) {
          if (err.code === 11000) {
            errors.username = { msg: "Username already exists" };
            return res.status(500).json(errors);
          }
        } else {
          if (user.role !== enums.roles.ADMINISTRATOR) {
            Group.findById(oldGroupId).then(group => {
              if (group) {
                group.users.remove(user._id);
                group.save().then(() => {
                  Group.findById(user.roleData.group._id).then(group => {
                    group.users.remove(user._id);
                    group.users.push(user._id);
                    group.save();
                    return res.status(200).send(user.username);
                  });
                });
              } else {
                Group.findById(user.roleData.group._id).then(group => {
                  group.users.remove(user._id);
                  group.users.push(user._id);
                  group.save();
                  return res.status(200).send(user.username);
                });
              }
            });
          } else {
            return res.status(200).send(user.username);
          }
        }
      });
    })
    .catch(err => res.status(500).json({ message: err }));
}

/**
 * Change user password
 * PUT api/users/:id/password
 * @param  req.params.id (required)
 * @param  req.body.password (required)
 * @param  req.body.confirmPassword (required)
 * @param  res
 * @access  public
 */
function updatePassword(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json(errors.mapped());
  }

  User.findById(req.params.id)
    .then(user => {
      if (!user) {
        errors.user = "User not found";
        return res.status(404).json(errors);
      }

      bcrypt.genSalt(12, (err, salt) => {
        bcrypt.hash(req.body.password, salt, (err, hash) => {
          if (err) throw err;

          user.password = hash;
          user
            .save()
            .then(user => res.status(200).send("Success"))
            .catch(err => res.status(500).send("Error"));
        });
      });
    })
    .catch(err => res.status(500).json({ message: "Error occurred" }));
}

/**
 * Update trainee schedule
 * PUT api/users/:id/schedule
 * @param  req.params.id (required)
 * @param  req.body (required)
 * @access  public
 */
function updateTraineeSchedule(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json(errors.mapped());
  }

  User.findById(req.params.id)
    .then(user => {
      if (!user) {
        errors.message = "User not found";
        return res.status(404).json(errors);
      }

      if (user.role !== enums.roles.TRAINEE) {
        errors.message = "Role must be trainee";
        return res.status(422).json(errors);
      }

      user.roleData.schedule = req.body;
      user
        .save()
        .then(user => res.status(200).send(user.username))
        .catch(err => res.status(500).send(err));
    })
    .catch(err => res.status(500).json({ message: "Error occurred" }));
}

/**
 * Delete a user by id
 * @route   DELETE api/users/:id
 * @access  private (role: administrator)
 */
function deleteUser(req, res) {
  User.findById(req.params.id)
    .then(user => {
      user.remove((err, user) => {
        res.send(user.username);
      });
    })
    .catch(err => res.status(500).json({ message: "Error occurred" }));
}

module.exports = {
  getUsers,
  testRoute,
  createUser,
  loginUser,
  getUser,
  updateUser,
  updatePassword,
  deleteUser,
  getCurrentUser,
  updateTraineeSchedule
};
