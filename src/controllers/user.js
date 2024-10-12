const Users = require("../models/user")


const createuser = async (req, res) => {
    try {
        const {name, addres, email, password, number} = req.body

        const file = req.file ? req.file ?.path : null

        const data = await Users.create({
            name,
            addres,
            email,
            password,
            number,
            image : file
        
        })
        res.status(201).json({
            msg : "success create user",
            data,
        })
        
    } catch (error) {
        console.log(error);
        res.status(400).json({
            msg : "filed create user",
            error
        })
        
    }
}
const findAllUsers = async (req, res) => {
    const { search, orderBy, sortBy, limit, page } = req.query;
    const offset = ((page - 1) * limit)
    let where = {}
    let order = []
    if (search) {
        where = {
            name: { [Op.iLike]: "%" + search + "%" }
        }
        if (orderBy && sortBy) {
            order = [[orderBy, `${sortBy}`]]
        }
    }
    try {
        const data = await Users.findAll({
            where,
            order,
            limit,
            offset,
        })
        res.status(200).json({
            msg: 'success find All user',
            data: data
        })
    } catch (error) {
        console.log({ error });
        res.status(500).json({ error })

    }
}

const findOneuser = async (req, res) => {
    try {
        const { id } = req.payload
        const user = await Users.findByPk(id)
        res.status(200).json(user)
    } catch (error) {
        console.log({ error });
        res.status(500).json({ error })
    }
}
const updateuser = async (req, res) => {
    try {
        const { id } = req.params
        const { name, addres, email, password, number } = req.body
        const user = await Users.findByPk(id)
        if (!user) {
            return res.status(404).json({ msg: 'user not found' })
        }
        if (req.file){
            await user.update({
                name,
                addres,
                email,
                password,
                number,
                image : req?.file?.path
            })
            return res.status(200).json({
                msg : 'success update user with image',
                data : user
            })
        }
        await user.update({ name, addres, email, password, number })
        await user.save()
        res.status(200).json({ user })
    } catch (error) {
        console.log({ error });
        res.status(500).json({ error })
    }
}
const deleteuser = async (req, res) => {
    try {
        const { id } = req.params
        const user = await Users.findByPk(id)
        if (!user) {
            return res.status(404).json({ msg: 'user not found' })
        }
        await user.destroy()
        await user.save()
        res.status(200).json({
            msg: "success delete user", user
        })
    } catch (error) {
        console.log({ error });
        res.status(500).json({ error })

    }
}
module.exports = {
    createuser,
    findAllUsers,
    findOneuser,
    updateuser,
    deleteuser
}
