import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Doctors.css';
import './DetailsModal.css';

function Doctors() {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedSpecialization, setSelectedSpecialization] = useState('');
    const [doctors, setDoctors] = useState([]);
    const [selectedDoctor, setSelectedDoctor] = useState(null);

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const res = await fetch('/api/doctors');
                const data = await res.json();
                setDoctors(data);
            } catch (err) {
                console.error('Failed to fetch doctors', err);
            }
        };
        fetchDoctors();
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
                        Specialization V
                    </div>
                    <input type="text" className="image-search-input" />
                    <button className="image-search-btn">Search</button>
                </div>
                <button className="image-add-doctor-action-btn" onClick={() => navigate('/doctors/add')}>
                    Add Doctor
                </button>
            </div>

            <div className="image-doctors-list-section">
                <div className="image-list-title-header">
                    <h2>Doctors List</h2>
                    <div className="image-total-count-pill">
                        Total Doctor: {doctors.length}
                    </div>
                </div>

                <div className="image-doctors-table-container">
                    <table className="image-doctors-list-table">
                        <thead>
                            <tr>
                                <th className="checkbox-col-placeholder">
                                    <div className="white-circle-checkbox"></div>
                                </th>
                                <th>Doctors Name</th>
                                <th>Category</th>
                                <th>Contact no.</th>
                                <th>Email</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {doctors.map((doc) => {
                                const id = doc._id || doc.id;
                                const name = `${doc.name?.first || ''} ${doc.name?.last || ''}`.trim();
                                const category = doc.specialization || '';
                                const contact = doc.contact_info?.phone || '';
                                const email = doc.contact_info?.email || '';
                                const status = doc.status || 'Active';
                                return (
                                    <tr key={id}>
                                        <td>
                                            <div className="grey-circle-placeholder-small"></div>
                                        </td>
                                        <td>{name}</td>
                                        <td>{category}</td>
                                        <td>{contact}</td>
                                        <td>{email}</td>
                                        <td>{status}</td>
                                        <td>
                                            <div className="image-row-actions">
                                                <button
                                                    className="image-action-btn view-btn"
                                                    style={{ padding: '6px 10px', borderRadius: 8, background: '#4FB0D2', color: 'white', border: 'none', cursor: 'pointer', marginRight: 6 }}
                                                    onClick={() => setSelectedDoctor(doc)}
                                                >
                                                    View
                                                </button>
                                                <button
                                                    className="image-action-btn edit-btn"
                                                    style={{ padding: '6px 10px', borderRadius: 8, background: '#1B7A9F', color: 'white', border: 'none', cursor: 'pointer' }}
                                                    onClick={() => navigate('/doctors/add', { state: { doctor: doc } })}
                                                >
                                                    Edit
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                            {/* Dummy rows for spacing matching image */}
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
            {selectedDoctor && (() => {
                const d = selectedDoctor;
                const addr = d.contact_info?.address || d.address || {};
                const addressLine = [addr.street, addr.street2, addr.city, addr.district, addr.state, addr.postal_code, addr.country].filter(Boolean).join(', ') || (d.address1 || d.address2 || d.city ? [d.address1, d.address2, d.city, d.district, d.state, d.postalCode, d.country].filter(Boolean).join(', ') : null);
                const formatDate = (v) => !v ? '-' : (typeof v === 'string' ? v.slice(0, 10) : (v instanceof Date ? v.toISOString().slice(0, 10) : String(v)));
                return (
                    <div className="details-modal-overlay" onClick={() => setSelectedDoctor(null)}>
                        <div className="details-modal-card" onClick={(e) => e.stopPropagation()}>
                            <h3 className="details-modal-title">Doctor Details</h3>

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
                                    <div className="details-row details-full"><div className="details-label">Address</div><div className="details-value">{addressLine || '-'}</div></div>
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
                                    <div className="details-row"><div className="details-label">Previous employer</div><div className="details-value">{d.previousEmployer || '-'}</div></div>
                                    <div className="details-row"><div className="details-label">Reason for leaving</div><div className="details-value">{d.reasonForLeaving || '-'}</div></div>
                                    <div className="details-row"><div className="details-label">Position</div><div className="details-value">{d.position || '-'}</div></div>
                                    <div className="details-row"><div className="details-label">Department</div><div className="details-value">{d.department || '-'}</div></div>
                                    <div className="details-row"><div className="details-label">Experience (years)</div><div className="details-value">{d.experience_years ?? d.yearsOfExperience ?? '-'}</div></div>
                                    <div className="details-row"><div className="details-label">Employment type</div><div className="details-value">{d.employment_type || d.employmentType || '-'}</div></div>
                                    <div className="details-row"><div className="details-label">Employee type</div><div className="details-value">{d.employee_type ?? d.employeeType ?? '-'}</div></div>
                                    <div className="details-row"><div className="details-label">Joining date</div><div className="details-value">{formatDate(d.joining_date || d.joiningDate)}</div></div>
                                    <div className="details-row"><div className="details-label">Shift type</div><div className="details-value">{d.shift_type || d.shiftType || '-'}</div></div>
                                    <div className="details-row"><div className="details-label">Shift start</div><div className="details-value">{d.shift_start || d.shiftStart || '-'}</div></div>
                                    <div className="details-row"><div className="details-label">Shift end</div><div className="details-value">{d.shift_end || d.shiftEnd || '-'}</div></div>
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
                                    <div className="details-row"><div className="details-label">Primary – company</div><div className="details-value">{d.insurance?.primary?.company_name || d.primaryInsuranceCompany || '-'}</div></div>
                                    <div className="details-row"><div className="details-label">Primary – policy no.</div><div className="details-value">{d.insurance?.primary?.policy_number || d.primaryPolicyNumber || '-'}</div></div>
                                    <div className="details-row"><div className="details-label">Primary – group no.</div><div className="details-value">{d.insurance?.primary?.group_number || d.primaryGroupNumber || '-'}</div></div>
                                    <div className="details-row"><div className="details-label">Primary – start</div><div className="details-value">{formatDate(d.insurance?.primary?.effective_start || d.primaryStartDate)}</div></div>
                                    <div className="details-row"><div className="details-label">Primary – end</div><div className="details-value">{formatDate(d.insurance?.primary?.effective_end || d.primaryEndDate)}</div></div>
                                    <div className="details-row"><div className="details-label">Secondary – company</div><div className="details-value">{d.insurance?.secondary?.company_name || d.secondaryInsuranceCompany || '-'}</div></div>
                                    <div className="details-row"><div className="details-label">Secondary – policy no.</div><div className="details-value">{d.insurance?.secondary?.policy_number || d.secondaryPolicyNumber || '-'}</div></div>
                                    <div className="details-row"><div className="details-label">Secondary – group no.</div><div className="details-value">{d.insurance?.secondary?.group_number || d.secondaryGroupNumber || '-'}</div></div>
                                    <div className="details-row"><div className="details-label">Secondary – start</div><div className="details-value">{formatDate(d.insurance?.secondary?.effective_start || d.secondaryStartDate)}</div></div>
                                    <div className="details-row"><div className="details-label">Secondary – end</div><div className="details-value">{formatDate(d.insurance?.secondary?.effective_end || d.secondaryEndDate)}</div></div>
                                    <div className="details-row"><div className="details-label">Insurance contact number</div><div className="details-value">{d.insurance?.insurance_contact_number ?? d.insurance_contact_number ?? '-'}</div></div>
                                    {(d.insurance_card_image || d.insuranceCardImage) && (
                                        <div className="details-row details-full">
                                            <div className="details-label">Insurance card image</div>
                                            <div className="details-value"><img src={d.insurance_card_image || d.insuranceCardImage} alt="Insurance card" className="details-card-image" /></div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="details-actions">
                                <button className="details-btn primary" onClick={() => { navigate('/doctors/add', { state: { doctor: selectedDoctor } }); }}>Edit</button>
                                <button className="details-btn ghost" onClick={() => setSelectedDoctor(null)}>Close</button>
                            </div>
                        </div>
                    </div>
                );
            })()}
        </div>
    );
}

export default Doctors;
