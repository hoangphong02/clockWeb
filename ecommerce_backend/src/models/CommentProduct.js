const mongoose = require("mongoose");
const commentSchema = new mongoose.Schema(
  {
    name: { type: String },
    avatar: { type: String },
    description: { type: String, required: true },
    rating: { type: Number, require: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    commentAt: { type: Date },
  },
  {
    timestamps: true,
  }
);

const Comment = mongoose.model("Comment", commentSchema);
module.exports = Comment;
