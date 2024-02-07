const express = require('express')
const router = express.Router()
const cognito = require('./cognito')

router.post('/signup', async (req, res) => {
    const { body } = req
    let { email, name, password } = body
    console.log("body",body);
    try {
        // Corrected function call to signup
        let result = await cognito.signup(name, email, password)
        res.status(200).json(result)
    } catch (e) {
        console.log(e);
    }
})

module.exports = router
