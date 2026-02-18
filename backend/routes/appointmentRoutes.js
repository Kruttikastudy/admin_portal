import express from 'express';
import Appointment from '../models/appointments.js';

const router = express.Router();

// Get all appointments
router.get('/', async (req, res) => {
    try {
        const appointments = await Appointment.find().sort({ createdAt: -1 });
        res.json(appointments);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create an appointment
router.post('/', async (req, res) => {
    try {
        const appointment = new Appointment(req.body);
        const newAppointment = await appointment.save();
        res.status(201).json(newAppointment);
    } catch (err) {
        console.error('Appointment POST error:', err);
        if (err.name === 'ValidationError') {
            const msg = Object.values(err.errors || {}).map(e => e.message).join('; ') || err.message;
            return res.status(400).json({ message: msg });
        }
        res.status(500).json({ message: err.message || 'Failed to save appointment' });
    }
});

// Get one appointment
router.get('/:id', async (req, res) => {
    try {
        const appointment = await Appointment.findById(req.params.id);
        if (!appointment) return res.status(404).json({ message: 'Appointment not found' });
        res.json(appointment);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Update an appointment
router.put('/:id', async (req, res) => {
    try {
        const appointment = await Appointment.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!appointment) return res.status(404).json({ message: 'Appointment not found' });
        res.json(appointment);
    } catch (err) {
        console.error('Appointment PUT error:', err);
        if (err.name === 'ValidationError') {
            const msg = Object.values(err.errors || {}).map(e => e.message).join('; ') || err.message;
            return res.status(400).json({ message: msg });
        }
        res.status(500).json({ message: err.message || 'Failed to update appointment' });
    }
});

// Delete an appointment
router.delete('/:id', async (req, res) => {
    try {
        const appointment = await Appointment.findByIdAndDelete(req.params.id);
        if (!appointment) return res.status(404).json({ message: 'Appointment not found' });
        res.json({ message: 'Appointment deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

export default router;
