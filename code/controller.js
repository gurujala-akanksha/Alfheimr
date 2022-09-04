const { Op } = require('sequelize');
var db = require('../db')
var bcrypt;
try { bcrypt = require('bcrypt'); }
catch (e) { bcrypt = require('bcryptjs'); }

module.exports = {
    getProductList,
    placeOrder
}

async function getProductList(req, res) {
    let productlist = await db.products.findAll({
        where: {
            category_id: {
                [Op.ne]: 3
            }
        },
        include: [
            {
                model: db.category,
                attibutes: ['name']
            }
        ]
    })
    console.log(productlist)
    let firstGroup = []
    let secondGroup = []
    for (let i = 0; i < productlist.length; i++) {
        if (productlist[i].dataValues.price < 1000) {
            let obj = productlist[i]
            firstGroup.push(obj)
        }
        else {
            let obj = productlist[i]
            secondGroup.push(obj)
        }
    }
    res.json({ firstGroup: firstGroup, secondGroup: secondGroup })
}

async function placeOrder(req, res) {
    return db.sequelize.transaction(t => {
        let orderData = {
            customer_id: req.body.customer_id,
            order_status_id: 1,
            payment_id: req.body.payment_id,
            address_id: req.body.address_id,
            product_id: req.body.product_id,
            placed_at: new Date(),
            updated_at: new Date()
        }
        return db.order.create(orderData, { transaction: t })
    }).then(result => {
        res.status(200)
        res.send(result)
    })
        .catch(err => {
            console.log(err)
            console.log
            res.status(500);
            res.send('unsuccessful');
        })
}