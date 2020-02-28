// Current User
const userService = require("../../../../services/user");
exports.current = async (req, res) => {
  const user = await userService.current(req.user.userID);
  res.send(user);
};

exports.create = async (req, res) => {
  const serviceResponse = await userService.create(req.body);
  if (serviceResponse.status == 403) {
    res.send(serviceResponse.message);
  }

  res.header("x-auth-token", serviceResponse.token).send({
    code: 200,
    message: "Signed Up successfully."
  });
};
