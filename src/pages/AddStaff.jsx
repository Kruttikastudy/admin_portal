import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getApiUrl } from '../api';
import './AddDoctor.css'; // Reusing styles

function AddStaff() {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('personal');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
        // Personal Details
        firstName: '',
        middleName: '',
        lastName: '',
        dateOfBirth: '',
        maritalStatus: '',
        licenseNo: '',
        licenseExpiryDate: '',
        bloodGroup: '',
        gender: '',
        nationality: '',
        category: '',
        aadharCard: '',
        panCard: '',
        occupation: '',
        photo: '',
        address1: '',
        address2: '',
        city: '',
        postalCode: '',
        district: '',
        state: '',
        country: '',
        // Contact Details
        primaryContact: '',
        alternateContact: '',
        email: '',
        preferredContact: '',
        emergencyContactName: '',
        emergencyContactRelation: '',
        emergencyContactNo: '',
        emergencyContactEmail: '',
        // Professional Details
        yearsOfExperience: '',
        designation: '',
        previousEmployer: '',
        reasonForLeaving: '',
        position: '',
        department: '',
        specialization: '',
        employmentType: '',
        joiningDate: '',
        employeeType: '',
        shiftType: '',
        shiftStart: '',
        shiftEnd: '',
        // Qualification Details
        qualification: '',
        yearOfPassing: '',
        specialization2: '',
        certifications: '',
        universityName: '',
        // Insurance Details
        primaryInsuranceCompany: '',
        primaryPolicyNumber: '',
        primaryGroupNumber: '',
        primaryStartDate: '',
        primaryEndDate: '',
        secondaryInsuranceCompany: '',
        secondaryPolicyNumber: '',
        secondaryGroupNumber: '',
        secondaryStartDate: '',
        secondaryEndDate: '',
        insuranceContactNumber: '',
        insuranceCardImage: '',
    });

    const location = useLocation();

    useEffect(() => {
        if (location?.state?.staff) {
            const s = location.state.staff;
            const addr = s.contact_info?.address || s.address || {};
            setFormData(prev => ({
                ...prev,
                firstName: s.name?.first || '',
                middleName: s.name?.middle || '',
                lastName: s.name?.last || '',
                dateOfBirth: s.date_of_birth || s.dateOfBirth || prev.dateOfBirth,
                maritalStatus: s.marital_status || prev.maritalStatus,
                licenseNo: s.license_no || s.licenseNo || prev.licenseNo,
                licenseExpiryDate: s.license_expiry || s.licenseExpiryDate || prev.licenseExpiryDate,
                bloodGroup: s.blood_group || prev.bloodGroup,
                gender: s.gender || prev.gender,
                nationality: s.nationality || prev.nationality,
                category: s.category || prev.category,
                aadharCard: s.aadhaar || s.aadharCard || prev.aadharCard,
                panCard: s.pan || s.panCard || prev.panCard,
                occupation: s.role || s.occupation || prev.occupation,
                photo: s.photo || prev.photo,
                address1: addr.street || s.address1 || prev.address1,
                address2: addr.street2 || s.address2 || prev.address2,
                city: addr.city || s.city || prev.city,
                postalCode: addr.postal_code || s.postalCode || s.postal_code || prev.postalCode,
                district: addr.district || s.district || prev.district,
                state: addr.state || s.state || prev.state,
                country: addr.country || s.country || prev.country,
                primaryContact: s.contact_info?.phone || s.contact_info?.mobile?.number || prev.primaryContact,
                alternateContact: s.contact_info?.alternate_phone || prev.alternateContact,
                email: s.contact_info?.email || prev.email,
                preferredContact: Array.isArray(s.preferred_contact) ? s.preferred_contact : (s.preferred_contact ? [s.preferred_contact] : []),
                emergencyContactName: s.emergency_contact?.name || prev.emergencyContactName,
                emergencyContactRelation: s.emergency_contact?.relation || prev.emergencyContactRelation,
                emergencyContactNo: s.emergency_contact?.phone || prev.emergencyContactNo,
                emergencyContactEmail: s.emergency_contact?.email || s.emergencyContactEmail || prev.emergencyContactEmail,
                yearsOfExperience: s.experience_years ? String(s.experience_years) : prev.yearsOfExperience,
                designation: s.designation || prev.designation,
                previousEmployer: s.previousEmployer || prev.previousEmployer,
                reasonForLeaving: s.reasonForLeaving || prev.reasonForLeaving,
                position: s.position || prev.position,
                department: s.department || prev.department,
                specialization: s.specialization || prev.specialization,
                employmentType: s.employment_type || prev.employmentType,
                joiningDate: s.joining_date || prev.joiningDate,
                employeeType: s.employee_type || s.employeeType || s.shift || prev.employeeType,
                shiftType: s.shift_type || s.shiftType || prev.shiftType,
                shiftStart: s.shift_start || s.shiftStart || prev.shiftStart,
                shiftEnd: s.shift_end || s.shiftEnd || prev.shiftEnd,
                qualification: s.qualification || s.qualifications || prev.qualification,
                yearOfPassing: s.yearOfPassing || prev.yearOfPassing,
                specialization2: s.sub_specialization || s.specialization2 || prev.specialization2,
                certifications: s.certifications || prev.certifications,
                universityName: s.universityName || prev.universityName,
                primaryInsuranceCompany: s.insurance?.primary?.company_name || s.primaryInsuranceCompany || prev.primaryInsuranceCompany,
                primaryPolicyNumber: s.insurance?.primary?.policy_number || s.primaryPolicyNumber || prev.primaryPolicyNumber,
                primaryGroupNumber: s.insurance?.primary?.group_number || s.primaryGroupNumber || prev.primaryGroupNumber,
                primaryStartDate: s.insurance?.primary?.effective_start || s.primaryStartDate || prev.primaryStartDate,
                primaryEndDate: s.insurance?.primary?.effective_end || s.primaryEndDate || prev.primaryEndDate,
                secondaryInsuranceCompany: s.insurance?.secondary?.company_name || s.secondaryInsuranceCompany || prev.secondaryInsuranceCompany,
                secondaryPolicyNumber: s.insurance?.secondary?.policy_number || s.secondaryPolicyNumber || prev.secondaryPolicyNumber,
                secondaryGroupNumber: s.insurance?.secondary?.group_number || s.secondaryGroupNumber || prev.secondaryGroupNumber,
                secondaryStartDate: s.insurance?.secondary?.effective_start || s.secondaryStartDate || prev.secondaryStartDate,
                secondaryEndDate: s.insurance?.secondary?.effective_end || s.secondaryEndDate || prev.secondaryEndDate,
                insuranceContactNumber: s.insurance_contact_number || s.insuranceContactNumber || prev.insuranceContactNumber,
                insuranceCardImage: s.insurance_card_image || s.insuranceCardImage || s.insurance?.insurance_card_image || prev.insuranceCardImage,
            }));
        }
    }, [location]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSave = async () => {
        setLoading(true);
        setError(null);
        try {
            const staffData = {
                name: {
                    first: formData.firstName,
                    middle: formData.middleName,
                    last: formData.lastName
                },
                role: formData.occupation || 'Nurse',
                department: formData.department,
                staff_id: formData.email?.split('@')[0] || `staff-${Date.now()}`,
                contact_info: {
                    email: formData.email,
                    phone: formData.primaryContact,
                    alternate_phone: formData.alternateContact,
                    address: {
                        street: formData.address1,
                        street2: formData.address2,
                        city: formData.city,
                        postal_code: formData.postalCode,
                        district: formData.district,
                        state: formData.state,
                        country: formData.country
                    }
                },
                status: 'Active',
                shift: formData.employeeType || 'Day',
                // Include all form fields for storage
                date_of_birth: formData.dateOfBirth,
                marital_status: formData.maritalStatus,
                license_no: formData.licenseNo,
                license_expiry: formData.licenseExpiryDate,
                blood_group: formData.bloodGroup,
                gender: formData.gender,
                nationality: formData.nationality,
                category: formData.category,
                aadhaar: formData.aadharCard,
                pan: formData.panCard,
                occupation: formData.occupation,
                photo: formData.photo,
                address: {
                    street: formData.address1,
                    street2: formData.address2,
                    city: formData.city,
                    postal_code: formData.postalCode,
                    district: formData.district,
                    state: formData.state,
                    country: formData.country
                },
                preferred_contact: Array.isArray(formData.preferredContact) ? formData.preferredContact : (formData.preferredContact ? [formData.preferredContact] : []),
                emergency_contact: {
                    name: formData.emergencyContactName,
                    relation: formData.emergencyContactRelation,
                    phone: formData.emergencyContactNo,
                    email: formData.emergencyContactEmail
                },
                designation: formData.designation,
                previousEmployer: formData.previousEmployer,
                reasonForLeaving: formData.reasonForLeaving,
                position: formData.position,
                employment_type: formData.employmentType,
                joining_date: formData.joiningDate,
                employee_type: formData.employeeType,
                shift_type: formData.shiftType,
                shift_start: formData.shiftStart,
                shift_end: formData.shiftEnd,
                experience_years: parseInt(formData.yearsOfExperience, 10) || 0,
                specialization: formData.specialization,
                qualification: formData.qualification || '',
                yearOfPassing: formData.yearOfPassing,
                sub_specialization: formData.specialization2,
                certifications: formData.certifications,
                universityName: formData.universityName,
                insurance: {
                    primary: {
                        company_name: formData.primaryInsuranceCompany,
                        policy_number: formData.primaryPolicyNumber,
                        group_number: formData.primaryGroupNumber,
                        effective_start: formData.primaryStartDate,
                        effective_end: formData.primaryEndDate
                    },
                    secondary: {
                        company_name: formData.secondaryInsuranceCompany,
                        policy_number: formData.secondaryPolicyNumber,
                        group_number: formData.secondaryGroupNumber,
                        effective_start: formData.secondaryStartDate,
                        effective_end: formData.secondaryEndDate
                    },
                    insurance_contact_number: formData.insuranceContactNumber
                },
                insurance_contact_number: formData.insuranceContactNumber,
                insurance_card_image: formData.insuranceCardImage,
                // Flat aliases for direct storage
                primaryContact: formData.primaryContact,
                alternateContact: formData.alternateContact,
                yearsOfExperience: formData.yearsOfExperience,
                address1: formData.address1,
                address2: formData.address2,
                city: formData.city,
                postalCode: formData.postalCode,
                district: formData.district,
                state: formData.state,
                country: formData.country,
                shiftStart: formData.shiftStart,
                shiftEnd: formData.shiftEnd,
                specialization2: formData.specialization2,
                employeeType: formData.employeeType,
                licenseNo: formData.licenseNo,
                licenseExpiryDate: formData.licenseExpiryDate,
                yearOfPassing: formData.yearOfPassing,
                primaryInsuranceCompany: formData.primaryInsuranceCompany,
                primaryPolicyNumber: formData.primaryPolicyNumber,
                primaryGroupNumber: formData.primaryGroupNumber,
                primaryStartDate: formData.primaryStartDate,
                primaryEndDate: formData.primaryEndDate,
                secondaryInsuranceCompany: formData.secondaryInsuranceCompany,
                secondaryPolicyNumber: formData.secondaryPolicyNumber,
                secondaryGroupNumber: formData.secondaryGroupNumber,
                secondaryStartDate: formData.secondaryStartDate,
                secondaryEndDate: formData.secondaryEndDate,
                insuranceContactNumber: formData.insuranceContactNumber,
                insuranceCardImage: formData.insuranceCardImage
            };

            const isEdit = !!(location && location.state && location.state.staff);
            const url = getApiUrl(isEdit ? `/api/staff/${location.state.staff._id || location.state.staff.id}` : '/api/staff');
            const method = isEdit ? 'PUT' : 'POST';
            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(staffData),
            });

            if (!response.ok) {
                const text = await response.text();
                let message = `Failed to save staff (Status: ${response.status})`;
                try {
                    const errorData = JSON.parse(text);
                    message = errorData.message || message;
                } catch {
                    if (text.startsWith('<!')) message = 'Server returned an error. Is the backend running? (Start it with: cd backend && npm run dev)';
                }
                throw new Error(message);
            }

            alert(isEdit ? 'Staff updated successfully!' : 'Staff saved successfully!');
            navigate('/staff');
        } catch (err) {
            setError(err.message);
            alert('Error saving staff: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleTabClick = (tabId) => setActiveTab(tabId);

    const tabs = [
        { id: 'personal', label: 'Personal Details' },
        { id: 'contact', label: 'Contact Details' },
        { id: 'professional', label: 'Professional Details' },
        { id: 'qualification', label: 'Qualification Details' },
        { id: 'insurance', label: 'Insurance Details' },
    ];

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
                <h1 className="image-page-main-title">Add New Staff</h1>

                <div className="image-form-tabs-bar">
                    {tabs.map(tab => (
                        <div
                            key={tab.id}
                            className={`image-tab-item ${activeTab === tab.id ? 'active' : ''}`}
                            onClick={() => handleTabClick(tab.id)}
                        >
                            {tab.label}
                        </div>
                    ))}
                </div>

                <div className="image-form-content-area">
                    {activeTab === 'personal' && (
                        <div className="image-tab-content fade-in">
                            <div className="image-form-section-header">Demographics</div>

                            <div className="image-form-layout-split">
                                <div className="image-form-fields-left">
                                    <div className="image-field-row">
                                        <label>Name</label>
                                        <div className="image-name-triple-input">
                                            <input type="text" placeholder="First Name" name="firstName" value={formData.firstName} onChange={handleInputChange} />
                                            <input type="text" placeholder="Middle Name" name="middleName" value={formData.middleName} onChange={handleInputChange} />
                                            <input type="text" placeholder="Last Name" name="lastName" value={formData.lastName} onChange={handleInputChange} />
                                        </div>
                                    </div>

                                    <div className="image-field-row-cols">
                                        <div className="image-field">
                                            <label>Date of Birth</label>
                                            <input
                                                type="date"
                                                max={new Date().toISOString().split('T')[0]}
                                                name="dateOfBirth"
                                                value={formData.dateOfBirth}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                        <div className="image-field">
                                            <label>Marital status</label>
                                            <select className="image-select-replacement" name="maritalStatus" value={formData.maritalStatus} onChange={handleInputChange}>
                                                <option value="">Select</option>
                                                <option value="Single">Single</option>
                                                <option value="Married">Married</option>
                                                <option value="Divorced">Divorced</option>
                                                <option value="Widowed">Widowed</option>
                                            </select>
                                        </div>
                                    </div>


                                    <div className="image-field">
                                        <label>License no.</label>
                                        <input type="text" className="field-border" name="licenseNo" value={formData.licenseNo} onChange={handleInputChange} />
                                    </div>
                                    <div className="image-field">
                                        <label>License Expiry Date</label>
                                        <input type="date" className="field-border" name="licenseExpiryDate" value={formData.licenseExpiryDate} onChange={handleInputChange} />
                                    </div>

                                    <div className="image-field-row-cols">
                                        <div className="image-field">
                                            <label>Blood Group</label>
                                            <select className="image-select-replacement" name="bloodGroup" value={formData.bloodGroup} onChange={handleInputChange}>
                                                <option value="">Select</option>
                                                <option value="A+">A+</option>
                                                <option value="A-">A-</option>
                                                <option value="B+">B+</option>
                                                <option value="B-">B-</option>
                                                <option value="O+">O+</option>
                                                <option value="O-">O-</option>
                                                <option value="AB+">AB+</option>
                                                <option value="AB-">AB-</option>
                                            </select>
                                        </div>
                                        <div className="image-field">
                                            <label>Gender</label>
                                            <select className="image-select-replacement" name="gender" value={formData.gender} onChange={handleInputChange}>
                                                <option value="">Select</option>
                                                <option value="Male">Male</option>
                                                <option value="Female">Female</option>
                                                <option value="Other">Other</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="image-field-row-cols">
                                        <div className="image-field">
                                            <label>Nationality</label>
                                            <select className="image-select-replacement" name="nationality" value={formData.nationality} onChange={handleInputChange}>
                                                <option value="">Select</option>
                                                <option value="Indian">Indian</option>
                                                <option value="American">American</option>
                                                <option value="Other">Other</option>
                                            </select>
                                        </div>
                                        <div className="image-field">
                                            <label>Category</label>
                                            <select className="image-select-replacement" name="category" value={formData.category} onChange={handleInputChange}>
                                                <option value="">Select</option>
                                                <option value="General">General</option>
                                                <option value="OBC">OBC</option>
                                                <option value="SC">SC</option>
                                                <option value="ST">ST</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="image-field-row-cols">
                                        <div className="image-field">
                                            <label>Aadhar Card No.</label>
                                            <input type="text" placeholder="020202020202" name="aadharCard" value={formData.aadharCard} onChange={handleInputChange} />
                                        </div>
                                        <div className="image-field">
                                            <label>Pan Card No.</label>
                                            <input type="text" placeholder="020202020202" name="panCard" value={formData.panCard} onChange={handleInputChange} />
                                        </div>
                                    </div>

                                    <div className="image-field">
                                        <label>Occupation:</label>
                                        <select className="image-select-replacement small-width" name="occupation" value={formData.occupation} onChange={handleInputChange}>
                                            <option value="">Select</option>
                                            <option value="Nurse">Nurse</option>
                                            <option value="Service">Service</option>
                                            <option value="Business">Business</option>
                                            <option value="Other">Other</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="image-form-photo-right">
                                    <input
                                        type="file"
                                        id="staff-photo-upload"
                                        style={{ display: 'none' }}
                                        accept="image/*"
                                        onChange={(e) => {
                                            const file = e.target.files[0];
                                            if (file) {
                                                const reader = new FileReader();
                                                reader.onloadend = () => {
                                                    setFormData(prev => ({
                                                        ...prev,
                                                        photo: reader.result
                                                    }));
                                                };
                                                reader.readAsDataURL(file);
                                            }
                                        }}
                                    />
                                    <div
                                        className="image-photo-frame-box"
                                        onClick={() => document.getElementById('staff-photo-upload').click()}
                                        style={{ cursor: 'pointer', overflow: 'hidden' }}
                                    >
                                        <img
                                            id="staff-photo-preview"
                                            src={formData.photo}
                                            alt="Preview"
                                            style={{ width: '100%', height: '100%', objectFit: 'cover', display: formData.photo ? 'block' : 'none' }}
                                        />
                                        <div id="staff-photo-placeholder" className="image-photo-icon-placeholder" style={{ display: formData.photo ? 'none' : 'block' }}>
                                            <svg viewBox="0 0 100 100" fill="currentColor">
                                                <circle cx="50" cy="35" r="15" />
                                                <path d="M20,80 Q50,55 80,80" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="image-form-section-header margin-top">Address Information</div>
                            <div className="image-full-width-fields">
                                <div className="image-field flex-row">
                                    <label>Address</label>
                                    <input type="text" placeholder="Eg: 728 Clearview Drive" className="flex-1" name="address1" value={formData.address1} onChange={handleInputChange} />
                                </div>
                                <div className="image-field no-label">
                                    <input type="text" className="full-width margin-left-label" name="address2" value={formData.address2} onChange={handleInputChange} />
                                </div>

                                <div className="image-field-row-quad">
                                    <div className="image-field-mini">
                                        <label>City</label>
                                        <select className="image-select-replacement-mini" name="city" value={formData.city} onChange={handleInputChange}>
                                            <option value="">Select</option>
                                            <option value="Mumbai">Mumbai</option>
                                            <option value="Delhi">Delhi</option>
                                            <option value="Bangalore">Bangalore</option>
                                        </select>
                                    </div>
                                    <div className="image-field-mini">
                                        <label>Postal Code</label>
                                        <input type="text" className="image-select-replacement-mini" placeholder="Code" name="postalCode" value={formData.postalCode} onChange={handleInputChange} />
                                    </div>
                                    <div className="image-field-mini">
                                        <label>District</label>
                                        <select className="image-select-replacement-mini gray-bg" name="district" value={formData.district} onChange={handleInputChange}>
                                            <option value="">Select</option>
                                            <option value="District 1">District 1</option>
                                            <option value="District 2">District 2</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="image-field-row-duo">
                                    <div className="image-field-mini">
                                        <label>State</label>
                                        <select className="image-select-replacement-mini" name="state" value={formData.state} onChange={handleInputChange}>
                                            <option value="">Select</option>
                                            <option value="Maharashtra">Maharashtra</option>
                                            <option value="Delhi">Delhi</option>
                                            <option value="Karnataka">Karnataka</option>
                                        </select>
                                    </div>
                                    <div className="image-field-mini">
                                        <label>Country</label>
                                        <select className="image-select-replacement-mini" name="country" value={formData.country} onChange={handleInputChange}>
                                            <option value="">Select</option>
                                            <option value="India">India</option>
                                            <option value="USA">USA</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div className="image-form-footer-nav">
                                <button className="image-next-btn-blue" onClick={() => setActiveTab('contact')}>Next</button>
                            </div>
                        </div>
                    )}

                    {activeTab === 'contact' && (
                        <div className="image-tab-content fade-in">
                            <div className="image-form-section-header">Contact Details</div>

                            <div className="image-contact-fields-centered">
                                <div className="image-field flex-row spaced">
                                    <label>Contact Number (Primary)</label>
                                    <input type="text" placeholder="Write here" className="medium-width" name="primaryContact" value={formData.primaryContact} onChange={handleInputChange} />
                                </div>
                                <div className="image-field flex-row spaced">
                                    <label>Alternate Contact Number</label>
                                    <input type="text" placeholder="Write here" className="medium-width" name="alternateContact" value={formData.alternateContact} onChange={handleInputChange} />
                                </div>
                                <div className="image-field flex-row spaced">
                                    <label>Email Address</label>
                                    <input type="email" placeholder="example@email.com" className="medium-width" name="email" value={formData.email} onChange={handleInputChange} />
                                </div>

                                <div className="image-contact-method-section">
                                    <div className="image-method-title">Preferred Contact Method</div>
                                    <div className="image-radio-group-row">
                                        {['Call', 'Messages', 'Email'].map((method) => {
                                            const isChecked = Array.isArray(formData.preferredContact) ? formData.preferredContact.includes(method) : false;
                                            return (
                                                <label key={method} className="image-radio-label">
                                                    <input
                                                        type="checkbox"
                                                        name="preferredContact"
                                                        value={method}
                                                        className="image-radio-input"
                                                        checked={isChecked}
                                                        onChange={(e) => {
                                                            const arr = Array.isArray(formData.preferredContact) ? [...formData.preferredContact] : [];
                                                            if (e.target.checked) {
                                                                if (!arr.includes(method)) arr.push(method);
                                                            } else {
                                                                const idx = arr.indexOf(method);
                                                                if (idx > -1) arr.splice(idx, 1);
                                                            }
                                                            setFormData(prev => ({ ...prev, preferredContact: arr }));
                                                        }}
                                                    />
                                                    <span className="image-radio-text">{method}</span>
                                                </label>
                                            );
                                        })}
                                    </div>
                                </div>

                                <div className="image-form-section-header margin-top">Emergency Contact Details</div>

                                <div className="image-field flex-row spaced">
                                    <label>Name :</label>
                                    <input type="text" placeholder="Write here" className="medium-width" name="emergencyContactName" value={formData.emergencyContactName} onChange={handleInputChange} />
                                </div>
                                <div className="image-field flex-row spaced">
                                    <label>Relation with Patient:</label>
                                    <select className="image-select-replacement medium-width" name="emergencyContactRelation" value={formData.emergencyContactRelation} onChange={handleInputChange}>
                                        <option value="">Select</option>
                                        <option value="Spouse">Spouse</option>
                                        <option value="Parent">Parent</option>
                                        <option value="Sibling">Sibling</option>
                                        <option value="Friend">Friend</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>
                                <div className="image-field flex-row spaced">
                                    <label>Contact no:</label>
                                    <input type="text" placeholder="Write here" className="medium-width" name="emergencyContactNo" value={formData.emergencyContactNo} onChange={handleInputChange} />
                                </div>
                                <div className="image-field flex-row spaced">
                                    <label>Email Address</label>
                                    <input type="email" placeholder="example@email.com" className="medium-width" name="emergencyContactEmail" value={formData.emergencyContactEmail} onChange={handleInputChange} />
                                </div>
                            </div>

                            <div className="image-form-footer-nav">
                                <button className="image-next-btn-blue" onClick={() => setActiveTab('professional')}>Next</button>
                            </div>
                        </div>
                    )}

                    {activeTab === 'professional' && (
                        <div className="image-tab-content fade-in">
                            <div className="image-form-section-header">Professional Experience</div>
                            <div className="image-professional-fields">
                                <div className="image-field-row-cols">
                                    <div className="image-field">
                                        <label>Total Years of Experience</label>
                                        <input type="text" className="small-width-input" name="yearsOfExperience" value={formData.yearsOfExperience} onChange={handleInputChange} />
                                    </div>
                                    <div className="image-field">
                                        <label>Designation</label>
                                        <select className="image-select-replacement" name="designation" value={formData.designation} onChange={handleInputChange}>
                                            <option value="">Select</option>
                                            <option value="Nurse">Nurse</option>
                                            <option value="Admin">Admin</option>
                                            <option value="Receptionist">Receptionist</option>
                                            <option value="Technician">Technician</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="image-field flex-row spaced-extra">
                                    <label>Previous Employer Name</label>
                                    <input type="text" className="flex-1-styled" name="previousEmployer" value={formData.previousEmployer} onChange={handleInputChange} />
                                </div>
                                <div className="image-field flex-row spaced-extra">
                                    <label>Reason for Leaving Previous Job</label>
                                    <input type="text" className="flex-1-styled" name="reasonForLeaving" value={formData.reasonForLeaving} onChange={handleInputChange} />
                                </div>
                            </div>

                            <div className="image-form-section-header margin-top">Role & Department Details</div>
                            <div className="image-role-dept-grid">
                                <div className="image-field-row-cols">
                                    <div className="image-field">
                                        <label>Position:</label>
                                        <input type="text" className="field-border" name="position" value={formData.position} onChange={handleInputChange} />
                                    </div>
                                    <div className="image-field">
                                        <label>Department:</label>
                                        <input type="text" className="field-border" name="department" value={formData.department} onChange={handleInputChange} />
                                    </div>
                                </div>
                                <div className="image-field-row-cols">
                                    <div className="image-field">
                                        <label>Specialization</label>
                                        <select className="image-select-replacement-v" name="specialization" value={formData.specialization} onChange={handleInputChange}>
                                            <option value="">Select</option>
                                            <option value="General">General</option>
                                            <option value="Pediatrics">Pediatrics</option>
                                            <option value="Surgery">Surgery</option>
                                            <option value="Emergency">Emergency</option>
                                        </select>
                                    </div>
                                    <div className="image-field">
                                        <label>Employment Type:</label>
                                        <input type="text" className="field-border" name="employmentType" value={formData.employmentType} onChange={handleInputChange} />
                                    </div>
                                </div>
                                <div className="image-field-row-cols">
                                    <div className="image-field">
                                        <label>License no.</label>
                                        <input type="text" className="field-border" name="licenseNo" value={formData.licenseNo} onChange={handleInputChange} />
                                    </div>
                                    <div className="image-field">
                                        <label>License Expiry Date</label>
                                        <input type="date" className="field-border" name="licenseExpiryDate" value={formData.licenseExpiryDate} onChange={handleInputChange} />
                                    </div>
                                </div>
                                <div className="image-field-row-cols">
                                    <div className="image-field">
                                        <label>Joining Date:</label>
                                        <input type="date" className="field-border" name="joiningDate" value={formData.joiningDate} onChange={handleInputChange} />
                                    </div>
                                </div>
                            </div>

                            <div className="image-form-section-header margin-top">Availibility</div>
                            <div className="image-availability-section">
                                <div className="image-field-row-cols">
                                    <div className="image-field">
                                        <label>Employee Type</label>
                                        <select className="image-select-replacement-v" name="employeeType" value={formData.employeeType} onChange={handleInputChange}>
                                            <option value="">Select</option>
                                            <option value="Full-time">Full-time</option>
                                            <option value="Part-time">Part-time</option>
                                            <option value="Contract">Contract</option>
                                        </select>
                                    </div>
                                    <div className="image-field">
                                        <label>Shift Type</label>
                                        <input type="text" className="field-border" name="shiftType" value={formData.shiftType} onChange={handleInputChange} />
                                    </div>
                                </div>
                                <div className="image-field-row timing-row-match">
                                    <label>Shift Timming</label>
                                    <div className="timing-controls">
                                        <input type="time" className="mini-btn-styled" name="shiftStart" value={formData.shiftStart} onChange={handleInputChange} />
                                        <span>to</span>
                                        <input type="time" className="mini-btn-styled" name="shiftEnd" value={formData.shiftEnd} onChange={handleInputChange} />
                                    </div>
                                </div>
                            </div>

                            <div className="image-form-footer-nav-dual">
                                <button className="image-back-btn-styled" onClick={() => setActiveTab('contact')}>Back</button>
                                <button className="image-next-btn-blue-styled" onClick={() => setActiveTab('qualification')}>Next</button>
                            </div>
                        </div>
                    )}

                    {activeTab === 'qualification' && (
                        <div className="image-tab-content fade-in">
                            <div className="image-form-section-header">Educational Qualification</div>
                            <div className="image-qualification-fields">
                                <div className="image-field-row-cols">
                                    <div className="image-field">
                                        <label>Highest Qualification</label>
                                        <input type="text" className="field-border" name="qualification" value={formData.qualification} onChange={handleInputChange} />
                                    </div>
                                    <div className="image-field">
                                        <label>Year of Passing</label>
                                        <input type="text" className="field-border" name="yearOfPassing" value={formData.yearOfPassing} onChange={handleInputChange} />
                                    </div>
                                </div>
                                <div className="image-field flex-row spaced-extra">
                                    <label>Specialization/Subject Expertise</label>
                                    <input type="text" className="flex-1-styled" name="specialization2" value={formData.specialization2} onChange={handleInputChange} />
                                </div>
                                <div className="image-field flex-row spaced-extra">
                                    <label>Additional Certifications (if any)</label>
                                    <input type="text" className="flex-1-styled" name="certifications" value={formData.certifications} onChange={handleInputChange} />
                                </div>
                                <div className="image-field flex-row spaced-extra">
                                    <label>University Nametions (if any)</label>
                                    <input type="text" className="flex-1-styled" name="universityName" value={formData.universityName} onChange={handleInputChange} />
                                </div>
                            </div>
                            <div className="image-form-footer-nav-dual">
                                <button className="image-back-btn-styled" onClick={() => setActiveTab('professional')}>Back</button>
                                <button className="image-next-btn-blue-styled" onClick={() => setActiveTab('insurance')}>Next</button>
                            </div>
                        </div>
                    )}

                    {activeTab === 'insurance' && (
                        <div className="image-tab-content fade-in">
                            <div className="image-form-section-header">Primary Insurance Details</div>
                            <div className="image-insurance-section">
                                <div className="image-field flex-row spaced-extra">
                                    <label>Insurance Company Name</label>
                                    <input type="text" className="flex-1-styled" name="primaryInsuranceCompany" value={formData.primaryInsuranceCompany} onChange={handleInputChange} />
                                </div>
                                <div className="image-field-row-cols">
                                    <div className="image-field">
                                        <label>Policy Number</label>
                                        <input type="text" className="field-border" name="primaryPolicyNumber" value={formData.primaryPolicyNumber} onChange={handleInputChange} />
                                    </div>
                                    <div className="image-field">
                                        <label>Group Number</label>
                                        <input type="text" className="field-border" name="primaryGroupNumber" value={formData.primaryGroupNumber} onChange={handleInputChange} />
                                    </div>
                                </div>
                                <div className="image-field-row insurance-date-row">
                                    <label>Insurance Effective Dates</label>
                                    <input type="date" className="date-pill" name="primaryStartDate" value={formData.primaryStartDate} onChange={handleInputChange} />
                                    <span>to</span>
                                    <input type="date" className="date-pill" name="primaryEndDate" value={formData.primaryEndDate} onChange={handleInputChange} />
                                </div>
                            </div>

                            <div className="image-form-section-header margin-top">Secondary Insurance Details</div>
                            <div className="image-insurance-section">
                                <div className="image-field flex-row spaced-extra">
                                    <label>Insurance Company Name</label>
                                    <input type="text" className="flex-1-styled" name="secondaryInsuranceCompany" value={formData.secondaryInsuranceCompany} onChange={handleInputChange} />
                                </div>
                                <div className="image-field-row-cols">
                                    <div className="image-field">
                                        <label>Policy Number</label>
                                        <input type="text" className="field-border" name="secondaryPolicyNumber" value={formData.secondaryPolicyNumber} onChange={handleInputChange} />
                                    </div>
                                    <div className="image-field">
                                        <label>Group Number</label>
                                        <input type="text" className="field-border" name="secondaryGroupNumber" value={formData.secondaryGroupNumber} onChange={handleInputChange} />
                                    </div>
                                </div>
                                <div className="image-field-row insurance-date-row">
                                    <label>Insurance Effective Dates</label>
                                    <input type="date" className="date-pill" name="secondaryStartDate" value={formData.secondaryStartDate} onChange={handleInputChange} />
                                    <span>to</span>
                                    <input type="date" className="date-pill" name="secondaryEndDate" value={formData.secondaryEndDate} onChange={handleInputChange} />
                                </div>
                            </div>

                            <div className="image-form-section-header margin-top">Insurance Contact Details</div>
                            <div className="image-insurance-contact">
                                <div className="image-field flex-row spaced-extra-center">
                                    <label>Contact Number</label>
                                    <input type="text" className="contact-input-styled" placeholder="978-960-9691" name="insuranceContactNumber" value={formData.insuranceContactNumber} onChange={handleInputChange} />
                                </div>
                                <div className="image-field flex-row spaced-extra-center">
                                    <label>Insurance Card Images</label>
                                    <div>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            className="upload-bar-styled"
                                            onChange={(e) => {
                                                const file = e.target.files[0];
                                                if (file) {
                                                    const reader = new FileReader();
                                                    reader.onloadend = () => {
                                                        setFormData(prev => ({
                                                            ...prev,
                                                            insuranceCardImage: reader.result
                                                        }));
                                                    };
                                                    reader.readAsDataURL(file);
                                                }
                                            }}
                                        />
                                        {formData.insuranceCardImage && (
                                            <div style={{ marginTop: 8 }}>
                                                <img src={formData.insuranceCardImage} alt="Insurance card" style={{ maxWidth: 200, maxHeight: 120, border: '1px solid #ccc', borderRadius: 4 }} />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="image-form-footer-nav-dual">
                                <button className="image-back-btn-styled" onClick={() => setActiveTab('qualification')}>Back</button>
                                <button className="image-save-btn-styled" onClick={handleSave} disabled={loading}>{loading ? 'Saving...' : 'Save'}</button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default AddStaff;
