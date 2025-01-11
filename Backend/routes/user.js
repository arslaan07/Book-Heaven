const express = require('express') 
const user = require('../models/user')
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const authenticateToken = require('../routes/userAuth')
// Sign Up

router.post('/sign-up', async (req, res) => {
    try {
        const { username, email, password, address } = req.body

        if(username.length < 4) {
            return res.status(400).json({ message: "username length must be greater than 3"})
        }
        const existingUsername = await user.findOne({username})
        if(existingUsername) {
            return res.status(400).json({ message: "username already exists"})
        }
        const existingEmail = await user.findOne({email})
        if(existingEmail) {
            return res.status(400).json({ message: "email already exists"})
        }
        if(password.length <= 5) {
            return res.status(400).json({ message: "password length must be greater than 5"})
        }
        const hashPass = await bcrypt.hash(password, 10)
        const newUser = new user(
            {
                username,
                email,
                password: hashPass,
                address
            }
        )
        await newUser.save()
        return res.status(200).json({ message: "Sign up successfull"})
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})
 
// Sign In 

router.post('/sign-in', async (req, res) => {
    try {
        const { username, password} = req.body
        const existingUser = await user.findOne({ username })
        if(!existingUser) {
            return res.status(400).json({ message: "Invalid credentials"})
        }
        await bcrypt.compare(password, existingUser.password, (err, data) => {
            if(data) {
                const authClaims = [
                    {
                        name: existingUser.username
                    },
                    {
                        role: existingUser.role
                    }
                ]
                const token = jwt.sign({ authClaims }, "bookStore123", { 
                    expiresIn: "30d"
                })
                return res.status(200).json({
                    id: existingUser._id,
                    role: existingUser.role,
                    token: token,
                    message: `${existingUser._id} login successfull`
                })
            }
            else {
                return res.status(400).json({ message: "Invalid credentials"})
            }
        })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

// Get User Info

router.get('/get-user-info', authenticateToken, async (req, res) => {
    try {
        const { id } = req.headers
        const data = await user.findById(id).select("-password")
        return res.status(200).json({ data })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

// Update address
router.put('/update-address', authenticateToken, async (req, res) => {
    try {
        const { id } = req.headers
        const { address } = req.body
        await user.findByIdAndUpdate(id, {address: address})
        return res.status(200).json({ message: "Address updated" })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

module.exports = router