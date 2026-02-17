import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getApiUrl } from '../api';
import './DetailsModal.css';

function ViewStaff() {
    const navigate = useNavigate();
    const location = useLocation();
    const [staff, setStaff] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStaffDetails = async () => {
            const sId = location?.state?.staff?._id || location?.state?.staff?.id;
            if (sId) {
                try {
                    const res = await fetch(getApiUrl(`/api/staff/${sId}`));
                    if (res.ok) {
                        const data = await res.json();
                        setStaff(data.data || data);
                    } else {
                        setStaff(location.state.staff);
                    }
                } catch (err) {
                    console.error('Failed to fetch staff details', err);
                    setStaff(location.state.staff);
                } finally {
                    setLoading(false);
                }
            } else {
                setLoading(false);
            }
        };
        fetchStaffDetails();
    }, [location]);

    if (loading) {
        return <div style={{ padding: '20px' }}>Loading...</div>;
    }

    if (!staff) {
        return (
            <div style={{ padding: '20px' }}>
                <p>No staff data found</p>
                <button className="details-btn primary" onClick={() => navigate('/staff')}>Back to Staff</button>
            </div>
        );
    }

    const s = staff;
    const getAddressLine = () => {
        const addr = s.contact_info?.address || s.address || {};
        const addressLine = [addr.street, addr.street2, addr.city, addr.district, addr.state, addr.postal_code, addr.country].filter(Boolean).join(', ');
        if (addressLine) return addressLine;
        return [s.address1, s.address2, s.city, s.district, s.state, s.postal_code, s.country].filter(Boolean).join(', ') || '-';
    };

    return (
        <div className="details-modal-overlay" onClick={() => navigate('/staff')}>
            <div className="details-modal-card" onClick={(e) => e.stopPropagation()}>
                <h3 className="details-modal-title">Staff Information</h3>

                <div className="details-section">
                    <h4 className="details-section-heading">Personal Details</h4>
                    <div className="details-grid">
                        <div className="details-row"><div className="details-label">First name</div><div className="details-value">{s.name?.first || '-'}</div></div>
                        <div className="details-row"><div className="details-label">Middle name</div><div className="details-value">{s.name?.middle || '-'}</div></div>
                        <div className="details-row"><div className="details-label">Last name</div><div className="details-value">{s.name?.last || '-'}</div></div>
                        <div className="details-row"><div className="details-label">Date of birth</div><div className="details-value">{s.date_of_birth || s.dateOfBirth || '-'}</div></div>
                        <div className="details-row"><div className="details-label">Gender</div><div className="details-value">{s.gender || '-'}</div></div>
                        <div className="details-row"><div className="details-label">Role</div><div className="details-value">{s.role || '-'}</div></div>
                        <div className="details-row"><div className="details-label">Department</div><div className="details-value">{s.department || '-'}</div></div>
                        <div className="details-row details-full"><div className="details-label">Address</div><div className="details-value">{getAddressLine()}</div></div>
                    </div>
                </div>

                <div className="details-section">
                    <h4 className="details-section-heading">Contact Details</h4>
                    <div className="details-grid">
                        <div className="details-row"><div className="details-label">Primary contact</div><div className="details-value">{s.contact_info?.phone || s.primaryContact || '-'}</div></div>
                        <div className="details-row"><div className="details-label">Email</div><div className="details-value">{s.contact_info?.email || s.email || '-'}</div></div>
                        <div className="details-row"><div className="details-label">Emergency phone</div><div className="details-value">{s.emergency_contact?.phone || s.emergencyContactNo || '-'}</div></div>
                    </div>
                </div>

                <div className="details-actions">
                    <button className="details-btn primary" onClick={() => navigate('/staff/add', { state: { staff: s } })}>Edit</button>
                    <button className="details-btn ghost" onClick={() => navigate('/staff')}>Back to List</button>
                </div>
            </div>
        </div>
    );
}

export default ViewStaff;
