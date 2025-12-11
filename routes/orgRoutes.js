const express = require("express");
const { createOrganization, getOrganization } = require("../controllers/orgController");
const auth = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/create", createOrganization);
router.get("/get", auth, getOrganization);   // protected

module.exports = router;
