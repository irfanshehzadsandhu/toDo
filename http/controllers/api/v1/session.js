const userService = require("../../../../services/user");

exports.create = async (req, res) => {
  const serviceResponse = await userService.createSession(req.body);
  if (serviceResponse.code == 403) {
    res.send({ code: 403, error: serviceResponse.message });
  } else {
    res.header("x-auth-token", serviceResponse.token).send({
      code: 200,
      message: "Signed In successfully."
    });
  }
};
