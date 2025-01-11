const express = require('express') 
const User = require('../models/user')
const Book = require('../models/book')
const router = express.Router()
const authenticateToken = require('./userAuth')

// add book to favorite

router.put('/add-book-to-favorite', authenticateToken, async (req, res) => {
    try {
        const { id, bookid } = req.headers
        const userData = await User.findById(id)
        const isFavoriteBook = userData.favorites.includes(bookid)
        if(isFavoriteBook) {
            return res.status(200).json({ message: 'Book is already in your favorite list.' })
        }
        userData.favorites.push(bookid)
        await userData.save()
        res.status(200).json({ message: 'Book added to favorites.' })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

// remove book from favorite

router.delete('/remove-book-from-favorite', authenticateToken, async (req, res) => {
    try {
        const { id, bookid } = req.headers
        const userData = await User.findById(id)
        const isFavoriteBook = userData.favorites.includes(bookid)
        if(isFavoriteBook) {
            userData.favorites.pop(bookid)
            await userData.save()
        }
        res.status(200).json({ message: 'Book removed from favorites.' })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

// get favorite books of a user

router.get('/get-favorite-books', authenticateToken, async (req, res) => {
    try {
        const { id } = req.headers
        const userData = await User.findById(id).populate("favorites")
        const favoriteBooks = userData.favorites
        res.status(200).json({ status: "success", data: favoriteBooks })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})
module.exports = router