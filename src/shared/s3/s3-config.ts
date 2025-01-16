import AWS from 'aws-sdk';

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID, // Используйте Access Key ID
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY, // Используйте Secret Access Key
});

export const s3 = new AWS.S3();
