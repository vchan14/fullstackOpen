const blogsRouter = require('express').Router()
const Blogs = require("../models/blog");
const User = require("../models/user");
const {verify} = require("jsonwebtoken");

const getTokenFrom = request => {
    const authorization = request.get('authorization')
    if (authorization && authorization.startsWith('Bearer ')) {
        return authorization.replace('Bearer ', '')
    }
    return null
}


/******************************************************
 * GET APIs
 * *****************************************************
 */
blogsRouter.get('/', async (request, response) => {
    const blogs = await Blogs.find({}).populate('user', {username: 1, name: 1})
    response.json(blogs);
})

blogsRouter.get('/:id', async (request, response) => {
    const blog = await Blogs.findById(request.params.id)
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

blogsRouter.post('/', async (request, response, next) => {
    const body = request.body;
    let decodedToken;
    try {
        decodedToken = verify(getTokenFrom(request), process.env.SECRET)
    } catch (e) {
        return next(e)
    }
    if (!decodedToken.id) {
        return response.status(401).json({ error: 'token invalid' })
    }
    const user = await User.findById(decodedToken.id)

    const {title, author, url, likes} = body;

    // if url or title is missing, return 400 bad request
    if (!url || !title) {
        return response.status(400).json({error: 'title or url missing'})
    }

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
})


/********************************************************
 * Put APIs
 * *****************************************************
 */

blogsRouter.put('/:id', async (request, response) => {
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
})

/********************************************************
 * Delete APIs
 * *****************************************************
 */
blogsRouter.delete('/:id', async (request, response) => {
    await Blogs.findByIdAndDelete(request.params.id)
    response.status(204).end()

})


module.exports = blogsRouter