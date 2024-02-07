const express = require('express')
const bodyParser = require('body-parser')

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))

//get routes
const routes = require('./route')
app.use('/auth',routes)


app.listen(5000,()=>{
    console.log("Server Started");
})
module.exports = app