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
    const [showPreview, setShowPreview] = useState(false);
    const [previewData, setPreviewData] = useState([]);

    const handlePreview = async () => {
        setLoading(true);
        try {
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

            // Preview top 5 records
            setPreviewData(data.slice(0, 5));
            setShowPreview(true);
        } catch (err) {
            console.error(err);
            alert('Preview failed: ' + err.message);
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
            </div>

            {/* Preview Modal Overlay */}
            {showPreview && (
                <div className="preview-modal-overlay" onClick={() => setShowPreview(false)}>
                    <div className="preview-modal" onClick={e => e.stopPropagation()}>
                        <div className="preview-header">
                            <h3>Data Preview (First 5 records)</h3>
                            <button className="close-preview" onClick={() => setShowPreview(false)}>&times;</button>
                        </div>
                        <div className="preview-body">
                            <table className="preview-table">
                                <thead>
                                    <tr>
                                        {Object.keys(columns).filter(c => columns[c]).map(col => (
                                            <th key={col}>{col}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {previewData.map((row, idx) => (
                                        <tr key={idx}>
                                            {Object.keys(columns).filter(c => columns[c]).map(col => {
                                                // Very basic mapping for demo - normally you'd map "Name" -> "name.first" etc.
                                                // For now, we just dump what we have or show '?' if not direct match
                                                // Ideally, we reuse the mapping logic from handleExport but that's complex to inline
                                                // let's try to match by lowercase key as a heuristic
                                                const keyCandidate = col.toLowerCase().replace(/ /g, '_');
                                                let val = row[keyCandidate] || row[col.toLowerCase()] || row[col] || JSON.stringify(row).substring(0, 10) + '...';

                                                // Refined rendering for known structures
                                                if (col === 'Name' && row.name) val = `${row.name.first} ${row.name.last}`;
                                                if (col === 'Email' && row.contact_info) val = row.contact_info.email;

                                                if (typeof val === 'object') val = '[Object]';
                                                return <td key={col}>{val}</td>;
                                            })}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ExportModal;
