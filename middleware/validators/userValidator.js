const { body, param } = require("express-validator");

const createUserValidator = [
  body("name")
    .notEmpty()
    .withMessage("Name field is required")
    .isString()
    .trim()
    .escape()
    .withMessage("Name must be string."),

  body("email")
    .notEmpty()
    .withMessage("Email field is required")
    .isEmail()
    .trim()
    .escape()
    .withMessage("Email must be valid."),

  body("password")
    .notEmpty()
    .withMessage("Password field is required")
    .isLength(6)
    .withMessage("Password must be 6 character long."),
];

const getUserValidator = [
  param("id").isMongoId().withMessage("Invalid user id."),
];

const deleteUserValidator = [
  param("id").isMongoId().withMessage("Invalid user id."),
];

module.exports = {
  createUserValidator,
  getUserValidator,
  deleteUserValidator,
};
