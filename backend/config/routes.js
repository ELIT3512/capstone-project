// const { auth } = require('../utils/index');
const router = require('../routes/index.js');

module.exports = (app) => {

    app.use('/api/user', router.user);

    app.use('/api/claim',router.claim);

    app.use((err, req, res, next) => {
        console.error(err.stack);
        res.status(500).json({ message: 'Internal Server Error', error: err.message });
    });
    

    app.use('*', (req, res, next) => res.send('<h1> Something went wrong. Try again. :thumbsup: </h1>'))
};