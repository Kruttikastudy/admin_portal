import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AddDoctor.css'; // Reusing styles

function SocialHistoryTab({ onBack, onNext }) {
    const [activeDetail, setActiveDetail] = useState(null);
    const [toggles, setToggles] = useState({});

    const socialItems = [
        'Tobacco use (Smoking)', 'Tobacco use (consumption)', 'Alcohol use',
        'Physical activity', 'Stress', 'Social isolation & connection',
        'Exposure to violence', 'Sexual orientation', 'Nutrients History',
        'Social History (free text)'
    ];

    const handleToggle = (item) => {
        if (!toggles[item]) {
            setToggles({ [item]: true });
            setActiveDetail(item);
        } else {
            setToggles({});
            setActiveDetail(null);
        }
    };

    const renderDetailCard = () => {
        if (!activeDetail) return null;

        let title = activeDetail;
        if (activeDetail.includes('Tobacco')) title = 'Tobacco Use';
        if (activeDetail === 'Alcohol use') title = 'Alcohol use';
        if (activeDetail === 'Physical activity') title = 'Physical activity';
        if (activeDetail === 'Stress') title = 'Stress';

        return (
            <div className="image-social-detail-card fade-in">
                <div className="image-card-header">
                    <h3>{title}</h3>
                    <div className="image-card-close-x" onClick={() => setActiveDetail(null)}>X</div>
                </div>
                <div className="image-card-body">
                    {activeDetail.includes('Tobacco') && (
                        <>
                            <div className="image-card-field-row">
                                <label>Current Status</label>
                                <div className="image-card-select-v">Select <span>V</span></div>
                            </div>
                            <div className="image-card-field-row">
                                <label>Average Daily Consumption</label>
                                <input type="text" placeholder="eg: 1,2" />
                            </div>
                            <div className="image-card-field-row">
                                <label>Duration of Use</label>
                                <div className="image-duration-box">
                                    <input type="text" placeholder="No" />
                                    <div className="image-card-select-v">years <span>V</span></div>
                                </div>
                            </div>
                            <div className="image-card-field-row">
                                <label>Quit Date</label>
                                <div className="image-card-select-v">DD/MM/YYYY <span>V</span></div>
                            </div>
                            <div className="image-card-field-row">
                                <label>Notes</label>
                                <textarea></textarea>
                            </div>
                        </>
                    )}

                    {activeDetail === 'Alcohol use' && (
                        <>
                            <div className="image-card-field-row">
                                <label>Current Status</label>
                                <div className="image-card-select-v">Select <span>V</span></div>
                            </div>
                            <div className="image-card-field-row">
                                <label>Average Weekly Consumption</label>
                                <input type="text" style={{ width: '80px' }} />
                            </div>
                            <div className="image-card-field-row">
                                <label>Type of Alcohol</label>
                                <div className="image-card-select-v">Select <span>V</span></div>
                            </div>
                            <div className="image-card-field-row">
                                <label>Period of Use</label>
                                <input type="text" placeholder="write here" />
                            </div>
                            <div className="image-card-field-row">
                                <label>Notes</label>
                                <textarea></textarea>
                            </div>
                            <button className="image-card-add-btn">Add</button>
                        </>
                    )}

                    {activeDetail === 'Physical activity' && (
                        <>
                            <div className="image-card-field-row">
                                <label>Frequency</label>
                                <div className="image-card-select-v">Select <span>V</span></div>
                            </div>
                            <div className="image-card-field-row">
                                <label>Type of Exercise</label>
                                <input type="text" placeholder="Write here" />
                            </div>
                            <div className="image-card-field-row">
                                <label>Duration</label>
                                <div className="image-duration-box">
                                    <input type="text" placeholder="eg: 1,2" />
                                    <div className="image-card-select-v">min <span>V</span></div>
                                </div>
                            </div>
                            <div className="image-card-field-row">
                                <label>Consistency:</label>
                                <div className="image-card-select-v">Select <span>V</span></div>
                            </div>
                            <div className="image-card-field-row">
                                <label>Notes</label>
                                <textarea></textarea>
                            </div>
                            <button className="image-card-add-btn">Add</button>
                        </>
                    )}

                    {activeDetail === 'Stress' && (
                        <>
                            <div className="image-card-field-row">
                                <label>Perceived Stress Level</label>
                                <div className="image-card-select-v">Select <span>V</span></div>
                            </div>
                            <div className="image-card-field-row">
                                <label>Major Stressors</label>
                                <input type="text" placeholder="Write here" />
                            </div>
                            <div className="image-card-field-row">
                                <label>Coping Mechanisms</label>
                                <input type="text" placeholder="Write here" />
                            </div>
                            <div className="image-card-field-row">
                                <label>Notes</label>
                                <textarea></textarea>
                            </div>
                            <button className="image-card-add-btn">Add</button>
                        </>
                    )}

                    {activeDetail === 'Social isolation & connection' && (
                        <>
                            <div className="image-card-field-row">
                                <label>Isolation Status</label>
                                <div className="image-card-select-v">Select <span>V</span></div>
                            </div>
                            <div className="image-card-field-row">
                                <label>Social Support</label>
                                <div className="image-card-select-v">Select <span>V</span></div>
                            </div>
                            <div className="image-card-field-row" style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                                <label>Frequency of Social Interactions</label>
                                <textarea placeholder="Write here" style={{ width: '100%', marginTop: '5px' }}></textarea>
                            </div>
                            <div className="image-card-field-row">
                                <label>Notes</label>
                                <input type="text" />
                            </div>
                            <button className="image-card-add-btn">Add</button>
                        </>
                    )}

                    {activeDetail === 'Exposure to violence' && (
                        <>
                            <div className="image-card-field-row">
                                <label>Type of Violence</label>
                                <div className="image-card-select-v">Select <span>V</span></div>
                            </div>
                            <div className="image-card-field-row">
                                <label>Date of Last Exposure</label>
                                <div className="image-card-select-v">Select <span>V</span></div>
                            </div>
                            <div className="image-card-field-row" style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                                <label>Support or Intervention Received</label>
                                <textarea placeholder="Write here" style={{ width: '100%', marginTop: '5px' }}></textarea>
                            </div>
                            <div className="image-card-field-row">
                                <label>Notes</label>
                                <input type="text" />
                            </div>
                            <button className="image-card-add-btn">Add</button>
                        </>
                    )}

                    {activeDetail === 'Sexual orientation' && (
                        <>
                            <div className="image-card-field-row">
                                <label>Sexual orientation</label>
                                <div className="image-card-select-v">Straight <span>V</span></div>
                            </div>
                            <div className="image-card-field-row">
                                <label>Notes</label>
                                <input type="text" />
                            </div>
                            <button className="image-card-add-btn">Add</button>
                        </>
                    )}

                    {activeDetail === 'Nutrients History' && (
                        <>
                            <div className="image-card-field-row" style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                                <label>Dietary Preferences</label>
                                <input type="text" style={{ width: '100%', marginTop: '5px' }} />
                            </div>
                            <div className="image-card-field-row">
                                <label>Supplement Usage</label>
                                <div className="image-card-select-v">No <span>V</span></div>
                            </div>
                            <div className="image-card-field-row">
                                <label>Notes</label>
                                <input type="text" />
                            </div>
                            <button className="image-card-add-btn">Add</button>
                        </>
                    )}

                    {activeDetail === 'Social History (free text)' && (
                        <>
                            <div className="image-card-field-row" style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                                <label>Notes</label>
                                <textarea style={{ width: '100%', marginTop: '5px', height: '100px' }}></textarea>
                            </div>
                            <button className="image-card-add-btn">Add</button>
                        </>
                    )}

                </div>
                <div className="image-card-footer">
                    <button className="image-save-pill-btn">Save</button>
                </div>
            </div>
        );
    };

    return (
        <div className="image-tab-content fade-in">
            <div className="image-form-section-header">Social History</div>
            <div className={`image-social-history-content-row ${!activeDetail ? 'is-empty' : ''}`}>
                <div className="image-social-history-list">
                    {socialItems.map((item, idx) => (
                        <div
                            className={`image-social-item ${activeDetail === item ? 'active-item' : ''}`}
                            key={idx}
                            onClick={() => toggles[item] && setActiveDetail(item)}
                            style={{ cursor: toggles[item] ? 'pointer' : 'default' }}
                        >
                            <span className="image-social-label">{item}</span>
                            <div className="image-toggle-container">
                                <span className="image-toggle-label">{toggles[item] ? 'On' : ''}</span>
                                <div
                                    className={`image-toggle-switch ${toggles[item] ? 'on' : 'off'}`}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleToggle(item);
                                    }}
                                >
                                    <div className="image-toggle-circle"></div>
                                </div>
                                <span className="image-toggle-label">{!toggles[item] ? 'off' : ''}</span>
                            </div>
                        </div>
                    ))}
                </div>

                {renderDetailCard()}
            </div>
            <div className="image-form-footer-nav-dual">
                <button className="image-back-btn-styled" onClick={onBack}>Back</button>
                <button className="image-next-btn-blue-styled" onClick={onNext}>Next</button>
            </div>
        </div>
    );
}

function AddPatient() {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('personal');

    const tabs = [
        { id: 'personal', label: 'Personal Details' },
        { id: 'contact', label: 'Contact Details' },
        { id: 'insurance', label: 'Insuarance Details' }, // Noticed the typo "Insuarance" in the image tab bar
        { id: 'allergies', label: 'Allergies' },
        { id: 'social', label: 'Social History' },
        { id: 'family', label: 'Family History' },
        { id: 'consent', label: 'Consent' },
    ];

    const handleTabClick = (id) => {
        setActiveTab(id);
    };

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
                <h1 className="image-page-main-title">Add New Patient</h1>

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
                                            <input type="text" placeholder="First Name" />
                                            <input type="text" placeholder="Middle Name" />
                                            <input type="text" placeholder="Last Name" />
                                        </div>
                                    </div>

                                    <div className="image-field-row-cols">
                                        <div className="image-field">
                                            <label>Date of Birth</label>
                                            <input type="text" placeholder="DD/MM/YYYY" className="field-border" />
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
                                            <input type="text" placeholder="020202020202" className="field-border" />
                                        </div>
                                        <div className="image-field">
                                            <label>Pan Card No.</label>
                                            <input type="text" placeholder="020202020202" className="field-border" />
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
                                    <input type="text" placeholder="Eg: 728 Clearview Drive" className="flex-1-styled" />
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
                                <button className="image-next-btn-blue" onClick={() => setActiveTab('insurance')}>Next</button>
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
                                    <div className="image-field">
                                        <label>Plan Type:</label>
                                        <input type="text" className="short-input-match" />
                                    </div>
                                    <label className="inline-label">Insurance Effective Dates</label>
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
                                    <div className="image-field">
                                        <label>Plan Type:</label>
                                        <input type="text" className="short-input-match" />
                                    </div>
                                    <label className="inline-label">Insurance Effective Dates</label>
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
                                <button className="image-back-btn-styled" onClick={() => setActiveTab('contact')}>Back</button>
                                <button className="image-next-btn-blue-styled" onClick={() => setActiveTab('allergies')}>Next</button>
                            </div>
                        </div>
                    )}

                    {activeTab === 'allergies' && (
                        <div className="image-tab-content fade-in">
                            <div className="image-allergies-details-header">Allergies Details</div>
                            <div className="image-allergies-table-container">
                                <table className="image-allergies-table">
                                    <thead>
                                        <tr>
                                            <th>Allergen</th>
                                            <th>Reaction</th>
                                            <th>Severity</th>
                                            <th>Category</th>
                                            <th>Code</th>
                                            <th>Status</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td><div className="image-allergies-select">Select V</div></td>
                                            <td><div className="image-allergies-select">Select V</div></td>
                                            <td><div className="image-allergies-select">Select V</div></td>
                                            <td><div className="image-allergies-select">Select V</div></td>
                                            <td><input type="text" className="image-allergies-input" placeholder="Select" /></td>
                                            <td><div className="image-allergies-select">Select V</div></td>
                                            <td>
                                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                                    <span className="image-action-remove-btn">X</span>
                                                    <button className="image-action-add-btn">+</button>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="image-form-footer-nav">
                                <button className="image-next-btn-blue" onClick={() => setActiveTab('social')}>Next</button>
                            </div>
                        </div>
                    )}

                    {activeTab === 'social' && <SocialHistoryTab onBack={() => setActiveTab('allergies')} onNext={() => setActiveTab('family')} />}


                    {activeTab === 'family' && (
                        <div className="image-tab-content fade-in">
                            <div className="image-form-section-header">Family History</div>

                            <div className="image-family-history-container">
                                <div className="image-history-card">
                                    <div className="image-history-card-header">
                                        <span>Family Members Details:</span>
                                        <span>+</span>
                                    </div>
                                    <div className="image-history-card-body">
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
                                                <input type="text" placeholder="DD/MM/YYYY" className="field-border" />
                                            </div>
                                            <div className="image-field">
                                                <label>Gender</label>
                                                <div className="image-select-replacement">Select V</div>
                                            </div>
                                        </div>
                                        <div className="image-field-row-cols">
                                            <div className="image-field">
                                                <label>Relationship</label>
                                                <div className="image-select-replacement">Select V</div>
                                            </div>
                                            <div className="image-field">
                                                <label>Deceased</label>
                                                <div className="deceased-checkbox-box"></div>
                                            </div>
                                        </div>
                                        <div className="image-field flex-row">
                                            <label style={{ width: '150px' }}>Medical Conditions</label>
                                            <input type="text" placeholder="Write Here" className="image-full-width-input" />
                                        </div>
                                    </div>
                                </div>

                                <div className="image-history-card">
                                    <div className="image-history-card-header">
                                        <span>Genetic Conditions:</span>
                                        <span>+</span>
                                    </div>
                                    <div className="image-history-card-body">
                                        <div className="image-field flex-row">
                                            <label style={{ width: '150px' }}>Condition Name</label>
                                            <input type="text" className="contact-input-styled" />
                                        </div>
                                        <div className="image-field flex-row">
                                            <label style={{ width: '150px' }}>Affected Family Members Name</label>
                                            <div className="image-select-replacement medium-width">Select V</div>
                                        </div>
                                        <div className="image-field flex-row">
                                            <label style={{ width: '150px' }}>Genetic Testing Results</label>
                                            <input type="text" placeholder="Write Here" className="image-full-width-input" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="image-form-footer-nav-dual">
                                <button className="image-back-btn-styled" onClick={() => setActiveTab('social')}>Back</button>
                                <button className="image-next-btn-blue-styled" onClick={() => setActiveTab('consent')}>Next</button>
                            </div>
                        </div>
                    )}

                    {activeTab === 'consent' && (
                        <div className="image-tab-content fade-in">
                            <div className="image-consent-form-content">
                                <h2>Consent Form</h2>
                                <div className="image-consent-points">
                                    <div className="image-consent-point">
                                        3. <strong>Security Measures:</strong> I understand that [Healthcare Provider's Name] has implemented security measures to protect the privacy and security of my health information stored in the EMR system.
                                    </div>
                                    <div className="image-consent-point">
                                        4. <strong>Access and Amendments:</strong> I understand that I have the right to access my medical records stored in the EMR system and request amendments to any inaccuracies or incomplete information.
                                    </div>
                                    <div className="image-consent-point">
                                        5. <strong>Sharing of Information:</strong> I acknowledge that my health information may be shared with other healthcare providers involved in my treatment, as necessary for continuity of care.
                                    </div>
                                    <div className="image-consent-point">
                                        5. <strong>Research and Quality Improvement:</strong> I understand that my DE-identified health information may be used for research or quality improvement purposes to enhance healthcare services, with appropriate safeguards to protect my privacy.
                                    </div>
                                    <div className="image-consent-point">
                                        5. <strong>Revocation of Consent:</strong> I understand that I have the right to revoke this consent at any time, except to the extent that action has already been taken in reliance on this consent.
                                    </div>
                                </div>
                            </div>
                            <div className="image-form-footer-nav-dual">
                                <button className="image-back-btn-styled" onClick={() => setActiveTab('family')}>Back</button>
                                <button className="image-save-btn-styled" onClick={() => navigate('/patients')}>Save</button>
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
}

export default AddPatient;
