const { body, param } = require("express-validator");

const getPostValidator = [
  param("postId")
    .isMongoId()
    .trim()
    .escape()
    .withMessage("post id must be valid."),
];

const createPostValidator = [
  body("name")
    .notEmpty()
    .withMessage("Name field is required")
    .isString()
    .trim()
    .escape()
    .withMessage("name must be string"),
];
const updatePostValidator = [
  param("postId")
    .isMongoId()
    .trim()
    .escape()
    .withMessage("post id must be valid."),

  body("name")
    .notEmpty()
    .withMessage("Name field is required")
    .isString()
    .trim()
    .escape()
    .withMessage("Name must be string"),
];
const deletePostValidator = [
  param("postId")
    .isMongoId()
    .trim()
    .escape()
    .withMessage("post id must be valid."),
];

module.exports = {
  getPostValidator,
  createPostValidator,
  updatePostValidator,
  deletePostValidator,
};
