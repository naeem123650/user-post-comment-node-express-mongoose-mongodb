  const jwt = require("jsonwebtoken");
  const User = require("../models/UserModel");
  const ApiError = require("../utils/ApiError");
  const AsyncHandler = require("../utils/AsyncHandler");

  module.exports = AsyncHandler(async (req, res, next) => {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];

      const decoded = await jwt.verify(token, process.env.JET_SECRET);

      req.user = await User.findById(decoded.id).select("-password");

      if (!req.user) {
        next(new ApiError("User not found", 400));
      }

      next();
    }

    if (!token) {
      next(
        new ApiError(
          "Unauthenticated. please provide token to access resource",
          403
        )
      );
    }
  });
