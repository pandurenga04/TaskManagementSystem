// controllers/authController.js
const User = require("../models/User");
const bcrypt = require("bcryptjs");

exports.register = async (req, res) => {
    try {
        const { username, email, password, bio } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            bio,
            photo: req.file ? `/uploads/${req.file.filename}` : null
        });

        await newUser.save();
        res.status(201).json({ message: "Registration successful" });
    } catch (error) {
        res.status(500).json({ error: "An error occurred during registration" });
    }
};
