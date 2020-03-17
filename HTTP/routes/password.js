const express = require("express");
const router = express.Router();
const passwordController = require("../controllers/api/v1/password");
router.post("/", passwordController.update);

module.exports = router;
