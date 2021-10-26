const productM = require('../models/productM')
const { verifyToken, verufyTokenAndAuthorization, verufyTokenAndAdmin } = require('./verifyToken')

const router = require('express').Router()

// Get Product
router.post('/', verufyTokenAndAdmin, async (req, res) => {
    const newProduct = new productM(req.body)
    try {
        const savedProduct = await newProduct.save()
        res.status(200).json(savedProduct)
    } catch (err) {
        res.status(500).json(err)
    }
})

// Update
router.put('/:id', verufyTokenAndAdmin, async (req, res) => {
    try {
        const updateProduct = await productM.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, { new: true })
        res.status(200).json(updateProduct)
    } catch (err) {
        res.status(500).json(err)
    }
})

// Delete
router.delete('/:id', verufyTokenAndAdmin, async (req, res) => {
    try {
        await productM.findByIdAndDelete(req.params.id)
        res.status(200).json('Product has been delete...')
    } catch (err) {
        res.status(500).json(err)
    }
})

// Get Details Product
router.get('/find/:id', verufyTokenAndAdmin, async (req, res) => {
    try {
        const detailProduct = await productM.findById(req.params.id)

        return res.status(200).json({
            detailProduct
        })
    } catch (err) {
        res.status(500).json(err)
    }
})


// Get All User
router.get('/', verufyTokenAndAdmin, async (req, res) => {
    const query = req.query.new;
    try {
        const users = query ? await productM.find().sort({ _id: -1 }).limit(10) : await productM.find()

        return res.status(200).json({
            status: 'success',
            data: users
        })
    } catch (err) {
        res.status(500).json(err)
    }
})

// Get User Stat
// router.get('/stats', verufyTokenAndAdmin, async (req, res) => {
//     const date = new Date()
//     const lastYear = new Date(date.setFullYear(date.getFullYear() - 1))
//     console.log(date, lastYear);
//     try {
//         const data = await userM.aggregate([
//             { $match: { createdAt: { $gte: lastYear } } },
//             {
//                 $project: {
//                     month: { $month: "$createdAt" }
//                 }
//             },
//             {
//                 $group: {
//                     _id: "$month",
//                     total: { $sum: 1 }
//                 }
//             }
//         ])
//         return res.status(200).json({
//             status: 'success',
//             data
//         })
//     } catch (err) {
//         res.status(500).json(err)
//     }
// })

module.exports = router