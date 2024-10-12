// untuk menambahkan produk (create)

const { Op } = require("sequelize");
const products = require("../models/products");
// const { Where } = require("sequelize/lib/utils");
//menambahkan product
const createProduct = async (req, res) => {
    try {
        
        // menangkap inputan dari user
        const { name, price, description, size,category } = req.body
    

        const file = req.file ? req.file?.path : null



        // masukin datanya ke database
        const data = await products.create({
            name: name,
            price: price,
            image: file,
            description: description,
            size: size,
            category:category,
        })
        // memebrikan response ke clien
        res.status(201).json({
            msg: 'success create product',
            // data,
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({
            msg: 'failed create pruduct',
            error,
        })
    }
}
// untuk melihat seluruh produk (read)
const findAllProduct = async (req, res) => {
    const { search, orderBy, sortBy, limit, page, category } = req.query
    const offset = ((page - 1) * limit)
    let where = {}
    let order = []
    if (search) {
        where = {
            name: { [Op.iLike]: "%" + search + "%" }
        }
    }
    if (category) {
        where = {
            category:category
        }
    }
    if (search && category){
        where = {
            [Op.and] : {
                name: { [Op.iLike]: "%" + search + "%" },
                category: { [Op.iLike]: "%" + category + "%" }
            }
        }
    }
    if (orderBy && sortBy) {
        order = [[orderBy, `${sortBy}`]]
    }
    try {
        const data = await products.findAll({
            where,
            limit,
            offset,
            order

        })


        res.status(200).json({
            msg: 'success find All product',
            data: data
        })
    } catch (error) {
        console.log({ error });
        res.status(500).json({ error })

    }
}

// untuk melihat satu produk (read)
const findOneProduct = async (req, res) => {
    try {
        const { id } = req.params
        const product = await products.findByPk(id)
        res.status(200).json(product)
    } catch (error) {
        console.log({ error });
        res.status(500).json({ error })
    }
}

// untuk mengupdete produk (update)
const updateProduct = async (req, res) => {
    try {
        const { id } = req.params
        const { name, price, description, size } = req.body
        const product = await products.findByPk(id)
        if (!product) {
            return res.status(404).json({ msg: 'product not found' })
        }
        if (req.file) {
            await product.update({ name, price, description, size, image: req?.file?.path })
            return res.status(200).json({
                msg: " success update product with image",
                data: product
            })
        }
        await product.update({ name, price, description, size })
        await product.save()
        res.status(200).json({ msg: " product terupdate", product })
    } catch (error) {
        console.log({ error });
        res.status(500).json({ error })
    }
}

// untuk menghapus produk (delete)
const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params
        const product = await products.findByPk(id)
        if (!product) {
            return res.status(404).json({ msg: 'product not found' })
        }
        await product.destroy()
        await product.save()
        res.status(200).json({
            msg: "success delete product", product
        })
    } catch (error) {
        console.log({ error });
        res.status(500).json({ error })

    }
}

module.exports = {
    createProduct,
    findAllProduct,
    findOneProduct,
    updateProduct,
    deleteProduct,
}