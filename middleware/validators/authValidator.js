const { body } = require("express-validator");

const registerValidator = [
  body("username")
    .notEmpty()
    .withMessage("Username field is required.")
    .isString()
    .trim()
    .escape()
    .withMessage("Username must be string"),

  body("email")
    .notEmpty()
    .withMessage("Email field is required.")
    .isEmail()
    .trim()
    .escape()
    .withMessage("Email must be valid"),

  body("password")
    .notEmpty()
    .trim()
    .escape()
    .withMessage("Password is required."),
];

const loginValidator = [
  body("email")
    .notEmpty()
    .withMessage("Username field is required.")
    .isEmail()
    .trim()
    .escape()
    .withMessage("Email must be valid"),

  body("password")
    .notEmpty()
    .trim()
    .escape()
    .withMessage("Password field is required."),
];

module.exports = {
  registerValidator,
  loginValidator,
};
