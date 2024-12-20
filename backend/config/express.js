const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const secret = 'secret';

module.exports = (app) => {

    app.use(bodyParser.json({ limit: '100mb' })); 
    app.use(bodyParser.urlencoded({ limit: '100mb', extended: true })); 

    app.use(cookieParser(secret));
};
