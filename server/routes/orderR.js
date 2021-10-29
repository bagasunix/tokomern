const orderM = require('../models/orderM')
const { verifyToken, verufyTokenAndAuthorization, verufyTokenAndAdmin } = require('./verifyToken')

const router = require('express').Router()

// Get Order
router.post('/', verifyToken, async (req, res) => {
    const newOrder = new orderM(req.body)
    try {
        const savedOrder = await newOrder.save()
        res.status(200).json(savedOrder)
    } catch (err) {
        res.status(500).json(err)
    }
})

// Update
router.put('/:id', verufyTokenAndAdmin, async (req, res) => {
    try {
        const updateOrder = await orderM.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, { new: true })
        res.status(200).json(updateOrder)
    } catch (err) {
        res.status(500).json(err)
    }
})

// Delete
router.delete('/:id', verufyTokenAndAdmin, async (req, res) => {
    try {
        await orderM.findByIdAndDelete(req.params.id)
        res.status(200).json('Order has been delete...')
    } catch (err) {
        res.status(500).json(err)
    }
})

// Get Details Product
router.get('/find/:userId', verufyTokenAndAuthorization, async (req, res) => {
    try {
        const detailOrders = await orderM.find({ userId: req.params.userId })

        return res.status(200).json({
            detailOrders
        })
    } catch (err) {
        res.status(500).json(err)
    }
})


// Get All
router.get('/', verufyTokenAndAdmin, async (req, res) => {
    try {
        const orders = await orderM.find();
        return res.status(200).json({
            orders
        })
    } catch (err) {
        res.status(500).json(err)
    }
})

// Get Monthly Income
router.get('/income', verufyTokenAndAdmin, async (req, res) => {
    const date = new Date()
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1))
    const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1))

    try {
        const Income = await orderM.aggregate([
            { $match: { createdAt: { $gte: previousMonth } } },
            {
                $project: {
                    month: { $month: "$createdAt" },
                    sales: "$amount"
                },
            },
            {
                $group: {
                    _id: "$month",
                    total: { $sum: "$sales" }
                },
            }
        ])
        res.status(200).json({
            status: 'success',
            Income
        })
    } catch (err) {
        res.status(500).json(err)
    }
})

module.exports = router