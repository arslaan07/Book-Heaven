const express = require('express') 
const User = require('../models/user')
const Book = require('../models/book')
const Order = require('../models/order')
const router = express.Router()
const authenticateToken = require('./userAuth')

// place order 

router.post('/place-order', authenticateToken, async (req, res) => {
    try {
        const { id } = req.headers 
        const { order } = req.body 
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        for(const orderData of order) {
            const newOrder = new Order({
                user: id,
                book: orderData._id
            })

        const orderDataFromDb = await newOrder.save()
        // saving order in user model  

        user.orders.push(orderDataFromDb._id)

        await user.save()

        }
        // clearing cart 
        user.cart = []
        await user.save()
        return res.status(200).json({ status: "success", message: "Order placed successfully" })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})
router.get('/get-order-history', authenticateToken, async (req, res) => {
    try {
        const { id } = req.headers 
        const UserData = await User.findById(id).populate({
            path: 'orders',
            populate: { path: 'book'}
        })
        const orderData = UserData.orders.reverse()
        return res.status(200).json({status: "Success", data: orderData})
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.get('/get-all-orders', authenticateToken, async (req, res) => {
    try {
        const UserData = await Order.find().populate({
            path: 'book'
        }).populate({
            path: 'user'
        }).sort({
            createedAt: -1
        })
        return res.status(200).json({status: "Success", data: UserData})
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.put('/update-status/:id', authenticateToken, async (req, res) => {
    try {
        const { id } = req.params 
        await Order.findByIdAndUpdate(id, { status: req.body.status })
        return res.status(200).json({status: "Success", message: 'Status Updated Successfully'})
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})
module.exports = router