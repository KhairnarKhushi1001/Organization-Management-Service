const mongoose = require("mongoose");

const OrganizationSchema = new mongoose.Schema({
  organization_name: { type: String, unique: true },
  collection_name: String,
  admin_id: { type: mongoose.Schema.Types.ObjectId, ref: "Admin" }
});

module.exports = mongoose.model("Organization", OrganizationSchema);
