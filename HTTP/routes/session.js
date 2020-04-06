const express = require("express");
const router = express.Router();
const sessionController = require("../controllers/api/v1/session");
const auth = require("../../HTTP/middleware/auth");
router.post("/", auth.validate, sessionController.create);
router.get("/googleUrl", sessionController.googleUrl);
router.get("/googleAuth", auth.googleAuth, sessionController.googleAuth);

module.exports = router;
