const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
require('./connection/connection')
const user = require('./routes/user')
const book = require('./routes/book')
const favorite = require('./routes/favorite')
const cart = require('./routes/cart')
const order = require('./routes/order')
const axios = require('axios')

const allowedOrigins = [
    "http://localhost:5173", // Development environment
    "https://zingy-cupcake-8a672f.netlify.app", // Production environment
  ];
  
  app.use(cors({
    origin: [
        'https://zingy-cupcake-8a672f.netlify.app',
        'http://localhost:5173'
    ],
    credentials: true
}))
  
app.use(express.json())
app.use(express.urlencoded({ extended: true}))

// Keep-alive function
function keepServerAlive() {
    if (process.env.RENDER_EXTERNAL_URL) {
        setInterval(async () => {
            try {
                const response = await axios.get(process.env.RENDER_EXTERNAL_URL);
                console.log('Server pinged successfully');
            } catch (error) {
                console.error('Ping failed', error);
            }
        }, 10 * 60 * 1000); // Ping every 10 minutes
    }
}

// Call the function
keepServerAlive();

app.use('/api/v1', user)
app.use('/api/v1', book)
app.use('/api/v1', favorite)
app.use('/api/v1', cart)
app.use('/api/v1', order)

const PORT = process.env.PORT || 3000

app.get('/', (req, res) => {
    res.end('API is running')
})
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
