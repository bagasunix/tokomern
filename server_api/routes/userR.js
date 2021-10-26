const userM = require('../models/userM')
const { verifyToken, verufyTokenAndAuthorization, verufyTokenAndAdmin } = require('./verifyToken')

const router = require('express').Router()

// Update

router.put('/:id', verufyTokenAndAuthorization, async (req, res) => {
    if (req.body.password) {
        req.body.password = cryptoJs.AES.encrypt(req.body.password, process.env.PASS_SEC).toString()
    }
    try {

        const updateUser = await userM.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, { new: true })
        res.status(200).json(updateUser)
    } catch (err) {
        res.status(500).json(err)
    }
})

// Delete
router.delete('/:id', verufyTokenAndAuthorization, async (req, res) => {
    try {
        const deleteUser = await userM.findByIdAndDelete(req.params.id)
        res.status(200).json('User has been delete...')
    } catch (err) {
        res.status(500).json(err)
    }
})

// Get User Me
router.get('/find/:id', verufyTokenAndAdmin, async (req, res) => {
    try {
        const userMe = await userM.findById(req.params.id)
        const { password, __v, ...others } = userMe._doc

        return res.status(200).json({
            status: 'success',
            data: others
        })
    } catch (err) {
        res.status(500).json(err)
    }
})

// Get Profile
router.get('/profile', verifyToken, async (req, res) => {
    try {
        const userMe = await userM.findById(req.user.id)
        const { password, __v, ...others } = userMe._doc

        return res.status(200).json({
            status: 'success',
            data: others
        })
    } catch (err) {
        res.status(500).json(err)
    }
})

// Get All User
router.get('/', verufyTokenAndAdmin, async (req, res) => {
    const query = req.query.new;
    try {
        const users = query ? await userM.find().sort({ _id: -1 }).limit(10) : await userM.find()

        return res.status(200).json({
            status: 'success',
            data: users
        })
    } catch (err) {
        res.status(500).json(err)
    }
})

// Get User Stat
router.get('/stats', verufyTokenAndAdmin, async (req, res) => {
    const date = new Date()
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1))
    console.log(date, lastYear);
    try {
        const data = await userM.aggregate([
            { $match: { createdAt: { $gte: lastYear } } },
            {
                $project: {
                    month: { $month: "$createdAt" }
                }
            },
            {
                $group: {
                    _id: "$month",
                    total: { $sum: 1 }
                }
            }
        ])
        return res.status(200).json({
            status: 'success',
            data
        })
    } catch (err) {
        res.status(500).json(err)
    }
})

module.exports = router