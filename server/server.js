const express = require('express')
const app = express()
require('dotenv').config({path:'./.env'})
const port = process.env.PORT
const cors = require('cors')
require('./config/mongoose.config')

app.use(express.json(), express.urlencoded({extended: true}), cors())

const  AllPetsRoutes = require('./routes/pet.routes')

AllPetsRoutes(app)

app.listen(port, ()=> console.log(`listening on port ${port}`))