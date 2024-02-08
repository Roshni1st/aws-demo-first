const AWS = require('aws-sdk');

// Setup regions and keys
AWS.config.update({
    region:"ap-south-1",
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});


// Create an SQS service object
const sqs = new AWS.SQS({apiVersion: '2012-11-05'});

exports.SQSDEMO = async (req,res)=>{
    const params = {
        MessageBody: 'Hello from SQS!',
        QueueUrl: 'https://sqs.ap-south-1.amazonaws.com/533267026824/DemoQueue'
      };
    
      try {
        const data = await sqs.sendMessage(params).promise();
        res.json({ message: 'Message sent successfully', messageId: data.MessageId });
      } catch (err) {
        console.error('Error sending message:', err);
        res.status(500).json({ error: 'Failed to send message' });
      }

}


