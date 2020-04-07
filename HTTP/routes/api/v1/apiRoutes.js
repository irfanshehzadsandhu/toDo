const express = require("express");
const router = express.Router();
const usersController = require("../../../controllers/api/v1/users");
const todosController = require("../../../controllers/api/v1/todos");
const passwordController = require("../../../controllers/api/v1/password");
const authenticate = require("../../../middleware/authenticate");
const authorize = require("../../../middleware/authorize");
const googleAuth = require("../../../middleware/googleAuth");

router.post("/login", authenticate);
router.post("/users", usersController.create);


router.get("/todos/all", authorize, todosController.all);
router.post("/todos/create", authorize, todosController.create);
router.put("/todos/update", authorize, todosController.update);
router.delete("/todos/destroy", authorize, todosController.destroy);

router.get("/googleAuth", googleAuth);
router.post("/password", authorize, passwordController.update);

module.exports = router;