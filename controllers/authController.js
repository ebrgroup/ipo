const User = require('../modals/user');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
    const { cnic, password } = req.body;
    try
    {
        const user = await User.findOne({ cnic });
        if (!user)
        {
            return res.status(401).json({ message: "Invalid Credentials!" });
        }
        
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch)
        {
            return res.status(401).json({ message: "Invalid Credentials!" });
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: "24h",
        });
        res.json({ token, _id: user._id });
    }
    catch (error)
    {
        res.status(500).json({ message: "Server error!" });
    }
}

module.exports = {
    login
};