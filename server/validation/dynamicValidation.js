// https://github.com/express-validator/express-validator/issues/439

const async = require("async");

// This function executes middleware in series
function dynamicMiddleware(validators, req, res, next) {
  async.eachSeries(
    validators,
    function(middleware, doneMiddleware) {
      middleware.bind(null, req, res, doneMiddleware)();
    },
    function(err) {
      if (err) {
        return res
          .status(500)
          .json({ error: "There was a problem with your middleware" });
      } else {
        next(err);
      }
    }
  );
}

module.exports = dynamicMiddleware;