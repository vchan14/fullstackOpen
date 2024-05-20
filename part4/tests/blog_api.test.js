const { test, after, describe, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require("../models/blog");
const assert = require("assert");
const helper = require('./test_helper')

const api = supertest(app)

beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
})

describe('when there is initially some initialBlogs saved', () => {
    test('Blogs are returned as json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('All initialBlogs are returned', async () => {
        const response = await api.get('/api/blogs')
        assert.strictEqual(response.body.length, helper.initialBlogs.length)
    })

    test('the first blog title React patterns', async () => {
        const response = await api.get('/api/blogs')
        const contents = response.body.map(e => e.title)
        assert(contents.includes('React patterns'))
    })

    test('blog contain id property and not _id', async () => {
        const response = await api.get('/api/blogs');
        const firstBlog = response.body[0];
        assert.strictEqual(firstBlog.hasOwnProperty('id'), true);
        assert.strictEqual(firstBlog.hasOwnProperty('_id'), false);
    })
})

describe('addition of a new blog', () => {
    test('a valid blog can be added', async () => {
        const newBlog = {
            title: 'Type wars',
            author: 'me',
            url: 'https://me.com',
            likes: 10
        }
        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)
        const response = await api.get('/api/blogs')
        const contents = response.body.map(e => e.title)
        assert(contents.includes('Type wars'));
        assert.strictEqual(response.body.length, helper.initialBlogs.length + 1)
    })
    test('if likes property is missing, it will default to 0', async () => {
        const missingLikesBlog = {
            title: 'unknown blog',
            author: 'me',
            url: 'https://me.com',
        }
        await api
            .post('/api/blogs')
            .send(missingLikesBlog)
            .expect(201)
        const response = await api.get('/api/blogs')
        const lastBlog = response.body[response.body.length - 1]
        assert.strictEqual(lastBlog.likes, 0)
    });
    test('if title is missing, return 400 bad request', async () => {
        const missingUrlBlog = {
            title: 'missing url',
            author: 'me'
        }
        await api
            .post('/api/blogs')
            .send(missingUrlBlog)
            .expect(400)

    })

    test('if url is missing, return 400 bad request', async () => {
        const missingTitleBlog = {
            url: 'https://me.com',
            author: 'me'
        }
        await api
            .post('/api/blogs')
            .send(missingTitleBlog)
            .expect(400)
    })
})

describe('deletion of a blog', () => {
    test('a blog can be deleted', async () => {
        const response = await api.get('/api/blogs')
        const blogToDelete = response.body[0]
        await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .expect(204)
        const newBlogs = await api.get('/api/blogs')
        assert.strictEqual(newBlogs.body.length, helper.initialBlogs.length - 1)
        const contents = newBlogs.body.map(e => e.title)
        assert(!contents.includes(blogToDelete.title))
    })

})

describe('a blog can be updated', () => {
    test('update a blog number of likes by one ', async () => {
        const blogs = await api.get('/api/blogs');
        const firstBlog = blogs.body[0];
        const updatedBlog = {
            likes: firstBlog.likes + 1
        }
        await api
            .put(`/api/blogs/${firstBlog.id}`)
            .send(updatedBlog)
            .expect(200)
        const newBlogs = await api.get('/api/blogs');
        const updatedFirstBlog = newBlogs.body[0];
        assert.strictEqual(updatedFirstBlog.likes, firstBlog.likes + 1)
    })

})





after(async () => {
    await mongoose.connection.close()
})