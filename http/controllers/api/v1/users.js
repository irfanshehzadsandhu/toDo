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
  const newUser = serviceResponse.newUser;
  const token = await userService.generateAuthToken(newUser.userID);
  res.header("x-auth-token", token).send({
    userID: newUser.userID,
    name: newUser.name,
    email: newUser.email
  });
};
