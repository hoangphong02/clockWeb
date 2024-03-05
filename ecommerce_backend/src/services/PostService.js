const Post = require("../models/PostModel");
// const bcrypt = require("bcrypt");
const EmailService = require("./EmailService");
const createPost = (newPost) => {
  return new Promise(async (resolve, reject) => {
    const { title, content, likeCount, image } = newPost;
    try {
      const createPost = await Post.create({
        title,
        content,
        likeCount,
        image,
      });
      if (createPost) {
        resolve({
          status: "OK",
          message: "success",
          data: createPost,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};
const getAllPost = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const allPost = await Post.find();
      resolve({
        status: "OK",
        message: "success",
        data: allPost,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const deletePost = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkPost = await Post.findOne({
        _id: id,
      });
      if (checkPost === null) {
        resolve({
          status: "OK",
          message: "The user is not defined",
        });
      }
      await Post.findByIdAndDelete(id);

      resolve({
        status: "OK",
        message: "success",
      });
    } catch (e) {
      reject(e);
    }
  });
};

const updatePost = (id, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkPost = await Post.findOne({
        _id: id,
      });
      if (checkPost === null) {
        resolve({
          status: "OK",
          message: "The post is not defined",
        });
      }
      const updatePost = await Post.findByIdAndUpdate(id, data, {
        new: true,
      });
      resolve({
        status: "OK",
        message: "success",
        data: updatePost,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getDetailsPost = async (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const post = await Post.findOne({
        _id: id,
      });
      if (post === null) {
        resolve({
          status: "OK",
          message: "The post is not defined",
        });
      }
      resolve({
        status: "OK",
        message: "success",
        data: post,
      });
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  createPost,
  getAllPost,
  deletePost,
  updatePost,
  getDetailsPost,
};
