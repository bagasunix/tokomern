const router = require('express').Router()
const { request } = require('express')
const user = require('../models/userM')
const cryptoJs = require('crypto-js')
const userM = require('../models/userM')
const jwt = require('jsonwebtoken')

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
        res.status(500).json({
            status: 'Error',
            err
        })
    }

})

// Login

router.post('/login', async (req, res) => {
    try {
        const user = await userM.findOne({ username: req.body.username })
        !user && res.status(401).json({
            status: 'Error',
            message: 'Wrong credentials!'
        })
        const hashPass = cryptoJs.AES.decrypt(user.password, process.env.PASS_SEC)
        const Originalpassword = hashPass.toString(cryptoJs.enc.Utf8)
        Originalpassword !== req.body.password && res.status(401).json({
            status: 'Error',
            message: 'Wrong credentials!'
        })

        const accessToken = jwt.sign({
            id: user._id, isAdmin: user.isAdmin,

        }, process.env.JWT_SEC_KEY, { expiresIn: '3d' })

        const { password, __v, ...others } = user._doc

        return res.status(200).json({
            status: 'success',
            ...others,
            accessToken
        })
    } catch (err) {
        res.status(500).json({
            status: 'Error',
            err
        })
    }
})
module.exports = router