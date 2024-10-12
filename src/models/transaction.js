const {DataTypes} = require('sequelize')
const db = require('../config/db')
const Users = require('./user')
const products = require('./products')

const transaction = db.define('transaction',{
    id : {
        type : DataTypes.INTEGER,
        autoIncrement : true,
        allowNull : false,
        primaryKey : true
    },
    user_id : {
        type : DataTypes.INTEGER
    },
    product_id : {
        type : DataTypes.INTEGER,
        references : {
            model : products,
            key : "id"
        }
    },
    payment_method: {
        type : DataTypes.STRING
    },
    delivery_cost : {
        type : DataTypes.INTEGER
    },
    amount : {
        type : DataTypes.INTEGER
    },
   status : {
    type : DataTypes.STRING
   }
},{
    timestamps : true
})

module.exports = transaction

transaction.belongsTo(Users, {foreignKey : "user_id", as : "user"})
transaction.belongsTo(products, {foreignKey : "product_id", as : "product"})
Users.hasMany(transaction, {foreignKey : "id"})
products.hasMany(transaction, {foreignKey : "id"})