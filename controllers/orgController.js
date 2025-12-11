const bcrypt = require("bcrypt");
const Organization = require("../models/Organization");
const Admin = require("../models/Admin");
const mongoose = require("mongoose");

// CREATE ORGANIZATION
exports.createOrganization = async (req, res) => {
  try {
    const { organization_name, email, password } = req.body;

    // Check if org exists
    const existing = await Organization.findOne({ organization_name });
    if (existing) return res.status(400).json({ message: "Organization already exists" });

    // Hash password
    const hashed = await bcrypt.hash(password, 10);

    // Create admin
    const admin = await Admin.create({
      email,
      password: hashed,
      organization_name
    });

    // Create dynamic collection
    const collectionName = `org_${organization_name}`;
    mongoose.connection.createCollection(collectionName);

    // Save metadata
    const org = await Organization.create({
      organization_name,
      collection_name: collectionName,
      admin_id: admin._id
    });

    return res.json({ message: "Organization created", org });
  } catch (err) {
    res.status(500).json({ error: err.toString() });
  }
};

// GET ORGANIZATION
exports.getOrganization = async (req, res) => {
  const { organization_name } = req.query;

  const org = await Organization.findOne({ organization_name });
  if (!org) return res.status(404).json({ message: "Not found" });

  res.json(org);
};


// controllers/organizationController.js

// Update organization
exports.updateOrganization = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedOrg = await Organization.findByIdAndUpdate(
      id,
      req.body,
      { new: true } // return updated document
    );

    if (!updatedOrg) {
      return res.status(404).json({
        success: false,
        message: "Organization not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Organization updated successfully",
      data: updatedOrg
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating organization",
      error: error.message
    });
  }
};
