import express from 'express';
import Patient from '../models/Patient.js';
import AuditLog from '../models/AuditLog.js';

const router = express.Router();

// Get all patients
router.get('/', async (req, res) => {
    try {
        const patients = await Patient.find();
        res.json(patients);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create a patient
router.post('/', async (req, res) => {
    const patient = new Patient(req.body);
    try {
        const newPatient = await patient.save();

        // Audit log
        try {
            await AuditLog.create({
                action: 'Created',
                entity_type: 'Patient',
                entity_id: newPatient._id.toString(),
                entity_name: `${newPatient.name?.first || ''} ${newPatient.name?.last || ''}`.trim(),
                performed_by: 'admin'
            });
        } catch (logErr) { console.error('Audit log error:', logErr); }

        res.status(201).json(newPatient);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Get one patient
router.get('/:id', async (req, res) => {
    try {
        const patient = await Patient.findById(req.params.id);
        if (!patient) return res.status(404).json({ message: 'Patient not found' });
        res.json(patient);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Update a patient
router.put('/:id', async (req, res) => {
    try {
        const oldDoc = await Patient.findById(req.params.id).lean();
        if (!oldDoc) return res.status(404).json({ message: 'Patient not found' });

        const patient = await Patient.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!patient) return res.status(404).json({ message: 'Patient not found' });

        // Build changes array
        const changes = [];
        const skipFields = ['_id', '__v', 'updatedAt', 'createdAt', 'img', 'photo', 'insurance_card_image'];
        for (const key of Object.keys(req.body)) {
            if (skipFields.includes(key)) continue;
            const oldVal = JSON.stringify(oldDoc[key] || '');
            const newVal = JSON.stringify(req.body[key] || '');
            if (oldVal !== newVal) {
                changes.push({ field: key, oldValue: oldDoc[key], newValue: req.body[key] });
            }
        }

        if (changes.length > 0) {
            try {
                await AuditLog.create({
                    action: 'Updated',
                    entity_type: 'Patient',
                    entity_id: patient._id.toString(),
                    entity_name: `${patient.name?.first || ''} ${patient.name?.last || ''}`.trim(),
                    performed_by: 'admin',
                    changes
                });
            } catch (logErr) { console.error('Audit log error:', logErr); }
        }

        res.json(patient);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete a patient
router.delete('/:id', async (req, res) => {
    try {
        const patient = await Patient.findByIdAndDelete(req.params.id);
        if (!patient) return res.status(404).json({ message: 'Patient not found' });

        try {
            await AuditLog.create({
                action: 'Deleted',
                entity_type: 'Patient',
                entity_id: patient._id.toString(),
                entity_name: `${patient.name?.first || ''} ${patient.name?.last || ''}`.trim(),
                performed_by: 'admin'
            });
        } catch (logErr) { console.error('Audit log error:', logErr); }

        res.json({ message: 'Patient deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

export default router;
