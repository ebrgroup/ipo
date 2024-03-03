const nodemailer = require("nodemailer");
const crypto = require("crypto");
const smtpTransport = require("nodemailer-smtp-transport");
const { google } = require("googleapis");
const cookieParser = require("cookie-parser");
const Users = require("../modals/user");
const messagingController = require("./messagingController");

const generateResetToken =  async (email) => {
    try {
        const resetToken = crypto.randomBytes(20).toString("hex");
        const resetTokenExpiry = Date.now() + 3600000;

        const user = await Users.findOneAndUpdate(
            { email },
            { $set: { resetToken, resetTokenExpiry } },
            { new: true }
        );
        if(!user) {
            return null;
        }
        return resetToken;
    } catch (error) {
        return { error: error.message }
    }
}

const getAccessToken = async () => {
    try {
        const oAuth2Client = new google.auth.OAuth2(process.env.CLIENT_ID, process.env.CLIENT_SECRET, 
                                                    "https://developers.google.com/oauthplayground");
        oAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });

        const { token } = await oAuth2Client.getAccessToken();
        return token;
    } catch (error) {
        return { error: error.message }
    }
}

const sendEmailForResetPassword = async (req, res) => {
    try {
        const { email, isOTPEmail } = req.body;
        const accessToken = await getAccessToken();

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
              type: "OAuth2",
              user: process.env.EMAIL,
              accessToken,
              clientId: process.env.CLIENT_ID,
              clientSecret: process.env.CLIENT_SECRET,
              refreshToken: process.env.REFRESH_TOKEN
            },
            tls: {
                rejectUnauthorized: false
            }
          });
        let resetLink = "";
        let otp = 0;
        if(isOTPEmail) {
            otp = messagingController.generateAnOTP();
            res.cookie("otp", otp, { secure: true, httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
        } else {
            const resetToken = await generateResetToken(email);
            if (process.env.NODE_ENV != "production") {
                resetLink = `http://localhost:5000/ipo/users/Request/${ resetToken }`;
            } else {
                resetLink = `https://ipo-pk.cyclic.app/ipo/users/Request/${ resetToken }`;
            }
            if(resetToken == null) {
                return res.status(404).json({ error: "User with this email doesn't exist" });
            } else if (resetToken && resetToken.error) {
                return res.status(404).json({ error: resetToken.error });
            }
        }
        let text = isOTPEmail ? `Your OTP for email verification is: ${ otp }` : 
                                `Click on the link below to reset your password\n: ${ resetLink }`;
        let subject = isOTPEmail ? "IPO-OTP" : "Reset Password Link";

        const mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject,
            text
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if(error) {
                console.log(error)
                return res.status(404).json({ error: "We were unable to send you the password recovery link!" });
            }
            res.status(200).json({ message: "We have sent you the password recovery link. Please check your email!" });
        });
    } catch(error) {
        res.status(404).json({ error: error.message });
    }
}

const verifyOTP = async (req, res) => {
    try {
        const { otp } = req.cookies;
        const { enteredOTP } = req.body;

        if(enteredOTP === otp) {
            res.clearCookie('otp');
            res.status(200).json({ success: true });
        } else {
            res.status(401).json({ success: false, error: 'Invalid OTP or OTP has been expired!' });
        }
    } catch(error) {
        res.status(401).json({ success: false, error: error.message });
    }
}

module.exports = {
    sendEmailForResetPassword,
    verifyOTP
}