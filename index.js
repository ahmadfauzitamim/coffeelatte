const express = require('express')
const dotenv = require('dotenv')
const db = require('./src/config/db')
// const products = require('./src/models/products')
const  route  = require('./src/routes')
// const Users = require('./src/models/user')
const cloudinaryConfig = require('./src/config/cloudinary')
// const transaction = require('./src/models/transaction')
const cors = require('cors')
// const promotions = require('./src/models/promotion')
// const transaction = require('./src/models/transaction')
// const Users = require('./src/models/users')
// const transaction = require('./src/models/transaction')




dotenv.config()

const app = express()

const port= process.env.PORT 

app.use(cors({
    origin : ["http://localhost:3000", "*"]
}))


db.authenticate().then(()=>{
    console.log(`DB Connected`);
    
}).catch(err =>{
    console.log(`Erorr ${err}`);
    
})
app.use(express.urlencoded({extended : false}))
app.use(express.json())
app.use(cloudinaryConfig)
app.use(route);


app.use(express.static(__dirname));

// products.sync ().then(()=>{
//     console.log(`products i synchorize`);
    
// }).catch(err=>{
//     console.log(err);
    
// })
// Users.sync ().then(()=>{
//     console.log(`products i synchorize`);
    
// }).catch(err=>{
//     console.log(err);
    
// })
// transaction.sync ().then(()=>{
//     console.log(`transactions is synchorized`);
    
// }).catch(err=>{
//     console.log(err);
    
// })
  
// promotions.sync ().then(()=>{
//     console.log(`promo is synchorized`);
    
// }).catch(err=>{
//     console.log(err);
    
// })
app.get('/', (req, res) =>{
    res.status(200). send('wellcome to my simple API')
})


app.get('/ping',(req, res) =>{
    res.json({msg :'PONG 123456789'})
})

app.listen(port,() =>{
    console.log(`app is running on PORT ${port}`);
    
    
})





//mvc (modeles, views, controllers) models = mempresentasikan setruktur data yang ada di data base kita. controllers = logika yang kita buat dalam api kita
