const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Assuming a User model is defined
const bcrypt = require('bcryptjs');

// Register route
router.post('/register', async (req, res) => {
    const { username, email, pass, bio, imageData } = req.body;

    try {
        // Hash password before saving
        const hashedPassword = await bcrypt.hash(pass, 10);
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            bio,
            photo: imageData,  // Store base64 image data
        });

        await newUser.save();
        res.json({ success: true, message: "User registered successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Error registering user" });
    }
});

module.exports = router;
