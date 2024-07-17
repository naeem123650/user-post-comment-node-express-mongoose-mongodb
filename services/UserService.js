const User = require("../models/UserModel");
const ApiError = require("../utils/ApiError");

const getAllUsers = async () => {
  return await User.find();
};

const getUser = async (userId) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new ApiError("User not found.", 400);
  }

  return user;
};

const deleteUser = async (userId) => {
  const user = await User.findByIdAndDelete(userId);

  if (!user) {
    throw new ApiError("User not found.", 400);
  }

  return user;
};

module.exports = {
  getAllUsers,
  getUser,
  deleteUser,
};
