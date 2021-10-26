const userM = require('../models/userM')
const { verifyToken, verufyTokenAndAuthorization } = require('./verifyToken')

const router = require('express').Router()

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

module.exports = router