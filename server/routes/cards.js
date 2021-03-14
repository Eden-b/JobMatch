const router = require('express').Router();
const {
  createCard,
  getAllCards,
  getCardById,
  deleteCardById,
  updateCard,
  getUserCards,
  editCard,
  getComments,
  createCardComments,
  getCardComments,
  addCardToFavorite,
  deleteCardFromFavorite,
  getUserCardsFavorite,
  searchCard,
} = require('../controllers/cards');

const auth = require('../middlewares/auth');
module.exports = router;

router.get('/user', auth, getUserCards);
router.get('/favorite', auth, getUserCardsFavorite);
router.get('/search', searchCard);
router.get('/:cardId', getCardById);
router.post('/:cardId/favorite', auth, addCardToFavorite);
router.delete('/:cardId', auth, deleteCardById);
router.delete('/:cardId/favorite', auth, deleteCardFromFavorite);
router.put('/:cardId', auth, updateCard);
router.patch('/:cardId', editCard);
router.get('/', getAllCards);
router.post('/', auth, createCard);
