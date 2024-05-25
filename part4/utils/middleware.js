const logger = require('./logger')
const {verify} = require("jsonwebtoken");
const User = require("../models/user");
const {tryCatch} = require("./trycatch");
const {next} = require("lodash/seq");

const requestLogger = (request, response, next) => {
    logger.info('Method:', request.method)
    logger.info('Path:  ', request.path)
    logger.info('Body:  ', request.body)
    logger.info('---')
    next()
}

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
    logger.error(error.message)
    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    } else if (error.name === 'MongoServerError' && error.message.includes('E11000 duplicate key error')) {
        return response.status(400).json({error: 'expected `username` to be unique'})
    } else if (error.name ===  'JsonWebTokenError') {
        return response.status(401).json({error: 'token invalid'})
    }

    return response.status(400).json({error: error.message});
}

const tokenExtractor = (request, response, next) => {
    // code that extracts the token
    request.token = null;
    const authorization = request.get('authorization')
    if (authorization && authorization.startsWith('Bearer ')) {
        request.token = authorization.replace('Bearer ', '');
    }
    next()
}

const userExtractor = async (request, response, next) => {
    let decodedToken;
    try {
        decodedToken = verify(request.token, process.env.SECRET);
    } catch (e) {
        return next(e)
    }
    if (!decodedToken.id) {
        return response.status(401).json({error: 'token invalid'})
    }
    const user = await User.findById(decodedToken.id)
    if (!user) {
        return response.status(401).json({error: 'invalid token'});
    }
    // code that extracts the user
    request.user = user;
    next();
};

module.exports = {
    requestLogger,
    unknownEndpoint,
    errorHandler,
    tokenExtractor,
    userExtractor
}