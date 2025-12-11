const mongoose = require("mongoose");

const AdminSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  password: String,
  organization_name: String
});

module.exports = mongoose.model("Admin", AdminSchema);
