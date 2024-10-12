// const { types } = require("pg");
const { DataTypes } = require("sequelize");
const db = require("../config/db");



const promotions = db.define('promotion',{
    id : {
        type : DataTypes.INTEGER,
        autoIncrement : true,
        allowNull : false,
        primaryKey : true
    },
    productName : {
        type : DataTypes.STRING
    },
    image : {
        type : DataTypes.STRING
    },
    description :{
        type : DataTypes.STRING
    },
    cuponcode : {
     type   : DataTypes.STRING
    },
},{
    timestamps : true
})
module.exports = promotions