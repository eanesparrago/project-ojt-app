const Clock = require("../models/clock");

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

module.exports = {
  testRoute,
  getClocks
};
