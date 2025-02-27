const mongoose = require('mongoose')

const conn = async () => {
    try {
        await mongoose.connect(`${process.env.URI}`)
        console.log("connected to db")
    } catch (error) {
        console.error(error)
    }
}

conn()