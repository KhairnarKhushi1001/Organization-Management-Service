const express = require("express");
const { createOrganization, getOrganization } = require("../controllers/orgController");
const auth = require("../middleware/authMiddleware");
const router = express.Router();
const { updateOrganization } = require("../controllers/orgController");


router.post("/create", createOrganization);
router.get("/get", auth, getOrganization);   // protected
router.put("/update/:id", updateOrganization);

module.exports = router;
