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
            firstName,
            lastName, 
            gender, 
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
            firstName,
            lastName, 
            gender,
            landlineNum, 
            faxNum, 
            address, 
            province, 
            city,
            resetToken: "",
            resetTokenExpiry: null
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

const validateUserData = async (req, res) => {
    try {
        const {
            cnic,
            email,
            phone,
        } = req.body;

        const [existingCNIC, existingEmail, existingPhone] = await Promise.all([
            User.exists({ cnic }),
            User.exists({ email }),
            User.exists({ phone }),
        ]);

        if (existingCNIC) {
            return res.status(500).json({ error: "User with this CNIC already exists." });
        }
        if (existingEmail) {
            return res.status(500).json({ error: "User with this email already exists." });
        }
        if (existingPhone) {
            return res.status(500).json({ error: "User with this phone no. already exists." });
        }

        res.status(200).json({ success: true });
    } catch (error) {
        res.status(500).json({ error: "An error occurred during data validation." });
    }
};

const fetchUserByEmail = async (req, res) => {
    try {
        const { email } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(500).json({ error: "User with this email does not exist." });
        }

        res.status(200).json({ user });
    } catch (error) {
        res.status(500).json({ error: "An error occurred while fetching user by email." });
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
            // password, 
            firstName,
            lastName, 
            gender, 
            landlineNum, 
            faxNum, 
            address, 
            province, 
            city 
         } = req.body;
        // let hashedPassword = undefined;

        // if(password !== undefined)
        //     hashedPassword = await bcrypt.hash(password, 10);

        await User.findByIdAndUpdate(userId, { 
            cnic, 
            email, 
            phone, 
            // password, 
            firstName,
            lastName,  
            gender,
            landlineNum, 
            faxNum, 
            address, 
            province, 
            city 
        });
        const userData = await User.findById({ _id: userId });
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
            res.status(401).json({ error: "An error has occurred while updating the user data." });
        }
    }
};

const checkResetPasswordLink = async (req, res) => {
    try {
        const token = req.params.id;

        const user = await User.findOne({
            resetToken: token,
            resetTokenExpiry: { $gt: Date.now() }
        });

        if(!user) {
            if (process.env.NODE_ENV != "production") {
                return res.redirect(`http://localhost:3000/signin`); // create a new page to show that the link has expired   
            }
            return res.redirect(`https://ipo-pk.cyclic.app/signin`);
        }
        if (process.env.NODE_ENV != "production") {
            return res.redirect(`http://localhost:3000/createnewpassword/${token}`); 
        }
        return res.redirect(`https://ipo-pk.cyclic.app/createnewpassword/${token}`);
    } catch(error) {
        res.status(404).json({ error: error.message });
    }
}

const changePassword = async (req, res) => {
    const userId = req.params.id;
    const { password, newPassword, isNew } = req.body;

    try {
        const userData = await User.findById({ _id: userId });
        if(isNew !== true)
        {
            const oldPasswordMatch = await bcrypt.compare(password, userData.password);

            if (!oldPasswordMatch) {
                return res.status(401).json({ message: "Invalid Password" });
            }

            const newPasswordMatch = await bcrypt.compare(newPassword, userData.password);

            if (newPasswordMatch) {
                return res.status(401).json({ message: "New and old password cannot be the same." });
            }
        }
        let hashedPassword = await bcrypt.hash(newPassword, 10);

        await User.findByIdAndUpdate(userId, {
            password: hashedPassword
        });

        res.status(200).json({ message: "You have successfully changed your password." });
    } catch (error) {
        res.status(500).json({ error: "An error has occurred while updating the password" });
    }
};

const resetPassword = async (req, res) => {
    try {
        const token = req.params.id;
        const { newPassword } = req.body;
        const userData = await User.findOne({ resetToken: token });
        const oldPasswordMatch = await bcrypt.compare(newPassword, userData.password);
        if(oldPasswordMatch) {
            return res.status(401).json({ error: "New and old password cannot be the same." });
        }

        let hashedPassword = await bcrypt.hash(newPassword, 10);

        await User.findByIdAndUpdate(userData._id, {
            password: hashedPassword,
            resetToken: "",
            resetTokenExpiry: null
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
    checkResetPasswordLink,
    changePassword,
    resetPassword,
    deleteUserData,
    validateUserData,
    fetchUserByEmail
};