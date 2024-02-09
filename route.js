const express = require("express");
const router = express.Router();
const cognito = require("./cognito");
const SQS = require("./sqs");
const SNS = require("./sns");

// routes for aws SQS
router.get("/send", SQS.sendMessage);
router.get("/received", SQS.recieveMessage);
router.post("/remove", SQS.deleteMessage);

//routes for aws SNS
router.post("/create_topic", SNS.createTopics);
router.post("/subscribe", SNS.subscribeTopic);
router.post("/publish", SNS.publish);

//routes for aws cognito
router.post("/signup", async (req, res) => {
  const { body } = req;
  let { email, name, password } = body;
  console.log("body", body);
  try {
    // Corrected function call to signup
    let result = await cognito.signup(name, email, password);
    res.status(200).json(result);
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
