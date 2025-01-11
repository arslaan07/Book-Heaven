const express = require('express') 
const User = require('../models/user')
const Book = require('../models/book')
const router = express.Router()
const authenticateToken = require('./userAuth')

// add book to cart

router.put('/add-to-cart', authenticateToken, async (req, res) => {
    try {
        const { id, bookid } = req.headers 
        const userData = await User.findById(id)
        const isBookInCart = await userData.cart.includes(bookid)
        if(isBookInCart) {
            return res.status(200).json({ message: 'Book already in cart'})
        }
        userData.cart.push(bookid)
        await userData.save()
        res.status(200).json({ message: 'Book added to cart successfully'})
    } catch (error) {
        res.status(500).json({ message: error.message})
    }
})

// remove book to cart

router.put('/remove-from-cart/:bookid', authenticateToken, async (req, res) => {
    try {
        const { bookid } = req.params 
        const { id } = req.headers
        const userData = await User.findById(id)
        const isBookInCart = await userData.cart.includes(bookid)
        if(isBookInCart) {
            userData.cart.pop(bookid)
            await userData.save()
            return res.status(200).json({ message: 'Book removed from cart successfully'})
        }
        res.status(404).json({ message: 'Book not found in cart'})
    } catch (error) {
        res.status(500).json({ message: error.message})
    }
})

// get cart of a particular user

router.get('/get-user-cart', authenticateToken, async (req, res) => {
    try {
        const { id } = req.headers
        const userData = await User.findById(id).populate('cart')
        const cart = userData.cart.reverse() 
        res.status(200).json({ status: "Success", data: cart })
    } catch (error) {
        res.status(500).json({ message: error.message})
    }
})


module.exports = router