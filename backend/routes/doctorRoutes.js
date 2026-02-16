import express from 'express';
import Doctor from '../models/Doctor.js';

const router = express.Router();

// Get all doctors
router.get('/', async (req, res) => {
    try {
        const doctors = await Doctor.find();
        res.json(doctors);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create a doctor
router.post('/', async (req, res) => {
    try {
        const doctor = new Doctor(req.body);
        const newDoctor = await doctor.save();
        res.status(201).json(newDoctor);
    } catch (err) {
        console.error('Doctor POST error:', err);
        if (err.code === 11000) {
            const field = err.keyPattern ? Object.keys(err.keyPattern).join(', ') : 'email';
            return res.status(409).json({ message: `A doctor with this ${field.replace('contact_info.', '')} already exists. Please use a different email or edit the existing doctor.` });
        }
        if (err.name === 'ValidationError') {
            const msg = Object.values(err.errors || {}).map(e => e.message).join('; ') || err.message;
            return res.status(400).json({ message: msg });
        }
        res.status(500).json({ message: err.message || 'Failed to save doctor' });
    }
});

// Get one doctor
router.get('/:id', async (req, res) => {
    try {
        const doctor = await Doctor.findById(req.params.id);
        if (!doctor) return res.status(404).json({ message: 'Doctor not found' });
        res.json(doctor);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Update a doctor
router.put('/:id', async (req, res) => {
    try {
        const doctor = await Doctor.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!doctor) return res.status(404).json({ message: 'Doctor not found' });
        res.json(doctor);
    } catch (err) {
        console.error('Doctor PUT error:', err);
        if (err.code === 11000) {
            return res.status(409).json({ message: 'A doctor with this email already exists. Please use a different email.' });
        }
        if (err.name === 'ValidationError') {
            const msg = Object.values(err.errors || {}).map(e => e.message).join('; ') || err.message;
            return res.status(400).json({ message: msg });
        }
        res.status(500).json({ message: err.message || 'Failed to update doctor' });
    }
});

// Delete a doctor
router.delete('/:id', async (req, res) => {
    try {
        const doctor = await Doctor.findByIdAndDelete(req.params.id);
        if (!doctor) return res.status(404).json({ message: 'Doctor not found' });
        res.json({ message: 'Doctor deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

export default router;
