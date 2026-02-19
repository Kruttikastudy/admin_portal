import express from 'express';
import AuditLog from '../models/AuditLog.js';

const router = express.Router();

// Get audit logs (newest first)
router.get('/', async (req, res) => {
    try {
        const limitStr = req.query.limit;
        let limit = 100;
        if (limitStr === 'all') {
            limit = 0; // No limit
        } else if (limitStr) {
            limit = parseInt(limitStr, 10);
        }

        let query = AuditLog.find().sort({ createdAt: -1 });
        if (limit > 0) {
            query = query.limit(limit);
        }

        const logs = await query;
        res.json(logs);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get unread count
router.get('/unread-count', async (req, res) => {
    try {
        const count = await AuditLog.countDocuments({ read: false });
        res.json({ count });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Mark all as read
router.post('/mark-read', async (req, res) => {
    try {
        await AuditLog.updateMany({ read: false }, { $set: { read: true } });
        res.json({ message: 'All notifications marked as read' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

export default router;
