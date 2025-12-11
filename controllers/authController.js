const Admin = require("../models/Admin");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.adminLogin = async (req, res) => {
  const { email, password } = req.body;

  const admin = await Admin.findOne({ email });
  if (!admin) return res.status(404).json({ message: "Invalid email" });

  const valid = await bcrypt.compare(password, admin.password);
  if (!valid) return res.status(401).json({ message: "Wrong password" });

  const token = jwt.sign(
    {
      admin_id: admin._id,
      organization: admin.organization_name
    },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  res.json({ message: "Login Successful", token });
};
