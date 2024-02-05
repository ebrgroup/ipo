const User = require('../modals/user');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
    const { email, password } = req.body;
    try
    {
        const user = await User.findOne({ email });
        if (!user)
        {
            return res.status(401).json({ message: "Account with this email does not exist!" });
        }
        
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch)
        {
            return res.status(401).json({ message: "Invalid Credentials!" });
        }

        // const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        //     expiresIn: "24h",
        // });
        res.json({ user });
    }
    catch (error)
    {
        res.status(500).json({ message: "Server error!" });
    }
}

module.exports = {
    login
};