import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getApiUrl } from '../api';
import './DetailsModal.css';

function ViewAppointment() {
    const navigate = useNavigate();
    const location = useLocation();
    const [appointment, setAppointment] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDetails = async () => {
            const apptId = location?.state?.appointment?._id || location?.state?.appointment?.id;
            if (apptId) {
                try {
                    const res = await fetch(getApiUrl(`/api/appointments/${apptId}`));
                    if (res.ok) {
                        const data = await res.json();
                        setAppointment(data);
                    } else {
                        setAppointment(location.state.appointment);
                    }
                } catch (err) {
                    console.error('Failed to fetch appointment details', err);
                    setAppointment(location.state.appointment);
                } finally {
                    setLoading(false);
                }
            } else {
                setLoading(false);
            }
        };
        fetchDetails();
    }, [location]);

    if (loading) {
        return <div style={{ padding: '20px' }}>Loading...</div>;
    }

    if (!appointment) {
        return (
            <div style={{ padding: '20px' }}>
                <p>No appointment data found</p>
                <button className="details-btn primary" onClick={() => navigate('/appointments')}>Back to Appointments</button>
            </div>
        );
    }

    const app = appointment;
    const name = app.patient_name ? [app.patient_name.first, app.patient_name.middle, app.patient_name.last].filter(Boolean).join(' ') : 'N/A';

    return (
        <div className="details-modal-overlay" onClick={() => navigate('/appointments')}>
            <div className="details-modal-card" style={{ maxWidth: '650px' }} onClick={(e) => e.stopPropagation()}>
                <h3 className="details-modal-title">Appointment Details</h3>

                <div className="details-section">
                    <h4 className="details-section-heading">Patient Information</h4>
                    <div className="details-grid">
                        <div className="details-row"><div className="details-label">Full Name</div><div className="details-value">{name}</div></div>
                        <div className="details-row"><div className="details-label">Patient ID</div><div className="details-value">{app.patient_id || '-'}</div></div>
                        <div className="details-row"><div className="details-label">Age</div><div className="details-value">{app.age || '-'}</div></div>
                        <div className="details-row"><div className="details-label">Contact</div><div className="details-value">{app.contact_information || '-'}</div></div>
                    </div>
                </div>

                <div className="details-section">
                    <h4 className="details-section-heading">Appointment Information</h4>
                    <div className="details-grid">
                        <div className="details-row"><div className="details-label">Date</div><div className="details-value">{app.appointment_date || '-'}</div></div>
                        <div className="details-row"><div className="details-label">Time</div><div className="details-value">{app.appointment_time || '-'}</div></div>
                        <div className="details-row"><div className="details-label">Appointment Type</div><div className="details-value">{app.appointment_type || '-'}</div></div>
                        <div className="details-row">
                            <div className="details-label">Urgency</div>
                            <div className="details-value">
                                <span className={`status-badge ${app.urgency === 'Yes' ? 'inactive' : 'active'}`} style={{ padding: '2px 8px', fontSize: '12px' }}>
                                    {app.urgency === 'Yes' ? 'Urgent' : 'Normal'}
                                </span>
                            </div>
                        </div>
                        <div className="details-row details-full"><div className="details-label">Assigned Doctor</div><div className="details-value">{app.doctor || '-'}</div></div>
                        <div className="details-row details-full"><div className="details-label">Reason for Appointment</div><div className="details-value">{app.reason_for_appointment || '-'}</div></div>
                        <div className="details-row details-full"><div className="details-label">Additional Comments</div><div className="details-value">{app.comments || 'No comments'}</div></div>
                    </div>
                </div>

                <div className="details-actions">
                    <button className="details-btn primary" onClick={() => navigate('/appointments/add', { state: { appointment: app } })}>Edit</button>
                    <button className="details-btn ghost" onClick={() => navigate('/appointments')}>Close</button>
                </div>
            </div>
        </div>
    );
}

export default ViewAppointment;
