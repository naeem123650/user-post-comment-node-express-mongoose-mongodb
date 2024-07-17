const { body, param } = require("express-validator");

const getCommentValidator = [
  param("postId")
    .isMongoId()
    .trim()
    .escape()
    .withMessage("post id must be valid."),

  param("commentId")
    .isMongoId()
    .trim()
    .escape()
    .withMessage("comment id must be valid."),
];

const createCommentValidator = [
  param("postId").isMongoId().trim().escape().withMessage("post must be valid"),

  body("comment")
    .notEmpty()
    .withMessage("comment field is required")
    .isString()
    .trim()
    .escape()
    .withMessage("comment must be string"),
];
const updateCommentValidator = [
  param("postId")
    .isMongoId()
    .trim()
    .escape()
    .withMessage("post id must be valid."),

  param("commentId")
    .isMongoId()
    .trim()
    .escape()
    .withMessage("comment id must be valid."),

  body("comment")
    .notEmpty()
    .withMessage("comment field is required")
    .isString()
    .trim()
    .escape()
    .withMessage("comment must be string"),
];
const deleteCommentValidator = [
  param("postId")
    .isMongoId()
    .trim()
    .escape()
    .withMessage("post id must be valid."),

  param("commentId")
    .isMongoId()
    .trim()
    .escape()
    .withMessage("comment id must be valid."),
];

module.exports = {
  getCommentValidator,
  createCommentValidator,
  updateCommentValidator,
  deleteCommentValidator,
};
