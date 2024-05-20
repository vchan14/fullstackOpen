const { test, after, describe, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require("../models/blog");
const assert = require("assert");

const api = supertest(app)

// initialize the database with blog objects that has title, author, url, and likes.
const initialBlogs =  [
    {
        title: 'React patterns',
        author: 'Michael Chan',
        url: 'https://reactpatterns.com/',
        likes: 7
    },
    {
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5
    }
]

beforeEach(async () => {
    await Blog.deleteMany({})
    for (let blog of initialBlogs) {
        let blogObject = new Blog(blog)
        await blogObject.save()
    }
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
        assert.strictEqual(response.body.length, initialBlogs.length)
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
        assert.strictEqual(response.body.length, initialBlogs.length + 1)
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





after(async () => {
    await mongoose.connection.close()
})