import React from 'react';
import { useNavigate } from 'react-router-dom';
import './DetailsModal.css';

/**
 * Reusable DetailsModal component for Doctors, Staff, and Patients.
 * @param {Object} props
 * @param {Object} props.data - The entity data to display.
 * @param {string} props.type - The type of entity ('doctor', 'staff', 'patient').
 * @param {function} props.onClose - Callback to close the modal.
 * @param {string} props.editPath - Path to navigate for editing.
 */
function DetailsModal({ data, type, onClose, editPath }) {
    const navigate = useNavigate();
    if (!data) return null;

    const d = data;
    const formatDate = (v) => !v ? '-' : (typeof v === 'string' ? v.slice(0, 10) : (v instanceof Date ? v.toISOString().slice(0, 10) : String(v)));

    const getAddressLine = () => {
        const addr = d.contact_info?.address || d.address || {};
        const addressLine = [addr.street, addr.street2, addr.city, addr.district, addr.state, addr.postal_code, addr.country].filter(Boolean).join(', ');
        if (addressLine) return addressLine;

        // Fallback for older/different structure
        return [d.address1, d.address2, d.city, d.district, d.state, d.postalCode, d.country].filter(Boolean).join(', ') || '-';
    };

    const renderDoctorDetails = () => (
        <>
            <div className="details-section">
                <h4 className="details-section-heading">Personal Details</h4>
                <div className="details-grid">
                    <div className="details-row"><div className="details-label">First name</div><div className="details-value">{d.name?.first || '-'}</div></div>
                    <div className="details-row"><div className="details-label">Middle name</div><div className="details-value">{d.name?.middle || '-'}</div></div>
                    <div className="details-row"><div className="details-label">Last name</div><div className="details-value">{d.name?.last || '-'}</div></div>
                    <div className="details-row"><div className="details-label">Date of birth</div><div className="details-value">{d.date_of_birth || d.dateOfBirth || '-'}</div></div>
                    <div className="details-row"><div className="details-label">Marital status</div><div className="details-value">{d.marital_status || '-'}</div></div>
                    <div className="details-row"><div className="details-label">Gender</div><div className="details-value">{d.gender || '-'}</div></div>
                    <div className="details-row"><div className="details-label">Blood group</div><div className="details-value">{d.blood_group || '-'}</div></div>
                    <div className="details-row"><div className="details-label">Nationality</div><div className="details-value">{d.nationality || '-'}</div></div>
                    <div className="details-row"><div className="details-label">Category</div><div className="details-value">{d.category || '-'}</div></div>
                    <div className="details-row"><div className="details-label">Occupation</div><div className="details-value">{d.occupation || '-'}</div></div>
                    <div className="details-row"><div className="details-label">License no.</div><div className="details-value">{d.license_no || d.licenseNo || '-'}</div></div>
                    <div className="details-row"><div className="details-label">License expiry</div><div className="details-value">{formatDate(d.license_expiry || d.licenseExpiryDate)}</div></div>
                    <div className="details-row"><div className="details-label">Aadhar</div><div className="details-value">{d.aadhaar || d.aadharCard || '-'}</div></div>
                    <div className="details-row"><div className="details-label">PAN</div><div className="details-value">{d.pan || d.panCard || '-'}</div></div>
                    <div className="details-row details-full"><div className="details-label">Address</div><div className="details-value">{getAddressLine()}</div></div>
                    {(d.photo || d.img?.data) && (
                        <div className="details-row details-full">
                            <div className="details-label">Photo</div>
                            <div className="details-value"><img src={d.photo || d.img?.data} alt="Doctor" className="details-photo-image" /></div>
                        </div>
                    )}
                </div>
            </div>

            <div className="details-section">
                <h4 className="details-section-heading">Contact Details</h4>
                <div className="details-grid">
                    <div className="details-row"><div className="details-label">Primary contact</div><div className="details-value">{d.contact_info?.phone || d.primaryContact || '-'}</div></div>
                    <div className="details-row"><div className="details-label">Alternate contact</div><div className="details-value">{d.contact_info?.alternate_phone || d.alternateContact || '-'}</div></div>
                    <div className="details-row"><div className="details-label">Email</div><div className="details-value">{d.contact_info?.email || '-'}</div></div>
                    <div className="details-row"><div className="details-label">Emergency contact name</div><div className="details-value">{d.emergency_contact?.name || d.emergencyContactName || '-'}</div></div>
                    <div className="details-row"><div className="details-label">Emergency relation</div><div className="details-value">{d.emergency_contact?.relation || d.emergencyContactRelation || '-'}</div></div>
                    <div className="details-row"><div className="details-label">Emergency phone</div><div className="details-value">{d.emergency_contact?.phone || d.emergencyContactNo || '-'}</div></div>
                    <div className="details-row"><div className="details-label">Emergency email</div><div className="details-value">{d.emergency_contact?.email || d.emergencyContactEmail || '-'}</div></div>
                </div>
            </div>

            <div className="details-section">
                <h4 className="details-section-heading">Professional Details</h4>
                <div className="details-grid">
                    <div className="details-row"><div className="details-label">Specialization</div><div className="details-value">{d.specialization || '-'}</div></div>
                    <div className="details-row"><div className="details-label">Designation</div><div className="details-value">{d.designation || '-'}</div></div>
                    <div className="details-row"><div className="details-label">Experience (years)</div><div className="details-value">{d.experience_years ?? d.yearsOfExperience ?? '-'}</div></div>
                    <div className="details-row"><div className="details-label">Employment type</div><div className="details-value">{d.employment_type || d.employmentType || '-'}</div></div>
                    <div className="details-row"><div className="details-label">Joining date</div><div className="details-value">{formatDate(d.joining_date || d.joiningDate)}</div></div>
                    <div className="details-row"><div className="details-label">Shift type</div><div className="details-value">{d.shift_type || d.shiftType || '-'}</div></div>
                    <div className="details-row details-full"><div className="details-label">Status</div><div className="details-value">{d.status || 'Active'}</div></div>
                </div>
            </div>

            <div className="details-section">
                <h4 className="details-section-heading">Qualification Details</h4>
                <div className="details-grid">
                    <div className="details-row"><div className="details-label">Highest qualification</div><div className="details-value">{d.qualification ?? d.qualifications ?? '-'}</div></div>
                    <div className="details-row"><div className="details-label">Year of passing</div><div className="details-value">{d.yearOfPassing || '-'}</div></div>
                    <div className="details-row"><div className="details-label">Sub-specialization</div><div className="details-value">{d.sub_specialization || d.specialization2 || '-'}</div></div>
                    <div className="details-row"><div className="details-label">Certifications</div><div className="details-value">{d.certifications || '-'}</div></div>
                    <div className="details-row"><div className="details-label">University</div><div className="details-value">{d.universityName || '-'}</div></div>
                </div>
            </div>

            <div className="details-section">
                <h4 className="details-section-heading">Insurance Details</h4>
                <div className="details-grid">
                    <div className="details-row"><div className="details-label">Primary company</div><div className="details-value">{d.insurance?.primary?.company_name || d.primaryInsuranceCompany || '-'}</div></div>
                    <div className="details-row"><div className="details-label">Primary policy no.</div><div className="details-value">{d.insurance?.primary?.policy_number || d.primaryPolicyNumber || '-'}</div></div>
                    <div className="details-row"><div className="details-label">Insurance contact</div><div className="details-value">{d.insurance?.insurance_contact_number ?? d.insurance_contact_number ?? '-'}</div></div>
                    {(d.insurance_card_image || d.insuranceCardImage) && (
                        <div className="details-row details-full">
                            <div className="details-label">Insurance card image</div>
                            <div className="details-value"><img src={d.insurance_card_image || d.insuranceCardImage} alt="Insurance card" className="details-card-image" /></div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );

    const renderStaffDetails = () => (
        <>
            <div className="details-section">
                <h4 className="details-section-heading">Personal Details</h4>
                <div className="details-grid">
                    <div className="details-row"><div className="details-label">First name</div><div className="details-value">{d.name?.first || '-'}</div></div>
                    <div className="details-row"><div className="details-label">Middle name</div><div className="details-value">{d.name?.middle || '-'}</div></div>
                    <div className="details-row"><div className="details-label">Last name</div><div className="details-value">{d.name?.last || '-'}</div></div>
                    <div className="details-row"><div className="details-label">Date of birth</div><div className="details-value">{d.date_of_birth || d.dateOfBirth || '-'}</div></div>
                    <div className="details-row"><div className="details-label">Role</div><div className="details-value">{d.role || '-'}</div></div>
                    <div className="details-row"><div className="details-label">Department</div><div className="details-value">{d.department || '-'}</div></div>
                    <div className="details-row"><div className="details-label">Gender</div><div className="details-value">{d.gender || '-'}</div></div>
                    <div className="details-row details-full"><div className="details-label">Address</div><div className="details-value">{getAddressLine()}</div></div>
                </div>
            </div>
            <div className="details-section">
                <h4 className="details-section-heading">Contact Details</h4>
                <div className="details-grid">
                    <div className="details-row"><div className="details-label">Primary contact</div><div className="details-value">{d.contact_info?.phone || d.primaryContact || '-'}</div></div>
                    <div className="details-row"><div className="details-label">Email</div><div className="details-value">{d.contact_info?.email || d.email || '-'}</div></div>
                    <div className="details-row"><div className="details-label">Emergency phone</div><div className="details-value">{d.emergency_contact?.phone || d.emergencyContactNo || '-'}</div></div>
                </div>
            </div>
        </>
    );

    const renderPatientDetails = () => (
        <>
            <div className="details-section">
                <h4 className="details-section-heading">Personal Details</h4>
                <div className="details-grid">
                    <div className="details-row"><div className="details-label">First name</div><div className="details-value">{d.name?.first || '-'}</div></div>
                    <div className="details-row"><div className="details-label">Last name</div><div className="details-value">{d.name?.last || '-'}</div></div>
                    <div className="details-row"><div className="details-label">Date of birth</div><div className="details-value">{d.date_of_birth || d.dateOfBirth || '-'}</div></div>
                    <div className="details-row"><div className="details-label">Age/Gender</div><div className="details-value">{d.age ? `${d.age}y / ${d.gender || '-'}` : d.gender || '-'}</div></div>
                    <div className="details-row"><div className="details-label">Blood Group</div><div className="details-value">{d.bloodGroup || d.blood_group || '-'}</div></div>
                    <div className="details-row details-full"><div className="details-label">Current Address</div><div className="details-value">{getAddressLine()}</div></div>
                </div>
            </div>
            <div className="details-section">
                <h4 className="details-section-heading">Contact Details</h4>
                <div className="details-grid">
                    <div className="details-row"><div className="details-label">Phone</div><div className="details-value">{d.contact_info?.phone || d.primaryContact || '-'}</div></div>
                    <div className="details-row"><div className="details-label">Email</div><div className="details-value">{d.contact_info?.email || d.email || '-'}</div></div>
                </div>
            </div>
        </>
    );

    return (
        <div className="details-modal-overlay" onClick={onClose}>
            <div className="details-modal-card" onClick={(e) => e.stopPropagation()}>
                <h3 className="details-modal-title">
                    {type.charAt(0).toUpperCase() + type.slice(1)} Details
                </h3>

                {type === 'doctor' && renderDoctorDetails()}
                {type === 'staff' && renderStaffDetails()}
                {type === 'patient' && renderPatientDetails()}

                <div className="details-actions">
                    {editPath && (
                        <button className="details-btn primary" onClick={() => { navigate(editPath, { state: { [type]: d } }); onClose(); }}>
                            Edit
                        </button>
                    )}
                    <button className="details-btn ghost" onClick={onClose}>Close</button>
                </div>
            </div>
        </div>
    );
}

export default DetailsModal;
