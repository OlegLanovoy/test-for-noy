import { Request, Response } from "express";
import PostModel from "../models/post.model";
import { fetchToHuggingFace } from "../services/AI.service";
import redis from "../config/redis";


export const getPostsByUserId = async (req: Request, res: Response) => {
  try {
    const posts = await PostModel.find({ user: req.userId });
    if (posts.length === 0) {
      res.status(404).json({ error: { message: 'Posts not found' } });
    } else {
      res.status(200).json(posts);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: { message: 'Failed to fetch posts', }
    });
  }
}

export const getAllPosts = async (_req: Request, res: Response) => {
  try {
    const posts = await PostModel.find({ isPublished: true }).populate('user').lean();
    if (posts.length === 0) {
      res.status(404).json({ error: { message: 'Published posts not found' } });
    } else {
      res.status(200).json(posts);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: { message: 'Failed to fetch posts', }
    });
  }
}

export const getPostById = async (req: Request, res: Response) => {
  try {
    const postId = req.params.id;
    const post = await PostModel.findById(postId).populate('user').lean();
    if (!post) {
      res.status(404).json({
        error: {
          message: 'Post not found'
        }
      })
    } else {
      res.status(200).json(post);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: {
        message: 'Failed to fetch posts',
      }
    });
  }
}

export const generatePost = async (req: Request, res: Response) => {
  const { prompt } = req.body;
  if (!prompt) {
    res.status(400).json({ error: { message: 'prompt is required' } });
  } else {
    const key = `gen:${prompt.trim().toLowerCase()}`;
    try {
      const cached = await redis.get(key);
      if (cached) {
        res.status(200).json({ generatedPost: cached });
      } else {
        const post = await fetchToHuggingFace(prompt);
        await redis.set(key, post, 'EX', 600);
        res.status(200).json({ generatedPost: post });
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({
        error: {
          message: 'Failed to fetch posts',
        }
      });
    }
  }
}

export const createPost = async (req: Request, res: Response) => {
  try {
    const post = await PostModel.create({ ...req.body, user: req.userId });
    res.status(201).json(post);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: {
        message: 'Failed to create post',
      }
    });
  }
};


export const publishPost = async (req: Request, res: Response) => {
  try {
    const postId = req.params.id;
    await PostModel.findByIdAndUpdate(postId, { isPublished: true });
    res.status(200).json({ message: 'Post published successfully' });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: {
        message: 'Failed to publish post',
      }
    });
  }
}