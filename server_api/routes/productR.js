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
router.get('/', async (req, res) => {
    const qNew = req.query.new;
    const qcategory = req.query.category;
    try {
        let products;
        if (qNew) {
            products = await productM.find().sort({ createdAt: -1 }).limit(10)
        } else if (qcategory) {
            products = await productM.find({
                categories: {
                    $in: [qcategory]
                }
            });
        } else {
            products = await productM.find()
        }
        return res.status(200).json({
            status: 'success',
            data: products
        })
    } catch (err) {
        res.status(500).json(err)
    }
})

module.exports = router