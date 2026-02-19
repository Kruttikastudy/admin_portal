import React, { useState, useEffect, useMemo } from 'react';
import { getApiUrl } from '../api';
import './ExportModal.css';

function ExportModal({ onClose }) {
    const [entity, setEntity] = useState('Patients');
    const [exportFormat, setExportFormat] = useState('CSV');
    const [exportAll, setExportAll] = useState(false);
    const [numberOfRecords, setNumberOfRecords] = useState('10');
    const [exportColumnHeader, setExportColumnHeader] = useState(true);
    const [orderBy, setOrderBy] = useState('');
    const [loading, setLoading] = useState(false);

    // Dynamic Columns Configuration (Database Keys)
    const columnsConfig = useMemo(() => ({
        Patients: [
            'name', 'date_of_birth', 'gender', 'marital_status', 'nationality', 'category',
            'blood_group', 'address', 'occupation', 'aadhaar', 'pan',
            'contact_info', 'insurance', 'allergies', 'family_history', 'social_history'
        ],
        Doctors: [
            'name', 'specialization', 'qualifications', 'experience_years', 'contact_info',
            'status', 'shift_start', 'shift_end', 'date_of_birth', 'license_no', 'license_expiry',
            'department', 'designation', 'joining_date', 'shift_type', 'insurance'
        ],
        Staff: [
            'name', 'role', 'department', 'staff_id', 'contact_info', 'status',
            'shift', 'date_of_birth', 'designation', 'joining_date', 'insurance'
        ],
        Appointments: [
            'patient_name', 'patient_id', 'age', 'contact_information', 'appointment_date',
            'appointment_time', 'appointment_type', 'reason_for_appointment', 'urgency',
            'doctor', 'comments'
        ]
    }), []);

    const [columns, setColumns] = useState({});

    // Reset columns when entity changes
    useEffect(() => {
        const initialCols = {};
        columnsConfig[entity].forEach(col => {
            initialCols[col] = true; // Default select all
        });
        setColumns(initialCols);
    }, [entity, columnsConfig]);

    const toggleColumn = (col) => {
        setColumns(prev => ({ ...prev, [col]: !prev[col] }));
    };

    const selectAll = () => {
        const newCols = {};
        columnsConfig[entity].forEach(c => newCols[c] = true);
        setColumns(newCols);
    };

    const deselectAll = () => {
        const newCols = {};
        columnsConfig[entity].forEach(c => newCols[c] = false);
        setColumns(newCols);
    };

    const [previewData, setPreviewData] = useState([]);
    const [showPreview, setShowPreview] = useState(false);

    const fetchData = async (limit = null) => {
        let endpoint = '';
        switch (entity) {
            case 'Patients': endpoint = '/api/patients'; break;
            case 'Doctors': endpoint = '/api/doctors'; break;
            case 'Staff': endpoint = '/api/staff'; break;
            case 'Appointments': endpoint = '/api/appointments'; break;
            default: endpoint = '/api/patients';
        }

        const res = await fetch(getApiUrl(endpoint));
        if (!res.ok) throw new Error('Failed to fetch data');

        let data = await res.json();
        if (data.data && Array.isArray(data.data)) data = data.data;
        if (!Array.isArray(data)) data = [];

        // Apply limit
        if (limit) {
            const numLimit = parseInt(limit, 10);
            if (!isNaN(numLimit) && numLimit > 0 && numLimit < data.length) {
                data = data.slice(0, numLimit);
            }
        } else if (!exportAll) {
            const numLimit = parseInt(numberOfRecords, 10);
            if (!isNaN(numLimit) && numLimit > 0 && numLimit < data.length) {
                data = data.slice(0, numLimit);
            }
        }
        return data;
    };

    const getColumnValue = (row, col, type) => {
        const val = (path) => {
            return path.split('.').reduce((acc, part) => acc && acc[part], row) || '';
        };

        // Common formatters
        const formatDate = (dateStr) => {
            if (!dateStr) return '';
            const d = new Date(dateStr);
            return isNaN(d.getTime()) ? dateStr : d.toLocaleDateString();
        };

        const formatName = (nameObj) => {
            if (!nameObj) return '';
            return `${nameObj.first || ''} ${nameObj.middle || ''} ${nameObj.last || ''}`.replace(/\s+/g, ' ').trim();
        };

        const formatAddress = (addr) => {
            if (!addr) return '';
            if (typeof addr === 'string') return addr;
            return `${addr.street || ''}, ${addr.city || ''}, ${addr.state || ''} ${addr.zip_code || ''}`.replace(/^, /, '').trim();
        };

        // Entity specific mappings
        switch (col) {
            case 'Name':
            case 'Patient Name':
                return formatName(row.name) || row.patient_name || '';
            case 'Date of Birth': return formatDate(row.date_of_birth);
            case 'Joining Date': return formatDate(row.joining_date);
            case 'Date': return formatDate(row.date);
            case 'Mobile':
            case 'Phone':
            case 'Contact':
                return row.mobile || row.contact_info?.phone || row.phone || '';
            case 'Email': return row.email || row.contact_info?.email || '';
            case 'Address': return formatAddress(row.address);
            case 'Schedule':
                return Array.isArray(row.availability)
                    ? row.availability.map(s => `${s.day}: ${s.startTime}-${s.endTime}`).join('; ')
                    : '';
            case 'Status': return row.status || ''; // Often just a string
            case 'Age': return row.age || '';
            case 'Gender': return row.gender || '';
            case 'Specialization': return row.specialization || '';
            case 'Role': return row.role || '';
            case 'Department': return row.department || '';
            case 'Doctor': return row.doctor_id?.name ? formatName(row.doctor_id.name) : (row.doctor_name || '');
            case 'Patient ID': return row.patient_id?._id || row.patient_id || '';
            // Default fallback: Try to find a property with the same name (lowercase, properties)
            default:
                // Try converting "Policy Number" -> "policy_number"
                const key = col.toLowerCase().replace(/ /g, '_');
                return row[key] !== undefined ? row[key] : '';
        }
    };

    const processData = (rawData) => {
        if (!rawData || !Array.isArray(rawData)) return [];
        return rawData.map(row => {
            const processedRow = {};
            columnsConfig[entity].forEach(col => {
                if (columns[col]) {
                    processedRow[col] = getColumnValue(row, col, entity);
                }
            });
            return processedRow;
        });
    };

    const handlePreview = async () => {
        setLoading(true);
        try {
            const rawData = await fetchData(5);
            const data = processData(rawData);
            setPreviewData(data);
            setShowPreview(true);
        } catch (err) {
            console.error(err);
            alert('Preview failed: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleExport = async () => {
        setLoading(true);
        try {
            let filename = entity.toLowerCase();
            const rawData = await fetchData();

            if (rawData.length === 0) {
                alert('No data to export');
                return;
            }

            const data = processData(rawData);

            if (data.length === 0) {
                alert('No columns selected or data processing failed.');
                return;
            }

            // Simplified CSV generation
            const headers = Object.keys(data[0]);
            const csvContent = [
                headers.join(','),
                ...data.map(row => headers.map(fieldName => {
                    let val = row[fieldName];
                    if (typeof val === 'object') val = JSON.stringify(val).replace(/"/g, '""'); // Escape quotes
                    if (val === undefined || val === null) val = '';
                    return `"${val}"`;
                }).join(','))
            ].join('\n');

            const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.setAttribute('href', url);
            link.setAttribute('download', `${filename}.${exportFormat.toLowerCase()}`);
            link.click();

            onClose();
        } catch (err) {
            console.error(err);
            alert('Export failed: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="export-modal-overlay" onClick={onClose}>
            <div className="export-modal" onClick={e => e.stopPropagation()}>
                <div className="export-modal-header-top">
                    <h2>Export Data</h2>
                </div>

                <div className="export-modal-content-wrapper">
                    <div className="export-blue-strip">
                        Export Configuration
                    </div>

                    <div className="export-modal-body-styled">
                        <div className="export-grid-layout">
                            {/* Row 1 */}
                            <div className="export-form-group">
                                <label>Entity Type:</label>
                                <select value={entity} onChange={e => setEntity(e.target.value)}>
                                    <option value="Patients">Patients</option>
                                    <option value="Doctors">Doctors</option>
                                    <option value="Staff">Staff</option>
                                    <option value="Appointments">Appointments</option>
                                </select>
                            </div>

                            <div className="export-form-group checkbox-align">
                                <label>Export all data:</label>
                                <input type="checkbox" checked={exportAll} onChange={e => setExportAll(e.target.checked)} />
                            </div>

                            {/* Row 2 */}
                            <div className="export-form-group">
                                <label>Export to:</label>
                                <select value={exportFormat} onChange={e => setExportFormat(e.target.value)}>
                                    <option value="CSV">CSV</option>
                                    <option value="Excel">Excel</option>
                                    <option value="PDF">PDF</option>
                                </select>
                            </div>

                            <div className="export-form-group" style={{ opacity: exportAll ? 0.5 : 1 }}>
                                <label>Number of Records:</label>
                                <input
                                    type="number"
                                    value={numberOfRecords}
                                    onChange={e => setNumberOfRecords(e.target.value)}
                                    disabled={exportAll}
                                />
                            </div>

                            {/* Row 3 */}
                            <div className="export-form-group">
                                <label>Order by:</label>
                                <input type="text" placeholder="e.g., Name" value={orderBy} onChange={e => setOrderBy(e.target.value)} />
                            </div>
                        </div>

                        <div className="export-columns-section-styled">
                            <div className="columns-header">Select Columns</div>
                            <div className="columns-actions">
                                <button className="btn-select-all" onClick={selectAll}>Select all</button>
                                <button className="btn-deselect-all" onClick={deselectAll}>Deselect all</button>
                            </div>
                            <div className="columns-list">
                                {columnsConfig[entity].map(col => (
                                    <label key={col} className="column-checkbox">
                                        <input type="checkbox" checked={columns[col]} onChange={() => toggleColumn(col)} />
                                        {col}
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="export-modal-footer-styled">
                        <button className="btn-preview" onClick={handlePreview} disabled={loading}>Preview</button>
                        <button className="btn-export-final" onClick={handleExport} disabled={loading}>
                            {loading ? 'Exporting...' : 'Export'}
                        </button>
                    </div>
                </div>

                {/* Preview Overlay */}
                {showPreview && (
                    <div className="preview-overlay">
                        <div className="preview-content">
                            <div className="preview-header">
                                <h3>Data Preview (First 5 records)</h3>
                                <button onClick={() => setShowPreview(false)}>&times;</button>
                            </div>
                            <div className="preview-table-wrapper">
                                <table className="preview-table">
                                    <thead>
                                        <tr>
                                            {previewData.length > 0 && Object.keys(previewData[0]).map(key => (
                                                <th key={key}>{key}</th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {previewData.map((row, i) => (
                                            <tr key={i}>
                                                {Object.values(row).map((val, j) => (
                                                    <td key={j} title={typeof val === 'object' ? JSON.stringify(val, null, 2) : String(val)}>
                                                        <div className="preview-cell-content">
                                                            {typeof val === 'object' ? JSON.stringify(val) : String(val)}
                                                        </div>
                                                    </td>
                                                ))}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ExportModal;
