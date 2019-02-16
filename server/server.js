// >>> Module imports
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const path = require("path");

// >>> Route imports
const users = require("./routes/user.routes");
const posts = require("./routes/post.routes");

const app = express();

// >>> body-parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// >>> Connect to MongoDB
// const db = require("./config/keys").mongoURI;
// mongoose
//   .connect(db, { useNewUrlParser: true })
//   .then(() => console.log("MongoDB connected"))
//   .catch(err => console.log(err));

// >>> Passport middlware, passport config
// app.use(passport.initialize());
// require("./config/passport")(passport);

// >>> Use routes
// app.use("/api", users);
// app.use("/api", posts);

// >>> Serve static in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static("../client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname), "client", "build", "index.html");
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
