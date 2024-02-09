const AWS = require("aws-sdk");
const sns = new AWS.SNS();
// Setup regions and keys
AWS.config.update({
  region: "ap-south-1",
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

exports.createTopics = async (req, res) => {
  try {
    const { topicName } = req.body;
    const params = {
      Name: topicName,
    };
    sns.createTopic(params, (err, data) => {
      if (err) {
        console.error("Error creating topic:", err);
        res.status(500).json({ error: "Failed to create topic" });
      } else {
        console.log("Topic created:", data);
        res.json({ topicArn: data.TopicArn });
      }
    });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "Failed to create topic" });
  }
};

// Topic created: {
//     ResponseMetadata: { RequestId: '4b3d243c-9841-5e71-b507-7a035bfd5e4a' },
//     TopicArn: 'arn:aws:sns:ap-south-1:533267026824:MyTopic'
//   }

// for create subscription

exports.subscribeTopic = async (req, res) => {
  try {
    const { topicArn, protocol, endpoint } = req.body;
    const params = {
      Protocol: protocol,
      TopicArn: topicArn,
      Endpoint: endpoint,
    };
    sns.subscribe(params, (err, data) => {
      if (err) {
        console.error("Error subscribing:", err);
        res.status(500).json({ error: "Failed to subscribe" });
      } else {
        console.log("Subscribed successfully:", data);
        res.json({ subscriptionArn: data.SubscriptionArn });
      }
    });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "Failed to create subscriber" });
  }
};

//for publish
exports.publish = async (req, res) => {
  try {
    const { topicArn, message } = req.body;
    const params = {
      Message: message,
      TopicArn: topicArn,
    };
    sns.publish(params, (err, data) => {
      if (err) {
        console.error("Error publishing message:", err);
        res.status(500).json({ error: "Failed to publish message" });
      } else {
        console.log("Message published:", data);
        res.json({ messageId: data.MessageId });
      }
    });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "Failed to publish" });
  }
};

// Message published: {
//     ResponseMetadata: { RequestId: '7ea811b1-0ddd-5d33-8f64-4f8ec7d9596e' },
//     MessageId: '9e44ce1a-2f93-51ea-bf5b-9025e59755b7'
//   }
