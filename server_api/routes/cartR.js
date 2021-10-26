const cartM = require('../models/cartM')
const { verifyToken, verufyTokenAndAuthorization, verufyTokenAndAdmin } = require('./verifyToken')

const router = require('express').Router()

// Get Product
router.post('/', verifyToken, async (req, res) => {
    const newCart = new cartM(req.body)
    try {
        const savedCart = await newCart.save()
        res.status(200).json(savedCart)
    } catch (err) {
        res.status(500).json(err)
    }
})

// Update
router.put('/:id', verufyTokenAndAuthorization, async (req, res) => {
    try {
        const updateCart = await cartM.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, { new: true })
        res.status(200).json(updateCart)
    } catch (err) {
        res.status(500).json(err)
    }
})

// Delete
router.delete('/:id', verufyTokenAndAuthorization, async (req, res) => {
    try {
        await cartM.findByIdAndDelete(req.params.id)
        res.status(200).json('Cart has been delete...')
    } catch (err) {
        res.status(500).json(err)
    }
})

// Get Details Product
router.get('/find/:userId', verufyTokenAndAuthorization, async (req, res) => {
    try {
        const detailCart = await productM.findOne({ userId: req.params.userId })

        return res.status(200).json({
            detailCart
        })
    } catch (err) {
        res.status(500).json(err)
    }
})


// Get All
router.get('/', verufyTokenAndAdmin, async (req, res) => {
    try {
        const cart = await cartM.find();
        return res.status(200).json({
            cart
        })
    } catch (err) {
        res.status(500).json(err)
    }

})

module.exports = router