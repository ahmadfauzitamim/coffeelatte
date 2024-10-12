const jwt = require("jsonwebtoken")

const verifyToken = async (req, res, next) => {
    try {
        const bearertoken = req.headers.authorization
        console.log(bearertoken);
        
        if (!bearertoken){
            return res.status(401).json({msg : "please login first"})
        }
        const token = bearertoken.split(" ")[1]
        jwt.verify(token, process.env.SECRET_KEY, (err, decoded) =>{
            if (err){
                console.log(err);
                
            } else {
                console.log(decoded);
                req.payload = {
                    id : decoded.id,
                    email : decoded.email
                }
                
            }
        })
        next()

    } catch (error) {
        console.log({ error });
        res.status(500).json({ error })

    }
}

const verifyAdmin = async(req, res, next) => {
    try {
        const bearertoken = req.headers.authorization
        if (!bearertoken){
            return res.status(401).json({msg : "please login first"})
        }
        const token = bearertoken.split(" ")[1]
        jwt.verify(token, process.env.SECRET_KEY, (err, decoded) =>{
            if (decoded.role !== "admin"){
                return res.status(403).json({msg : "accsess denied"})
            }
            if (err){
                console.log(err);
                
            } else {
                console.log(decoded);
                req.payload = {
                    id : decoded.id,
                    email : decoded.email
                }
                
            }
        })
        next()

    } catch (error) {
        console.log({ error });
        res.status(500).json({ error })

    }
}
module.exports = {
    verifyToken,
    verifyAdmin
}