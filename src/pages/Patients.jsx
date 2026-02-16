import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getApiUrl } from '../api';
import './Doctors.css'; // Reusing common styles
import './DetailsModal.css';

function Patients() {
    const navigate = useNavigate();
    const [patients, setPatients] = useState([]);
    const [selectedPatient, setSelectedPatient] = useState(null);

    useEffect(() => {
        const fetchPatients = async () => {
            try {
                const res = await fetch(getApiUrl('/api/patients'));
                const data = await res.json();
                setPatients(data);
            } catch (err) {
                console.error('Failed to fetch patients', err);
            }
        };
        fetchPatients();
    }, []);

    return (
        <div className="image-doctors-page">
            <div className="image-dashboard-header-strip">
                <div className="header-strip-right">
                    <div className="header-icon-box white-box"></div>
                    <div className="header-icon-box white-box"></div>
                    <div className="header-icon-box profile-circle-box">
                        <svg viewBox="0 0 100 100" fill="#7FBADD">
                            <circle cx="50" cy="50" r="45" />
                            <circle cx="50" cy="35" r="15" fill="white" />
                            <path d="M25,75 Q50,55 75,75" fill="white" />
                        </svg>
                    </div>
                </div>
            </div>

            <div className="image-doctors-controls-row">
                <div className="image-search-container">
                    <div className="specialization-select-box">
                        Role V
                    </div>
                    <input type="text" className="image-search-input" />
                    <button className="image-search-btn">Search</button>
                </div>
                <button className="image-add-doctor-action-btn" onClick={() => navigate('/patients/add')}>
                    Add Patient
                </button>
            </div>

            <div className="image-doctors-list-section">
                <div className="image-list-title-header">
                    <h2>Patient List</h2>
                    <div className="image-total-count-pill" style={{ backgroundColor: '#4FB0D2' }}>
                        Total Staff : 10
                    </div>
                </div>

                <div className="image-doctors-table-container">
                    <table className="image-doctors-list-table">
                        <thead>
                            <tr style={{ backgroundColor: '#1B7A9F' }}>
                                <th className="checkbox-col-placeholder">
                                    <div className="white-circle-checkbox"></div>
                                </th>
                                <th>Patient Name</th>
                                <th>Role</th>
                                <th>Contact no.</th>
                                <th>Email</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {patients.map((p) => {
                                const id = p._id || p.id;
                                const name = `${p.name?.first || ''} ${p.name?.last || ''}`.trim();
                                const role = p.role || '';
                                const contact = p.contact_info?.mobile?.number || p.contact_info?.phone || '';
                                const email = p.contact_info?.email || '';
                                const status = p.status || 'Active';
                                return (
                                    <tr key={id}>
                                        <td>
                                            <div className="grey-circle-placeholder-small"></div>
                                        </td>
                                        <td>{name}</td>
                                        <td>{role}</td>
                                        <td>{contact}</td>
                                        <td>{email}</td>
                                        <td>{status}</td>
                                        <td>
                                            <div className="image-row-actions">
                                                <button
                                                    className="image-action-btn view-btn"
                                                    style={{ padding: '6px 10px', borderRadius: 8, background: '#4FB0D2', color: 'white', border: 'none', cursor: 'pointer', marginRight: 6 }}
                                                    onClick={() => navigate('/patients/view', { state: { patient: p } })}
                                                >
                                                    View
                                                </button>
                                                <button
                                                    className="image-action-btn edit-btn"
                                                    style={{ padding: '6px 10px', borderRadius: 8, background: '#1B7A9F', color: 'white', border: 'none', cursor: 'pointer' }}
                                                    onClick={() => navigate('/patients/add', { state: { patient: p } })}
                                                >
                                                    Edit
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                            {[...Array(8)].map((_, i) => (
                                <tr key={`empty-${i}`}>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            {selectedPatient && (
                <div className="details-modal-overlay" onClick={() => setSelectedPatient(null)}>
                    <div className="details-modal-card" onClick={(e) => e.stopPropagation()}>
                        <h3>Patient Details</h3>

                        <div className="details-section">
                            <h4>Personal Details</h4>
                            <div className="details-grid">
                                <div className="details-row"><div className="details-label">First name</div><div className="details-value">{selectedPatient.name?.first || '-'}</div></div>
                                <div className="details-row"><div className="details-label">Middle name</div><div className="details-value">{selectedPatient.name?.middle || '-'}</div></div>
                                <div className="details-row"><div className="details-label">Last name</div><div className="details-value">{selectedPatient.name?.last || '-'}</div></div>
                                <div className="details-row"><div className="details-label">Date of birth</div><div className="details-value">{selectedPatient.date_of_birth || selectedPatient.dateOfBirth || '-'}</div></div>
                                <div className="details-row"><div className="details-label">Gender</div><div className="details-value">{selectedPatient.gender || '-'}</div></div>
                                <div className="details-row"><div className="details-label">Blood group</div><div className="details-value">{selectedPatient.blood_group || '-'}</div></div>
                            </div>
                        </div>

                        <div className="details-section">
                            <h4>Contact Details</h4>
                            <div className="details-grid">
                                <div className="details-row"><div className="details-label">Primary phone</div><div className="details-value">{selectedPatient.contact_info?.mobile?.number || selectedPatient.contact_info?.phone || '-'}</div></div>
                                <div className="details-row"><div className="details-label">Alternate phone</div><div className="details-value">{selectedPatient.contact_info?.alternate_phone || '-'}</div></div>
                                <div className="details-row"><div className="details-label">Email</div><div className="details-value">{selectedPatient.contact_info?.email || '-'}</div></div>
                                <div className="details-row details-full"><div className="details-label">Emergency Contact</div><div className="details-value">{selectedPatient.emergency_contact ? JSON.stringify(selectedPatient.emergency_contact) : '-'}</div></div>
                            </div>
                        </div>

                        <div className="details-section">
                            <h4>Address</h4>
                            <div className="details-grid">
                                <div className="details-row details-full"><div className="details-label">Address</div><div className="details-value"><pre style={{ whiteSpace: 'pre-wrap', fontSize: 12 }}>{JSON.stringify(selectedPatient.address || {}, null, 2)}</pre></div></div>
                            </div>
                        </div>

                        <div className="details-section">
                            <h4>Insurance</h4>
                            <div className="details-grid">
                                <div className="details-row"><div className="details-label">Primary</div><div className="details-value">{selectedPatient.insurance?.primary ? JSON.stringify(selectedPatient.insurance.primary) : '-'}</div></div>
                                <div className="details-row"><div className="details-label">Secondary</div><div className="details-value">{selectedPatient.insurance?.secondary ? JSON.stringify(selectedPatient.insurance.secondary) : '-'}</div></div>
                                <div className="details-row"><div className="details-label">Insurance contact</div><div className="details-value">{selectedPatient.insurance_contact_number || '-'}</div></div>
                            </div>
                        </div>

                        <div className="details-section">
                            <h4>Clinical / Other</h4>
                            <div className="details-grid">
                                <div className="details-row details-full"><div className="details-label">Known allergies</div><div className="details-value">{selectedPatient.knownAllergies || selectedPatient.allergies || '-'}</div></div>
                                <div className="details-row details-full"><div className="details-label">Family history</div><div className="details-value">{selectedPatient.familyDiseases || '-'}</div></div>
                                <div className="details-row details-full"><div className="details-label">Consent</div><div className="details-value">{selectedPatient.consent ? 'Agreed' : (selectedPatient.consentAgree ? 'Agreed' : 'Not provided')}</div></div>
                            </div>
                        </div>

                        <div className="details-actions">
                            <button className="details-btn primary" onClick={() => { navigate('/patients/add', { state: { patient: selectedPatient } }); }}>Edit</button>
                            <button className="details-btn ghost" onClick={() => setSelectedPatient(null)}>Close</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Patients;
