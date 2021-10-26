require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')

const userRouter = require('./routes/userR')
const authRouter = require('./routes/auth')
const productRouter = require('./routes/productR')

mongoose
    .connect(process.env.DB, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        // useCreateIndex: true,
        // useFindAndModify: false,
    })
    .then(() => console.log("Database Connection Successful!"));

app.use(express.json())

app.use("/api/users", userRouter)
app.use("/api/auth", authRouter)
app.use("/api/product", productRouter)

app.listen(process.env.PORT || 5000, () => {
    console.log("Backend server is running!");
})