// Current User
const userService = require("../../../../services/user.service");
exports.current = async (req, res) => {
  const user = await userService.current(req, res);
  res.send(user);
};

exports.create = async (req, res) => {
  const serviceResponse = await userService.create(req, res);
  if (serviceResponse.status == 400) {
    res.send(serviceResponse.message);
  }
  let user = serviceResponse.user;
  const token = await userService.generateAuthToken(user);
  res.header("x-auth-token", token).send({
    _id: user._id,
    name: user.name,
    email: user.email
  });
};
