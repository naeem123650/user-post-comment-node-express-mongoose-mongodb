const express = require("express");
const {
  getAllPosts,
  createPost,
  getPost,
  updatePost,
  deletePost,
} = require("../controllers/PostController");
const auth = require("../middleware/authMiddleware");
const handleError = require("../middleware/handleValidationErrors");
const {
  createPostValidator,
  getPostValidator,
  updatePostValidator,
  deletePostValidator,
} = require("../middleware/validators/postValidator");

const router = express.Router();

router.use(auth);

router
  .route("/")
  .get(getAllPosts)
  .post(createPostValidator, handleError, createPost);
router
  .route("/:postId")
  .get(getPostValidator, handleError, getPost)
  .put(updatePostValidator, handleError, updatePost)
  .delete(deletePostValidator, handleError, deletePost);

module.exports = router;
