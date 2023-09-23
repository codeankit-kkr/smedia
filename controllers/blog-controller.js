import mongoose from "mongoose";
import Blog from "../model/Blog";
import User from "../model/User";


export const getAllBlogs = async (req, res, next) => {
    let blogs;
    try {
        blogs = await Blog.find();
    } catch (er) {
        return console.log(er);
    }
    if (!blogs) {
        return res.status(404).json({ message: "No blogs found." });
    }
    return res.status(200).json({ blogs })
}

export const addBlog = async (req, res, next) => {
    let { title, description, image, user } = req.body;
    let existinguser;
    try {
        existinguser = await User.findById(user);
    }
    catch (er) {
        return console.log(er);
    }
    if (!existinguser) {
        return res.status(400).json({ "message": "Unable to find a user with this id." });
    }
    const newBlog = new Blog({
        title, description, image, user
    })
    try {
        const session = await mongoose.startSession();
        session.startTransaction();
        await newBlog.save({ session });
        existinguser.blogs.push(newBlog);
        await existinguser.save({ session });
        await session.commitTransaction();
    } catch (err) {
        return console.log(err);

    }
    return res.status(200).json({ newBlog });
}

export const updateBlog = async (req, res, next) => {
    let { title, description } = req.body;
    let blogid = req.params.id;
    let blog;
    try {
        blog = await Blog.findByIdAndUpdate(blogid, {
            title,
            description
        });
    }
    catch (err) {
        return console.log(err);
    }
    if (!blog) {
        return res.status(500).json({ message: "Unable to update the blog." });
    }
    return res.status(200).json({ blog })

}

export const getBlogbyId = async (req, res, next) => {
    let blogid = req.params.id;
    let blog;
    try {
        blog = await Blog.findById(blogid);
    }
    catch (err) {
        return console.log(err);
    }
    if (!blog) {
        return res.status(500).json({ message: "Not found a blog by this id" });
    }
    return res.status(200).json({ blog });
}

export const deleteBlog = async (req, res, next) => {
    let blogid = req.params.id;
    let blog;
    try {
        blog = await Blog.findByIdAndDelete(blogid).populate("user");
        await blog.user.blogs.pull(blog);
        await blog.user.save();
    }
    catch (er) {
        return console.log(er);
    }
    if (!blog) {
        return res.status(500).json({ message: "Unable to delete." });
    }
    return res.status(200).json({ "message": "Deleted Successfully" });
}

export const getByUserId = async (req, res, next) => {
    const userId = req.params.id;
    let userBlogs;
    try {
        userBlogs = await User.findById(userId).populate("blogs");
    }
    catch (er) {
        return console.log(er);
    }
    if (!userBlogs) {
        return res.status(404).json({ message: "No Blog Found" });
    }
    return res.status(200).json({ blogs: userBlogs })
}