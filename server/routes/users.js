const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Create or upsert user after login
router.post('/', async (req, res) => {
    try {
        const { uid, name, email, profilePicUrl } = req.body;
        const user = await User.findOneAndUpdate(
            { uid },
            { uid, name, email, profilePicUrl },
            { upsert: true, new: true, setDefaultsOnInsert: true }
        );
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get user by Firebase UID
router.get('/:uid', async (req, res) => {
    try {
        const user = await User.findOne({ uid: req.params.uid });
        if (!user) return res.status(404).json({ error: 'User not found' });
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Mock subscription — set isPremium true
router.patch('/:uid/premium', async (req, res) => {
    try {
        const user = await User.findOneAndUpdate(
            { uid: req.params.uid },
            { isPremium: true },
            { new: true }
        );
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
