const PostService = require("../services/PostService");
const AsyncHandler = require("../utils/AsyncHandler");
const successResponse = require("../utils/ResponseHandler");

const getAllPosts = AsyncHandler(async (req, res, next) => {
  const posts = await PostService.getAllPosts(req.user.id);
  successResponse(res, posts);
});

const getPost = AsyncHandler(async (req, res, next) => {
  const post = await PostService.getPost(req.params.postId, req.user.id);
  successResponse(res, post);
});

const createPost = AsyncHandler(async (req, res, next) => {
  const post = await PostService.createPost(req.body, req.user.id);
  successResponse(res, post, 201);
});

const updatePost = AsyncHandler(async (req, res, next) => {
  const post = await PostService.updatePost(
    req.body,
    req.params.postId,
    req.user.id
  );

  successResponse(res, post);
});

const deletePost = AsyncHandler(async (req, res, next) => {
  const post = await PostService.deletePost(req.params.postId, req.user.id);
  successResponse(res, post, 204);
});

module.exports = {
  getAllPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
};
