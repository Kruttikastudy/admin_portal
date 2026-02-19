import express from 'express';
import Doctor from '../models/Doctor.js';
import AuditLog from '../models/AuditLog.js';

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

        // Audit log
        try {
            await AuditLog.create({
                action: 'Created',
                entity_type: 'Doctor',
                entity_id: newDoctor._id.toString(),
                entity_name: `${newDoctor.name?.first || ''} ${newDoctor.name?.last || ''}`.trim(),
                performed_by: 'admin'
            });
        } catch (logErr) { console.error('Audit log error:', logErr); }

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
        // Get old document for diff
        const oldDoc = await Doctor.findById(req.params.id).lean();
        if (!oldDoc) return res.status(404).json({ message: 'Doctor not found' });

        const doctor = await Doctor.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!doctor) return res.status(404).json({ message: 'Doctor not found' });

        // Build changes array
        const changes = [];
        const skipFields = ['_id', '__v', 'updatedAt', 'createdAt', 'img', 'photo', 'insuranceCardImage', 'insurance_card_image'];
        // Helper to check equality treating null/undefined/'' as same
        // Helper to check equality treating null/undefined/'' as same and handling Dates
        const areValuesEqual = (v1, v2) => {
            const normalize = (v) => {
                if (v === null || v === undefined || v === '') return null;
                if (Array.isArray(v)) {
                    const arr = v.map(normalize).filter(i => i !== null);
                    return arr.length > 0 ? arr : null;
                }
                if (typeof v === 'object') {
                    // Check if it's a Date object or look-alike
                    if (v instanceof Date || (typeof v.toISOString === 'function')) {
                        return v.toISOString();
                    }

                    const newObj = {};
                    const keys = Object.keys(v).sort(); // Sort keys for stringify match
                    let hasContent = false;
                    for (const k of keys) {
                        const val = normalize(v[k]);
                        if (val !== null) {
                            newObj[k] = val;
                            hasContent = true;
                        }
                    }
                    return hasContent ? newObj : null;
                }
                // Check if string is a valid ISO date and normalize it
                if (typeof v === 'string') {
                    // Regex for basic ISO date format or YYYY-MM-DD
                    if (/^\d{4}-\d{2}-\d{2}/.test(v)) {
                        const d = new Date(v);
                        if (!isNaN(d.getTime())) {
                            return d.toISOString();
                        }
                    }
                }
                return v;
            };
            return JSON.stringify(normalize(v1)) === JSON.stringify(normalize(v2));
        };

        for (const key of Object.keys(req.body)) {
            if (skipFields.includes(key)) continue;
            // Skip flat fields which are just aliases or helpers in frontend
            if (['primaryContact', 'alternateContact', 'address1', 'city', 'country'].includes(key)) continue;

            if (!areValuesEqual(oldDoc[key], req.body[key])) {
                changes.push({ field: key, oldValue: oldDoc[key], newValue: req.body[key] });
            }
        }

        // Audit log
        if (changes.length > 0) {
            try {
                await AuditLog.create({
                    action: 'Updated',
                    entity_type: 'Doctor',
                    entity_id: doctor._id.toString(),
                    entity_name: `${doctor.name?.first || ''} ${doctor.name?.last || ''}`.trim(),
                    performed_by: 'admin',
                    changes
                });
            } catch (logErr) { console.error('Audit log error:', logErr); }
        }

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

        // Audit log
        try {
            await AuditLog.create({
                action: 'Deleted',
                entity_type: 'Doctor',
                entity_id: doctor._id.toString(),
                entity_name: `${doctor.name?.first || ''} ${doctor.name?.last || ''}`.trim(),
                performed_by: 'admin'
            });
        } catch (logErr) { console.error('Audit log error:', logErr); }

        res.json({ message: 'Doctor deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

export default router;
