const env = process.env.NODE_ENV || 'development';
require('dotenv').config();
const mgPass = process.env.mgPass;
const mgdb = process.env.mgdb;

const config = {
    development: {
        port: process.env.PORT || 5000,
        dbURL: `mongodb+srv://kevinezzel92:${mgPass}@${mgdb}/?retryWrites=true&w=majority&appName=Capstone1`,
        authCookieName: 'x-auth-token'
    },
    production: {}
};

module.exports = config[env];