import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { getApiUrl } from '../api';
import './Doctors.css'; // Reusing common styles from Doctors.css
import './DetailsModal.css';

function Staff() {
    const navigate = useNavigate();
    const [staff, setStaff] = useState([]);
    const [selectedStaff, setSelectedStaff] = useState(null);

    useEffect(() => {
        const fetchStaff = async () => {
            try {
                const res = await fetch(getApiUrl('/api/staff'));
                const data = await res.json();
                setStaff(data);
            } catch (err) {
                console.error('Failed to fetch staff', err);
            }
        };
        fetchStaff();
    }, []);

    return (
        <div className="image-doctors-page"> {/* Reusing class names for layout consistency */}
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
                <Link to="/staff/add" className="image-add-doctor-action-btn" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none', color: 'white' }}>
                    Add Staff
                </Link>
            </div>

            <div className="image-doctors-list-section">
                <div className="image-list-title-header">
                    <h2>Staff List</h2>
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
                                <th>Staff Name</th>
                                <th>Role</th>
                                <th>Contact no.</th>
                                <th>Email</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {staff.map((s) => {
                                const id = s._id || s.id;
                                const name = `${s.name?.first || ''} ${s.name?.last || ''}`.trim();
                                const role = s.role || '';
                                const contact = s.contact_info?.phone || '';
                                const email = s.contact_info?.email || '';
                                const status = s.status || 'Active';
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
                                                    onClick={() => setSelectedStaff(s)}
                                                >
                                                    View
                                                </button>
                                                <button
                                                    className="image-action-btn edit-btn"
                                                    style={{ padding: '6px 10px', borderRadius: 8, background: '#1B7A9F', color: 'white', border: 'none', cursor: 'pointer' }}
                                                    onClick={() => navigate('/staff/add', { state: { staff: s } })}
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
            {selectedStaff && (
                <div className="details-modal-overlay" onClick={() => setSelectedStaff(null)}>
                    <div className="details-modal-card" onClick={(e) => e.stopPropagation()}>
                        <h3>Staff Details</h3>

                        <div className="details-section">
                            <h4>Personal Details</h4>
                            <div className="details-grid">
                                <div className="details-row"><div className="details-label">First name</div><div className="details-value">{selectedStaff.name?.first || '-'}</div></div>
                                <div className="details-row"><div className="details-label">Middle name</div><div className="details-value">{selectedStaff.name?.middle || '-'}</div></div>
                                <div className="details-row"><div className="details-label">Last name</div><div className="details-value">{selectedStaff.name?.last || '-'}</div></div>
                                <div className="details-row"><div className="details-label">Date of birth</div><div className="details-value">{selectedStaff.date_of_birth || selectedStaff.dateOfBirth || '-'}</div></div>
                                <div className="details-row"><div className="details-label">Gender</div><div className="details-value">{selectedStaff.gender || '-'}</div></div>
                                <div className="details-row"><div className="details-label">Blood group</div><div className="details-value">{selectedStaff.blood_group || '-'}</div></div>
                            </div>
                        </div>

                        <div className="details-section">
                            <h4>Contact Details</h4>
                            <div className="details-grid">
                                <div className="details-row"><div className="details-label">Primary phone</div><div className="details-value">{selectedStaff.contact_info?.phone || '-'}</div></div>
                                <div className="details-row"><div className="details-label">Alternate phone</div><div className="details-value">{selectedStaff.contact_info?.alternate_phone || '-'}</div></div>
                                <div className="details-row"><div className="details-label">Email</div><div className="details-value">{selectedStaff.contact_info?.email || '-'}</div></div>
                                <div className="details-row details-full"><div className="details-label">Address</div><div className="details-value">{(selectedStaff.address && JSON.stringify(selectedStaff.address)) || '-'}</div></div>
                            </div>
                        </div>

                        <div className="details-section">
                            <h4>Employment Details</h4>
                            <div className="details-grid">
                                <div className="details-row"><div className="details-label">Role / Occupation</div><div className="details-value">{selectedStaff.role || selectedStaff.occupation || '-'}</div></div>
                                <div className="details-row"><div className="details-label">Department</div><div className="details-value">{selectedStaff.department || '-'}</div></div>
                                <div className="details-row"><div className="details-label">Designation</div><div className="details-value">{selectedStaff.designation || '-'}</div></div>
                                <div className="details-row"><div className="details-label">Shift</div><div className="details-value">{selectedStaff.shift || '-'}</div></div>
                                <div className="details-row"><div className="details-label">Joining date</div><div className="details-value">{selectedStaff.joiningDate || selectedStaff.joining_date || '-'}</div></div>
                            </div>
                        </div>

                        <div className="details-section">
                            <h4>Other</h4>
                            <div className="details-grid">
                                <div className="details-row details-full"><div className="details-label">Notes</div><div className="details-value"><pre style={{ whiteSpace: 'pre-wrap', fontSize: 12 }}>{selectedStaff.notes || '{}'}</pre></div></div>
                            </div>
                        </div>

                        <div className="details-actions">
                            <button className="details-btn primary" onClick={() => { navigate('/staff/add', { state: { staff: selectedStaff } }); }}>Edit</button>
                            <button className="details-btn ghost" onClick={() => setSelectedStaff(null)}>Close</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Staff;
