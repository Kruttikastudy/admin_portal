import express from 'express';
import AdminProfile from '../models/AdminProfile.js';

const router = express.Router();

// Get Admin Profile (Create if not exists)
router.get('/', async (req, res) => {
    try {
        let profile = await AdminProfile.findOne({ username: 'admin' });
        if (!profile) {
            profile = new AdminProfile({ username: 'admin' });
            await profile.save();
        }
        res.json(profile);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Update Admin Profile
router.put('/', async (req, res) => {
    try {
        const { name, dob, email, contact, userId } = req.body;


        let profile = await AdminProfile.findOne({ username: 'admin' });
        if (!profile) {
            profile = new AdminProfile({ username: 'admin' });
        }

        profile.name = name || profile.name;
        profile.dob = dob || profile.dob;
        profile.email = email || profile.email;
        profile.contact = contact || profile.contact;
        profile.userId = userId || profile.userId;

        const updatedProfile = await profile.save();
        res.json(updatedProfile);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

export default router;
