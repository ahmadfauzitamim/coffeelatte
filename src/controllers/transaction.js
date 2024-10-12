// // const { Transaction, Op } = require("sequelize");
// const { Op } = require("sequelize");
// const transaction = require("../models/transaction");
// const Users = require("../models/user");
// const products = require("../models/products");
// const transactions = require("../models/transaction");
// const transactions = require("../models/transaction");
const products = require("../models/products")
const transaction = require("../models/transaction")
const Users = require("../models/user")





const createtransaction = async (req, res) => {
    try {
        const {id} = req.payload
        const {product_id, payment_method, delivery_cost} = req.body
        const User = await Users.findByPk(id)
        if (!User){
            return res.status(404).json({msg : "User not found"})
        }
        const product = await products.findOne({
            where : {
                id : product_id
            }
        })
        if (!product){
            return res.status(404).json({msg : "product not found"})
        }
        const priceProduct = product.getDataValue("price")
        const amount = priceProduct + Number(delivery_cost)
        const data = await transaction.create ({
            User_id : id,
            payment_method,
            delivery_cost,
            product_id,
            amount,
            status : "PENDING"
        })
        res.status(201).json({
            msg : 'Success Create transaction', data})
    } catch (error) {
        console.log(error);
        res.status(400).json({
            msg: 'internal server error',
            error,
        })
    }
}

const findOnetransaction = async (req, res) => {
    try {
        const {id} = req.params
        const data = await transaction.findByPk(id, {
           include : [
                {
                    model : products,
                    as : 'product'
                },
                {
                    model : Users,
                    as : 'user',
                    attributes : ["name", "email", "role"]
                }
           ]
        })
        if (!data){
            return res.status(404).json({msg : "transaction not found"})
        }
        res.status(200).json({msg : "success find one transaction", data})
    } catch (error) {
        console.log({error});
        res.status(500).json({msg :'internal server error', error})
    }
}

const findAlltransaction = async (req, res) => {
    const {search, orderBy, sortBy, limit, page} = req.query
    const offset = ((page - 1) * limit )
    let where = {}
    let order = []
    if (search) {
        where = {
            productName : { [Op.iLike]: "%" + search + "%" }
        }
    }
    if (orderBy && sortBy) {
        order = [[orderBy, `${sortBy}`]];
    }
    try {
        const data = await transaction.findAll({
            where,
            order,
            limit,
            offset
        })
        res.status(200).json({
            msg: 'success find All transaksi',
            data: data
        })
    } catch (error) {
        console.log({ error });
        res.status(500).json({error})

    }
}
// const findOnetransaction = async (req, res) => {
//     try {
//         const { id } = req.params
//         const trans = await transaction.findByPk(id)
//         res.status(200).json(trans)
//     } catch (error) {
//         console.log({error});
//         res.status(500).json({error})
//     }
// }
const updatetransaction = async (req, res) => {
    try {
        const { id } = req.params
        const {product_id, user_id, payment_method, delivery_cost, amount} = req.body
        const trans = await transaction.findByPk(id)
        if (!trans) {
            return res.status(404).json({ msg: 'transaksi not found' })
        }
        await trans.update({product_id, user_id, payment_method, delivery_cost, amount})
        await trans.save()
        res.status(200).json({ msg : " transaksi terupdate", trans })
    } catch (error) {
        console.log({ error });
        res.status(500).json({ error })
    }
}
const deletetransaction = async (req, res) => {
    try {
        const { id } = req.params
        const trans = await transaction.findByPk(id)
        if (!trans) {
            return res.status(404).json({ msg: 'transaction not found' })
        }
        await trans.destroy()
        await trans.save()
        res.status(200).json({
            msg : "success delete transaction", trans
        })
    } catch (error) {
        console.log({error});
        res.status(500).json({error})
        
    }
}
module.exports = {
    createtransaction,
    findAlltransaction,
    findOnetransaction,
    updatetransaction,
    deletetransaction
    
}