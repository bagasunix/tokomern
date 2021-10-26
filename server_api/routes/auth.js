const router = require('express').Router()
const { request } = require('express')
const user = require('../models/userM')
const cryptoJs = require('crypto-js')

// Register
router.post('/register', async (req, res) => {
    const newUser = new user({
        username: req.body.username,
        email: req.body.email,
        password: cryptoJs.AES.encrypt(req.body.password, process.env.PASS_SEC).toString()
    })

    try {
        const savedUser = await newUser.save()
        console.log(savedUser);
        res.status(200).json({
            status: 'Success',
            savedUser
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            status: 'Error',
            err
        })
    }

})
module.exports = router