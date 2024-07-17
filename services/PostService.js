const mongoose = require("mongoose");
const Post = require("../models/PostModel");
const ApiError = require("../utils/ApiError");

const getAllPosts = async (author) => {
  return await Post.find({ author });
};

const getPost = async (postId, authorId) => {
  const post = await Post.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(postId),
        author: new mongoose.Types.ObjectId(authorId),
      },
    },
    {
      $lookup: {
        from: "Comment",
        localField: "_id",
        foreignField: "post",
        as: "comments",
      },
    },
  ]);

  if (!post.length) {
    throw new ApiError("Post not found.", 400);
  }
  return post[0];
};

const createPost = async (data, author) => {
  const { name } = data;

  const post = await Post.create({
    name,
    author,
  });

  return post;
};

const updatePost = async (data, postId, authorId) => {
  const post = await Post.findById(postId);

  if (!post) {
    throw new ApiError("Post not found.", 400);
  }

  if (post.author.toString() !== authorId) {
    throw new ApiError("You are not authorized to update this post", 403);
  }

  const updatedPost = await Post.findByIdAndUpdate(postId, data, {
    new: true,
    runValidators: true,
  });

  return updatedPost;
};

const deletePost = async (postId, authorId) => {
  const post = await Post.findById(postId);

  if (!post) {
    throw new ApiError("Post not found.", 400);
  }

  if (post.author.toString() !== authorId) {
    throw new ApiError("You are not authorized to delete this post.", 403);
  }

  await Post.findByIdAndDelete(postId);
};

// get single posts with comments
// const getSinglePost = async (req, res, next) => {
//   const postId = new mongoose.Types.ObjectId(req.params.id);

//   const post = await Post.aggregate([
//     {
//       $match: {
//         _id: postId,
//       },
//     },
//     {
//       $lookup: {
//         from: "comments",
//         localField: "_id",
//         foreignField: "post",
//         as: "comments",
//       },
//     },
//     {
//       $project: {
//         _id: 0,
//         name: 1,
//         createdAt: 1,
//         comments: {
//           comment: 1,
//           post: 1,
//           createdAt: 1,
//         },
//       },
//     },
//   ]);

//   if (!post) {
//     next(new ApiError("Post not found.", 400));
//   }

//   res.status(200).json({
//     status: "success",
//     post: post[0],
//   });
// };

// // get posts with comments
// const getAllPostsAgg = async (req, res, next) => {
//   const posts = await Post.aggregate([
//     {
//       $lookup: {
//         from: "comments",
//         localField: "_id",
//         foreignField: "post",
//         as: "comments",
//       },
//     },
//   ]);

//   res.status(200).json({
//     status: "success",
//     posts,
//   });
// };

module.exports = {
  getAllPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
};
