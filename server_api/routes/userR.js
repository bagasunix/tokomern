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

module.exports = router