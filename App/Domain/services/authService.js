const appError = require("../../../HTTP/errors/appError");
const { application } = require("../../Infrastructure/config");
const UserFactory = require("../../Infrastructure/factories/userFactory");
const store = UserFactory.getUserStore();

class AuthService {
  constructor() {
    throw new appError("You can not instantiate AuthService abstract class", 400);
  }

  static userHasAuthorization(req) {
    const token = req.headers["x-access-token"] || req.headers["authorization"];
    if (!token) {
      throw new appError("Access denied. No token provided.", 400);
    }

    try {
      const decoded = jwt.verify(token, application.myPrivateKey);
      store.userExists(decoded.userID);
    } catch (ex) {
      throw new appError("Access denied. Invalid token.", 400);
    }
  }

}
module.exports = AuthService;