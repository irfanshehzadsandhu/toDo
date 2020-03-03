const logger = require("../logs");
const AppError = require("../errors/appError");
const handleError = (err, res) => {
  logger.debug(err);
  if (err instanceof AppError) {
    return res.status(err.status).send({
      error: err.message
    });
  }
  return res.status(500).send({
    error: err.message
  });
};
module.exports = handleError;
