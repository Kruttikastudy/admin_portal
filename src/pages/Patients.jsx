import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Doctors.css'; // Reusing common styles

function Patients() {
    const navigate = useNavigate();

    const patients = [
        { id: 1, name: 'Patient Name', role: 'Nurse', contact: '1234567890', email: 'abc@gmail.com', status: 'Active' },
    ];

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
                            {patients.map((p) => (
                                <tr key={p.id}>
                                    <td>
                                        <div className="grey-circle-placeholder-small"></div>
                                    </td>
                                    <td>{p.name}</td>
                                    <td>{p.role}</td>
                                    <td>{p.contact}</td>
                                    <td>{p.email}</td>
                                    <td>{p.status}</td>
                                    <td>
                                        <div className="image-row-actions">
                                            <span>View</span>
                                            <span>Edit</span>
                                        </div>
                                    </td>
                                </tr>
                            ))}
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
        </div>
    );
}

export default Patients;
