const Clock = require("../models/clock");
const { validationResult } = require("express-validator/check");
const UserUtils = require("./utils/user");

function testRoute(req, res) {
  res.status(200).send("Clock test");
}

function getClocks(req, res) {
  Clock.find()
    .populate("user", "username")
    .then(clocks => {
      if (!clocks) {
        return res.status(404).send("No clocks");
      }

      res.status(200).json({ clocks });
    });
}

function updateClock(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json(errors.mapped());
  }

  Clock.findById(req.params.id)
    .then(clock => {
      if (!clock) {
        return res.status(404).send("Clock not found");
      }

      if (!clock.out) {
        return res.status(400).send("Bad request");
      }

      clock.in = req.body.in;
      clock.out = req.body.out;
      clock.isInvalid = false;

      return clock.save();
    })
    .then(clock => {
      return UserUtils.returnUser(clock.user);
    })
    .then(user => {
      return res
        .status(200)
        .json({ message: "Clock updated successfully.", user });
    })
    .catch(err => {
      console.log(err);
      return res.status(500).json({ message: "An error occurred." });
    });
}

module.exports = {
  testRoute,
  getClocks,
  updateClock
};
