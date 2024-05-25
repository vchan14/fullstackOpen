const path = require('path');
const configPath = path.resolve(__dirname);
const envPath = path.resolve(configPath, '../.env');
require("dotenv").config({path: envPath});

const isTest = 'test' || process.env.NODE_ENV;
const isLocalDb = true;

let MONGODB_URI = null;
if (isLocalDb) {
    MONGODB_URI = isTest === 'test'
    ? process.env.LOCAL_MONGODB_URI
    : process.env.LOCAL_MONGODB_URI_TEST
} else {
    MONGODB_URI = isTest === 'test'
    ? process.env.TEST_MONGODB_URI
    : process.env.MONGODB_URI
}

const SECRET = process.env.SECRET
const PORT = process.env.PORT

module.exports = {
    MONGODB_URI,
    PORT,
    SECRET
}