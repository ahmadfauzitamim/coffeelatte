const { createpromotions, findAllpromotions, findOnepromotions, updatepromotions,deletepromotions } = require('../controllers/promotions')
const upload = require('../middleware/upload')


const promotionsRouter = require('express').Router()


promotionsRouter.post('/',upload.single("image"), createpromotions)
promotionsRouter.get('/', findAllpromotions)
promotionsRouter.get('/:id', findOnepromotions)
promotionsRouter.patch ('/:id',upload.single("image"), updatepromotions)
promotionsRouter.delete('/:id', deletepromotions)
module.exports = promotionsRouter