const AWS = require('aws-sdk');

// Setup regions and keys
AWS.config.update({
    region: "ap-south-1",
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

// Create an SQS service object
const sqs = new AWS.SQS({ apiVersion: '2012-11-05' });

// send message
exports.sendMessage = async (req, res) => {
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

// receive message
exports.recieveMessage = async (req, res) => {
    const params = {
        QueueUrl: 'https://sqs.ap-south-1.amazonaws.com/533267026824/DemoQueue',
        MaxNumberOfMessages: 1
    };

    try {
        const data = await sqs.receiveMessage(params).promise();
        if (data.Messages && data.Messages.length > 0) {
            const message = data.Messages[0];
            res.json({ messageBody: message.Body, receiptHandle: message.ReceiptHandle });
        } else {
            res.json({ message: 'No messages available' });
        }
    } catch (err) {
        console.error('Error receiving message:', err);
        res.status(500).json({ error: 'Failed to receive message' });
    }
}

// delete message
exports.deleteMessage = async (req, res) => {
    const { receiptHandle } = req.body;
    const params = {
        QueueUrl: 'https://sqs.ap-south-1.amazonaws.com/533267026824/DemoQueue',
        ReceiptHandle: receiptHandle
    };

    try {
        await sqs.deleteMessage(params).promise();
        res.json({ message: 'Message deleted successfully' });
    } catch (err) {
        console.error('Error deleting message:', err);
        res.status(500).json({ error: 'Failed to delete message' });
    }
}
