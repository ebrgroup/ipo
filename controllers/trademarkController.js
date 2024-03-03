const Trademark = require("../modals/trademark.js");
const { S3Client, PutObjectCommand, GetObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const { ObjectId } = require('mongodb');

const insertTradeMark = async (req, res) => {
    try {

        const s3Client = new S3Client({
            region: process.env.AWS_REGION,
            credentials: {
              accessKeyId: process.env.AWS_ACCESS_KEY_ID,
              secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
              sessionToken: process.env.AWS_SESSION_TOKEN,
            },
          });

        req.body.applicationOwner = JSON.parse(req.body.applicationOwner);
        req.body.ownerDetails = JSON.parse(req.body.ownerDetails);
        req.body.logoDetails = JSON.parse(req.body.logoDetails);
        const cleanedData = removeEmptyFields(req.body);

        if (req.files[0].fieldname === "licenseFile") {
            let licenseFileName = req.files[0].originalname;
            licenseFileName = Date.now() + '-' + licenseFileName;
            let logoImageName = req.files[1].originalname;
            logoImageName = Date.now() + '-' + logoImageName;
            cleanedData.applicationOwner.licenseFile = licenseFileName;
            cleanedData.logoDetails.logoFile = logoImageName;

            try {
                await s3Client.send(new PutObjectCommand({
                  Bucket: "cyclic-long-teal-buffalo-gown-ap-southeast-2",
                  Key: licenseFileName,
                  Body: req.files[0].buffer,
                }));
              } catch (error1) {
                return res.status(500).json({ error: 'Failed to upload license file' });
            }

            try {
                await s3Client.send(new PutObjectCommand({
                  Bucket: "cyclic-long-teal-buffalo-gown-ap-southeast-2",
                  Key: logoImageName,
                  Body: req.files[1].buffer,
                }));
              } catch (error1) {
                return res.status(500).json({ error: 'Failed to upload license file' });
              }

        } else {
            let logoImageName = req.files[0].originalname;
            logoImageName = Date.now() + '-' + logoImageName;
            cleanedData.logoDetails.logoFile = logoImageName;

            try {
                await s3Client.send(new PutObjectCommand({
                  Bucket: "cyclic-long-teal-buffalo-gown-ap-southeast-2",
                  Key: logoImageName,
                  Body: req.files[0].buffer,
                }));
              } catch (error1) {
                console.log(error1)
                return res.status(500).json({ error: 'Failed to upload logo file' });
              }

            const newTrademark = new Trademark(cleanedData);
            newTrademark.save();
            res.status(201).json({ message: 'Trademark created successfully!', trademark: newTrademark });
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Failed to create trademark' });
    }
};

const removeEmptyFields = (obj) => {
    const cleanedObj = {};
    for (const key in obj) {
        if (typeof obj[key] === 'object' && obj[key] !== null) {
            const cleanedSubObj = removeEmptyFields(obj[key]);
            if (Object.keys(cleanedSubObj).length !== 0) {
                cleanedObj[key] = cleanedSubObj;
            }
        } else if (obj[key] !== undefined && obj[key] !== '') {
            cleanedObj[key] = obj[key];
        }
    }
    return cleanedObj;
};

const userTrademark = async (req, res) => {
    try {

        const { id } = req.params;
        const userId = new ObjectId(id)
        const registerd = await Trademark.countDocuments({ userId: userId, status: 'Register' });
        const applied = await Trademark.countDocuments({ userId: userId, status: 'Pending' });
        res.status(200).json({ registerd, applied });
    } catch (error) {
        res.status(500).json({ error: `An error has occurred while retrieving the user trademark data.` });
    }
    
}

const searchTrademark = async (req, res) => {
    try {
        const { name } = req.params;
        const response = await Trademark.find({ 'logoDetails.markDesc': { $regex: name, $options: 'i' }, 'status': 'Register' }, {
            trademarkId: 1, classificationClass: 1,
            fileDate: 1, 'logoDetails.markDesc': 1, 'logoDetails.logoFile': 1, markDesc: 1, status: 1, _id: 0
        });
        res.status(200).json({ response });
    } catch (error) {
        res.status(500).json({ error: `An error has occurred while retrieving the trademark data.` });
    }

};

const trackTrademark = async (req, res) => {
    try {

        const s3Client = new S3Client({
            region: process.env.AWS_REGION,
            credentials: {
              accessKeyId: process.env.AWS_ACCESS_KEY_ID,
              secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
              sessionToken: process.env.AWS_SESSION_TOKEN,
            },
        });

        let id = req.params.id;
        id = '#' + id;
        const response = await Trademark.find({ trademarkId: id }, {
            trademarkId: 1, classificationClass: 1,
            fileDate: 1, 'logoDetails.markDesc': 1, 'logoDetails.logoFile': 1, markDesc: 1, status: 1, _id: 0
        });

        const url = await getSignedUrl(s3Client, new GetObjectCommand({
            Bucket: "cyclic-long-teal-buffalo-gown-ap-southeast-2",
            Key: response[0].logoDetails.logoFile
        }), {
            expiresIn: 60
        });

        response[0].logoDetails.logoFile = url;

        res.status(200).json({ response });
    }

    catch (error) {
        res.status(500).json({ error: `An error has occurred while retrieving the trademark data.` });
    }
};

module.exports = {
    insertTradeMark,
    searchTrademark,
    trackTrademark,
    userTrademark
}
