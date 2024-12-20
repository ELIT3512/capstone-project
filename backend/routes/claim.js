const controllers = require('../controllers/index');
const router = require('express').Router();
const  auth  = require('../utils/auth');

router.get('/',auth(), controllers.claim.get);

router.get('/:id', auth(), controllers.claim.getById);

router.post('/createClaim', auth(), controllers.claim.post.createClaim);

router.put('/:id', auth(), controllers.claim.put);

router.delete('/:id', auth(), controllers.claim.delete);

module.exports = router;