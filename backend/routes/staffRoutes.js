import express from 'express';
import Staff from '../models/Staff.js';

const router = express.Router();

// Get all staff
router.get('/', async (req, res) => {
    try {
        const staff = await Staff.find();
        res.json(staff);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create a staff member
router.post('/', async (req, res) => {
    try {
        const staff = new Staff(req.body);
        const newStaff = await staff.save();
        res.status(201).json(newStaff);
    } catch (err) {
        console.error('Staff POST error:', err);
        if (err.code === 11000) {
            const field = err.keyPattern ? Object.keys(err.keyPattern).join(', ') : 'staff_id';
            return res.status(409).json({ message: `A staff member with this ${field.replace('contact_info.', '')} already exists. Please use a different value or edit the existing staff member.` });
        }
        if (err.name === 'ValidationError') {
            const msg = Object.values(err.errors || {}).map(e => e.message).join('; ') || err.message;
            return res.status(400).json({ message: msg });
        }
        res.status(500).json({ message: err.message || 'Failed to save staff' });
    }
});

// Get one staff member
router.get('/:id', async (req, res) => {
    try {
        const staff = await Staff.findById(req.params.id);
        if (!staff) return res.status(404).json({ message: 'Staff member not found' });
        res.json(staff);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Update a staff member
router.put('/:id', async (req, res) => {
    try {
        const staff = await Staff.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!staff) return res.status(404).json({ message: 'Staff member not found' });
        res.json(staff);
    } catch (err) {
        console.error('Staff PUT error:', err);
        if (err.code === 11000) {
            return res.status(409).json({ message: 'A staff member with this staff_id already exists. Please use a different value.' });
        }
        if (err.name === 'ValidationError') {
            const msg = Object.values(err.errors || {}).map(e => e.message).join('; ') || err.message;
            return res.status(400).json({ message: msg });
        }
        res.status(500).json({ message: err.message || 'Failed to update staff' });
    }
});

// Delete a staff member
router.delete('/:id', async (req, res) => {
    try {
        const staff = await Staff.findByIdAndDelete(req.params.id);
        if (!staff) return res.status(404).json({ message: 'Staff member not found' });
        res.json({ message: 'Staff member deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

export default router;
