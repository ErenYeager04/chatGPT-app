require('dotenv').config()

const express = require('express');
const mongoose = require('mongoose')
const userRoutes =  require('./routes/user')
const cors = require('cors')

// express app
const app = express();

// middleware
app.use(cors({
    origin: '*',
    credentials: true
}))
app.use(express.json())
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// routes
app.use('/api/user',userRoutes);

// connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        // listen for requests
        app.listen(process.env.PORT, () => {
            console.log('listening on port', process.env.PORT)
        })
    })
    .catch((err) => {
        console.log(err)
    })