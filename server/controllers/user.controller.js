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
  console.log(req.user);
  res.status(200).json({ message: "Users test" });
}

/**
 * Get all users
 * GET api/users/
 * @access  private
 */
function getUsers(req, res) {
  const errors = {};

  User.find()
    .then(users => {
      if (!users) {
        errors.users = "There are no users";
        return res.status(404).json(errors);
      }
      res.json(users);
    })
    .catch(err => {
      errors.users = "There are no users";
      return res.status(404).json({});
    });
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
      errors.user = "Username already exists";
      return res.status(400).json(errors);
    } else {
      const userData = {
        username: req.body.username,
        password: req.body.password
      };

      let newUser;

      switch (req.body.role) {
        case enums.roles.ADMINISTRATOR:
          newUser = new UserAdministrator(userData);
          break;
        case enums.roles.SUPERVISOR:
          newUser = new UserSupervisor(userData);
          break;
        case enums.roles.TRAINEE:
          newUser = new UserTrainee(userData);
          break;
        case enums.roles.EMPLOYEE:
          newUser = new UserEmployee(userData);
          break;
        default:
          res.status(400).json({ error: "Unknown" });
      }

      bcrypt.genSalt(12, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;

          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
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

  User.findOne({ username: username }).then(user => {
    if (!user) {
      return res.status(404).json({ error: "Invalid login information" });
    }

    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        const payload = { id: user.id, role: user.role };

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
 * Get user by id
 * POST api/users/id
 * @param  req.param.id
 * @param  res
 * @access  public
 */
function getUser(req, res) {
  User.findById(req.params.id)
    .then(user => res.json(user))
    .catch(err => res.status(404).json({ user: "User not found" }));
}

module.exports = {
  getUsers,
  testRoute,
  createUser,
  loginUser,
  getUser
};
