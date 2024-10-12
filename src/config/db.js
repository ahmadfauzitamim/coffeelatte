 const {config} = require ('dotenv')
 config()
//  const dotenv = require("dotenv")
//  dotenv.config()
 const { Sequelize } = require("sequelize");
 const pg = require("pg")
//  console.log(process.env.DB_USERNAME);
 
// const db = new Sequelize(`${process.env.POSTGRES_DATABASE}`, `${process.env.POSTGRES_USER}`, `${process.env.POSTGRES_PASSWORD}`, {
//     dialect : 'postgres',
//     port : 5432,
//     dialectModule: pg

// })
const db = new Sequelize(`${ process.env.DATABASE_URL}` , {
    dialect : 'postgres',
    dialectModule : pg
})
module.exports = db