const express = require("express");
const router = express.Router();
const sessionController = require("../controllers/api/v1/session");
router.post("/", sessionController.create);
router.get("/googleUrl", sessionController.googleUrl);
router.get("/googleAuth", sessionController.googleAuth);

module.exports = router;
