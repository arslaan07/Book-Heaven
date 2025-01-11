const express = require('express') 
const User = require('../models/user')
const Book = require('../models/book')
const router = express.Router()
const authenticateToken = require('./userAuth')

// add book --- admin

router.post('/add-book', authenticateToken, async (req, res) => {
    try {
        const { id } = req.headers
        const user = await User.findById(id)
        if(user.role !== 'admin') {
            return res.status(403).json({ message: 'Access denied' })
        }
        const { url, title, author, price, desc, language } = req.body

        const book = new Book({
            url,
            title,
            author,
            price,
            desc,
            language
        })
        await book.save()
        res.status(200).json({ message: "Book added successfully"})
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

// update book --- admin

router.put('/update-book', authenticateToken, async (req, res) => {
    try {
        const { id, bookid } = req.headers
        const user = await User.findById(id)
        if(user.role !== 'admin') {
            return res.status(403).json({ message: 'Access denied' })
        }
        const { url, title, author, price, desc, language } = req.body

        await Book.findByIdAndUpdate(bookid, {
            url,
            title,
            author,
            price,
            desc,
            language
        })
        res.status(200).json({ message: "Book updated successfully"})
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})
// delete book --- admin

router.delete('/delete-book', authenticateToken, async (req, res) => {
    try {
        const { id, bookid } = req.headers
        const user = await User.findById(id)
        if(user.role !== 'admin') {
            return res.status(403).json({ message: 'Access denied' })
        }
        await Book.findByIdAndDelete(bookid)
        res.status(200).json({ message: "Book deleted successfully"})
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

// get all books --- public 

router.get('/get-all-books', async (req, res) => {
    try {
        const books = await Book.find().sort({ createdAt: -1 })
        res.status(200).json({ status: "success", data: books})
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

// get recent books --- limit = 4

router.get('/get-recent-books', async (req, res) => {
    try {
        const books = await Book.find().sort({ createdAt: -1 }).limit(4)
        res.status(200).json({ status: "success", data: books})
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

// get book by id

router.get('/get-book-by-id/:id', async (req, res) => {
    try {
        const { id } = req.params
        const book = await Book.findById(id)
        res.status(200).json({ status: "success", data: book})
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

 
module.exports = router