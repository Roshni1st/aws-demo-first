const AWS = require('aws-sdk');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

// Setup regions and keys
AWS.config.update({
    region: process.env.REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

// Create new instance for S3 class
const s3 = new AWS.S3();

// Directory path to upload
const directoryPath = './upload';

try {
   
    const files = fs.readdirSync(directoryPath);

   
    files.forEach(file => {
      
        const filePath = path.join(directoryPath, file);

     
        const params = {
            Bucket: process.env.BUCKET_NAME,
            Key: `images/upload/${file}`, 
            Body: fs.createReadStream(filePath) 
        };

        // Upload the file to S3
        s3.upload(params, (err, data) => {
            if (err) {
                console.error(`Error uploading ${file}:`, err);
            } else {
                console.log(`${file} uploaded successfully. File location:`, data.Location);
            }
        });
    });
} catch (err) {
    console.error('Error reading directory:', err);
}
