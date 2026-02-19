import express from 'express';
import Doctor from '../models/Doctor.js';
import Staff from '../models/Staff.js';
import Patient from '../models/Patient.js';

const router = express.Router();

// Helper to flatten nested objects for CSV
function flattenObject(obj, prefix = '') {
    const result = {};
    for (const key of Object.keys(obj)) {
        const val = obj[key];
        const newKey = prefix ? `${prefix}.${key}` : key;
        if (val && typeof val === 'object' && !Array.isArray(val) && !(val instanceof Date)) {
            Object.assign(result, flattenObject(val, newKey));
        } else {
            result[newKey] = val;
        }
    }
    return result;
}

// Get column definitions for each entity type
function getColumnDefs(type) {
    switch (type) {
        case 'doctors':
            return [
                { key: 'name.first', label: 'First Name' },
                { key: 'name.last', label: 'Last Name' },
                { key: 'contact_info.email', label: 'Email' },
                { key: 'contact_info.phone', label: 'Phone' },
                { key: 'specialization', label: 'Specialization' },
                { key: 'designation', label: 'Designation' },
                { key: 'department', label: 'Department' },
                { key: 'status', label: 'Status' },
                { key: 'gender', label: 'Gender' },
                { key: 'date_of_birth', label: 'Date of Birth' },
                { key: 'blood_group', label: 'Blood Group' },
                { key: 'qualification', label: 'Qualification' },
                { key: 'experience_years', label: 'Experience (Years)' },
                { key: 'joining_date', label: 'Joining Date' }
            ];
        case 'staff':
            return [
                { key: 'name.first', label: 'First Name' },
                { key: 'name.last', label: 'Last Name' },
                { key: 'contact_info.email', label: 'Email' },
                { key: 'contact_info.phone', label: 'Phone' },
                { key: 'role', label: 'Role' },
                { key: 'department', label: 'Department' },
                { key: 'staff_id', label: 'Staff ID' },
                { key: 'status', label: 'Status' },
                { key: 'gender', label: 'Gender' },
                { key: 'date_of_birth', label: 'Date of Birth' },
                { key: 'designation', label: 'Designation' },
                { key: 'shift', label: 'Shift' },
                { key: 'joining_date', label: 'Joining Date' }
            ];
        case 'patients':
            return [
                { key: 'name.first', label: 'First Name' },
                { key: 'name.last', label: 'Last Name' },
                { key: 'contact_info.mobile.number', label: 'Mobile' },
                { key: 'contact_info.email', label: 'Email' },
                { key: 'date_of_birth', label: 'Date of Birth' },
                { key: 'gender', label: 'Gender' },
                { key: 'blood_group', label: 'Blood Group' },
                { key: 'marital_status', label: 'Marital Status' },
                { key: 'occupation', label: 'Occupation' },
                { key: 'nationality', label: 'Nationality' },
                { key: 'aadhaar', label: 'Aadhaar' },
                { key: 'pan', label: 'PAN' }
            ];
        default:
            return [];
    }
}

// GET /api/export/columns/:type — return available columns for the entity
router.get('/columns/:type', (req, res) => {
    const cols = getColumnDefs(req.params.type);
    if (!cols.length) return res.status(400).json({ message: 'Invalid type' });
    res.json(cols);
});

// GET /api/export/:type — download CSV
router.get('/:type', async (req, res) => {
    try {
        const { type } = req.params;
        const { columns, limit, orderBy, includeHeader } = req.query;

        let Model;
        if (type === 'doctors') Model = Doctor;
        else if (type === 'staff') Model = Staff;
        else if (type === 'patients') Model = Patient;
        else return res.status(400).json({ message: 'Invalid export type. Use doctors, staff, or patients.' });

        // Build query
        let query = Model.find().lean();

        // Ordering
        if (orderBy) {
            query = query.sort({ [orderBy]: 1 });
        } else {
            query = query.sort({ createdAt: -1 });
        }

        // Limit
        const recordLimit = parseInt(limit) || 0;
        if (recordLimit > 0) {
            query = query.limit(recordLimit);
        }

        const data = await query;

        // Determine columns to export
        const allCols = getColumnDefs(type);
        let selectedCols;
        if (columns) {
            const colKeys = columns.split(',');
            selectedCols = allCols.filter(c => colKeys.includes(c.key));
        } else {
            selectedCols = allCols;
        }

        // Helper to get nested value
        function getNestedValue(obj, path) {
            return path.split('.').reduce((curr, key) => (curr && curr[key] !== undefined ? curr[key] : ''), obj);
        }

        // Build CSV string
        let csv = '';
        const shouldIncludeHeader = includeHeader !== 'false';

        if (shouldIncludeHeader) {
            csv += selectedCols.map(c => `"${c.label}"`).join(',') + '\n';
        }

        for (const record of data) {
            const row = selectedCols.map(col => {
                let val = getNestedValue(record, col.key);
                if (val === null || val === undefined) val = '';
                // Escape quotes in CSV
                val = String(val).replace(/"/g, '""');
                return `"${val}"`;
            });
            csv += row.join(',') + '\n';
        }

        res.setHeader('Content-Type', 'text/csv');
        res.setHeader('Content-Disposition', `attachment; filename=${type}_export.csv`);
        res.send(csv);
    } catch (err) {
        console.error('Export error:', err);
        res.status(500).json({ message: err.message });
    }
});

export default router;
