const controllers = require('../controllers/index');
const router = require('express').Router();
const auth = require("../utils/auth")

router.get('/', (req, res) => {
    res.send('Welcome to the Home API!');
});

router.get("/user",auth(),controllers.user.get);

router.post('/register', controllers.user.post.register);

router.post('/login', controllers.user.post.login);

router.post('/logout',auth(), controllers.user.post.logout);

router.delete('/:id',auth(), controllers.user.delete);

module.exports = router;