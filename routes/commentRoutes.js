const express = require("express");
const {
  getAllComments,
  createComment,
  getComment,
  updateComment,
  deleteComment,
} = require("../controllers/CommentController");
const auth = require("../middleware/authMiddleware");
const handleError = require("../middleware/handleValidationErrors");
const {
  createCommentValidator,
  getCommentValidator,
  updateCommentValidator,
  deleteCommentValidator,
} = require("../middleware/validators/commentValidator");

const router = express.Router({ mergeParams: true });

router.use(auth);

router
  .route("/")
  .get(getAllComments)
  .post(createCommentValidator, handleError, createComment);
router
  .route("/:commentId")
  .get(getCommentValidator, handleError, getComment)
  .put(updateCommentValidator, handleError, updateComment)
  .delete(deleteCommentValidator, handleError, deleteComment);

module.exports = router;
