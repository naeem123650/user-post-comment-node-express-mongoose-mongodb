const express = require("express");
const { register, login, me } = require("../controllers/AuthController");

const router = express.Router();

const auth = require("../middleware/authMiddleware");
const handleError = require("../middleware/handleValidationErrors");
const {
  registerValidator,
  loginValidator,
} = require("../middleware/validators/authValidator");

router.post("/register", registerValidator, handleError, register);
router.post("/login", loginValidator, handleError, login);
router.get("/me", auth, me);

module.exports = router;
