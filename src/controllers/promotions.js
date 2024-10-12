const { Op } = require("sequelize");
const promotions = require("../models/promotion");




const createpromotions = async (req, res) => {
    try {
        const {productName, description, cuponcode, image} = req.body

        const file = req.file ? req.file?.path : null

        const data = await promotions.create({
            productName: productName,
            image : file,
            description: description,
            cuponcode: cuponcode,
        })
        res.status(201).json({
            msg: 'success create promo',
            data
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({
            msg: 'failed create promo',
            error,
        })
    }
}
const findAllpromotions = async (req, res) => {
    const {search, orderBy, sortBy, limit, page} = req.query
    const offset = ((page - 1) * limit)
    let where = {}
    let order =[]
    if (search) {
        where = {
            productName: { [Op.iLike]: "%" + search + "%" }
        }
    }
    if (orderBy && sortBy) {
        order = [[orderBy, `${sortBy}`]]
    }
    try {
        const data = await promotions.findAll({
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
        res.status(500).json({ error })

    }
}
const findOnepromotions = async (req, res) => {
    try {
        const { id } = req.params
        const promo = await promotions.findByPk(id)
        res.status(200).json(promo)
    } catch (error) {
        console.log({ error });
        res.status(500).json({ error })
    }
}

const updatepromotions = async (req, res) => {
    try {
        const { id } = req.params
        const { name, description, cuponcode, image } = req.body
        const promo = await promotions.findByPk(id)
        if (!promo) {
            return res.status(404).json({ msg: 'promo not found' })
        }
        await promo.update({ name, description, cuponcode, image })
        await promo.save()
        res.status(200).json({ msg: " promotion terupdate", promo })
    } catch (error) {
        console.log({ error });
        res.status(500).json({ error })
    }
}
const deletepromotions = async (req, res) => {
    try {
        const { id } = req.params
        const promo = await promotions.findByPk(id)
        if (!promo) {
            return res.status(404).json({ msg: 'promotion not found' })
        }
        await promo.destroy()
        await promo.save()
        res.status(200).json({
            msg: "success delete promotion", promo
        })
    } catch (error) {
        console.log({ error });
        res.status(500).json({ error })

    }
}
module.exports = {
    createpromotions,
    findAllpromotions,
    findOnepromotions,
    updatepromotions,
    deletepromotions

}