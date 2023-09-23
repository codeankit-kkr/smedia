import express from 'express';
import { addBlog, deleteBlog, getAllBlogs, getBlogbyId, getByUserId, updateBlog } from '../controllers/blog-controller';

export const blogRouter = express.Router();

blogRouter.get("/", getAllBlogs);

blogRouter.post("/add", addBlog);

blogRouter.put("/update/:id", updateBlog)

blogRouter.get("/:id", getBlogbyId);

blogRouter.delete("/:id", deleteBlog);

blogRouter.get("/user/:id", getByUserId);