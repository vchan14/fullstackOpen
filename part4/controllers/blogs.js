const blogsRouter = require('express').Router()
const Blogs = require("../models/blog");
const User = require("../models/user");
const {verify} = require("jsonwebtoken");
const {tryCatch} = require("../utils/trycatch");
const middleware = require("../utils/middleware");


blogsRouter.get('/me', tryCatch(async (request, response) => {
    throw new Error("This is an error")
    response.send('hello world');
}));


/******************************************************
 * GET APIs
 * *****************************************************
 */
blogsRouter.get('/', tryCatch(async (request, response) => {
    const blogs = await Blogs.find({}).populate('user', {username: 1, name: 1})
    response.json(blogs);
}))

blogsRouter.get('/:id', tryCatch(async (request, response) => {
    const blog = await Blogs.findById(request.params.id)
    if (blog) {
        response.json(blog)
    } else {
        response.status(404).end()
    }
}))


/********************************************************
 * Post APIs
 * *****************************************************
 */

blogsRouter.post('/', middleware.userExtractor, tryCatch(async (request, response) => {

    const {title, author, url, likes} = request.body;
    // if url or title is missing, return 400 bad request
    if (!url || !title) {
        return response.status(400).json({error: 'title or url missing'})
    }
    const user = request.user;
    const blog = new Blogs({
        title: title,
        author: author,
        url: url,
        likes: likes || 0,
        user: user._id
    })
    const savedBlog = await blog.save();
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.status(201).json(savedBlog)
}))


/********************************************************
 * Put APIs
 * *****************************************************
 */

blogsRouter.put('/:id', middleware.userExtractor, tryCatch(async (request, response) => {
    const body = request.body;
    const currentBlog = await Blogs.findById(request.params.id);
    const {title, author, url, likes} = body;
    // if the field is not provided, use the current value
    const blog = {
        title: title || currentBlog.title,
        author: author || currentBlog.author,
        url: url || currentBlog.url,
        likes: likes || currentBlog.likes
    }
    const updatedBlog = await Blogs.findByIdAndUpdate(request.params.id, blog, {new: true})
    response.json(updatedBlog);
}))

/********************************************************
 * Delete APIs
 * *****************************************************
 */
blogsRouter.delete('/:id', middleware.userExtractor, tryCatch(async (request, response) => {
    const blog = await Blogs.findById(request.params.id);
    if (!blog) {
        return response.status(404).json({error: 'blog not found'})
    }
    if (blog.user.toString() !== request.user._id.toString()) {
        return response.status(401).json({error: 'unauthorized to delete this blog'})
    }
    await Blogs.findByIdAndDelete(request.params.id)
    response.status(204).end()
}))


module.exports = blogsRouter