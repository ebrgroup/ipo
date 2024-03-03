const Trademark = require("../modals/trademark.js");
const { ObjectId } = require('mongodb');

const insertTradeMark = async (req, res) => {
    try {
        req.body.applicationOwner = JSON.parse(req.body.applicationOwner);
        req.body.ownerDetails = JSON.parse(req.body.ownerDetails);
        req.body.logoDetails = JSON.parse(req.body.logoDetails);
        const cleanedData = removeEmptyFields(req.body);

        const logoImagePath = req.files['logoFile'][0].filename;

        if (req.files['licenseFile'] && req.files['licenseFile'][0]) {
            const licenseFilePath = req.files['licenseFile'][0].filename;
            cleanedData.applicationOwner.licenseFile = licenseFilePath;
        }

        cleanedData.logoDetails.logoFile = logoImagePath;

        const newTrademark = new Trademark(cleanedData);
        await newTrademark.save();
        res.status(201).json({ message: 'Trademark created successfully!', trademark: newTrademark });
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
        console.log(registerd, applied);
        res.status(200).json({ registerd, applied });
    } catch (error) {
        console.error(error.message);
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
        let id = req.params.id;
        id = '#' + id;
        // console.log(id);
        const response = await Trademark.find({ trademarkId: id }, {
            trademarkId: 1, classificationClass: 1,
            fileDate: 1, 'logoDetails.markDesc': 1, 'logoDetails.logoFile': 1, markDesc: 1, status: 1, _id: 0
        });

        res.status(200).json({ response });
        console.log(response);

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
