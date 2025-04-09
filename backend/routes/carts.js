const express = require('express');
const router  = express.Router();
const {
    getCart,
    createCart,
    updateCart
}             = require('../controllers/cartsControllers');

const requireAuth = require('../middleware/requireAuth');

router.use(requireAuth);

//Get a cart by user_id:
router.get('/',getCart);

router.post('/',createCart);

router.patch('/',updateCart);

module.exports = router;