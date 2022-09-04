var express = require('express');
var controller = require('./controller');
var router = express.Router();
var bodyParser = require('body-parser')
router.use(bodyParser.json());


router.route('/productlist')
    .get(controller.getProductList)

router.route('/placeorder')
    .post(controller.placeOrder)

module.exports = router;