import { Router } from "express";
import handleValidationErrors from "../middlewares/handleValidationErrors";
import checkAuth from "../middlewares/checkAuth";
import { createPost, getAllPosts, getPostById, getPostsByUserId, publishPost } from "../controllers/posts.controller";
import { postCreateValidation, postIdValidation } from "../validations/post.validation";

const postsRouter = Router();

postsRouter.get('/', getAllPosts);
postsRouter.get('/user', checkAuth, getPostsByUserId);
postsRouter.get('/:id', postIdValidation, handleValidationErrors, getPostById);
postsRouter.put('/:id', checkAuth, postIdValidation, handleValidationErrors, publishPost);
postsRouter.post('/save', checkAuth, postCreateValidation, handleValidationErrors, createPost);

export default postsRouter;