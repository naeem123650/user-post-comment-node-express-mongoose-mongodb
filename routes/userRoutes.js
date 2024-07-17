const express = require("express");

const {
  getAllUsers,
  getUser,
  deleteUser,
} = require("../controllers/UserController");

const router = express.Router();
const handleValidationErrors = require("../middleware/handleValidationErrors");
const {
  deleteUserValidator,
  getUserValidator,
} = require("../middleware/validators/userValidator");

router.route("/").get(getAllUsers);
router
  .route("/:id")
  .get(getUserValidator, handleValidationErrors, getUser)
  .delete(deleteUserValidator, handleValidationErrors, deleteUser);

module.exports = router;
