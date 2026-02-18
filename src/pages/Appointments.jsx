import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getApiUrl } from '../api';
import './Appointments.css';

function Appointments() {
    const navigate = useNavigate();
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [dateFilter, setDateFilter] = useState('');

    useEffect(() => {
        fetchAppointments();
    }, []);

    const fetchAppointments = async () => {
        setLoading(true);
        try {
            const url = getApiUrl('/api/appointments');
            const res = await fetch(url);
            if (res.ok) {
                const data = await res.json();
                setAppointments(Array.isArray(data) ? data : []);
            }
        } catch (err) {
            console.error('Error fetching appointments:', err);
        } finally {
            setLoading(false);
        }
    };

    const filteredAppointments = appointments.filter(app => {
        const pName = `${app.patient_name?.first || ''} ${app.patient_name?.last || ''}`.toLowerCase();
        const dName = (app.doctor || '').toLowerCase();
        const matchesSearch = pName.includes(searchTerm.toLowerCase()) || dName.includes(searchTerm.toLowerCase());
        const matchesStatus = !statusFilter || app.appointment_type === statusFilter;
        const matchesDate = !dateFilter || app.appointment_date === dateFilter;
        return matchesSearch && matchesStatus && matchesDate;
    });

    return (
        <div className="image-appointments-page fade-in">
            <div className="image-appointments-controls-row">
                <div className="image-search-container">
                    <div className="specialization-select-box">
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                        >
                            <option value="">All Types</option>
                            <option value="Routine Check-up">Routine Check-up</option>
                            <option value="Follow-up">Follow-up</option>
                            <option value="New patient">New patient</option>
                            <option value="Consultation">Consultation</option>
                            <option value="Emergency Visit">Emergency Visit</option>
                        </select>
                    </div>
                    <input
                        type="text"
                        className="image-search-input"
                        placeholder="Search Patient & Doctor"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button className="image-search-btn">🔍</button>
                </div>

                <div className="filter-item-date-row">
                    <label>Date:</label>
                    <input
                        type="date"
                        value={dateFilter}
                        onChange={(e) => setDateFilter(e.target.value)}
                        className="image-date-filter-input"
                    />
                </div>

                <button className="image-add-doctor-action-btn" onClick={() => navigate('/appointments/add')}>
                    Create Appointment
                </button>
            </div>

            <div className="image-doctors-list-section">
                <div className="image-list-title-header">
                    <h2>Appointment Details</h2>
                    <div className="image-total-count-pill">
                        Total Appointments: {filteredAppointments.length}
                    </div>
                </div>

                <div className="image-doctors-table-container">
                    <table className="image-doctors-list-table">
                        <thead>
                            <tr>
                                <th style={{ width: '50px' }}>
                                    <div className="radio-style-selection">
                                        <div className="radio-inner-circle"></div>
                                    </div>
                                </th>
                                <th>Patient ID</th>
                                <th>Date</th>
                                <th>Time</th>
                                <th>Patient Name</th>
                                <th>Doctor</th>
                                <th>Type</th>
                                <th>Urgency</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr><td colSpan="9" style={{ textAlign: 'center' }}>Loading...</td></tr>
                            ) : filteredAppointments.length === 0 ? (
                                <tr><td colSpan="9" style={{ textAlign: 'center' }}>No appointments found</td></tr>
                            ) : (
                                filteredAppointments.map(app => (
                                    <tr key={app._id}>
                                        <td style={{ textAlign: 'center' }}>
                                            <div className="radio-style-selection">
                                                <div className="radio-inner-circle"></div>
                                            </div>
                                        </td>
                                        <td>{app.patient_id || 'N/A'}</td>
                                        <td>{app.appointment_date}</td>
                                        <td>{app.appointment_time}</td>
                                        <td>{`${app.patient_name?.first || ''} ${app.patient_name?.last || ''}`}</td>
                                        <td>{app.doctor}</td>
                                        <td>{app.appointment_type}</td>
                                        <td>
                                            <span className={`status-badge ${app.urgency === 'Yes' ? 'inactive' : 'active'}`}>
                                                {app.urgency === 'Yes' ? 'Urgent' : 'Normal'}
                                            </span>
                                        </td>
                                        <td>
                                            <div className="image-row-actions">
                                                <button
                                                    className="image-action-btn view-btn"
                                                    style={{ padding: '6px 10px', borderRadius: 8, background: '#4FB0D2', color: 'white', border: 'none', cursor: 'pointer' }}
                                                    onClick={() => navigate('/appointments/view', { state: { appointment: app } })}
                                                >
                                                    View
                                                </button>
                                                <button
                                                    className="image-action-btn edit-btn"
                                                    style={{ padding: '6px 10px', borderRadius: 8, background: '#1B7A9F', color: 'white', border: 'none', cursor: 'pointer' }}
                                                    onClick={() => navigate('/appointments/add', { state: { appointment: app } })}
                                                >
                                                    Edit
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                            {/* Dummy rows for spacing matching other tables */}
                            {[...Array(8)].map((_, i) => (
                                <tr key={`empty-${i}`} style={{ height: '50px' }}>
                                    <td></td>
                                    <td></td>
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

export default Appointments;
