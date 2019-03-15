const User = require("../models/user/user");
const { validationResult } = require("express-validator/check");
const bcrypt = require("bcryptjs");

/**
 * Test route
 * GET api/users/trainee/test
 * @param  req
 * @param  res
 * @private
 */
function testRoute(req, res) {
  res.status(200).json({ message: "Users Trainee test" });
}

function initializeUser(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json(errors.mapped());
  }

  User.findById(req.user._id)
    .then(user => {
      user.firstName = req.body.firstName;
      user.middleName = req.body.middleName;
      user.lastName = req.body.lastName;
      user.nickname = req.body.nickname;
      user.gender = req.body.gender;
      user.email = req.body.email;
      user.profilePictureUrl = req.body.profilePictureUrl;

      user.roleData.school = req.body.school;
      user.roleData.dateOfBirth = req.body.dateOfBirth;
      user.roleData.address = req.body.address;
      user.roleData.contactNumber = req.body.contactNumber;
      user.roleData.adviserName = req.body.adviserName;
      user.roleData.adviserContactNumber = req.body.adviserContactNumber;
      user.roleData.guardianName = req.body.guardianName;
      user.roleData.guardianContactNumber = req.body.guardianContactNumber;

      user.roleData.isInitialized = true;

      bcrypt.genSalt(12, (err, salt) => {
        bcrypt.hash(req.body.password, salt, (err, hash) => {
          if (err) throw err;

          user.password = hash;
          user
            .save()
            .then(user => res.status(200).json(user))
            .catch(err => console.log(err));
        });
      });
    })
    .catch(err => res.status(500).json({ message: "Error occurred" }));
}

module.exports = {
  testRoute,
  initializeUser
};
