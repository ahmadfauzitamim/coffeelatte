// const { findOneProduct, deleteProduct } = require('../controllers/products')
const { createuser, findOneuser, updateuser,deleteuser, findAllUsers } = require('../controllers/user')
const upload = require('../middleware/upload')

const { verifyToken } = require('../middleware/verifyToken')



const userRouter = require('express').Router()

userRouter.post(`/`, createuser)
userRouter.get(`/`, findAllUsers)
userRouter.get('/profile',verifyToken, findOneuser)
userRouter.patch ('/:id',upload.single("image"),updateuser)
userRouter.delete ('/:id',deleteuser)
module.exports = userRouter