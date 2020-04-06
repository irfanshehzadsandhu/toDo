const express = require("express");
const router = express.Router();
const auth = require("../../HTTP/middleware/auth");

const todosController = require("../controllers/api/v1/todos");
router.get("/find", auth.userIsAuthorized, todosController.find);
router.get("/all", auth.userIsAuthorized, todosController.all);
router.post("/create", auth.userIsAuthorized, todosController.create);
router.put("/update", auth.userIsAuthorized, todosController.update);
router.delete("/destroy", auth.userIsAuthorized, todosController.destroy);
module.exports = router;
