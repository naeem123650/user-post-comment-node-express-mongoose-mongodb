const AsyncHandler = require("../utils/AsyncHandler");
const UserService = require("../services/UserService");
const successResponse = require("../utils/ResponseHandler");

const getAllUsers = AsyncHandler(async (req, res, next) => {
  const users = await UserService.getAllUsers();
  successResponse(res, users);
});

const getUser = AsyncHandler(async (req, res, next) => {
  const user = await UserService.getUser(req.params.id);
  successResponse(res, user);
});

const deleteUser = AsyncHandler(async (req, res, next) => {
  const user = await UserService.deleteUser(req.params.id);
  successResponse(res, user, 204);
});

module.exports = {
  getAllUsers,
  getUser,
  deleteUser,
};
