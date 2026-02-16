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
                    <div className="image-total-count-pill">
                        Total Staff : {staff.length}
                    </div>
                </div>

                <div className="image-doctors-table-container">
                    <table className="image-doctors-list-table">
                        <thead>
                            <tr>
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
            {selectedStaff && (() => {
                const s = selectedStaff;
                const addr = s.contact_info?.address || s.address || {};
                const addressLine = [addr.street, addr.street2, addr.city, addr.district, addr.state, addr.postal_code, addr.country].filter(Boolean).join(', ') || (typeof s.address === 'string' ? s.address : null);
                const formatDate = (v) => !v ? '-' : (typeof v === 'string' ? v.slice(0, 10) : (v instanceof Date ? v.toISOString().slice(0, 10) : String(v)));
                return (
                    <div className="details-modal-overlay" onClick={() => setSelectedStaff(null)}>
                        <div className="details-modal-card" onClick={(e) => e.stopPropagation()}>
                            <h3 className="details-modal-title">Staff Details</h3>

                            <div className="details-section">
                                <h4 className="details-section-heading">Personal Details</h4>
                                <div className="details-grid">
                                    <div className="details-row"><div className="details-label">First name</div><div className="details-value">{s.name?.first || '-'}</div></div>
                                    <div className="details-row"><div className="details-label">Middle name</div><div className="details-value">{s.name?.middle || '-'}</div></div>
                                    <div className="details-row"><div className="details-label">Last name</div><div className="details-value">{s.name?.last || '-'}</div></div>
                                    <div className="details-row"><div className="details-label">Date of birth</div><div className="details-value">{s.date_of_birth || s.dateOfBirth || '-'}</div></div>
                                    <div className="details-row"><div className="details-label">Marital status</div><div className="details-value">{s.marital_status || '-'}</div></div>
                                    <div className="details-row"><div className="details-label">Gender</div><div className="details-value">{s.gender || '-'}</div></div>
                                    <div className="details-row"><div className="details-label">Blood group</div><div className="details-value">{s.blood_group || '-'}</div></div>
                                    <div className="details-row"><div className="details-label">Nationality</div><div className="details-value">{s.nationality || '-'}</div></div>
                                    <div className="details-row"><div className="details-label">Category</div><div className="details-value">{s.category || '-'}</div></div>
                                    <div className="details-row"><div className="details-label">Occupation</div><div className="details-value">{s.occupation || s.role || '-'}</div></div>
                                    <div className="details-row"><div className="details-label">License no.</div><div className="details-value">{s.license_no || s.licenseNo || '-'}</div></div>
                                    <div className="details-row"><div className="details-label">License expiry</div><div className="details-value">{formatDate(s.license_expiry || s.licenseExpiryDate)}</div></div>
                                    <div className="details-row"><div className="details-label">Aadhar</div><div className="details-value">{s.aadhaar || s.aadharCard || '-'}</div></div>
                                    <div className="details-row"><div className="details-label">PAN</div><div className="details-value">{s.pan || s.panCard || '-'}</div></div>
                                    <div className="details-row details-full"><div className="details-label">Address</div><div className="details-value">{addressLine || '-'}</div></div>
                                    {(s.photo || s.img?.data) && (
                                        <div className="details-row details-full">
                                            <div className="details-label">Photo</div>
                                            <div className="details-value"><img src={s.photo || s.img?.data} alt="Staff" className="details-photo-image" /></div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="details-section">
                                <h4 className="details-section-heading">Contact Details</h4>
                                <div className="details-grid">
                                    <div className="details-row"><div className="details-label">Primary contact</div><div className="details-value">{s.contact_info?.phone || s.primaryContact || '-'}</div></div>
                                    <div className="details-row"><div className="details-label">Alternate contact</div><div className="details-value">{s.contact_info?.alternate_phone || s.alternateContact || '-'}</div></div>
                                    <div className="details-row"><div className="details-label">Email</div><div className="details-value">{s.contact_info?.email || '-'}</div></div>
                                    <div className="details-row"><div className="details-label">Emergency contact name</div><div className="details-value">{s.emergency_contact?.name || s.emergencyContactName || '-'}</div></div>
                                    <div className="details-row"><div className="details-label">Emergency relation</div><div className="details-value">{s.emergency_contact?.relation || s.emergencyContactRelation || '-'}</div></div>
                                    <div className="details-row"><div className="details-label">Emergency phone</div><div className="details-value">{s.emergency_contact?.phone || s.emergencyContactNo || '-'}</div></div>
                                    <div className="details-row"><div className="details-label">Emergency email</div><div className="details-value">{s.emergency_contact?.email || s.emergencyContactEmail || '-'}</div></div>
                                </div>
                            </div>

                            <div className="details-section">
                                <h4 className="details-section-heading">Professional Details</h4>
                                <div className="details-grid">
                                    <div className="details-row"><div className="details-label">Specialization</div><div className="details-value">{s.specialization || '-'}</div></div>
                                    <div className="details-row"><div className="details-label">Designation</div><div className="details-value">{s.designation || '-'}</div></div>
                                    <div className="details-row"><div className="details-label">Previous employer</div><div className="details-value">{s.previousEmployer || '-'}</div></div>
                                    <div className="details-row"><div className="details-label">Reason for leaving</div><div className="details-value">{s.reasonForLeaving || '-'}</div></div>
                                    <div className="details-row"><div className="details-label">Position</div><div className="details-value">{s.position || '-'}</div></div>
                                    <div className="details-row"><div className="details-label">Department</div><div className="details-value">{s.department || '-'}</div></div>
                                    <div className="details-row"><div className="details-label">Experience (years)</div><div className="details-value">{s.experience_years ?? s.yearsOfExperience ?? '-'}</div></div>
                                    <div className="details-row"><div className="details-label">Employment type</div><div className="details-value">{s.employment_type || s.employmentType || '-'}</div></div>
                                    <div className="details-row"><div className="details-label">Employee type</div><div className="details-value">{s.employee_type ?? s.employeeType ?? s.shift ?? '-'}</div></div>
                                    <div className="details-row"><div className="details-label">Joining date</div><div className="details-value">{formatDate(s.joining_date || s.joiningDate)}</div></div>
                                    <div className="details-row"><div className="details-label">Shift type</div><div className="details-value">{s.shift_type || s.shiftType || '-'}</div></div>
                                    <div className="details-row"><div className="details-label">Shift start</div><div className="details-value">{s.shift_start || s.shiftStart || '-'}</div></div>
                                    <div className="details-row"><div className="details-label">Shift end</div><div className="details-value">{s.shift_end || s.shiftEnd || '-'}</div></div>
                                    <div className="details-row details-full"><div className="details-label">Status</div><div className="details-value">{s.status || 'Active'}</div></div>
                                </div>
                            </div>

                            <div className="details-section">
                                <h4 className="details-section-heading">Qualification Details</h4>
                                <div className="details-grid">
                                    <div className="details-row"><div className="details-label">Highest qualification</div><div className="details-value">{s.qualification ?? s.qualifications ?? '-'}</div></div>
                                    <div className="details-row"><div className="details-label">Year of passing</div><div className="details-value">{s.yearOfPassing || '-'}</div></div>
                                    <div className="details-row"><div className="details-label">Sub-specialization</div><div className="details-value">{s.sub_specialization || s.specialization2 || '-'}</div></div>
                                    <div className="details-row"><div className="details-label">Certifications</div><div className="details-value">{s.certifications || '-'}</div></div>
                                    <div className="details-row"><div className="details-label">University</div><div className="details-value">{s.universityName || '-'}</div></div>
                                </div>
                            </div>

                            <div className="details-section">
                                <h4 className="details-section-heading">Insurance Details</h4>
                                <div className="details-grid">
                                    <div className="details-row"><div className="details-label">Primary – company</div><div className="details-value">{s.insurance?.primary?.company_name || s.primaryInsuranceCompany || '-'}</div></div>
                                    <div className="details-row"><div className="details-label">Primary – policy no.</div><div className="details-value">{s.insurance?.primary?.policy_number || s.primaryPolicyNumber || '-'}</div></div>
                                    <div className="details-row"><div className="details-label">Primary – group no.</div><div className="details-value">{s.insurance?.primary?.group_number || s.primaryGroupNumber || '-'}</div></div>
                                    <div className="details-row"><div className="details-label">Primary – start</div><div className="details-value">{formatDate(s.insurance?.primary?.effective_start || s.primaryStartDate)}</div></div>
                                    <div className="details-row"><div className="details-label">Primary – end</div><div className="details-value">{formatDate(s.insurance?.primary?.effective_end || s.primaryEndDate)}</div></div>
                                    <div className="details-row"><div className="details-label">Secondary – company</div><div className="details-value">{s.insurance?.secondary?.company_name || s.secondaryInsuranceCompany || '-'}</div></div>
                                    <div className="details-row"><div className="details-label">Secondary – policy no.</div><div className="details-value">{s.insurance?.secondary?.policy_number || s.secondaryPolicyNumber || '-'}</div></div>
                                    <div className="details-row"><div className="details-label">Secondary – group no.</div><div className="details-value">{s.insurance?.secondary?.group_number || s.secondaryGroupNumber || '-'}</div></div>
                                    <div className="details-row"><div className="details-label">Secondary – start</div><div className="details-value">{formatDate(s.insurance?.secondary?.effective_start || s.secondaryStartDate)}</div></div>
                                    <div className="details-row"><div className="details-label">Secondary – end</div><div className="details-value">{formatDate(s.insurance?.secondary?.effective_end || s.secondaryEndDate)}</div></div>
                                    <div className="details-row"><div className="details-label">Insurance contact number</div><div className="details-value">{s.insurance?.insurance_contact_number ?? s.insurance_contact_number ?? '-'}</div></div>
                                    {(s.insurance_card_image || s.insuranceCardImage) && (
                                        <div className="details-row details-full">
                                            <div className="details-label">Insurance card image</div>
                                            <div className="details-value"><img src={s.insurance_card_image || s.insuranceCardImage} alt="Insurance card" className="details-card-image" /></div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="details-actions">
                                <button className="details-btn primary" onClick={() => { navigate('/staff/add', { state: { staff: selectedStaff } }); }}>Edit</button>
                                <button className="details-btn ghost" onClick={() => setSelectedStaff(null)}>Close</button>
                            </div>
                        </div>
                    </div>
                );
            })()}
        </div>
    );
}

export default Staff;
