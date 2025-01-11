const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
require('/connection/connection')
const user = require('./routes/user')
const book = require('./routes/book')
const favorite = require('./routes/favorite')
const cart = require('./routes/cart')
const order = require('./routes/order')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true}))

app.use('/api/v1', user)
app.use('/api/v1', book)
app.use('/api/v1', favorite)
app.use('/api/v1', cart)
app.use('/api/v1', order)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
