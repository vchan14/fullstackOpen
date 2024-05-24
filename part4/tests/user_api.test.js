const {test, describe, after} = require('node:test');
const supertest = require('supertest')
const app = require('../app')
const mongoose = require("mongoose");

const api = supertest(app);

describe.only('POST APIs', () => {
    test.only('should return 400 if username is less than 3 characters', async () => {
        const newUser = {
            username: 'ab',
            name: 'test',
            password: 'password'
        };
        await api
            .post('/api/users')
            .send(newUser)
            .expect(400);
    });

    test.only('should return 400 if password is less than 3 characters', async () => {
        const newUser = {
            username: 'test',
            name: 'test',
            password: 'ab'
        };
        await api
            .post('/api/users')
            .send(newUser)
            .expect(400);
    });
});

after(async () => {
    await mongoose.connection.close()
})