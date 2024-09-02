const express = require('express');
const router = express.Router();
const { notifyLine } = require('../service/lineNotify');

router.post('/notify', async (req, res) => {
    const { message } = req.body;

    try {
        const result = await notifyLine(message);
        res.json({ success: true, result });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

module.exports = router;
