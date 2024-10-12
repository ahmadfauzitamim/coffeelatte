const products = require('../models/products')
const authRouther = require('./auth')
const productRouter = require('./products')
const promotionsRouter = require('./promotions')
const transactionRouter = require('./transaction')
const userRouter = require('./user')

const route = require('express').Router()



route.use('/product', productRouter)
route.use(`/user`, userRouter)
route.use(`/transaction`,transactionRouter)
route.use("/promotions", promotionsRouter)
route.use("/auth", authRouther)


module.exports = route