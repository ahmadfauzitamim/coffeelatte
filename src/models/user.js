const { DataTypes } = require("sequelize")
const db = require("../config/db")




const Users = db.define ("Users",{
    id : {
        type : DataTypes.INTEGER,
        autoIncrement :true,
        allowNull : false,
        primaryKey:true
    },
    name : {
        type : DataTypes.STRING
    },
    addres : {
        type : DataTypes.STRING
    },
    email : {
        type : DataTypes.STRING
    },
    password : {
        type : DataTypes.STRING
    },
    number : {
        type : DataTypes.STRING
    },
    image :{
        type : DataTypes.STRING
    },
    role : {
        type : DataTypes.STRING
    }

}, {
    timestams : true
// }, {
//     tableName : "Users"
})
// db.sync({force : true})
module.exports = Users