const User = require("../models/UserModel");
const bcrypt = require("bcrypt");
const ApiError = require("../utils/ApiError");

const register = async (data) => {
  const { username, email, password } = data;

  return await User.create({
    username,
    email,
    password,
  });
};

const login = async (data) => {
  const { email, password } = data;

  const user = await User.findOne({ email });

  if (user && (await user.passwordCompare(password))) {
    return user;
  }

  next(new ApiError("invalid Credentials", 400));
};

const me = async (req, res, next) => {
  res.status(200).json({
    status: "success",
    message: req.user,
  });
};

module.exports = {
  register,
  login,
  me,
};
