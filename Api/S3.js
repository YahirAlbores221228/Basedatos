const fs = require("fs");
const { S3Client, PutObjectCommand, ListObjectsCommand } = require ("@aws-sdk/client-s3");
const dotenv = require("dotenv");
dotenv.config();

//son las aws de env que se va generar
     const client = new S3Client({
    region: process.env.AWS_BUCKET_REGION,
    credentials: {
    accessKeyId: process.env.AWS_PUBLIC_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY
    } 
})

const uploadFile = async(file) => {
    const stream = fs.createReadStream(file.tempFilePath)
    const uploadParams = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: file.name,
        Body: stream
    }
    const command = new PutObjectCommand(uploadParams)
    const result = await client.send(command)
}

const getFiles = async () => {
    const command = new ListObjectsCommand({
        Bucket: process.env.AWS_BUCKET_NAME
    })
     const result = await client.send(command)
     console.log(result)
}
module.exports = {
    uploadFile,
    getFiles
}