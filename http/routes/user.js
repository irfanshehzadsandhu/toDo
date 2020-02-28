const auth = require("../middleware/auth");
const express = require("express");
const router = express.Router();
const usersController = require("../controllers/api/v1/users");

router.get("/current", auth, usersController.current);
router.post("/", auth, usersController.create);

module.exports = router;
