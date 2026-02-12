import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AddDoctor.css';

function AddDoctor() {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('personal');

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
                        <svg viewBox="0 0 100 100" fill="#7FBADD">
                            <circle cx="50" cy="50" r="45" />
                            <circle cx="50" cy="35" r="15" fill="white" />
                            <path d="M25,75 Q50,55 75,75" fill="white" />
                        </svg>
                    </div>
                </div>
            </div>

            <div className="image-add-doctor-container">
                <h1 className="image-page-main-title">Add New Doctor</h1>

                <div className="image-form-tabs-bar">
                    {tabs.map(tab => (
                        <div
                            key={tab.id}
                            className={`image-tab-item ${activeTab === tab.id ? 'active' : ''}`}
                            onClick={() => setActiveTab(tab.id)}
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
                                            <input type="text" placeholder="First Name" />
                                            <input type="text" placeholder="Middle Name" />
                                            <input type="text" placeholder="Last Name" />
                                        </div>
                                    </div>

                                    <div className="image-field-row-cols">
                                        <div className="image-field">
                                            <label>Date of Birth</label>
                                            <input type="text" placeholder="DD/MM/YYYY" />
                                        </div>
                                        <div className="image-field">
                                            <label>Marital status</label>
                                            <div className="image-select-replacement">Select V</div>
                                        </div>
                                    </div>

                                    <div className="image-field-row-cols">
                                        <div className="image-field">
                                            <label>Blood Group</label>
                                            <div className="image-select-replacement">Select V</div>
                                        </div>
                                        <div className="image-field">
                                            <label>Gender</label>
                                            <div className="image-select-replacement">Select V</div>
                                        </div>
                                    </div>

                                    <div className="image-field-row-cols">
                                        <div className="image-field">
                                            <label>Nationality</label>
                                            <div className="image-select-replacement">Select V</div>
                                        </div>
                                        <div className="image-field">
                                            <label>Category</label>
                                            <div className="image-select-replacement">Select V</div>
                                        </div>
                                    </div>

                                    <div className="image-field-row-cols">
                                        <div className="image-field">
                                            <label>Aadhar Card No.</label>
                                            <input type="text" placeholder="020202020202" />
                                        </div>
                                        <div className="image-field">
                                            <label>Pan Card No.</label>
                                            <input type="text" placeholder="020202020202" />
                                        </div>
                                    </div>

                                    <div className="image-field">
                                        <label>Occupation:</label>
                                        <div className="image-select-replacement small-width">Select V</div>
                                    </div>
                                </div>

                                <div className="image-form-photo-right">
                                    <div className="image-photo-frame-box">
                                        <div className="image-photo-icon-placeholder">
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
                                    <input type="text" placeholder="Eg: 728 Clearview Drive" className="flex-1" />
                                </div>
                                <div className="image-field no-label">
                                    <input type="text" className="full-width margin-left-label" />
                                </div>

                                <div className="image-field-row-quad">
                                    <div className="image-field-mini">
                                        <label>City</label>
                                        <div className="image-select-replacement-mini">Select V</div>
                                    </div>
                                    <div className="image-field-mini">
                                        <label>Postal Code</label>
                                        <div className="image-select-replacement-mini">Select V</div>
                                    </div>
                                    <div className="image-field-mini">
                                        <label>District</label>
                                        <div className="image-select-replacement-mini gray-bg">Select</div>
                                    </div>
                                </div>

                                <div className="image-field-row-duo">
                                    <div className="image-field-mini">
                                        <label>State</label>
                                        <div className="image-select-replacement-mini">Select V</div>
                                    </div>
                                    <div className="image-field-mini">
                                        <label>Country</label>
                                        <div className="image-select-replacement-mini">Select V</div>
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
                                    <input type="text" placeholder="Write here" className="medium-width" />
                                </div>
                                <div className="image-field flex-row spaced">
                                    <label>Alternate Contact Number</label>
                                    <input type="text" placeholder="Write here" className="medium-width" />
                                </div>
                                <div className="image-field flex-row spaced">
                                    <label>Email Address</label>
                                    <div className="image-input-with-suffix">
                                        <input type="text" className="medium-width" />
                                        <span>@gmail.com</span>
                                    </div>
                                </div>

                                <div className="image-contact-method-section">
                                    <div className="image-method-title">Preferred Contact Method</div>
                                    <div className="image-radio-group-row">
                                        <div className="image-radio-item">Call</div>
                                        <div className="image-radio-circle-input"></div>
                                        <div className="image-radio-item">Messages</div>
                                        <div className="image-radio-circle-input filled"></div>
                                        <div className="image-radio-item">Email</div>
                                    </div>
                                </div>

                                <div className="image-form-section-header margin-top">Emergency Contact Details</div>

                                <div className="image-field flex-row spaced">
                                    <label>Name :</label>
                                    <input type="text" placeholder="Write here" className="medium-width" />
                                </div>
                                <div className="image-field flex-row spaced">
                                    <label>Relation with Patient:</label>
                                    <div className="image-select-replacement medium-width">Select V</div>
                                </div>
                                <div className="image-field flex-row spaced">
                                    <label>Contact no:</label>
                                    <input type="text" placeholder="Write here" className="medium-width" />
                                </div>
                                <div className="image-field flex-row spaced">
                                    <label>Email Address</label>
                                    <div className="image-input-with-suffix">
                                        <input type="text" className="medium-width" />
                                        <span>@gmail.com</span>
                                    </div>
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
                                        <input type="text" className="small-width-input" />
                                    </div>
                                    <div className="image-field">
                                        <label>Designation</label>
                                        <div className="image-select-replacement">Select V</div>
                                    </div>
                                </div>
                                <div className="image-field flex-row spaced-extra">
                                    <label>Previous Employer Name</label>
                                    <input type="text" className="flex-1-styled" />
                                </div>
                                <div className="image-field flex-row spaced-extra">
                                    <label>Reason for Leaving Previous Job</label>
                                    <input type="text" className="flex-1-styled" />
                                </div>
                            </div>

                            <div className="image-form-section-header margin-top">Role & Department Details</div>
                            <div className="image-role-dept-grid">
                                <div className="image-field-row-cols">
                                    <div className="image-field">
                                        <label>Position:</label>
                                        <input type="text" className="field-border" />
                                    </div>
                                    <div className="image-field">
                                        <label>Department:</label>
                                        <input type="text" className="field-border" />
                                    </div>
                                </div>
                                <div className="image-field-row-cols">
                                    <div className="image-field">
                                        <label>Specialization</label>
                                        <div className="image-select-replacement-v">Select V</div>
                                    </div>
                                    <div className="image-field">
                                        <label>Employment Type:</label>
                                        <input type="text" className="field-border" />
                                    </div>
                                </div>
                                <div className="image-field-row-cols">
                                    <div className="image-field">
                                        <label>License no.</label>
                                        <input type="text" className="field-border" />
                                    </div>
                                    <div className="image-field">
                                        <label>License Expiry Date</label>
                                        <input type="text" className="field-border" />
                                    </div>
                                </div>
                                <div className="image-field-row-cols">
                                    <div className="image-field">
                                        <label>Joining Date:</label>
                                        <input type="text" className="field-border" />
                                    </div>
                                </div>
                            </div>

                            <div className="image-form-section-header margin-top">Availibility</div>
                            <div className="image-availability-section">
                                <div className="image-field-row-cols">
                                    <div className="image-field">
                                        <label>Employee Type</label>
                                        <div className="image-select-replacement-v">Select V</div>
                                    </div>
                                    <div className="image-field">
                                        <label>Shift Type</label>
                                        <input type="text" className="field-border" />
                                    </div>
                                </div>
                                <div className="image-field-row timing-row-match">
                                    <label>Shift Timming</label>
                                    <div className="timing-controls">
                                        <div className="mini-btn-styled">Start</div>
                                        <span>to</span>
                                        <div className="mini-btn-styled">End</div>
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
                                        <input type="text" className="field-border" />
                                    </div>
                                    <div className="image-field">
                                        <label>Year of Passing</label>
                                        <input type="text" className="field-border" />
                                    </div>
                                </div>
                                <div className="image-field flex-row spaced-extra">
                                    <label>Specialization/Subject Expertise</label>
                                    <input type="text" className="flex-1-styled" />
                                </div>
                                <div className="image-field flex-row spaced-extra">
                                    <label>Additional Certifications (if any)</label>
                                    <input type="text" className="flex-1-styled" />
                                </div>
                                <div className="image-field flex-row spaced-extra">
                                    <label>University Nametions (if any)</label>
                                    <input type="text" className="flex-1-styled" />
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
                                    <input type="text" className="flex-1-styled" />
                                </div>
                                <div className="image-field-row-cols">
                                    <div className="image-field">
                                        <label>Policy Number</label>
                                        <input type="text" className="field-border" />
                                    </div>
                                    <div className="image-field">
                                        <label>Group Number</label>
                                        <input type="text" className="field-border" />
                                    </div>
                                </div>
                                <div className="image-field-row insurance-date-row">
                                    <div className="spacer-label"></div>
                                    <input type="text" className="short-input-match" />
                                    <label>Insurance Effective Dates</label>
                                    <div className="date-pill">Start Date</div>
                                    <span>to</span>
                                    <div className="date-pill">End date</div>
                                </div>
                            </div>

                            <div className="image-form-section-header margin-top">Secondary Insurance Details</div>
                            <div className="image-insurance-section">
                                <div className="image-field flex-row spaced-extra">
                                    <label>Insurance Company Name</label>
                                    <input type="text" className="flex-1-styled" />
                                </div>
                                <div className="image-field-row-cols">
                                    <div className="image-field">
                                        <label>Policy Number</label>
                                        <input type="text" className="field-border" />
                                    </div>
                                    <div className="image-field">
                                        <label>Group Number</label>
                                        <input type="text" className="field-border" />
                                    </div>
                                </div>
                                <div className="image-field-row insurance-date-row">
                                    <div className="spacer-label"></div>
                                    <input type="text" className="short-input-match" />
                                    <label>Insurance Effective Dates</label>
                                    <div className="date-pill">Start Date</div>
                                    <span>to</span>
                                    <div className="date-pill">End date</div>
                                </div>
                            </div>

                            <div className="image-form-section-header margin-top">Insurance Contact Details</div>
                            <div className="image-insurance-contact">
                                <div className="image-field flex-row spaced-extra-center">
                                    <label>Contact Number</label>
                                    <input type="text" className="contact-input-styled" placeholder="978-960-9691" />
                                </div>
                                <div className="image-field flex-row spaced-extra-center">
                                    <label>Insurance Card Images</label>
                                    <div className="upload-bar-styled">
                                        <span>Upload Card Image</span>
                                        <div className="upload-blue-box"></div>
                                    </div>
                                </div>
                            </div>

                            <div className="image-form-footer-nav-dual">
                                <button className="image-back-btn-styled" onClick={() => setActiveTab('qualification')}>Back</button>
                                <button className="image-save-btn-styled" onClick={() => navigate('/doctors')}>Save</button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default AddDoctor;
