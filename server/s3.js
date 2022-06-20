require('dotenv').config();
const S3 = require('aws-sdk/clients/s3');
const crypto = require('crypto');
const { promisify } = require('util');

const randomBytes = promisify(crypto.randomBytes);

const bucketName = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_BUCKET_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_KEY;

const s3 = new S3({
  region,
  accessKeyId,
  secretAccessKey
});

// uploads a file to s3
const uploadFile = async(file) => {
  const rawBytes = await randomBytes(16);
  const imageName = rawBytes.toString('hex');

  const { buffer, mimetype } = file;

  const uploadParams = {
    Bucket: bucketName,
    Body: buffer,
    Key: imageName,
    ContentType: mimetype
  };

  return s3.upload(uploadParams).promise();
};

// download a file from s3
const getFile = (fileKey) => {

  const downloadParams = {
    Key: fileKey,
    Bucket: bucketName
  };

  return s3.getObject(downloadParams).createReadStream();
};

module.exports = { uploadFile, getFile };