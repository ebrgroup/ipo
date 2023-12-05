const User = require('../modals/user');
const bcrypt = require("bcrypt");

const fetchUsersData = async (req, res) => {
    try 
    {
        const usersData = await User.find();
        res.status(200).json({ usersData });
    } 
    catch (error) 
    {
        res.status(500).json({ error: "An error has occurred while retrieving the users data." });
    }
};

const fetchUserData = async (req, res) => {
    try 
    {
        const userId = req.params.id;
        const userData = await User.findById({ _id: userId });
        res.status(200).json({ userData });
    } 
    catch (error) 
    {
        res.status(500).json({ error: "An error has occurred while retrieving the user data." });
    }
};

const createUserDocument = async (req, res) => {
    try 
    {
        const { 
            cnic, 
            email, 
            phone, 
            password, 
            fullname, 
            gender, 
            category, 
            landlineNum, 
            faxNum, 
            address, 
            province, 
            city 
        } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const userData = await User.create({ 
            cnic, 
            email, 
            phone, 
            password: hashedPassword, 
            fullname, 
            gender, 
            category, 
            landlineNum, 
            faxNum, 
            address, 
            province, 
            city
        });
        res.status(200).json({ userData });
    } 
    catch (error) 
    {
        if (error.code === 11000 && error.keyPattern.cnic === 1) {
            res.status(500).json({ error: "User with this CNIC already exists." });
        } 
        else if (error.code === 11000 && error.keyPattern.email === 1) {
            res.status(500).json({ error: "User with this email already exists." });
        }
        else if (error.code === 11000 && error.keyPattern.phone === 1) {
            res.status(500).json({ error: "User with this phone no. already exists." });
        } else {
            res.status(500).json({ error: "An error has occurred while writing the user data." });
        }
    }
};

const updateUserData = async (req, res) => {
    try 
    {
        const userId = req.params.id;
        const { 
            cnic, 
            email, 
            phone, 
            password, 
            fullname, 
            gender, 
            category, 
            landlineNum, 
            faxNum, 
            address, 
            province, 
            city 
         } = req.body;
        let hashedPassword = undefined;

        if(password !== undefined)
            hashedPassword = await bcrypt.hash(password, 10);

        await User.findByIdAndUpdate(userId, { 
            cnic, 
            email, 
            phone, 
            password, 
            fullname, 
            gender, 
            category, 
            landlineNum, 
            faxNum, 
            address, 
            province, 
            city 
        });
        const userData = await User.findById(accountId);
        res.status(200).json({ userData });
    } 
    catch (error) 
    {
        if (error.code === 11000 && error.keyPattern.cnic === 1) {
            res.status(500).json({ error: "User with this CNIC already exists." });
        } 
        else if (error.code === 11000 && error.keyPattern.email === 1) {
            res.status(500).json({ error: "User with this email already exists." });
        }
        else if (error.code === 11000 && error.keyPattern.phone === 1) {
            res.status(500).json({ error: "User with this phone no. already exists." });
        } else {
            res.status(500).json({ error: "An error has occurred while writing the user data." });
        }
    }
};

const changePassword = async (req, res) => {
    const userId = req.params.id;
    const { password, newPassword } = req.body;

    try {
        const userData = await User.findById({ _id: userId });
        const oldPasswordMatch = await bcrypt.compare(password, userData.password);

        if (!oldPasswordMatch) {
            return res.status(401).json({ message: "Invalid Password" });
        }

        const newPasswordMatch = await bcrypt.compare(newPassword, userData.password);

        if (newPasswordMatch) {
            return res.status(401).json({ message: "New and old password cannot be the same." });
        }
        let hashedPassword = await bcrypt.hash(newPassword, 10);

        await User.findByIdAndUpdate(userId, {
            password: hashedPassword
        });

        res.status(200).json({ message: "You have successfully changed your password." });
    } catch (error) {
        res.status(500).json({ error: "An error has occurred while updating the password" });
        console.log(error);
    }
};

const deleteUserData = async (req, res) => {
    try 
    {
        const userId = req.params.id;
        await User.deleteOne({ _id: userId });
        const usersData = await User.find();
        res.status(200).json({ usersData });
    } 
    catch (error) 
    {
        res.status(500).json({ error: "An error has occurred while deleting the user data." });
    }
};

module.exports = {
    fetchUsersData,
    fetchUserData,
    createUserDocument,
    updateUserData,
    changePassword,
    deleteUserData
};