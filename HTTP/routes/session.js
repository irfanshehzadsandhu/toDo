const express = require("express");
const router = express.Router();
const sessionController = require("../controllers/api/v1/session");
const oauth = require("../middleware/oauth");
router.post("/", sessionController.create);
router.get("/googleUrl", sessionController.googleUrl);
router.get("/googleAuth",oauth, sessionController.googleAuth);

module.exports = router;
