const mongoose = require("mongoose");
const slugify = require("slugify");

const PostSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required."],
      minLength: 5,
      unique: [true, "post name should be unique."],
      trim: true,
    },
    slug: {
      type: String,
      minLength: 5,
    },
    description: {
      type: String,
      required: false,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

// PostSchema.virtual("comments", {
//   ref: "Comment",
//   localField: "_id",
//   foreignField: "post",
// });

PostSchema.pre("save", function () {
  this.slug = slugify(this.name);
});

PostSchema.pre("findOneAndDelete", async function (next) {
  try {
    const postId = this.getQuery()._id;
    await mongoose.model("Comment").deleteMany({ post: postId });
  } catch (error) {
    // next(error);
    console.log(error);
  }
});

module.exports = mongoose.model("Post", PostSchema);
