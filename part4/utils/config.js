const path = require('path');
const configPath = path.resolve(__dirname);
const envPath = path.resolve(configPath, '../.env');
require("dotenv").config({path: envPath});

const isTest = 'test' || process.env.NODE_ENV;

const PORT = process.env.PORT
const MONGODB_URI = isTest === 'test'
    ? process.env.TEST_MONGODB_URI
    : process.env.MONGODB_URI
const SECRET = process.env.SECRET

module.exports = {
    MONGODB_URI,
    PORT,
    SECRET
}