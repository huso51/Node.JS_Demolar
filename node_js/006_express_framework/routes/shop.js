const express = require('express');
const router = express.Router();

const shopController = require('../controllers/shop');
const isAuthenticated = require('../middleware/authentication');
const locals = require('../middleware/locals');

router.get('/', locals, shopController.getIndex);

router.get('/products', locals, locals, shopController.getProducts);

router.get('/products/:productid', locals, isAuthenticated, shopController.getProduct);

router.get('/categories/:categoryid', locals, shopController.getProductsByCategoryId);

router.get('/card', isAuthenticated, locals, shopController.getCard);

router.post('/card', locals, isAuthenticated, shopController.postCard);

router.post('/delete-carditem', locals, isAuthenticated, shopController.postCardItemDelete);

router.get('/orders', locals, isAuthenticated, shopController.getOrders);

router.post('/create-order', locals, isAuthenticated, shopController.postOrder);

module.exports = router;