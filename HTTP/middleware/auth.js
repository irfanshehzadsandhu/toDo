const jwt = require("jsonwebtoken");
const { app } = require("../../App/Infrastructure/config");
const handleError = require("../utils/handleError");

module.exports = function(req, res, next) {
  //get the token from the header if present
  const token = req.headers["x-access-token"] || req.headers["authorization"];
  if (!token) {
    handleError({ message: "Access denied. No token provided." }, res);
  }

  try {
    //if can verify the token, set req.user and pass to next middleware
    const decoded = jwt.verify(token, app.myPrivateKey);
    req.user = decoded;

    next();
  } catch (ex) {
    handleError({ message: "Access denied. Invalid token." }, res);
  }
};
