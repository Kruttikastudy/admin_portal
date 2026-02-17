import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getApiUrl } from '../api';
import './DetailsModal.css';

function ViewDoctor() {
    const navigate = useNavigate();
    const location = useLocation();
    const [doctor, setDoctor] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDoctorDetails = async () => {
            const dId = location?.state?.doctor?._id || location?.state?.doctor?.id;
            if (dId) {
                try {
                    const res = await fetch(getApiUrl(`/api/doctors/${dId}`));
                    if (res.ok) {
                        const data = await res.json();
                        setDoctor(data.data || data);
                    } else {
                        setDoctor(location.state.doctor);
                    }
                } catch (err) {
                    console.error('Failed to fetch doctor details', err);
                    setDoctor(location.state.doctor);
                } finally {
                    setLoading(false);
                }
            } else {
                setLoading(false);
            }
        };
        fetchDoctorDetails();
    }, [location]);

    if (loading) {
        return <div style={{ padding: '20px' }}>Loading...</div>;
    }

    if (!doctor) {
        return (
            <div style={{ padding: '20px' }}>
                <p>No doctor data found</p>
                <button className="details-btn primary" onClick={() => navigate('/doctors')}>Back to Doctors</button>
            </div>
        );
    }

    const d = doctor;
    const formatDate = (v) => !v ? '-' : (typeof v === 'string' ? v.slice(0, 10) : (v instanceof Date ? v.toISOString().slice(0, 10) : String(v)));

    const getAddressLine = () => {
        const addr = d.contact_info?.address || d.address || {};
        const addressLine = [addr.street, addr.street2, addr.city, addr.district, addr.state, addr.postal_code, addr.country].filter(Boolean).join(', ');
        if (addressLine) return addressLine;
        return [d.address1, d.address2, d.city, d.district, d.state, d.postal_code, d.country].filter(Boolean).join(', ') || '-';
    };

    return (
        <div className="details-modal-overlay" onClick={() => navigate('/doctors')}>
            <div className="details-modal-card" onClick={(e) => e.stopPropagation()}>
                <h3 className="details-modal-title">Doctor Information</h3>

                <div className="details-section">
                    <h4 className="details-section-heading">Personal Details</h4>
                    <div className="details-grid">
                        <div className="details-row"><div className="details-label">First name</div><div className="details-value">{d.name?.first || '-'}</div></div>
                        <div className="details-row"><div className="details-label">Middle name</div><div className="details-value">{d.name?.middle || '-'}</div></div>
                        <div className="details-row"><div className="details-label">Last name</div><div className="details-value">{d.name?.last || '-'}</div></div>
                        <div className="details-row"><div className="details-label">Date of birth</div><div className="details-value">{d.date_of_birth || d.dateOfBirth || '-'}</div></div>
                        <div className="details-row"><div className="details-label">Gender</div><div className="details-value">{d.gender || '-'}</div></div>
                        <div className="details-row"><div className="details-label">Blood group</div><div className="details-value">{d.blood_group || '-'}</div></div>
                        <div className="details-row"><div className="details-label">License no.</div><div className="details-value">{d.license_no || d.licenseNo || '-'}</div></div>
                        <div className="details-row"><div className="details-label">License expiry</div><div className="details-value">{formatDate(d.license_expiry || d.licenseExpiryDate)}</div></div>
                        <div className="details-row details-full"><div className="details-label">Address</div><div className="details-value">{getAddressLine()}</div></div>
                        {(d.photo || d.img?.data) && (
                            <div className="details-row details-full">
                                <div className="details-label">Photo</div>
                                <div className="details-value"><img src={d.photo || d.img?.data} alt="Doctor" className="details-photo-image" style={{ maxWidth: '100px', borderRadius: '8px' }} /></div>
                            </div>
                        )}
                    </div>
                </div>

                <div className="details-section">
                    <h4 className="details-section-heading">Contact Details</h4>
                    <div className="details-grid">
                        <div className="details-row"><div className="details-label">Primary contact</div><div className="details-value">{d.contact_info?.phone || d.primaryContact || '-'}</div></div>
                        <div className="details-row"><div className="details-label">Email</div><div className="details-value">{d.contact_info?.email || '-'}</div></div>
                        <div className="details-row"><div className="details-label">Emergency phone</div><div className="details-value">{d.emergency_contact?.phone || d.emergencyContactNo || '-'}</div></div>
                    </div>
                </div>

                <div className="details-section">
                    <h4 className="details-section-heading">Professional Details</h4>
                    <div className="details-grid">
                        <div className="details-row"><div className="details-label">Specialization</div><div className="details-value">{d.specialization || '-'}</div></div>
                        <div className="details-row"><div className="details-label">Designation</div><div className="details-value">{d.designation || '-'}</div></div>
                        <div className="details-row"><div className="details-label">Experience</div><div className="details-value">{d.experience_years ?? d.yearsOfExperience ?? '-'} years</div></div>
                        <div className="details-row"><div className="details-label">Joining date</div><div className="details-value">{formatDate(d.joining_date || d.joiningDate)}</div></div>
                        <div className="details-row"><div className="details-label">Status</div><div className="details-value">{d.status || 'Active'}</div></div>
                    </div>
                </div>

                <div className="details-actions">
                    <button className="details-btn primary" onClick={() => navigate('/doctors/add', { state: { doctor: d } })}>Edit</button>
                    <button className="details-btn ghost" onClick={() => navigate('/doctors')}>Back to List</button>
                </div>
            </div>
        </div>
    );
}

export default ViewDoctor;
