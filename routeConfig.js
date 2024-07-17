const express = require("express");
const ApiError = require("./utils/ApiError.js");
const cors = require("cors");
const upload = require("./middleware/multerConfig.js");

const authRoutes = require("./routes/authRoutes.js");
const postRoutes = require("./routes/postRoutes");
const commentRoutes = require("./routes/commentRoutes");
const userRoutes = require("./routes/userRoutes");

const corsOptions = {
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

const configureRoute = (app) => {
  // middleware
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cors(corsOptions));

  // routes
  app.use("/api/auth", upload.none(), authRoutes);
  app.use("/api/posts", postRoutes);
  app.use("/api/posts/:postId/comments", commentRoutes);
  app.use("/api/users", userRoutes);

  app.all("*", (req, res, next) => {
    next(new ApiError("Route not defined", 404));
  });
};

module.exports = configureRoute;
