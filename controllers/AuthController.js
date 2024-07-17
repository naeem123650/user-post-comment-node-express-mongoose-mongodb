const AsyncHandler = require("../utils/AsyncHandler");
const AuthService = require("../services/AuthService");
const successResponse = require("../utils/ResponseHandler");
const { generateToken } = require("../controllers/JwtController");

const register = AsyncHandler(async (req, res, next) => {
  const user = await AuthService.register(req.body);

  successResponse(res, {
    username: user.username,
    email: user.email,
    token: await generateToken(user._id),
  });
});

const login = AsyncHandler(async (req, res, next) => {
  const user = await AuthService.login(req.body);

  successResponse(res, {
    username: user.username,
    email: user.email,
    token: await generateToken(user._id),
  });
});

const me = AsyncHandler(async (req, res, next) => {
  successResponse(res, req.user);
});

module.exports = {
  register,
  login,
  me,
};
