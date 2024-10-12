const { createtransaction, findAlltransaction, findOnetransaction, updatetransaction, deletetransaction } = require('../controllers/transaction')
const { verifyToken } = require('../middleware/verifyToken')



const transactionRouter = require('express').Router()

transactionRouter.post(`/`,verifyToken, createtransaction)
transactionRouter.get('/', findAlltransaction)
transactionRouter.get('/:id', findOnetransaction)
transactionRouter.patch ('/:id', updatetransaction)
transactionRouter.delete('/:id', deletetransaction)

module.exports=transactionRouter