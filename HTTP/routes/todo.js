const express = require("express");
const router = express.Router();

const todosController = require("../controllers/api/v1/todos");
router.get("/find", todosController.find);
router.get("/all", todosController.all);
router.post("/create", todosController.create);
router.put("/update", todosController.update);
router.delete("/destroy", todosController.destroy);
module.exports = router;
