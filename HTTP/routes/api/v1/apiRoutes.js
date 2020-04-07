const express = require("express");
const router = express.Router();
const auth = require("../../../../HTTP/middleware/auth");
const usersController = require("../../../controllers/api/v1/users");
const todosController = require("../../../controllers/api/v1/todos");
const sessionController = require("../../../controllers/api/v1/session");
const passwordController = require("../../../controllers/api/v1/password");
const apiUrl = "/api/v1";

router.get(apiUrl + "/users" + "/current", auth.validate, usersController.current);
router.post(apiUrl + "/users" + "/", usersController.create);


router.get(apiUrl + "/todos" + "/all", auth.userIsAuthorized, todosController.all);
router.post(apiUrl + "/todos" + "/create", auth.userIsAuthorized, todosController.create);
router.put(apiUrl + "/todos" + "/update", auth.userIsAuthorized, todosController.update);
router.delete(apiUrl + "/todos" + "/destroy", auth.userIsAuthorized, todosController.destroy);

router.post(apiUrl + "/session" + "/", auth.validate, sessionController.create);
router.get(apiUrl + "/session" + "/googleUrl", sessionController.googleUrl);
router.get(apiUrl + "/sessions" + "/googleAuth", auth.googleAuth, sessionController.googleAuth);

router.post(apiUrl + "/password" + "/", passwordController.update);

module.exports = router;