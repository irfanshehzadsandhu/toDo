const auth = require("../middleware/auth");
const express = require("express");
const router = express.Router();
const users_controller = require("../controllers/api/v1/users.controller");

router.get("/current", auth, users_controller.current);
router.post("/", users_controller.create);

module.exports = router;
