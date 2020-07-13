const express = require('express')
const app = express()
const port =  3001
const routes = require('./routes')
const cors = require('cors')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(routes)

app.listen(port, function(){
    console.log(`Listening on port: ${port}`)
})