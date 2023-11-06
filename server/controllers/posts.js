import PostMessage from "../models/postMessage.js";
import mongoose from "mongoose";

export const getPost = async (req, res) => {
  try {
    const postMessages = await PostMessage.find();
    res.status(200).json(postMessages);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createPost = async (req, res) => {
  const post = req.body;
  const newPost = new PostMessage(post);

  try {
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updatePost = async (req, res) => {
  const { id: _id } = req.params;
  const post = req.body;
  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send(`No post with id: ${_id}`);
  const updatedPost = await PostMessage.findByIdAndUpdate(_id, post, {
    new: true,
  });
  res.json(updatedPost);
};

export const deletePost = async (req, res) => {
  const { id: _id } = req.params;
  // 檢查該post id是否存在mongodb
  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send(`No post with id: ${_id}`);
  await PostMessage.findByIdAndRemove(_id);
  res.json({ message: "Post delete successfully" });
};

export const likePost = async (req, res) => {
  const { id: _id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send(`No post with id: ${_id}`);
  const post = await PostMessage.findById(_id);
  // 更新資料庫裡的按讚數(+1)
  // 要實現每個user只能按讚一次，那需要加上authentication 機制
  const updateLike = await PostMessage.findByIdAndUpdate(
    _id,
    {
      likeCount: post.likeCount + 1,
    },
    { new: true }
  );
  res.json(updateLike);
};
