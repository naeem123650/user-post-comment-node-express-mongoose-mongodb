const AsyncHandler = require("../utils/AsyncHandler");
const successResponse = require("../utils/ResponseHandler");
const CommentService = require("../services/CommentService");

const getAllComments = AsyncHandler(async (req, res, next) => {
  const comments = await CommentService.getAllComments();
  successResponse(res, comments);
});

const getComment = AsyncHandler(async (req, res, next) => {
  const comment = await CommentService.getComment(req.params.commentId);

  successResponse(res, comment);
});

const createComment = AsyncHandler(async (req, res, next) => {
  const comment = await CommentService.createComment(
    req.body,
    req.params.postId,
    req.user.id
  );

  successResponse(res, comment, 201);
});

const updateComment = AsyncHandler(async (req, res, next) => {
  const comment = await CommentService.updateComment(
    req.body,
    req.params.commentId,
    req.user.id
  );

  successResponse(res, comment);
});

const deleteComment = AsyncHandler(async (req, res, next) => {
  const comment = await CommentService.deleteComment(
    req.params.commentId,
    req.user.id
  );
  successResponse(res, null, 204);
});

module.exports = {
  getAllComments,
  getComment,
  createComment,
  updateComment,
  deleteComment,
};
