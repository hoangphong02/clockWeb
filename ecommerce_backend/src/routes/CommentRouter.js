const express = require("express");
const router = express.Router();
const commentController = require("../controllers/CommentController");
const {
  authUserMiddleWare,
  authMiddleWare,
} = require("../MiddleWare/authMiddleWare");

router.post("/create/:id", commentController.createComment);
router.get("/get-all-comment/:id", commentController.getAllCommentDetails);
router.delete(
  "/delete-comment/:id",
  authMiddleWare,
  commentController.deleteComment
);
module.exports = router;
