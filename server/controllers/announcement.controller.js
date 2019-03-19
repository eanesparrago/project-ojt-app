const Announcement = require("../models/announcement");
const Group = require("../models/group");
const { validationResult } = require("express-validator/check");
const enums = require("../enums");

function testRoute(req, res) {
  res.status(200).send("Announcement route test");
}

function createAnnouncement(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json(errors.mapped());
  }

  const newAnnouncement = new Announcement(req.body.announcement);

  newAnnouncement.user = req.user._id;

  if (req.body.announcement.group === "all") {
    newAnnouncement.group = null;
    newAnnouncement.isGlobal = true;
  }

  newAnnouncement.save((err, saved) => {
    if (err) {
      return res.status(500).send(err);
    }

    if (req.body.announcement.group !== "all") {
      Group.findById(req.body.announcement.group).then(group => {
        if (!group) {
          return res.status(404);
        }

        group.announcements.push(saved);
        group.save(err => {
          if (err) {
            return res.status(500).send(err);
          }

          res.status(200).json({ announcement: saved });
        });
      });
    } else {
      res.status(200).json({ announcement: saved });
    }
  });
}

function getAnnouncements(req, res) {
  Announcement.find()
    .populate("group", "name")
    .populate("user", "username profilePictureUrl")
    .then(announcements => {
      if (!announcements) {
        return res.status(404).send("Not found");
      }
      res.status(200).json({ announcements });
    });
}

function getAnnouncement(req, res) {
  Announcement.findById(req.params.id)
    .populate("group", "name")
    .populate("user", "username profilePictureUrl")
    .then(announcement => {
      if (!announcement) {
        return res.status(404).send("Not found");
      }

      res.status(200).json({ announcement });
    })
    .catch(err => {
      res.status(500);
    });
}

function updateAnnouncement(req, res) {
  if (req.body.message.trim() === "") {
    return res
      .status(422)
      .json({ errors: { message: { msg: "Message is required." } } });
  }

  Announcement.findById(req.params.id).then(announcement => {
    // >>> User validation. If not admin, compare user ids
    if (
      req.user.role !== enums.roles.ADMINISTRATOR &&
      !announcement.user._id.equals(req.user._id)
    ) {
      return res.status(403).send("Forbidden");
    }

    if (!announcement) {
      return res.status(404).send("Not found");
    }

    announcement.message = req.body.message;
    announcement.save((err, announcement) => {
      if (err) {
        return res.status(500).send(err);
      }

      res.status(200).json({ announcement });
    });
  });
}

function deleteAnnouncement(req, res) {
  Announcement.findById(req.params.id).then(announcement => {
    // >>> User validation. If not admin, compare user ids
    if (
      req.user.role !== enums.roles.ADMINISTRATOR &&
      !announcement.user._id.equals(req.user._id)
    ) {
      return res.status(403).send("Forbidden");
    }

    if (!announcement) {
      return res.status(404).send("Not found");
    }

    if (announcement.isGlobal) {
      announcement.remove((err, announcement) => {
        if (err) {
          return res.status(500).send(err);
        }

        res.status(200).json({ announcement });
      });
    } else {
      Group.findById(announcement.group).then(group => {
        if (!group) {
          return res.status(404).send("Not found");
        }

        group.announcements.remove(announcement._id);
        group.save(err => {
          if (err) {
            return res.status(500).send(err);
          }

          announcement.remove((err, announcement) => {
            if (err) {
              return res.status(500).send(err);
            }

            res.status(200).json({ announcement });
          });
        });
      });
    }
  });
}

module.exports = {
  testRoute,
  createAnnouncement,
  getAnnouncements,
  getAnnouncement,
  updateAnnouncement,
  deleteAnnouncement
};
