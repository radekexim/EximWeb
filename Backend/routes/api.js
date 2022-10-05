const express = require('express');

const router = express.Router();

const authController = require('../controllers/api/authController');
const orderController = require('../controllers/api/orderController');
const productionController = require('../controllers/api/productionController');
const salesController = require('../controllers/api/salesController');
const transportController = require('../controllers/api/transportController');

router.get('/orders', orderController.showOrders);
router.get('/order', orderController.showOrder);
router.post('/getInformationTransport', orderController.getInformationTransportOrders);

router.get('/productionUnits', productionController.showProductionUnits);
router.get('/salesUnits', productionController.showSalesUnits);
router.get('/productionOrders', productionController.showProdcutionOrders);
router.get('/salesOrders', productionController.showSalesOrders);
router.get('/lastScans', productionController.showLastScans);

router.get('/salesVat', salesController.getSalesResultVat);
router.get('/salesWithoutVat', salesController.getSalesResultWithoutVat);

router.post('/login', authController.Login);
router.post('/register', authController.Register);
router.post('/updateUser', authController.UpdateUser);
router.post('/deleteUser', authController.DeleteUsers);
router.get('/accounts', authController.ShowUsers);

router.get('/showTransports', transportController.ShowTransports);
router.post('/addTransport', transportController.AddTransport);

module.exports = router;