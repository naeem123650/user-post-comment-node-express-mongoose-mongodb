const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = mongoose.Schema(
  {
    username: {
      type: "string",
      required: [true, "Username is required."],
      unique: [true, "Username should be unique"],
      trim: true,
    },
    email: {
      type: "string",
      required: [true, "Email is required."],
      unique: [true, "Email should be unique"],
      trim: true,
    },
    password: {
      type: "string",
      required: [true, "Password is required."],
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.pre("save", async function (next) {
  try {
    const saltValue = 10;
    this.password = await bcrypt.hash(this.password, saltValue);
  } catch (error) {
    next(error);
  }
});

UserSchema.pre("findOneAndDelete", async function () {
  try {
    const userId = this.getQuery()._id;
    console.log(userId);
    await mongoose.model("Post").deleteMany({ author: userId });
  } catch (error) {
    next(error);
  }
});

UserSchema.methods.passwordCompare = async function (password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model("User", UserSchema);
