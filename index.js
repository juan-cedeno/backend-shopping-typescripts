const express = require('express')
require('dotenv').config()
const cors = require('cors')
const { connectionDb } = require('./db/config')


const app = express()
app.use(express.json())
app.use(cors())

connectionDb()

app.use('/api/' , require('./routers/product'))
app.use('/api/' , require('./routers/users'))

app.listen(process.env.PORT,() => {
    console.log('2020');
})