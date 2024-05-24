const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

/**
 * GET APIs
 */
usersRouter.get('/', async (request, response) => {
    const users = await User.find({});
    response.json(users);
})


/**
 * POST APIs
 */
usersRouter.post('/', async (request, response) => {
    const { username, name, password } = request.body

    // Both username and password must be given and both must be at least 3 characters long.
    if (!password || password.length < 3) {
        return response.status(400).json({ error: 'password must be at least 3 characters long' })
    }
    if (!username || username.length < 3) {
        return response.status(400).json({ error: 'username must be at least 3 characters long' })
    }
    // The username must be unique.
    const existing = await User.find({ username: username })
    if (existing.length > 0) {
        return response.status(400).json({ error: `username (${username}) is already exist.`})
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({
        username,
        name,
        passwordHash,
    })

    const savedUser = await user.save()

    response.status(201).json(savedUser)
})

module.exports = usersRouter;