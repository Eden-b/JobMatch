const router = require('express').Router();
const {
  getComments,
  createCardComments,
  getCardComments,
} = require('../controllers/comments');

router.get('/', getComments);
router.get('/:cardId', getCardComments);
router.post('/:cardId', createCardComments);

module.exports = router;
