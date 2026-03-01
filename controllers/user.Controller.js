const userModel = require("../models/user.model");

module.exports.esm = async (req, res) => {
  try {
    // Your logic here
    res.status(200).json("marhbe bikom fi backend");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.getAllUsers = async (req, res) => {
  try {
    const users = await userModel.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.addUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const newUser = new userModel({ email, password });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.addAdmin = async (req, res) => {
  try {
    const { email, password, Permission } = req.body;
    const newAdmin = new userModel({
      email,
      password,
      role: "admin",
      Permission,
    });
    await newAdmin.save();
    res.status(201).json(newAdmin);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await userModel.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { phone, location, username } = req.body;
    const updatedUser = await userModel.findByIdAndUpdate(
      id,
      { phone, location, username },
      { new: true },
    );
    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.rechargebyUsername = async (req, res) => {
  try {
    const { username } = req.body;
    const user = await userModel.findOne({ username });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userModel.findById(id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.addUserWithPhoto = async (req, res) => {
  try {
    const { email, password } = req.body;
    const photo = req.file ? req.file.path : null;
    const newUser = new userModel({ email, password, photo });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//jwt => id + date d'expiration + net secret key => token jsobwebtoken

//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
//eyJpZCI6IjY2Njc1YzE4YzY5NmNjNGZkMGZiMWJkNiIsImlhdCI6MTcxODEzNTk5MywiZXhwIjoxNzE4MTQzMTkzfQ.
//xH69EHUeSny3WZfkxWj9VjPdfQL1oTDYV0I1GzjmzhY

const jwt = require("jsonwebtoken");
require("dotenv").config();

const maxAge = 2 * 60 * 60; //2 hours in seconds

const secretKey = process.env.netSecret;

const createToken = (id) => {
  return jwt.sign({ id }, secretKey, { expiresIn: maxAge  });
};

module.exports.login = async (req, res) => {
  try {
    //logic
    const { email, password } = req.body;
    const user = await userModel.Login(email, password);
    const token = createToken(user._id);

    res.cookie("token", token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(200).json({ user, message: "Login successful" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.getAuthUser = async (req,res)=>{
  try {
    //logic
    const user = req.session.user;

    res.status(200).json(user)
  } catch (error) {
    res.status(500).json({error:error.messge})
  }
}

module.exports.logout = async (req, res) => {
  try {
    res.clearCookie("token");
    req.session.destroy();
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};