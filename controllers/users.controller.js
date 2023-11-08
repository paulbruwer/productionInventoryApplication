const Users = require("../models/users");

// check password upon login
exports.matchPassword = async (req, res, next) => {
  try {
    const result = await Users.find({ email: req.body.email });
    if (result[0].password === req.body.password) {
      req.permissions = result[0].permissions;
      next();
    } else {
      res.json({ message: "Incorrect username or password" });
    }
  } catch (error) {
    res.json({ message: "Incorrect username or password" });
  }
};
