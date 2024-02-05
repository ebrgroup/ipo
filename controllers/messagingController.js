const twilio = require("twilio");
const client = twilio(process.env.ACCOUNT_SID, process.env.AUTH_TOKEN);

const generateAnOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

const sendOTP = async (req, res) => {
    try {
        const { phone } = req.body;
        const updatedPhone = phone.replace(/^0+/, '');
        const response = await client.verify
        .v2.services(process.env.TWILIO_SERVICE_ID)
        .verifications.create({
            to: `+92${updatedPhone}`,
            channel: "sms"
        });
        res.status(200).json({ message: "OTP has been send to your mobile phone!" });
    } catch(error) {
        console.log(error.message)
        res.status(401).json({ error: error.message });
    }
}

const verifyOTP = async (req, res) => {
    try {
        const { phone, otp } = req.body;
        const updatedPhone = phone.replace(/^0+/, '');
        const response = await client.verify
        .v2.services(process.env.TWILIO_SERVICE_ID)
        .verificationChecks.create({
            to: `+92${updatedPhone}`,
            channel: "sms",
            code: otp
        });
        res.status(200).json({ message: "OTP verified successfully!" });
    } catch(error) {
        res.status(401).json({ error: error.message });
    }
}

module.exports = {
    generateAnOTP,
    sendOTP,
    verifyOTP
}