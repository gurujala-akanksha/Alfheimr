var DataTypes = require("sequelize").DataTypes;
var _adress = require("./adress");
var _category = require("./category");
var _customer = require("./customer");
var _order = require("./order");
var _order_status = require("./order_status");
var _payment_method = require("./payment_method");
var _products = require("./products");

function initModels(sequelize) {
  var adress = _adress(sequelize, DataTypes);
  var category = _category(sequelize, DataTypes);
  var customer = _customer(sequelize, DataTypes);
  var order = _order(sequelize, DataTypes);
  var order_status = _order_status(sequelize, DataTypes);
  var payment_method = _payment_method(sequelize, DataTypes);
  var products = _products(sequelize, DataTypes);

  order.belongsTo(adress, { as: "address", foreignKey: "address_id"});
  adress.hasMany(order, { as: "orders", foreignKey: "address_id"});
  products.belongsTo(category, { as: "category", foreignKey: "category_id"});
  category.hasMany(products, { as: "products", foreignKey: "category_id"});
  order.belongsTo(customer, { as: "customer", foreignKey: "customer_id"});
  customer.hasMany(order, { as: "orders", foreignKey: "customer_id"});
  order.belongsTo(order_status, { as: "order_status", foreignKey: "order_status_id"});
  order_status.hasMany(order, { as: "orders", foreignKey: "order_status_id"});
  order.belongsTo(payment_method, { as: "payment", foreignKey: "payment_id"});
  payment_method.hasMany(order, { as: "orders", foreignKey: "payment_id"});
  order.belongsTo(products, { as: "product", foreignKey: "product_id"});
  products.hasMany(order, { as: "orders", foreignKey: "product_id"});

  return {
    adress,
    category,
    customer,
    order,
    order_status,
    payment_method,
    products,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
