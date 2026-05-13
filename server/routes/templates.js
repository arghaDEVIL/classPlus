const express = require('express');
const router = express.Router();
const Template = require('../models/Template');

// Get trending (5 most recent free templates)
router.get('/trending', async (req, res) => {
    try {
        const templates = await Template.find({ isFree: true })
            .sort({ createdAt: -1 })
            .limit(5);
        res.json(templates);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get all templates with optional category filter and pagination
router.get('/', async (req, res) => {
    try {
        const { category, page = 1, limit = 20 } = req.query;
        const filter = category && category !== 'All' ? { category } : {};
        const templates = await Template.find(filter)
            .skip((page - 1) * limit)
            .limit(parseInt(limit))
            .sort({ createdAt: -1 });
        const total = await Template.countDocuments(filter);
        res.json({ templates, total, page: parseInt(page) });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
