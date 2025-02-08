// const { constants } = require("./routes/constants");
const { constants } = require("../routes/constants")
const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 300;
  res.json({ message: err.message, stackTrace: err.stack });
  switch (statusCode) {
    case constants.VALIDATION_ERROR:
      res.json({ title: "validation failed", message: err.message, stackTrace: err.stack });
      break;

    case constants.NOT_FOUND:
      res.json({ title: "Not Found", message: err.message, stackTrace: err.stack });
      break;

    case constants.UNAUTHORISED:
      res.json({ title: "unauthorised", message: err.message, stackTrace: err.stack });
      break;

    case constants.FORBIDDEN:
      res.json({ title: "server error", message: err.message, stackTrace: err.stack });
      break;

    case constants.SERVER_ERROR:
      res.json({ title: "forbidden  ", message: err.message, stackTrace: err.stack });
      break;
    default:
      console.log("No Error,All good !!!");
  }
}

module.exports = errorHandler;