const mongoose = require('mongoose')

const dbName = process.env.DB
const username = process.env.ATLAS_USERNAME
const pw = process.env.ATLAS_PASSWORD
const uri = `mongodb+srv://${username}:${pw}@merncluster.oavitwd.mongodb.net/${dbName}?retryWrites=true&w=majority`

mongoose.connect(uri)
    .then(()=> console.log(`Connected To ${dbName} DB `))
    .catch(err => console.log(err))