import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getApiUrl } from '../api';
import './AddAppointment.css';

function AddAppointment() {
    const navigate = useNavigate();
    const location = useLocation();
    const editingAppointment = location?.state?.appointment || null;

    const [loading, setLoading] = useState(false);
    const [doctors, setDoctors] = useState([]);
    const [formData, setFormData] = useState({
        firstName: '',
        middleName: '',
        lastName: '',
        age: '',
        contact: '',
        date: '',
        time: '',
        appointmentType: 'Routine Check-up',
        reason: 'Regular',
        urgency: 'No',
        doctor: '',
        comments: ''
    });

    useEffect(() => {
        fetchDoctors();
        if (editingAppointment) {
            // Format date MM-DD-YYYY -> YYYY-MM-DD for input
            let formattedDate = '';
            if (editingAppointment.appointment_date) {
                const parts = editingAppointment.appointment_date.split('-');
                if (parts.length === 3) {
                    formattedDate = `${parts[2]}-${parts[0].padStart(2, '0')}-${parts[1].padStart(2, '0')}`;
                }
            }

            // Format time HH:MM AM/PM -> HH:MM (24h) for input
            let formattedTime = '';
            if (editingAppointment.appointment_time) {
                const [timePart, ampm] = editingAppointment.appointment_time.split(' ');
                let [h, m] = timePart.split(':');
                h = parseInt(h);
                if (ampm === 'PM' && h < 12) h += 12;
                if (ampm === 'AM' && h === 12) h = 0;
                formattedTime = `${h.toString().padStart(2, '0')}:${m}`;
            }

            setFormData({
                firstName: editingAppointment.patient_name?.first || '',
                middleName: editingAppointment.patient_name?.middle || '',
                lastName: editingAppointment.patient_name?.last || '',
                age: editingAppointment.age || '',
                contact: editingAppointment.contact_information || '',
                date: formattedDate,
                time: formattedTime,
                appointmentType: editingAppointment.appointment_type || 'Routine Check-up',
                reason: editingAppointment.reason_for_appointment || 'Regular',
                urgency: editingAppointment.urgency || 'No',
                doctor: editingAppointment.doctor || '',
                comments: editingAppointment.comments || ''
            });
        }
    }, [editingAppointment]);

    const fetchDoctors = async () => {
        try {
            const res = await fetch(getApiUrl('/api/doctors'));
            if (res.ok) {
                const data = await res.json();
                setDoctors(Array.isArray(data) ? data : []);
            }
        } catch (err) {
            console.error('Error fetching doctors:', err);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const payload = {
            patient_name: {
                first: formData.firstName,
                middle: formData.middleName,
                last: formData.lastName
            },
            age: Number(formData.age),
            contact_information: formData.contact,
            appointment_date: formData.date,
            appointment_time: formData.time,
            appointment_type: formData.appointmentType,
            reason_for_appointment: formData.reason,
            urgency: formData.urgency,
            doctor: formData.doctor,
            comments: formData.comments
        };

        // Format Date to MM-DD-YYYY
        if (payload.appointment_date && payload.appointment_date.includes('-')) {
            const parts = payload.appointment_date.split('-');
            if (parts[0].length === 4) { // YYYY-MM-DD
                payload.appointment_date = `${parts[1]}-${parts[2]}-${parts[0]}`;
            }
        }

        // Format Time to HH:MM AM/PM
        if (payload.appointment_time && payload.appointment_time.includes(':')) {
            let [h, min] = payload.appointment_time.split(':');
            h = parseInt(h);
            const ampm = h >= 12 ? 'PM' : 'AM';
            h = h % 12 || 12;
            payload.appointment_time = `${h.toString().padStart(2, '0')}:${min} ${ampm}`;
        }

        try {
            const url = editingAppointment
                ? getApiUrl(`/api/appointments/${editingAppointment._id}`)
                : getApiUrl('/api/appointments');

            const res = await fetch(url, {
                method: editingAppointment ? 'PUT' : 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (res.ok) {
                alert(editingAppointment ? 'Appointment updated successfully!' : 'Appointment scheduled successfully!');
                navigate('/appointments');
            } else {
                const errData = await res.json();
                alert('Error: ' + (errData.message || 'Failed to save appointment'));
            }
        } catch (err) {
            alert('Error connecting to server');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="image-add-doctor-page">
            <div className="image-dashboard-header-strip">
                <div className="header-strip-right">
                    <div className="header-icon-box white-box"></div>
                    <div className="header-icon-box white-box"></div>
                    <div className="header-icon-box profile-circle-box">
                        <svg viewBox="0 0 100 100" fill="var(--border-blue)">
                            <circle cx="50" cy="50" r="45" />
                            <circle cx="50" cy="35" r="15" fill="white" />
                            <path d="M25,75 Q50,55 75,75" fill="white" />
                        </svg>
                    </div>
                </div>
            </div>

            <div className="image-add-doctor-container">
                <h1 className="image-page-main-title">{editingAppointment ? 'Edit Appointment' : 'Create New Appointment'}</h1>

                <div className="image-form-content-area-appt">
                    <form onSubmit={handleSubmit}>
                        <div className="image-form-section-header">Patient Details</div>
                        <div className="image-field-row-appt">
                            <label>Patient Name</label>
                            <div className="image-name-triple-input">
                                <input type="text" placeholder="First Name" name="firstName" value={formData.firstName} onChange={handleInputChange} required />
                                <input type="text" placeholder="Middle Name" name="middleName" value={formData.middleName} onChange={handleInputChange} />
                                <input type="text" placeholder="Last Name" name="lastName" value={formData.lastName} onChange={handleInputChange} required />
                            </div>
                        </div>

                        <div className="image-field-row-cols">
                            <div className="image-field">
                                <label>Age</label>
                                <input type="number" name="age" value={formData.age} onChange={handleInputChange} required />
                            </div>
                            <div className="image-field">
                                <label>Contact Number</label>
                                <input type="text" name="contact" placeholder="7-10 digits" value={formData.contact} onChange={handleInputChange} required />
                            </div>
                        </div>

                        <div className="image-form-section-header margin-top">Appointment Details</div>

                        <div className="image-field-row-cols">
                            <div className="image-field">
                                <label>Date</label>
                                <input type="date" name="date" value={formData.date} onChange={handleInputChange} required />
                            </div>
                            <div className="image-field">
                                <label>Time</label>
                                <input type="time" name="time" value={formData.time} onChange={handleInputChange} required />
                            </div>
                        </div>

                        <div className="image-field-row-cols">
                            <div className="image-field">
                                <label>Appointment Type</label>
                                <select name="appointmentType" value={formData.appointmentType} onChange={handleInputChange}>
                                    <option value="Routine Check-up">Routine Check-up</option>
                                    <option value="Follow-up">Follow-up</option>
                                    <option value="New patient">New patient</option>
                                    <option value="Consultation">Consultation</option>
                                    <option value="Emergency Visit">Emergency Visit</option>
                                    <option value="Telemedicine Appointment">Telemedicine Appointment</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                            <div className="image-field">
                                <label>Reason</label>
                                <select name="reason" value={formData.reason} onChange={handleInputChange}>
                                    <option value="Regular">Regular</option>
                                    <option value="General Health Check-up">General Health Check-up</option>
                                    <option value="Follow-up Visit">Follow-up Visit</option>
                                    <option value="Specialist Consultation">Specialist Consultation</option>
                                    <option value="Emergency">Emergency</option>
                                </select>
                            </div>
                        </div>

                        <div className="image-field-row-cols">
                            <div className="image-field">
                                <label>Urgency</label>
                                <select name="urgency" value={formData.urgency} onChange={handleInputChange}>
                                    <option value="No">No</option>
                                    <option value="Yes">Yes</option>
                                </select>
                            </div>
                            <div className="image-field">
                                <label>Doctor</label>
                                <select name="doctor" value={formData.doctor} onChange={handleInputChange} required>
                                    <option value="">Select Doctor</option>
                                    {doctors.map(doc => (
                                        <option key={doc._id} value={`${doc.name.first} ${doc.name.last}`}>
                                            {doc.name.first} {doc.name.last} - {doc.specialization}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="image-field-row-appt">
                            <label>Comments</label>
                            <textarea name="comments" value={formData.comments} onChange={handleInputChange} className="appt-textarea" />
                        </div>

                        <div className="image-form-footer-nav">
                            <button type="submit" className="image-next-btn-blue" disabled={loading}>
                                {loading ? 'Saving...' : (editingAppointment ? 'Update Appointment' : 'Schedule Appointment')}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default AddAppointment;
