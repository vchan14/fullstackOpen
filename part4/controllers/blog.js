const blogsRouter = require('express').Router()
const Blog = require("../models/blog");

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({});
    response.json(blogs);
})

blogsRouter.post('/', async (request, response) => {
    const body = request.body;
    const {title, author, url, likes} = body;
    const blog = new Blog({
        title: title,
        author: author,
        url: url,
        likes: likes
    })

    const savedBlog = await blog.save();
    response.status(201).json(savedBlog)
})

module.exports = blogsRouter