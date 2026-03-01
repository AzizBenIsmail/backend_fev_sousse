const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");

const requireAuthUser = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json("token not found");
  }

  jwt.verify(token, process.env.netSecret, async (err, decodedToken) => {
    if (err) {
      return res.status(401).json("token is not valid");
    } else {
      const user = await userModel.findById(decodedToken.id); //current user
      req.session.user = user; //session storage
      next();
    }
  });
};

module.exports = { requireAuthUser };