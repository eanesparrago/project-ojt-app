const Announcement = require("../models/announcement");
const Group = require("../models/group");

function testRoute(req, res) {
  res.status(200).send("Announcement route test");
}

function createAnnouncement(req, res) {
  const newAnnouncement = new Announcement(req.body.announcement);

  newAnnouncement.user = req.user._id;

  newAnnouncement.save((err, saved) => {
    if (err) {
      return res.status(500).send(err);
    }

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
  });
}

function getAnnouncements(req, res) {
  Announcement.find()
    .populate("group", "name")
    .populate("user", "username")
    .then(announcements => {
      if (!announcements) {
        return res.status(404);
      }

      res.status(200).json({ announcements });
    });
}

function deleteAnnouncement(req, res) {
  Announcement.findById(req.params.id).then(announcement => {
    if (!announcement) {
      return res.status(404);
    }

    Group.findById(announcement.group).then(group => {
      if (!group) {
        return res.status(404);
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
  });
}

module.exports = {
  testRoute,
  createAnnouncement,
  getAnnouncements,
  deleteAnnouncement
};
