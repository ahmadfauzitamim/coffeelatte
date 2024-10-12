const {register, login} = require("../controllers/auth")

const {Router} = require("express")


const authRouther = Router()

authRouther.post('/register', register)
authRouther.post("/login", login)
module.exports = authRouther