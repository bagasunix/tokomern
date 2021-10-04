const router = require('express').Router()


router.get("/", (req, res) => {
    res.send("Test is Successfully");
})

router.post('/regist', (req, res) => {
    const user= req.body.username;
    console.log(user);
    res.send(user)
})

module.exports = router 