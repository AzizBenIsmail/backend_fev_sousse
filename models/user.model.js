const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const userSchema = new mongoose.Schema({
  username: String,
  email: { type: String, required: true, unique: true },
  password: {
    type: String,
    required: true,
    match: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
  },
  role: { type: String, enum: ["admin", "user"], default: "user" },
  perf: String,
  phone: Number,
  location: String,
  active: Boolean,
  photo: String,

  //admin
  Permission: String,
  logs: String,

  //client

  //formateur

  //Many
  listofproducts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }], // many to many relationship between users and products

  //One
  product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" }, // one to many relationship between users and products
});

userSchema.pre("save", async function () {
  //hash the password before saving the user
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.statics.Login = async function (email, password) {
  const user = await this.findOne({ email });
  if (!user) {
    throw new Error("User not found");
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Invalid password");
  }
  return user;
};

module.exports = mongoose.model("User", userSchema);
