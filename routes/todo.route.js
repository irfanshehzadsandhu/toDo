const express = require("express");
const router = express.Router();

const todos_controller = require("../controllers/api/v1/todos.controller");
router.get("/find", todos_controller.find);
router.get("/all", todos_controller.all);
router.post("/create", todos_controller.create);
router.put("/update", todos_controller.update);
router.delete("/destroy", todos_controller.destroy);
module.exports = router;
