// import Users from "../models/users";
const Users = require("../models/user")
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken")


const register = async (req, res) => {
    try {
        const { name, email, password : userpassword, number, image } = req.body
        const existUser = await Users.findOne({where : {
            email
        }})

        if (existUser){
            return res.status(400).json({msg : "user has ben registerd"})
        }
        const salt = await bcrypt.genSalt()
        const encryptpassword = await bcrypt.hash(userpassword, salt)
        const data = await Users.create({
            name,
            email,
            password: encryptpassword,
            number,
            role : "user"
        })

        res.status(201).json({ msg: "success register user" })
    } catch (error) {
        console.log({ error });
        res.status(500).json({ msg: "internal server error", error })
    }
}
const login = async (req, res) =>{
    try {
        const {email, password} = req.body
        const user = await Users.findOne({where : {email}})
        // cek apakah user ada di db atau tidak
        if (!user){
            return res.status(404).json({msg : "User not found"})
        }
        const userpassword = user.getDataValue("password")
        // bandingkan password dari user dengan password yang di db
        const match = await bcrypt.compare(password, userpassword)
        if (!match){
            return res.status(400).json({msg : "wrong email or password"})
        }
        const token = jwt.sign({email, id : user.getDataValue("id"), role : user.getDataValue("role")}, process.env.SECRET_KEY, {
            expiresIn : '1d'
        })
        res.status(200).json({msg : "login success", token})
    } catch (error) {
        console.log({ error });
        res.status(500).json({ msg: "internal server error", error })
    }
}
module.exports = {
    register,
    login
}