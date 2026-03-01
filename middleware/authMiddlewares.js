const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");

module.exports.requireAuthUser = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    res.status(401).json("token not found");
  }

  jwt.verify(token, process.env.netSecret, async (err, decodedToken) => {
    if (err) {
      res.status(401).json("token is not valid");
    } else {
      const user = await userModel.findById(decodedToken.id); //current user
      req.session.user = user; //session storage
      next();
    }
  });
};

