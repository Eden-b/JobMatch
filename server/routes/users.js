const router = require('express').Router();
const { createUser, getAllUsers } = require('../controllers/users');
const auth = require('../middlewares/auth');

router.post('/', createUser);
router.get('/', auth, getAllUsers);


module.exports = router;
