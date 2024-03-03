const Trademark = require("../modals/trademark.js");
const { S3, config } = require("aws-sdk");
const { ObjectId } = require('mongodb');

const insertTradeMark = async (req, res) => {
    try {

        config.update({
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
            region: process.env.AWS_REGION,
            sessionToken: process.env.AWS_SESSION_TOKEN
        });
        
        const s3 = new S3();

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

            let params = {
                Bucket: "cyclic-long-teal-buffalo-gown-ap-southeast-2",
                Key: licenseFileName,
                Body: req.files[0].buffer
            };

            s3.upload(params, (error1, data1) => {
                if (error1) {
                    console.error('Error uploading license file:', error1);
                    return res.status(500).json({ error: 'Failed to upload license file' });
                }

                params = {
                    Bucket: "cyclic-long-teal-buffalo-gown-ap-southeast-2",
                    Key: logoImageName,
                    Body: req.files[1].buffer
                };

                s3.upload(params, (error2, data2) => {
                    if (error2) {
                        console.error('Error uploading logo file:', error2);
                        return res.status(500).json({ error: 'Failed to upload logo file' });
                    }

                    const newTrademark = new Trademark(cleanedData);
                    newTrademark.save();
                    res.status(201).json({ message: 'Trademark created successfully!', trademark: newTrademark });
                });
            });
        } else {
            let logoImageName = req.files[0].originalname;
            logoImageName = Date.now() + '-' + logoImageName;
            cleanedData.logoDetails.logoFile = logoImageName;

            let params = {
                Bucket: "cyclic-long-teal-buffalo-gown-ap-southeast-2",
                Key: logoImageName,
                Body: req.files[0].buffer
            };

            s3.upload(params, (error, data) => {
                if (error) {
                    console.error('Error uploading logo file:', error);
                    return res.status(500).json({ error: 'Failed to upload logo file' });
                }

                const newTrademark = new Trademark(cleanedData);
                newTrademark.save();
                res.status(201).json({ message: 'Trademark created successfully!', trademark: newTrademark });
            });
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

        config.update({
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
            region: process.env.AWS_REGION,
            sessionToken: process.env.AWS_SESSION_TOKEN
        });

        const s3 = new S3();

        let id = req.params.id;
        id = '#' + id;
        const response = await Trademark.find({ trademarkId: id }, {
            trademarkId: 1, classificationClass: 1,
            fileDate: 1, 'logoDetails.markDesc': 1, 'logoDetails.logoFile': 1, markDesc: 1, status: 1, _id: 0
        });

        const url = s3.getSignedUrl('getObject', {
            Bucket: "cyclic-long-teal-buffalo-gown-ap-southeast-2",
            Key: response[0].logoDetails.logoFile,
            Expires: 60
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
