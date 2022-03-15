const Blog = require("../models/Blog");
const User = require("../models/User");
const getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find({});
        res.json(blogs);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};


const getBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find({ user: req.user.id })
        res.status(200).json(blogs)
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const postBlog = async (req, res) => {
    if (!req.body.content) {
        res.status(400).json({ message: "Content is required" });
    }
    try {
        const blog = new Blog({
            user: req.user.id,
            name: req.body.name,
            content: req.body.content,
        });
        await blog.save();
        res.status(201).json(blog);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    getAllBlogs,
    getBlogs,
    postBlog,
};