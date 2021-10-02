require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')

const userRouter = require('./routes/userR')

mongoose
    .connect(process.env.DB, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        // useCreateIndex: true,
        // useFindAndModify: false,
    })
    .then(() => console.log("Database Connection Successful!"));

app.use("/api/user", userRouter)

app.listen(process.env.PORT || 5000, () => {
    console.log("Backend server is running!");
})