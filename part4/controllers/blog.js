const blogsRouter = require('express').Router()
const Blog = require("../models/blog");

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({});
    response.json(blogs);
})

blogsRouter.post('/', async (request, response) => {
    const body = request.body;
    const {title, author, url, likes} = body;

    // if url or title is missing, return 400 bad request
    if (!url || !title) {
        return response.status(400).json({error: 'title or url missing'})
    }

    const blog = new Blog({
        title: title,
        author: author,
        url: url,
        likes: likes || 0
    })
    const savedBlog = await blog.save();
    response.status(201).json(savedBlog)
})

module.exports = blogsRouter