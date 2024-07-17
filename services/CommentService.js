const Comment = require("../models/CommentModel");
const ApiError = require("../utils/ApiError");

const getAllComments = async () => {
  return await Comment.find().populate("post");
};

const getComment = async (commentId) => {
  const comment = await Comment.findById(commentId).populate([
    {
      path: "post",
    },
    {
      path: "author",
      select: "-password",
    },
  ]);

  if (!comment) {
    throw new ApiError("Comment not found.", 400);
  }

  return comment;
};

const createComment = async (data, postId, authorId) => {
  const { comment } = data;
  const createdComment = await Comment.create({
    comment,
    author: authorId,
    post: postId,
  });

  return createdComment;
};

const updateComment = async (data, commentId, authorId) => {
  const comment = await Comment.findById(commentId);

  if (!comment) {
    throw new ApiError("Comment not found.", 400);
  }

  if (comment.author.toString() !== authorId) {
    throw new ApiError("You are not authorized to update this comment", 403);
  }

  const updatedComment = await Comment.findByIdAndUpdate(commentId, data, {
    runValidators: true,
    new: true,
  });

  return updatedComment;
};

const deleteComment = async (commentId, authorId) => {
  const comment = await Comment.findById(commentId);

  if (!comment) {
    throw new ApiError("Comment not found.", 400);
  }

  if (comment.author.toString() !== authorId) {
    throw new ApiError("You are not authorized to update this comment", 403);
  }

  await Comment.findByIdAndDelete(commentId);
};

module.exports = {
  getAllComments,
  getComment,
  createComment,
  updateComment,
  deleteComment,
};
