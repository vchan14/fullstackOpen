const blogsRouter = require('express').Router()
const Blog = require("../models/blog");


/******************************************************
 * GET APIs
 * *****************************************************
 */
blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({});
    response.json(blogs);
})

blogsRouter.get('/:id', async (request, response) => {
    const blog = await Blog.findById(request.params.id)
    if (blog) {
        response.json(blog)
    } else {
        response.status(404).end()
    }
})


/********************************************************
 * Post APIs
 * *****************************************************
 */

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


/********************************************************
 * Put APIs
 * *****************************************************
 */

blogsRouter.put('/:id', async (request, response) => {
    const body = request.body;
    const currentBlog = await Blog.findById(request.params.id);
    const {title, author, url, likes} = body;
    // if the field is not provided, use the current value
    const blog = {
        title: title || currentBlog.title,
        author: author || currentBlog.author,
        url: url || currentBlog.url,
        likes: likes || currentBlog.likes
    }
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {new: true})
    response.json(updatedBlog);
})

/********************************************************
 * Delete APIs
 * *****************************************************
 */
blogsRouter.delete('/:id', async (request, response) => {
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()

})


module.exports = blogsRouter