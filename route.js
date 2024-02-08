const express = require('express')
const router = express.Router()
const cognito = require('./cognito')
const SQS = require('./sqs')

// routes for aws SQS
router.get('/send',SQS.SQS_SEND_MESSAGE)
router.get('/received', SQS.SQS_RECEIVE_MESSAGE);
router.post('/remove',SQS.SQS_DELETE_MESSAGE)


//routes for aws cognito
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
