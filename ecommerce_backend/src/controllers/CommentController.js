const CommentService = require("../services/CommentService");
const JwtService = require("../services/JwtService");

const createComment = async (req, res) => {
  try {
    const { name, avatar, description, rating } = req.body;
    if (!description || !name || !avatar || !rating) {
      return res.status(200).json({
        status: "ERR",
        message: "The input is required",
      });
    }
    const response = await CommentService.createComment(req.body);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const getAllCommentDetails = async (req, res) => {
  try {
    const productId = req.params.id;
    if (!productId) {
      return res.status(200).json({
        status: "ERR",
        message: "The userId is required",
      });
    }
    const response = await CommentService.getAllCommentDetails(productId);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const deleteComment = async (req, res) => {
  try {
    const commentId = req.params.id;
    if (!commentId) {
      return res.status(200).json({
        status: "ERR",
        message: "The userId is required",
      });
    }
    const response = await CommentService.deleteComment(commentId);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

module.exports = {
  createComment,
  getAllCommentDetails,
  deleteComment,
};
