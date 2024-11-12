const User = require('../models/User');

const registerUser = async (req, res) => {
    const { username, email, pass, bio, imageData } = req.body;
    const newUser = new User({ username, email, pass, bio, imageData });
    try {
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const loginUser = async (req, res) => {
    const { email, pass } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user || user.pass !== pass) {
            return res.status(401).json({ message: 'Invalid email/password' });
        }
        res.status(200).json({ message: 'Login successful', user });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = { registerUser, loginUser };
