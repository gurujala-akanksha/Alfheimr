var Sequelize = require('sequelize')
var fs = require("fs")
var path = require("path")


var dev = {
	connectionLimit: 10,
	host: 'localhost',
	user: 'root',
	password: 'root',
	database: 'alfheimr',
	waitForConnection: true
}


var mysql = dev


const sequelize = new Sequelize(mysql.database, mysql.user, mysql.password, {
	host: mysql.host,
	port: 3306,
	dialect: 'mysql',
	define: {
		underscored: true,
		freezeTableName: true, //use singular table name
		timestamps: false  // I don't want timestamp fields by default
	},
	dialectOptions: {
		useUTC: false, //for reading from database
		dateStrings: true,
		// typeCast: true

		typeCast: function (field, next) { // for reading from database
			if (field.type === 'DATETIME') {
				return field.string()
			}
			return next()
		},
	},
	timezone: '+05:30'
})



const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize



function requireModel(Model) {
	return require("./models/" + Model)(sequelize, Sequelize)
}
const model = path.resolve(__dirname, './models/');

fs.readdirSync(model).forEach(file => {
	file = file.slice(0, -3) // this will remove .js extension
	db[file] = requireModel(file)
})
db.products.belongsTo(db.category)
db.order.belongsTo(db.order_status)
db.order.belongsTo(db.customer)
db.order.belongsTo(db.payment_method)
db.order.belongsTo(db.products)
db.order.hasMany(db.adress)
module.exports = db;