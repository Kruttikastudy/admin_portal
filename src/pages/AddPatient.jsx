import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getApiUrl } from '../api';
import './AddDoctor.css'; // Reusing styles

function SocialHistoryTab({ onBack, onNext, socialFormData, setSocialFormData, toggles, setToggles }) {
    const [activeDetail, setActiveDetail] = useState(null);

    const socialItems = [
        'Tobacco use (Smoking)', 'Tobacco use (consumption)', 'Alcohol use',
        'Physical activity', 'Stress', 'Social isolation & connection',
        'Exposure to violence', 'Gender identity', 'Sexual orientation',
        'Highest level of education', 'Financial resources',
        'Nutrients History', 'Social History (free text)'
    ];

    // Initialize toggles as off for items that don't have data
    useEffect(() => {
        if (Object.keys(toggles).length === 0) {
            const initialToggles = {};
            socialItems.forEach(item => {
                initialToggles[item] = false;
            });
            setToggles(initialToggles);
        }
    }, []);

    const handleToggle = (item) => {
        if (!toggles[item]) {
            setToggles(prev => {
                const newToggles = { ...prev };
                Object.keys(newToggles).forEach(key => { newToggles[key] = false; });
                newToggles[item] = true;
                return newToggles;
            });
            setActiveDetail(item);
        } else {
            setToggles(prev => ({ ...prev, [item]: false }));
            setActiveDetail(null);
        }
    };

    const handleSocialInputChange = (section, fieldName, value) => {
        setSocialFormData(prev => ({
            ...prev,
            [section]: { ...prev[section], [fieldName]: value }
        }));
    };

    const renderDetailCard = () => {
        if (!activeDetail) return null;

        return (
            <div className="image-social-detail-card fade-in">
                <div className="image-card-header">
                    <h3>{activeDetail}</h3>
                    <div className="image-card-close-x" onClick={() => { setActiveDetail(null); setToggles(prev => ({ ...prev, [activeDetail]: false })); }}>X</div>
                </div>
                <div className="image-card-body">

                    {activeDetail.includes('Tobacco use (Smoking)') && (
                        <>
                            <div className="image-card-field-row">
                                <label>Current Status</label>
                                <select className="image-select-input" value={socialFormData.tobaccoUse.status} onChange={(e) => handleSocialInputChange('tobaccoUse', 'status', e.target.value)}>
                                    <option value="">Select</option>
                                    <option value="Current Smoker">Current Smoker</option>
                                    <option value="Former Smoker">Former Smoker</option>
                                    <option value="Never Smoked">Never Smoked</option>
                                </select>
                            </div>
                            {(socialFormData.tobaccoUse.status === "Current Smoker" || socialFormData.tobaccoUse.status === "Former Smoker") && (
                                <>
                                    <div className="image-card-field-row">
                                        <label>Average Daily Consumption</label>
                                        <input type="number" placeholder="cigarettes per day" value={socialFormData.tobaccoUse.dailyConsumption} onChange={(e) => handleSocialInputChange('tobaccoUse', 'dailyConsumption', e.target.value)} />
                                    </div>
                                    <div className="image-card-field-row">
                                        <label>Duration of Use</label>
                                        <div className="image-duration-box">
                                            <input type="number" placeholder="Duration" value={socialFormData.tobaccoUse.duration} onChange={(e) => handleSocialInputChange('tobaccoUse', 'duration', e.target.value)} />
                                            <select value={socialFormData.tobaccoUse.durationUnit} onChange={(e) => handleSocialInputChange('tobaccoUse', 'durationUnit', e.target.value)}>
                                                <option value="days">Days</option>
                                                <option value="weeks">Weeks</option>
                                                <option value="months">Months</option>
                                                <option value="years">Years</option>
                                            </select>
                                        </div>
                                    </div>
                                </>
                            )}
                            {socialFormData.tobaccoUse.status === "Former Smoker" && (
                                <div className="image-card-field-row">
                                    <label>Quit Date</label>
                                    <input type="date" value={socialFormData.tobaccoUse.quitDate} onChange={(e) => handleSocialInputChange('tobaccoUse', 'quitDate', e.target.value)} />
                                </div>
                            )}
                            <div className="image-card-field-row">
                                <label>Notes</label>
                                <textarea value={socialFormData.tobaccoUse.notes} onChange={(e) => handleSocialInputChange('tobaccoUse', 'notes', e.target.value)} placeholder="Additional notes..."></textarea>
                            </div>
                        </>
                    )}

                    {activeDetail === 'Tobacco use (consumption)' && (
                        <>
                            <div className="image-card-field-row">
                                <label>Current Status</label>
                                <select className="image-select-input" value={socialFormData.tobaccoConsumption.status} onChange={(e) => handleSocialInputChange('tobaccoConsumption', 'status', e.target.value)}>
                                    <option value="">Select</option>
                                    <option value="Current user">Current user</option>
                                    <option value="Former user">Former user</option>
                                    <option value="Social user">Social user</option>
                                    <option value="Never used">Never used</option>
                                </select>
                            </div>
                            {(socialFormData.tobaccoConsumption.status === "Current user" || socialFormData.tobaccoConsumption.status === "Social user" || socialFormData.tobaccoConsumption.status === "Former user") && (
                                <>
                                    <div className="image-card-field-row">
                                        <label>Average Daily Consumption</label>
                                        <input type="number" placeholder="quantity" value={socialFormData.tobaccoConsumption.dailyConsumption} onChange={(e) => handleSocialInputChange('tobaccoConsumption', 'dailyConsumption', e.target.value)} />
                                    </div>
                                    <div className="image-card-field-row">
                                        <label>Duration of Use</label>
                                        <div className="image-duration-box">
                                            <input type="number" placeholder="Duration" value={socialFormData.tobaccoConsumption.duration} onChange={(e) => handleSocialInputChange('tobaccoConsumption', 'duration', e.target.value)} />
                                            <select value={socialFormData.tobaccoConsumption.durationUnit} onChange={(e) => handleSocialInputChange('tobaccoConsumption', 'durationUnit', e.target.value)}>
                                                <option value="days">Days</option>
                                                <option value="weeks">Weeks</option>
                                                <option value="months">Months</option>
                                                <option value="years">Years</option>
                                            </select>
                                        </div>
                                    </div>
                                </>
                            )}
                            <div className="image-card-field-row">
                                <label>Notes</label>
                                <textarea value={socialFormData.tobaccoConsumption.notes} onChange={(e) => handleSocialInputChange('tobaccoConsumption', 'notes', e.target.value)} placeholder="Additional notes..."></textarea>
                            </div>
                        </>
                    )}

                    {activeDetail === 'Alcohol use' && (
                        <>
                            <div className="image-card-field-row">
                                <label>Current Status</label>
                                <select className="image-select-input" value={socialFormData.alcoholUse.status} onChange={(e) => handleSocialInputChange('alcoholUse', 'status', e.target.value)}>
                                    <option value="">Select</option>
                                    <option value="Non-Drinker">Non-Drinker</option>
                                    <option value="Moderate Drinker">Moderate Drinker</option>
                                    <option value="Heavy Drinker">Heavy Drinker</option>
                                </select>
                            </div>
                            {socialFormData.alcoholUse.status !== "Non-Drinker" && (
                                <>
                                    <div className="image-card-field-row">
                                        <label>Average Weekly Consumption</label>
                                        <input type="number" placeholder="drinks per week" value={socialFormData.alcoholUse.weeklyConsumption} onChange={(e) => handleSocialInputChange('alcoholUse', 'weeklyConsumption', e.target.value)} />
                                    </div>
                                    <div className="image-card-field-row">
                                        <label>Type of Alcohol</label>
                                        <select className="image-select-input" value={socialFormData.alcoholUse.alcoholType} onChange={(e) => handleSocialInputChange('alcoholUse', 'alcoholType', e.target.value)}>
                                            <option value="">Select</option>
                                            <option value="Beer">Beer</option>
                                            <option value="Wine">Wine</option>
                                            <option value="Red Wine">Red Wine</option>
                                            <option value="Whiskey">Whiskey</option>
                                            <option value="Vodka">Vodka</option>
                                            <option value="Rum">Rum</option>
                                            <option value="Gin">Gin</option>
                                            <option value="Tequila">Tequila</option>
                                            <option value="Brandy">Brandy</option>
                                            <option value="Mixed Drinks">Mixed Drinks</option>
                                            <option value="Other">Other</option>
                                        </select>
                                    </div>
                                    <div className="image-card-field-row">
                                        <label>Period of Use</label>
                                        <input type="text" placeholder="e.g., 2 years" value={socialFormData.alcoholUse.period} onChange={(e) => handleSocialInputChange('alcoholUse', 'period', e.target.value)} />
                                    </div>
                                </>
                            )}
                            <div className="image-card-field-row">
                                <label>Notes</label>
                                <textarea value={socialFormData.alcoholUse.notes} onChange={(e) => handleSocialInputChange('alcoholUse', 'notes', e.target.value)} placeholder="Additional notes..."></textarea>
                            </div>
                        </>
                    )}

                    {activeDetail === 'Physical activity' && (
                        <>
                            <div className="image-card-field-row">
                                <label>Frequency</label>
                                <select className="image-select-input" value={socialFormData.physicalActivity.frequency} onChange={(e) => handleSocialInputChange('physicalActivity', 'frequency', e.target.value)}>
                                    <option value="">Select</option>
                                    <option value="Daily">Daily</option>
                                    <option value="3-4 times a week">3-4 times a week</option>
                                    <option value="1-2 times a week">1-2 times a week</option>
                                    <option value="1–2 times/week">1–2 times/week</option>
                                    <option value="3 times/week">3 times/week</option>
                                    <option value="5+ times/week">5+ times/week</option>
                                    <option value="Rarely">Rarely</option>
                                </select>
                            </div>
                            <div className="image-card-field-row">
                                <label>Type of Exercise</label>
                                <input type="text" placeholder="e.g., Running, Yoga" value={socialFormData.physicalActivity.typeOfExercise} onChange={(e) => handleSocialInputChange('physicalActivity', 'typeOfExercise', e.target.value)} />
                            </div>
                            <div className="image-card-field-row">
                                <label>Duration</label>
                                <div className="image-duration-box">
                                    <input type="number" placeholder="duration" value={socialFormData.physicalActivity.duration} onChange={(e) => handleSocialInputChange('physicalActivity', 'duration', e.target.value)} />
                                    <select value={socialFormData.physicalActivity.durationUnit} onChange={(e) => handleSocialInputChange('physicalActivity', 'durationUnit', e.target.value)}>
                                        <option value="min">min</option>
                                        <option value="hours">hours</option>
                                    </select>
                                </div>
                            </div>
                            <div className="image-card-field-row">
                                <label>Consistency</label>
                                <select className="image-select-input" value={socialFormData.physicalActivity.consistency} onChange={(e) => handleSocialInputChange('physicalActivity', 'consistency', e.target.value)}>
                                    <option value="">Select</option>
                                    <option value="Regular">Regular</option>
                                    <option value="Occasional">Occasional</option>
                                    <option value="Irregular">Irregular</option>
                                    <option value="Never">Never</option>
                                </select>
                            </div>
                            <div className="image-card-field-row">
                                <label>Notes</label>
                                <textarea value={socialFormData.physicalActivity.notes} onChange={(e) => handleSocialInputChange('physicalActivity', 'notes', e.target.value)} placeholder="Additional notes..."></textarea>
                            </div>
                        </>
                    )}

                    {activeDetail === 'Stress' && (
                        <>
                            <div className="image-card-field-row">
                                <label>Perceived Stress Level</label>
                                <select className="image-select-input" value={socialFormData.stress.stressLevel} onChange={(e) => handleSocialInputChange('stress', 'stressLevel', e.target.value)}>
                                    <option value="">Select</option>
                                    <option value="None">None</option>
                                    <option value="Low">Low</option>
                                    <option value="Moderate">Moderate</option>
                                    <option value="High">High</option>
                                    <option value="Very High">Very High</option>
                                </select>
                            </div>
                            <div className="image-card-field-row">
                                <label>Major Stressors</label>
                                <input type="text" placeholder="e.g., Work, Family" value={socialFormData.stress.majorStressors} onChange={(e) => handleSocialInputChange('stress', 'majorStressors', e.target.value)} />
                            </div>
                            <div className="image-card-field-row">
                                <label>Coping Mechanisms</label>
                                <input type="text" placeholder="e.g., Exercise, Meditation" value={socialFormData.stress.copingMechanisms} onChange={(e) => handleSocialInputChange('stress', 'copingMechanisms', e.target.value)} />
                            </div>
                            <div className="image-card-field-row">
                                <label>Notes</label>
                                <textarea value={socialFormData.stress.notes} onChange={(e) => handleSocialInputChange('stress', 'notes', e.target.value)} placeholder="Additional notes..."></textarea>
                            </div>
                        </>
                    )}

                    {activeDetail === 'Social isolation & connection' && (
                        <>
                            <div className="image-card-field-row">
                                <label>Isolation Status</label>
                                <select className="image-select-input" value={socialFormData.socialIsolation.isolationStatus} onChange={(e) => handleSocialInputChange('socialIsolation', 'isolationStatus', e.target.value)}>
                                    <option value="">Select</option>
                                    <option value="Not Isolated">Not Isolated</option>
                                    <option value="Low">Low</option>
                                    <option value="Moderate">Moderate</option>
                                    <option value="High">High</option>
                                    <option value="Self-Isolating">Self-Isolating</option>
                                    <option value="Quarantined">Quarantined</option>
                                    <option value="Socially Isolated">Socially Isolated</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                            <div className="image-card-field-row">
                                <label>Social Support</label>
                                <select className="image-select-input" value={socialFormData.socialIsolation.socialSupport} onChange={(e) => handleSocialInputChange('socialIsolation', 'socialSupport', e.target.value)}>
                                    <option value="">Select</option>
                                    <option value="Strong">Strong</option>
                                    <option value="Moderate">Moderate</option>
                                    <option value="Limited">Limited</option>
                                    <option value="None">None</option>
                                    <option value="Unknown">Unknown</option>
                                    <option value="Supportive family">Supportive family</option>
                                    <option value="Friends">Friends</option>
                                    <option value="Community groups">Community groups</option>
                                    <option value="Minimal Support">Minimal Support</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                            <div className="image-card-field-row" style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                                <label>Frequency of Social Interactions</label>
                                <textarea placeholder="Describe frequency and types" value={socialFormData.socialIsolation.frequencyOfInteractions} onChange={(e) => handleSocialInputChange('socialIsolation', 'frequencyOfInteractions', e.target.value)} style={{ width: '100%', marginTop: '5px' }}></textarea>
                            </div>
                            <div className="image-card-field-row">
                                <label>Notes</label>
                                <input type="text" value={socialFormData.socialIsolation.notes} onChange={(e) => handleSocialInputChange('socialIsolation', 'notes', e.target.value)} />
                            </div>
                        </>
                    )}

                    {activeDetail === 'Exposure to violence' && (
                        <>
                            <div className="image-card-field-row">
                                <label>Type of Violence</label>
                                <select className="image-select-input" value={socialFormData.exposureToViolence.typeOfViolence} onChange={(e) => handleSocialInputChange('exposureToViolence', 'typeOfViolence', e.target.value)}>
                                    <option value="">Select</option>
                                    <option value="None">None</option>
                                    <option value="Physical">Physical</option>
                                    <option value="Sexual violence">Sexual violence</option>
                                    <option value="Emotional abuse">Emotional abuse</option>
                                    <option value="Financial">Financial</option>
                                    <option value="Domestic violence">Domestic violence</option>
                                    <option value="Child Abuse">Child Abuse</option>
                                    <option value="Elder Abuse">Elder Abuse</option>
                                    <option value="Bullying">Bullying</option>
                                    <option value="Workplace violence">Workplace violence</option>
                                    <option value="Community violence">Community violence</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                            <div className="image-card-field-row">
                                <label>Date of Last Exposure</label>
                                <input type="date" value={socialFormData.exposureToViolence.dateOfLastExposure} onChange={(e) => handleSocialInputChange('exposureToViolence', 'dateOfLastExposure', e.target.value)} />
                            </div>
                            <div className="image-card-field-row" style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                                <label>Support or Intervention Received</label>
                                <textarea placeholder="Describe support received" value={socialFormData.exposureToViolence.supportReceived} onChange={(e) => handleSocialInputChange('exposureToViolence', 'supportReceived', e.target.value)} style={{ width: '100%', marginTop: '5px' }}></textarea>
                            </div>
                            <div className="image-card-field-row">
                                <label>Notes</label>
                                <input type="text" value={socialFormData.exposureToViolence.notes} onChange={(e) => handleSocialInputChange('exposureToViolence', 'notes', e.target.value)} />
                            </div>
                        </>
                    )}

                    {activeDetail === 'Gender identity' && (
                        <>
                            <div className="image-card-field-row">
                                <label>Gender Identity</label>
                                <select className="image-select-input" value={socialFormData.genderIdentity.orientation} onChange={(e) => handleSocialInputChange('genderIdentity', 'orientation', e.target.value)}>
                                    <option value="">Select</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Non-binary">Non-binary</option>
                                    <option value="Transgender">Transgender</option>
                                    <option value="Other">Other</option>
                                    <option value="Prefer not to say">Prefer not to say</option>
                                </select>
                            </div>
                            <div className="image-card-field-row">
                                <label>Notes</label>
                                <input type="text" value={socialFormData.genderIdentity.notes} onChange={(e) => handleSocialInputChange('genderIdentity', 'notes', e.target.value)} />
                            </div>
                        </>
                    )}

                    {activeDetail === 'Sexual orientation' && (
                        <>
                            <div className="image-card-field-row">
                                <label>Sexual Orientation</label>
                                <select className="image-select-input" value={socialFormData.sexualOrientation.orientation} onChange={(e) => handleSocialInputChange('sexualOrientation', 'orientation', e.target.value)}>
                                    <option value="">Select</option>
                                    <option value="Straight">Straight</option>
                                    <option value="Heterosexual">Heterosexual</option>
                                    <option value="Homosexual">Homosexual</option>
                                    <option value="Bisexual">Bisexual</option>
                                    <option value="Pansexual">Pansexual</option>
                                    <option value="Asexual">Asexual</option>
                                    <option value="Queer">Queer</option>
                                    <option value="Questioning">Questioning</option>
                                    <option value="Other">Other</option>
                                    <option value="Prefer not to say">Prefer not to say</option>
                                </select>
                            </div>
                            <div className="image-card-field-row">
                                <label>Notes</label>
                                <input type="text" value={socialFormData.sexualOrientation.notes} onChange={(e) => handleSocialInputChange('sexualOrientation', 'notes', e.target.value)} />
                            </div>
                        </>
                    )}

                    {activeDetail === 'Highest level of education' && (
                        <>
                            <div className="image-card-field-row">
                                <label>Education Level</label>
                                <select className="image-select-input" value={socialFormData.education.level} onChange={(e) => handleSocialInputChange('education', 'level', e.target.value)}>
                                    <option value="">Select</option>
                                    <option value="Uneducated">Uneducated</option>
                                    <option value="Below 10th">Below 10th</option>
                                    <option value="10th Passed">10th Passed</option>
                                    <option value="12th Passed">12th Passed</option>
                                    <option value="BMS">BMS</option>
                                    <option value="High School">High School</option>
                                    <option value="Diploma">Diploma</option>
                                    <option value="Bachelor's">Bachelor's</option>
                                    <option value="Master's">Master's</option>
                                    <option value="PhD">PhD</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                            <div className="image-card-field-row">
                                <label>Notes</label>
                                <textarea value={socialFormData.education.notes} onChange={(e) => handleSocialInputChange('education', 'notes', e.target.value)} placeholder="Additional notes..."></textarea>
                            </div>
                        </>
                    )}

                    {activeDetail === 'Financial resources' && (
                        <>
                            <div className="image-card-field-row">
                                <label>Income Level</label>
                                <select className="image-select-input" value={socialFormData.financialResources.incomeLevel} onChange={(e) => handleSocialInputChange('financialResources', 'incomeLevel', e.target.value)}>
                                    <option value="">Select</option>
                                    <option value="High">High</option>
                                    <option value="Moderate">Moderate</option>
                                    <option value="Low">Low</option>
                                </select>
                            </div>
                            <div className="image-card-field-row">
                                <label>Employment Status</label>
                                <select className="image-select-input" value={socialFormData.financialResources.employmentStatus} onChange={(e) => handleSocialInputChange('financialResources', 'employmentStatus', e.target.value)}>
                                    <option value="">Select</option>
                                    <option value="Employed Full-time">Employed Full-time</option>
                                    <option value="Employed Part-time">Employed Part-time</option>
                                    <option value="Employed">Employed</option>
                                    <option value="Unemployed">Unemployed</option>
                                    <option value="Self-employed">Self-employed</option>
                                    <option value="Student">Student</option>
                                    <option value="Retired">Retired</option>
                                    <option value="Homemaker">Homemaker</option>
                                    <option value="Disabled">Disabled</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                            <div className="image-card-field-row">
                                <label>Financial Support</label>
                                <select className="image-select-input" value={socialFormData.financialResources.financialSupport} onChange={(e) => handleSocialInputChange('financialResources', 'financialSupport', e.target.value)}>
                                    <option value="">Select</option>
                                    <option value="None">None</option>
                                    <option value="Family">Family</option>
                                    <option value="Government">Government</option>
                                    <option value="Disability Benefits">Disability Benefits</option>
                                    <option value="Retirement Benefits">Retirement Benefits</option>
                                    <option value="Child Support">Child Support</option>
                                    <option value="Alimony">Alimony</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                            <div className="image-card-field-row">
                                <label>Notes</label>
                                <textarea value={socialFormData.financialResources.notes} onChange={(e) => handleSocialInputChange('financialResources', 'notes', e.target.value)} placeholder="Additional notes..."></textarea>
                            </div>
                        </>
                    )}

                    {activeDetail === 'Nutrients History' && (
                        <>
                            <div className="image-card-field-row" style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                                <label>Dietary Preferences</label>
                                <input type="text" style={{ width: '100%', marginTop: '5px' }} value={socialFormData.nutrientsHistory.dietaryPreferences} onChange={(e) => handleSocialInputChange('nutrientsHistory', 'dietaryPreferences', e.target.value)} placeholder="e.g., Vegetarian, Vegan" />
                            </div>
                            <div className="image-card-field-row">
                                <label>Supplement Usage</label>
                                <select className="image-select-input" value={socialFormData.nutrientsHistory.supplementUsage} onChange={(e) => handleSocialInputChange('nutrientsHistory', 'supplementUsage', e.target.value)}>
                                    <option value="">Select</option>
                                    <option value="Yes">Yes</option>
                                    <option value="Occasionally">Occasionally</option>
                                    <option value="No">No</option>
                                </select>
                            </div>
                            <div className="image-card-field-row">
                                <label>Notes</label>
                                <input type="text" value={socialFormData.nutrientsHistory.notes} onChange={(e) => handleSocialInputChange('nutrientsHistory', 'notes', e.target.value)} />
                            </div>
                        </>
                    )}

                    {activeDetail === 'Social History (free text)' && (
                        <>
                            <div className="image-card-field-row" style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                                <label>Notes</label>
                                <textarea style={{ width: '100%', marginTop: '5px', height: '100px' }} value={socialFormData.socialHistory.notes} onChange={(e) => handleSocialInputChange('socialHistory', 'notes', e.target.value)} placeholder="Additional social history information..."></textarea>
                            </div>
                        </>
                    )}

                </div>
                <div className="image-card-footer">
                    <button className="image-save-pill-btn" onClick={() => { alert('Social history data saved'); }}>Save</button>
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

const formatDateForInput = (dateStr) => {
    if (!dateStr) return '';
    // Backend: MM-DD-YYYY or YYYY-MM-DD
    // HTML input: YYYY-MM-DD
    if (dateStr.includes('-')) {
        const parts = dateStr.split('-');
        if (parts[0].length === 2 && parts[2].length === 4) { // MM-DD-YYYY -> YYYY-MM-DD
            return `${parts[2]}-${parts[0]}-${parts[1]}`;
        }
        if (parts[0].length === 4) { // Already YYYY-MM-DD
            return dateStr;
        }
    }
    return dateStr;
};

const formatDateForSave = (dateStr) => {
    if (!dateStr) return '';
    // HTML input: YYYY-MM-DD
    // Backend expected (most cases): MM-DD-YYYY
    if (dateStr.includes('-')) {
        const parts = dateStr.split('-');
        if (parts[0].length === 4) { // YYYY-MM-DD -> MM-DD-YYYY
            return `${parts[1]}-${parts[2]}-${parts[0]}`;
        }
    }
    return dateStr;
};

function AddPatient() {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('personal');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [patientId, setPatientId] = useState(null);
    const [allergies, setAllergies] = useState([{ allergen: '', reaction: '', severity: '', category: '', code: '', status: '' }]);
    const [socialFormData, setSocialFormData] = useState({
        tobaccoUse: { status: '', dailyConsumption: '', duration: '', durationUnit: 'years', quitDate: '', notes: '' },
        tobaccoConsumption: { status: '', dailyConsumption: '', duration: '', durationUnit: 'years', quitDate: '', notes: '' },
        alcoholUse: { status: '', weeklyConsumption: '', alcoholType: '', period: '', notes: '' },
        physicalActivity: { frequency: '', typeOfExercise: '', duration: '', durationUnit: 'min', consistency: '', notes: '' },
        stress: { stressLevel: '', majorStressors: '', copingMechanisms: '', notes: '' },
        socialIsolation: { isolationStatus: '', socialSupport: '', frequencyOfInteractions: '', notes: '' },
        exposureToViolence: { typeOfViolence: '', dateOfLastExposure: '', supportReceived: '', notes: '' },
        genderIdentity: { orientation: '', notes: '' },
        sexualOrientation: { orientation: '', notes: '' },
        education: { level: '', notes: '' },
        financialResources: { incomeLevel: '', employmentStatus: '', financialSupport: '', notes: '' },
        nutrientsHistory: { dietaryPreferences: '', supplementUsage: '', notes: '' },
        socialHistory: { notes: '' }
    });
    const [toggles, setToggles] = useState({});
    const [formData, setFormData] = useState({
        // Personal Details
        firstName: '',
        middleName: '',
        lastName: '',
        dateOfBirth: '',
        maritalStatus: '',
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
        primaryContact: { code: '+91', number: '' },
        homePhone: { code: '+91', number: '' },
        workPhone: { code: '+91', number: '' },
        email: '',
        preferredContact: [],
        emergencyContacts: [{
            name: { first: '', middle: '', last: '' },
            relationship: '',
            phone: { code: '+91', number: '' },
            email: ''
        }],
        // Insurance Details
        primaryInsuranceCompany: '',
        primaryPolicyNumber: '',
        primaryGroupNumber: '',
        primaryPlanType: '',
        primaryStartDate: '',
        primaryEndDate: '',
        secondaryInsuranceCompany: '',
        secondaryPolicyNumber: '',
        secondaryGroupNumber: '',
        secondaryPlanType: '',
        secondaryStartDate: '',
        secondaryEndDate: '',
        insuranceContactNumber: '',
        insuranceCardImage: '',
        // Allergies
        knownAllergies: '',
        allergySeverity: '',
        // Family History
        familyMembers: [{
            name: { first: '', middle: '', last: '' },
            relationship: '',
            dateOfBirth: '',
            deceased: false,
            gender: '',
            medicalConditions: ''
        }],
        geneticConditions: [{
            conditionName: '',
            affectedMember: '',
            testingResults: ''
        }],
        // Consent
        consentAgree: false,
    });
    const [editingFamilyMemberIndex, setEditingFamilyMemberIndex] = useState(null);
    const [editingGeneticConditionIndex, setEditingGeneticConditionIndex] = useState(null);
    const [familyMemberForm, setFamilyMemberForm] = useState({
        name: { first: '', middle: '', last: '' },
        relationship: '',
        dateOfBirth: '',
        deceased: false,
        gender: '',
        medicalConditions: ''
    });
    const [geneticConditionForm, setGeneticConditionForm] = useState({
        conditionName: '',
        affectedMember: '',
        testingResults: ''
    });

    const location = useLocation();

    useEffect(() => {
        if (location?.state?.patient) {
            const p = location.state.patient;
            const pId = p._id || p.id;
            setPatientId(pId);
            const addr = p.contact_info?.address || p.address || {};
            setFormData(prev => ({
                ...prev,
                firstName: p.name?.first || '',
                middleName: p.name?.middle || '',
                lastName: p.name?.last || '',
                dateOfBirth: formatDateForInput(p.date_of_birth || p.dateOfBirth) || prev.dateOfBirth,
                maritalStatus: p.marital_status || prev.maritalStatus,
                bloodGroup: p.blood_group || prev.bloodGroup,
                gender: p.gender || prev.gender,
                nationality: p.nationality || prev.nationality,
                category: p.category || prev.category,
                aadharCard: p.aadhaar || p.aadharCard || prev.aadharCard,
                panCard: p.pan || p.panCard || prev.panCard,
                occupation: p.occupation || prev.occupation,
                photo: p.photo || prev.photo,
                address1: addr.street || p.address1 || prev.address1,
                address2: addr.street2 || p.address2 || prev.address2,
                city: addr.city || p.city || prev.city,
                postalCode: addr.postal_code || p.postalCode || p.postal_code || prev.postalCode,
                district: addr.district || p.district || prev.district,
                state: addr.state || p.state || prev.state,
                country: addr.country || p.country || prev.country,
                primaryContact: {
                    code: p.contact_info?.mobile?.code || '+91',
                    number: p.contact_info?.mobile?.number || p.contact_info?.phone || ''
                },
                homePhone: {
                    code: p.contact_info?.home_phone?.code || '+91',
                    number: p.contact_info?.home_phone?.number || ''
                },
                workPhone: {
                    code: p.contact_info?.work_phone?.code || '+91',
                    number: p.contact_info?.work_phone?.number || ''
                },
                email: p.contact_info?.email || prev.email,
                preferredContact: Array.isArray(p.contact_info?.preferred_contact_methods)
                    ? p.contact_info.preferred_contact_methods
                    : (p.preferred_contact ? [p.preferred_contact] : []),
                emergencyContacts: (p.contact_info?.emergency_contact && Array.isArray(p.contact_info.emergency_contact) && p.contact_info.emergency_contact.length > 0)
                    ? p.contact_info.emergency_contact.map(ec => ({
                        name: {
                            first: ec.name?.first || '',
                            middle: ec.name?.middle || '',
                            last: ec.name?.last || ''
                        },
                        relationship: ec.relationship || '',
                        phone: {
                            code: ec.phone?.code || '+91',
                            number: ec.phone?.number || ''
                        },
                        email: ec.email || ''
                    }))
                    : prev.emergencyContacts,
                primaryInsuranceCompany: p.insurance?.primary?.company_name || prev.primaryInsuranceCompany,
                primaryPolicyNumber: p.insurance?.primary?.policy_number || prev.primaryPolicyNumber,
                primaryGroupNumber: p.insurance?.primary?.group_number || prev.primaryGroupNumber,
                primaryPlanType: p.insurance?.primary?.plan_type || prev.primaryPlanType,
                primaryStartDate: formatDateForInput(p.insurance?.primary?.effective_start) || prev.primaryStartDate,
                primaryEndDate: formatDateForInput(p.insurance?.primary?.effective_end) || prev.primaryEndDate,
                secondaryInsuranceCompany: p.insurance?.secondary?.company_name || prev.secondaryInsuranceCompany,
                secondaryPolicyNumber: p.insurance?.secondary?.policy_number || prev.secondaryPolicyNumber,
                secondaryGroupNumber: p.insurance?.secondary?.group_number || prev.secondaryGroupNumber,
                secondaryPlanType: p.insurance?.secondary?.plan_type || prev.secondaryPlanType,
                secondaryStartDate: formatDateForInput(p.insurance?.secondary?.effective_start) || prev.secondaryStartDate,
                secondaryEndDate: formatDateForInput(p.insurance?.secondary?.effective_end) || prev.secondaryEndDate,
                insuranceContactNumber: p.insurance?.insurance_contact_number || prev.insuranceContactNumber,
                insuranceCardImage: p.insurance?.insurance_card_image || prev.insuranceCardImage,
                knownAllergies: p.knownAllergies || p.allergies || prev.knownAllergies,
                allergySeverity: p.allergySeverity || prev.allergySeverity,
                familyMembers: (p.family_history?.family_members && Array.isArray(p.family_history.family_members) && p.family_history.family_members.length > 0)
                    ? p.family_history.family_members.map(fm => ({
                        name: {
                            first: fm.name?.first || '',
                            middle: fm.name?.middle || '',
                            last: fm.name?.last || ''
                        },
                        relationship: fm.relationship || '',
                        dateOfBirth: formatDateForInput(fm.date_of_birth),
                        deceased: fm.deceased || false,
                        gender: fm.gender || '',
                        medicalConditions: Array.isArray(fm.medical_conditions) ? fm.medical_conditions.join(', ') : (fm.medical_conditions || '')
                    }))
                    : prev.familyMembers,
                geneticConditions: (p.family_history?.family_members && Array.isArray(p.family_history.family_members))
                    ? p.family_history.family_members.reduce((acc, fm) => {
                        if (fm.genetic_conditions && Array.isArray(fm.genetic_conditions)) {
                            fm.genetic_conditions.forEach(gc => {
                                acc.push({
                                    conditionName: gc.condition_name || '',
                                    affectedMember: fm.relationship || '',
                                    testingResults: gc.genetic_testing_results || ''
                                });
                            });
                        }
                        return acc;
                    }, [])
                    : prev.geneticConditions,
                consentAgree: p.consent || p.consentAgree || prev.consentAgree,
            }));

            // Fetch allergies and social history from database
            if (pId) {
                const fetchPatientData = async () => {
                    try {
                        const response = await fetch(`/api/patients/${pId}`);
                        if (response.ok) {
                            const data = await response.json();
                            const patient = data.data || data;

                            // Populate allergies
                            if (patient.allergies && Array.isArray(patient.allergies) && patient.allergies.length > 0) {
                                setAllergies(patient.allergies);
                            } else {
                                setAllergies([{ allergen: '', reaction: '', severity: '', category: '', code: '', status: '' }]);
                            }

                            // Populate social history data from nested structure (transform snake_case to camelCase)
                            const socialHist = patient.social_history || {};
                            const newToggles = {};

                            setSocialFormData(prev => ({
                                tobaccoUse: socialHist.tobacco_smoking ? {
                                    status: socialHist.tobacco_smoking.current_status || '',
                                    dailyConsumption: socialHist.tobacco_smoking.average_daily_consumption || '',
                                    duration: socialHist.tobacco_smoking.duration_of_use || '',
                                    durationUnit: socialHist.tobacco_smoking.duration_unit || 'years',
                                    quitDate: formatDateForInput(socialHist.tobacco_smoking.quit_date) || '',
                                    notes: socialHist.tobacco_smoking.notes || ''
                                } : prev.tobaccoUse,
                                tobaccoConsumption: socialHist.tobacco_consumption ? {
                                    status: socialHist.tobacco_consumption.current_status || '',
                                    dailyConsumption: socialHist.tobacco_consumption.average_daily_consumption || '',
                                    duration: socialHist.tobacco_consumption.duration_of_use || '',
                                    durationUnit: socialHist.tobacco_consumption.duration_unit || 'years',
                                    quitDate: formatDateForInput(socialHist.tobacco_consumption.quit_date) || '',
                                    notes: socialHist.tobacco_consumption.notes || ''
                                } : prev.tobaccoConsumption,
                                alcoholUse: socialHist.alcohol_use ? {
                                    status: socialHist.alcohol_use.current_status || '',
                                    weeklyConsumption: socialHist.alcohol_use.average_weekly_consumption || '',
                                    alcoholType: socialHist.alcohol_use.type_of_alcohol || '',
                                    period: socialHist.alcohol_use.period_of_use || '',
                                    notes: socialHist.alcohol_use.notes || ''
                                } : prev.alcoholUse,
                                physicalActivity: socialHist.physical_activity ? {
                                    frequency: socialHist.physical_activity.frequency || '',
                                    typeOfExercise: socialHist.physical_activity.type_of_exercise || '',
                                    duration: socialHist.physical_activity.duration || '',
                                    durationUnit: socialHist.physical_activity.duration_unit || 'min',
                                    consistency: socialHist.physical_activity.consistency || '',
                                    notes: socialHist.physical_activity.notes || ''
                                } : prev.physicalActivity,
                                stress: socialHist.stress ? {
                                    stressLevel: socialHist.stress.perceived_stress_level || '',
                                    majorStressors: socialHist.stress.major_stressors || '',
                                    copingMechanisms: socialHist.stress.coping_mechanisms || '',
                                    notes: socialHist.stress.notes || ''
                                } : prev.stress,
                                socialIsolation: socialHist.social_isolation_connection ? {
                                    isolationStatus: socialHist.social_isolation_connection.isolation_status || '',
                                    socialSupport: socialHist.social_isolation_connection.social_support || '',
                                    frequencyOfInteractions: socialHist.social_isolation_connection.frequency_of_social_interactions || '',
                                    notes: socialHist.social_isolation_connection.notes || ''
                                } : prev.socialIsolation,
                                exposureToViolence: socialHist.exposure_to_violence ? {
                                    typeOfViolence: socialHist.exposure_to_violence.type_of_violence || '',
                                    dateOfLastExposure: formatDateForInput(socialHist.exposure_to_violence.date_of_last_exposure) || '',
                                    supportReceived: socialHist.exposure_to_violence.support_or_intervention_received || '',
                                    notes: socialHist.exposure_to_violence.notes || ''
                                } : prev.exposureToViolence,
                                genderIdentity: socialHist.gender_identity ? {
                                    orientation: socialHist.gender_identity.gender_identity || '',
                                    notes: socialHist.gender_identity.notes || ''
                                } : prev.genderIdentity,
                                sexualOrientation: socialHist.sexual_orientation ? {
                                    orientation: socialHist.sexual_orientation.sexual_orientation || '',
                                    notes: socialHist.sexual_orientation.notes || ''
                                } : prev.sexualOrientation,
                                education: socialHist.education ? {
                                    level: socialHist.education.highest_level_of_education || '',
                                    notes: socialHist.education.notes || ''
                                } : prev.education,
                                financialResources: socialHist.financial_resources ? {
                                    incomeLevel: socialHist.financial_resources.income_level || '',
                                    employmentStatus: socialHist.financial_resources.employment_status || '',
                                    financialSupport: socialHist.financial_resources.financial_support || '',
                                    notes: socialHist.financial_resources.notes || ''
                                } : prev.financialResources,
                                nutrientsHistory: socialHist.nutrients_history ? {
                                    dietaryPreferences: socialHist.nutrients_history.dietary_preferences || '',
                                    supplementUsage: socialHist.nutrients_history.supplement_usage || '',
                                    notes: socialHist.nutrients_history.notes || ''
                                } : prev.nutrientsHistory,
                                socialHistory: socialHist.social_history_free_text ? {
                                    notes: socialHist.social_history_free_text.notes || ''
                                } : prev.socialHistory,
                            }));

                            // Sync toggles based on whether data exists in database
                            if (socialHist.tobacco_smoking?.current_status) newToggles['Tobacco use (Smoking)'] = true;
                            if (socialHist.tobacco_consumption?.current_status) newToggles['Tobacco use (consumption)'] = true;
                            if (socialHist.alcohol_use?.current_status) newToggles['Alcohol use'] = true;
                            if (socialHist.physical_activity?.frequency) newToggles['Physical activity'] = true;
                            if (socialHist.stress?.perceived_stress_level) newToggles['Stress'] = true;
                            if (socialHist.social_isolation_connection?.isolation_status) newToggles['Social isolation & connection'] = true;
                            if (socialHist.exposure_to_violence?.type_of_violence) newToggles['Exposure to violence'] = true;
                            if (socialHist.gender_identity?.gender_identity) newToggles['Gender identity'] = true;
                            if (socialHist.sexual_orientation?.sexual_orientation) newToggles['Sexual orientation'] = true;
                            if (socialHist.education?.highest_level_of_education) newToggles['Highest level of education'] = true;
                            if (socialHist.financial_resources?.income_level) newToggles['Financial resources'] = true;
                            if (socialHist.nutrients_history?.dietary_preferences) newToggles['Nutrients History'] = true;
                            if (socialHist.social_history_free_text?.notes) newToggles['Social History (free text)'] = true;

                            setToggles(newToggles);
                        }
                    } catch (err) {
                        console.error('Error fetching patient data:', err);
                    }
                };
                fetchPatientData();
            }
        }
    }, [location]);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleAllergyChange = (index, field, value) => {
        setAllergies(prev => {
            const updated = [...prev];
            updated[index] = { ...updated[index], [field]: value };
            return updated;
        });
    };

    const handleAddAllergy = () => {
        setAllergies(prev => [...prev, { allergen: '', reaction: '', severity: '', category: '', code: '', status: '' }]);
    };

    const handleRemoveAllergy = (index) => {
        setAllergies(prev => {
            const updated = prev.filter((_, i) => i !== index);
            return updated.length === 0 ? [{ allergen: '', reaction: '', severity: '', category: '', code: '', status: '' }] : updated;
        });
    };

    const handleEmergencyContactChange = (index, field, value, subfield) => {
        setFormData(prev => {
            const updated = [...prev.emergencyContacts];
            if (subfield) {
                updated[index] = {
                    ...updated[index],
                    [field]: { ...updated[index][field], [subfield]: value }
                };
            } else {
                updated[index] = { ...updated[index], [field]: value };
            }
            return { ...prev, emergencyContacts: updated };
        });
    };

    const handleAddEmergencyContact = () => {
        setFormData(prev => ({
            ...prev,
            emergencyContacts: [...prev.emergencyContacts, {
                name: { first: '', middle: '', last: '' },
                relationship: '',
                phone: { code: '+91', number: '' },
                email: ''
            }]
        }));
    };

    const handleRemoveEmergencyContact = (index) => {
        setFormData(prev => {
            const updated = prev.emergencyContacts.filter((_, i) => i !== index);
            return {
                ...prev,
                emergencyContacts: updated.length === 0 ? [{
                    name: { first: '', middle: '', last: '' },
                    relationship: '',
                    phone: { code: '+91', number: '' },
                    email: ''
                }] : updated
            };
        });
    };

    const handleFamilyMemberChange = (index, field, value, subfield) => {
        setFormData(prev => {
            const updated = [...prev.familyMembers];
            if (subfield) {
                updated[index] = {
                    ...updated[index],
                    [field]: { ...updated[index][field], [subfield]: value }
                };
            } else {
                updated[index] = { ...updated[index], [field]: value };
            }
            return { ...prev, familyMembers: updated };
        });
    };

    const handleAddFamilyMember = () => {
        setFormData(prev => ({
            ...prev,
            familyMembers: [...prev.familyMembers, {
                name: { first: '', middle: '', last: '' },
                relationship: '',
                dateOfBirth: '',
                deceased: false,
                gender: '',
                medicalConditions: ''
            }]
        }));
    };

    const handleRemoveFamilyMember = (index) => {
        setFormData(prev => {
            const updated = prev.familyMembers.filter((_, i) => i !== index);
            return {
                ...prev,
                familyMembers: updated.length === 0 ? [{
                    name: { first: '', middle: '', last: '' },
                    relationship: '',
                    dateOfBirth: '',
                    deceased: false,
                    gender: '',
                    medicalConditions: ''
                }] : updated
            };
        });
    };

    const handleGeneticConditionChange = (index, field, value) => {
        setFormData(prev => {
            const updated = [...prev.geneticConditions];
            updated[index] = { ...updated[index], [field]: value };
            return { ...prev, geneticConditions: updated };
        });
    };

    const handleAddGeneticCondition = () => {
        setFormData(prev => ({
            ...prev,
            geneticConditions: [...prev.geneticConditions, {
                conditionName: '',
                affectedMember: '',
                testingResults: ''
            }]
        }));
    };

    const handleRemoveGeneticCondition = (index) => {
        setFormData(prev => {
            const updated = prev.geneticConditions.filter((_, i) => i !== index);
            return {
                ...prev,
                geneticConditions: updated.length === 0 ? [{
                    conditionName: '',
                    affectedMember: '',
                    testingResults: ''
                }] : updated
            };
        });
    };

    const handleTabClick = (id) => {
        setActiveTab(id);
    };

    const handleSave = async () => {
        setLoading(true);
        setError(null);
        try {
            const patientData = {
                name: {
                    first: formData.firstName,
                    middle: formData.middleName,
                    last: formData.lastName
                },
                date_of_birth: formatDateForSave(formData.dateOfBirth),
                gender: formData.gender,
                blood_group: (formData.bloodGroup && formData.bloodGroup !== 'Select V') ? formData.bloodGroup : 'None',
                address: {
                    street: formData.address1,
                    street2: formData.address2,
                    city: formData.city,
                    postal_code: formData.postalCode,
                    district: formData.district,
                    state: formData.state,
                    country: formData.country
                },
                contact_info: {
                    email: formData.email,
                    mobile: formData.primaryContact,
                    home_phone: formData.homePhone,
                    work_phone: formData.workPhone,
                    preferred_contact_methods: formData.preferredContact,
                    emergency_contact: formData.emergencyContacts.map(ec => ({
                        name: ec.name,
                        relationship: ec.relationship,
                        phone: ec.phone,
                        email: ec.email
                    }))
                },
                aadhaar: formData.aadharCard,
                pan: formData.panCard,
                photo: formData.photo,
                insurance: {
                    primary: {
                        company_name: formData.primaryInsuranceCompany,
                        policy_number: formData.primaryPolicyNumber,
                        group_number: formData.primaryGroupNumber,
                        plan_type: formData.primaryPlanType,
                        effective_start: formatDateForSave(formData.primaryStartDate),
                        effective_end: formatDateForSave(formData.primaryEndDate)
                    },
                    secondary: {
                        company_name: formData.secondaryInsuranceCompany,
                        policy_number: formData.secondaryPolicyNumber,
                        group_number: formData.secondaryGroupNumber,
                        plan_type: formData.secondaryPlanType,
                        effective_start: formatDateForSave(formData.secondaryStartDate),
                        effective_end: formatDateForSave(formData.secondaryEndDate)
                    },
                    insurance_contact_number: formData.insuranceContactNumber,
                    insurance_card_image: formData.insuranceCardImage,
                },
                allergies: allergies.filter(a => a.allergen || a.reaction || a.severity || a.category || a.code || a.status),
                family_history: {
                    family_members: formData.familyMembers.map(fm => ({
                        name: {
                            first: fm.name.first,
                            middle: fm.name.middle,
                            last: fm.name.last
                        },
                        relationship: fm.relationship,
                        date_of_birth: formatDateForSave(fm.dateOfBirth),
                        deceased: fm.deceased,
                        gender: fm.gender,
                        medical_conditions: fm.medicalConditions ? fm.medicalConditions.split(',').map(s => s.trim()).filter(Boolean) : [],
                        genetic_conditions: formData.geneticConditions
                            .filter(gc => gc.affectedMember === fm.relationship || (gc.affectedMember === `${fm.relationship} (${fm.name.first})`))
                            .map(gc => ({
                                condition_name: gc.conditionName,
                                affected_family_member: gc.affectedMember.split(' (')[0], // Extract relationship
                                genetic_testing_results: gc.testingResults || 'Unknown'
                            }))
                    }))
                },
                consent: formData.consentAgree,
                social_history: {
                    tobacco_smoking: {
                        current_status: socialFormData.tobaccoUse.status,
                        average_daily_consumption: socialFormData.tobaccoUse.dailyConsumption,
                        duration_of_use: socialFormData.tobaccoUse.duration,
                        duration_unit: socialFormData.tobaccoUse.durationUnit,
                        quit_date: socialFormData.tobaccoUse.quitDate,
                        notes: socialFormData.tobaccoUse.notes
                    },
                    tobacco_consumption: {
                        current_status: socialFormData.tobaccoConsumption.status,
                        average_daily_consumption: socialFormData.tobaccoConsumption.dailyConsumption,
                        duration_of_use: socialFormData.tobaccoConsumption.duration,
                        duration_unit: socialFormData.tobaccoConsumption.durationUnit,
                        quit_date: socialFormData.tobaccoConsumption.quitDate,
                        notes: socialFormData.tobaccoConsumption.notes
                    },
                    alcohol_use: {
                        current_status: socialFormData.alcoholUse.status,
                        average_weekly_consumption: socialFormData.alcoholUse.weeklyConsumption,
                        type_of_alcohol: socialFormData.alcoholUse.alcoholType,
                        period_of_use: socialFormData.alcoholUse.period,
                        notes: socialFormData.alcoholUse.notes
                    },
                    physical_activity: {
                        frequency: socialFormData.physicalActivity.frequency,
                        type_of_exercise: socialFormData.physicalActivity.typeOfExercise,
                        duration: socialFormData.physicalActivity.duration,
                        duration_unit: socialFormData.physicalActivity.durationUnit,
                        consistency: socialFormData.physicalActivity.consistency,
                        notes: socialFormData.physicalActivity.notes
                    },
                    stress: {
                        perceived_stress_level: socialFormData.stress.stressLevel,
                        major_stressors: socialFormData.stress.majorStressors,
                        coping_mechanisms: socialFormData.stress.copingMechanisms,
                        notes: socialFormData.stress.notes
                    },
                    social_isolation_connection: {
                        isolation_status: socialFormData.socialIsolation.isolationStatus,
                        social_support: socialFormData.socialIsolation.socialSupport,
                        frequency_of_social_interactions: socialFormData.socialIsolation.frequencyOfInteractions,
                        notes: socialFormData.socialIsolation.notes
                    },
                    exposure_to_violence: {
                        type_of_violence: socialFormData.exposureToViolence.typeOfViolence,
                        date_of_last_exposure: formatDateForSave(socialFormData.exposureToViolence.dateOfLastExposure),
                        support_or_intervention_received: socialFormData.exposureToViolence.supportReceived,
                        notes: socialFormData.exposureToViolence.notes
                    },
                    gender_identity: {
                        gender_identity: socialFormData.genderIdentity.orientation,
                        notes: socialFormData.genderIdentity.notes
                    },
                    sexual_orientation: {
                        sexual_orientation: socialFormData.sexualOrientation.orientation,
                        notes: socialFormData.sexualOrientation.notes
                    },
                    education: {
                        highest_level_of_education: socialFormData.education.level,
                        notes: socialFormData.education.notes
                    },
                    financial_resources: {
                        income_level: socialFormData.financialResources.incomeLevel,
                        employment_status: socialFormData.financialResources.employmentStatus,
                        financial_support: socialFormData.financialResources.financialSupport,
                        notes: socialFormData.financialResources.notes
                    },
                    nutrients_history: {
                        dietary_preferences: socialFormData.nutrientsHistory.dietaryPreferences,
                        supplement_usage: socialFormData.nutrientsHistory.supplementUsage,
                        notes: socialFormData.nutrientsHistory.notes
                    }
                }
            };

            // Add conditional enum fields only if they have values to avoid Mongoose validation errors
            if (formData.maritalStatus) patientData.marital_status = formData.maritalStatus;
            if (formData.nationality) patientData.nationality = formData.nationality;
            if (formData.category) patientData.category = formData.category;
            if (formData.occupation) patientData.occupation = formData.occupation;

            // Clean secondary insurance if empty
            if (patientData.insurance.secondary && !patientData.insurance.secondary.company_name && !patientData.insurance.secondary.plan_type) {
                delete patientData.insurance.secondary;
            }

            const isEdit = !!(location && location.state && location.state.patient);
            const url = getApiUrl(isEdit ? `/api/patients/${location.state.patient._id || location.state.patient.id}` : '/api/patients');
            const method = isEdit ? 'PUT' : 'POST';
            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(patientData),
            });

            if (!response.ok) {
                const text = await response.text();
                let message = `Failed to save patient (Status: ${response.status})`;
                try {
                    const errorData = JSON.parse(text);
                    message = errorData.message || message;
                } catch {
                    if (text.startsWith('<!')) message = 'Server returned an error. Is the backend running? (Start it with: cd backend && npm run dev)';
                }
                throw new Error(message);
            }

            alert(isEdit ? 'Patient updated successfully!' : 'Patient saved successfully!');
            navigate('/patients');
        } catch (err) {
            setError(err.message);
            alert('Error saving patient: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    const tabs = [
        { id: 'personal', label: 'Personal Details' },
        { id: 'contact', label: 'Contact Details' },
        { id: 'insurance', label: 'Insuarance Details' },
        { id: 'allergies', label: 'Allergies' },
        { id: 'social', label: 'Social History' },
        { id: 'family', label: 'Family History' },
        { id: 'consent', label: 'Consent' },
    ];

    return (
        <div className="image-add-doctor-page">

            <div className="image-add-doctor-container">
                <h1 className="image-page-main-title">{patientId ? 'Edit Patient' : 'Add New Patient'}</h1>

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
                            {patientId && (
                                <div className="image-field-row" style={{ marginBottom: '20px' }}>
                                    <label>Patient ID</label>
                                    <input type="text" value={patientId} readOnly className="field-border" style={{ backgroundColor: '#f5f5f5', cursor: 'not-allowed' }} />
                                </div>
                            )}

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
                                                className="field-border"
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

                                    <div className="image-field-row-cols">
                                        <div className="image-field">
                                            <label>Blood Group</label>
                                            <select className="image-select-replacement" name="bloodGroup" value={formData.bloodGroup} onChange={handleInputChange}>
                                                <option value="">Select</option>
                                                <option value="A Positive (A⁺)">A Positive (A⁺)</option>
                                                <option value="A Negative (A⁻)">A Negative (A⁻)</option>
                                                <option value="B Positive (B⁺)">B Positive (B⁺)</option>
                                                <option value="B Negative (B⁻)">B Negative (B⁻)</option>
                                                <option value="AB Positive (AB⁺)">AB Positive (AB⁺)</option>
                                                <option value="AB Negative (AB⁻)">AB Negative (AB⁻)</option>
                                                <option value="O Positive (O⁺)">O Positive (O⁺)</option>
                                                <option value="O Negative (O⁻)">O Negative (O⁻)</option>
                                                <option value="None">None</option>
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
                                            <option value="Unemployed">Unemployed</option>
                                            <option value="Employed">Employed</option>
                                            <option value="Student">Student</option>
                                            <option value="Business">Business</option>
                                            <option value="Services">Services</option>
                                            <option value="Retired">Retired</option>
                                            <option value="Government /civil service">Government /civil service</option>
                                            <option value="Other">Other</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="image-form-photo-right">
                                    <input
                                        type="file"
                                        id="patient-photo-upload"
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
                                        onClick={() => document.getElementById('patient-photo-upload').click()}
                                        style={{ cursor: 'pointer', overflow: 'hidden' }}
                                    >
                                        <img
                                            id="patient-photo-preview"
                                            src={formData.photo}
                                            alt="Preview"
                                            style={{ width: '100%', height: '100%', objectFit: 'cover', display: formData.photo ? 'block' : 'none' }}
                                        />
                                        <div id="patient-photo-placeholder" className="image-photo-icon-placeholder" style={{ display: formData.photo ? 'none' : 'block' }}>
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
                                    <div style={{ display: 'flex', gap: '8px', width: '250px' }}>
                                        <input type="text" placeholder="+91" style={{ width: '70px', padding: '8px' }} value={formData.primaryContact.code} onChange={(e) => setFormData(prev => ({ ...prev, primaryContact: { ...prev.primaryContact, code: e.target.value } }))} />
                                        <input type="text" placeholder="Number" style={{ flex: 1, padding: '8px' }} value={formData.primaryContact.number} onChange={(e) => setFormData(prev => ({ ...prev, primaryContact: { ...prev.primaryContact, number: e.target.value } }))} />
                                    </div>
                                </div>
                                <div className="image-field flex-row spaced">
                                    <label>Home Phone Number</label>
                                    <div style={{ display: 'flex', gap: '8px', width: '250px' }}>
                                        <input type="text" placeholder="+91" style={{ width: '70px', padding: '8px' }} value={formData.homePhone.code} onChange={(e) => setFormData(prev => ({ ...prev, homePhone: { ...prev.homePhone, code: e.target.value } }))} />
                                        <input type="text" placeholder="Number" style={{ flex: 1, padding: '8px' }} value={formData.homePhone.number} onChange={(e) => setFormData(prev => ({ ...prev, homePhone: { ...prev.homePhone, number: e.target.value } }))} />
                                    </div>
                                </div>
                                <div className="image-field flex-row spaced">
                                    <label>Work Phone Number</label>
                                    <div style={{ display: 'flex', gap: '8px', width: '250px' }}>
                                        <input type="text" placeholder="+91" style={{ width: '70px', padding: '8px' }} value={formData.workPhone.code} onChange={(e) => setFormData(prev => ({ ...prev, workPhone: { ...prev.workPhone, code: e.target.value } }))} />
                                        <input type="text" placeholder="Number" style={{ flex: 1, padding: '8px' }} value={formData.workPhone.number} onChange={(e) => setFormData(prev => ({ ...prev, workPhone: { ...prev.workPhone, number: e.target.value } }))} />
                                    </div>
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

                                {formData.emergencyContacts.map((contact, index) => (
                                    <div key={index} className="emergency-contact-group" style={{
                                        border: '1px solid #e0e0e0',
                                        borderRadius: '8px',
                                        padding: '24px',
                                        marginBottom: '30px',
                                        backgroundColor: '#f9f9f9'
                                    }}>
                                        <div className="image-field flex-row spaced" style={{ marginBottom: '15px' }}>
                                            <label>First Name:</label>
                                            <input type="text" placeholder="First Name" className="medium-width" value={contact.name.first} onChange={(e) => handleEmergencyContactChange(index, 'name', e.target.value, 'first')} />
                                        </div>
                                        <div className="image-field flex-row spaced" style={{ marginBottom: '15px' }}>
                                            <label>Middle Name:</label>
                                            <input type="text" placeholder="Middle Name" className="medium-width" value={contact.name.middle} onChange={(e) => handleEmergencyContactChange(index, 'name', e.target.value, 'middle')} />
                                        </div>
                                        <div className="image-field flex-row spaced" style={{ marginBottom: '15px' }}>
                                            <label>Last Name:</label>
                                            <input type="text" placeholder="Last Name" className="medium-width" value={contact.name.last} onChange={(e) => handleEmergencyContactChange(index, 'name', e.target.value, 'last')} />
                                        </div>
                                        <div className="image-field flex-row spaced" style={{ marginBottom: '15px' }}>
                                            <label>Relation with Patient:</label>
                                            <input type="text" placeholder="e.g. Spouse, Friend" className="medium-width" value={contact.relationship} onChange={(e) => handleEmergencyContactChange(index, 'relationship', e.target.value)} />
                                        </div>
                                        <div className="image-field flex-row spaced" style={{ marginBottom: '15px' }}>
                                            <label>Contact no:</label>
                                            <div style={{ display: 'flex', gap: '8px', width: '250px' }}>
                                                <input type="text" placeholder="+91" style={{ width: '70px', padding: '8px' }} value={contact.phone.code} onChange={(e) => handleEmergencyContactChange(index, 'phone', e.target.value, 'code')} />
                                                <input type="text" placeholder="Number" style={{ flex: 1, padding: '8px' }} value={contact.phone.number} onChange={(e) => handleEmergencyContactChange(index, 'phone', e.target.value, 'number')} />
                                            </div>
                                        </div>
                                        <div className="image-field flex-row spaced" style={{ marginBottom: '10px' }}>
                                            <label>Email Address</label>
                                            <input type="email" placeholder="example@email.com" className="medium-width" value={contact.email} onChange={(e) => handleEmergencyContactChange(index, 'email', e.target.value)} />
                                        </div>
                                        {formData.emergencyContacts.length > 1 && (
                                            <div style={{ textAlign: 'right', marginTop: '10px' }}>
                                                <button onClick={() => handleRemoveEmergencyContact(index)} style={{ color: '#d9534f', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>Remove This Contact</button>
                                            </div>
                                        )}
                                    </div>
                                ))}
                                <button onClick={handleAddEmergencyContact} style={{ marginBottom: '20px', padding: '10px 20px', backgroundColor: '#7FBADD', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>+ Add Another Emergency Contact</button>
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
                                <div className="image-field flex-row spaced-extra" style={{ marginBottom: '20px' }}>
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
                                    <div className="image-field">
                                        <label>Plan Type</label>
                                        <select className="field-border" name="primaryPlanType" value={formData.primaryPlanType} onChange={handleInputChange}>
                                            <option value="">Select</option>
                                            <option value="Health Maintenance Organization (HMO)">Health Maintenance Organization (HMO)</option>
                                            <option value="Preferred Provider Organization (PPO)">Preferred Provider Organization (PPO)</option>
                                            <option value="Point of Service (POS)">Point of Service (POS)</option>
                                            <option value="Exclusive Provider Organization (EPO)">Exclusive Provider Organization (EPO)</option>
                                            <option value="Medicare">Medicare</option>
                                            <option value="Medicaid">Medicaid</option>
                                            <option value="Private Insurance">Private Insurance</option>
                                            <option value="Other">Other</option>
                                        </select>
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
                                <div className="image-field flex-row spaced-extra" style={{ marginBottom: '20px' }}>
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
                                    <div className="image-field">
                                        <label>Plan Type</label>
                                        <select className="field-border" name="secondaryPlanType" value={formData.secondaryPlanType} onChange={handleInputChange}>
                                            <option value="">Select</option>
                                            <option value="Health Maintenance Organization (HMO)">Health Maintenance Organization (HMO)</option>
                                            <option value="Preferred Provider Organization (PPO)">Preferred Provider Organization (PPO)</option>
                                            <option value="Point of Service (POS)">Point of Service (POS)</option>
                                            <option value="Exclusive Provider Organization (EPO)">Exclusive Provider Organization (EPO)</option>
                                            <option value="Medicare">Medicare</option>
                                            <option value="Medicaid">Medicaid</option>
                                            <option value="Private Insurance">Private Insurance</option>
                                            <option value="Other">Other</option>
                                        </select>
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
                                        {allergies.map((allergy, index) => (
                                            <tr key={index}>
                                                <td>
                                                    <select className="image-select-replacement-small" value={allergy.allergen || ''} onChange={(e) => handleAllergyChange(index, 'allergen', e.target.value)}>
                                                        <option value="">Select</option>
                                                        <option value="Penicillin">Penicillin</option>
                                                        <option value="Sulfa Drugs">Sulfa Drugs</option>
                                                        <option value="Aspirin">Aspirin</option>
                                                        <option value="Shellfish">Shellfish</option>
                                                        <option value="Nuts (e.g., peanuts, almonds, cashews)">Nuts (e.g., peanuts, almonds, cashews)</option>
                                                        <option value="Eggs">Eggs</option>
                                                        <option value="Milk">Milk</option>
                                                        <option value="Wheat">Wheat</option>
                                                        <option value="Soy">Soy</option>
                                                        <option value="Pollen (specific types, e.g., ragweed, grass)">Pollen (specific types, e.g., ragweed, grass)</option>
                                                        <option value="Dust Mites">Dust Mites</option>
                                                        <option value="Latex">Latex</option>
                                                        <option value="Nickel">Nickel</option>
                                                        <option value="Pet Dander">Pet Dander</option>
                                                        <option value="Bee Venom">Bee Venom</option>
                                                        <option value="Mould">Mould</option>
                                                        <option value="Certain Medications">Certain Medications</option>
                                                        <option value="Other">Other</option>
                                                    </select>
                                                </td>
                                                <td>
                                                    <select className="image-select-replacement-small" value={allergy.reaction || ''} onChange={(e) => handleAllergyChange(index, 'reaction', e.target.value)}>
                                                        <option value="">Select</option>
                                                        <option value="Rash">Rash</option>
                                                        <option value="Itching">Itching</option>
                                                        <option value="Hives">Hives</option>
                                                        <option value="Swelling">Swelling</option>
                                                        <option value="Difficulty Breathing">Difficulty Breathing</option>
                                                        <option value="Anaphylaxis">Anaphylaxis</option>
                                                        <option value="Nausea">Nausea</option>
                                                        <option value="Vomiting">Vomiting</option>
                                                        <option value="Diarrhoea">Diarrhoea</option>
                                                        <option value="Dizziness">Dizziness</option>
                                                        <option value="Fainting">Fainting</option>
                                                        <option value="Sneezing">Sneezing</option>
                                                        <option value="Other">Other</option>
                                                    </select>
                                                </td>
                                                <td>
                                                    <select className="image-select-replacement-small" value={allergy.severity || ''} onChange={(e) => handleAllergyChange(index, 'severity', e.target.value)}>
                                                        <option value="">Select</option>
                                                        <option value="Mild">Mild</option>
                                                        <option value="Moderate">Moderate</option>
                                                        <option value="Severe">Severe</option>
                                                        <option value="Critical">Critical</option>
                                                        <option value="Unknown">Unknown</option>
                                                        <option value="None">None</option>
                                                    </select>
                                                </td>
                                                <td>
                                                    <select className="image-select-replacement-small" value={allergy.category || ''} onChange={(e) => handleAllergyChange(index, 'category', e.target.value)}>
                                                        <option value="">Select</option>
                                                        <option value="Medications">Medications</option>
                                                        <option value="Foods">Foods</option>
                                                        <option value="Environmental">Environmental</option>
                                                        <option value="Insects">Insects</option>
                                                        <option value="Latex">Latex</option>
                                                        <option value="Other">Other</option>
                                                    </select>
                                                </td>
                                                <td>
                                                    <select className="image-select-replacement-small" value={allergy.code || ''} onChange={(e) => handleAllergyChange(index, 'code', e.target.value)}>
                                                        <option value="">Select</option>
                                                        <option value="A100">A100</option>
                                                        <option value="A200">A200</option>
                                                        <option value="A300">A300</option>
                                                        <option value="A400">A400</option>
                                                        <option value="A500">A500</option>
                                                        <option value="A600">A600</option>
                                                    </select>
                                                </td>
                                                <td>
                                                    <select className="image-select-replacement-small" value={allergy.status || ''} onChange={(e) => handleAllergyChange(index, 'status', e.target.value)}>
                                                        <option value="">Select</option>
                                                        <option value="Active">Active</option>
                                                        <option value="Inactive">Inactive</option>
                                                        <option value="Resolved">Resolved</option>
                                                        <option value="Chronic">Chronic</option>
                                                        <option value="Acute">Acute</option>
                                                        <option value="Recurrent">Recurrent</option>
                                                        <option value="Unknown">Unknown</option>
                                                        <option value="None">None</option>
                                                    </select>
                                                </td>
                                                <td>
                                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                                        <span className="image-action-remove-btn" onClick={() => handleRemoveAllergy(index)} style={{ cursor: 'pointer' }}>X</span>
                                                        <button className="image-action-add-btn" onClick={handleAddAllergy} type="button">+</button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className="image-form-footer-nav">
                                <button className="image-next-btn-blue" onClick={() => setActiveTab('social')}>Next</button>
                            </div>
                        </div>
                    )}

                    {activeTab === 'social' && <SocialHistoryTab onBack={() => setActiveTab('allergies')} onNext={() => setActiveTab('family')} socialFormData={socialFormData} setSocialFormData={setSocialFormData} toggles={toggles} setToggles={setToggles} />}


                    {activeTab === 'family' && (
                        <div className="image-tab-content fade-in">
                            <h2 style={{ textAlign: 'center', color: 'var(--primary-dark-blue)', marginBottom: '20px' }}>Family History</h2>

                            <div className="image-family-history-container">
                                <div className="image-history-card" style={{ marginBottom: '30px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', borderRadius: '12px', overflow: 'hidden' }}>
                                    <div className="image-history-card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'var(--primary-dark-blue)', color: 'white', padding: '12px 20px' }}>
                                        <span style={{ fontWeight: '600' }}>Family Members Details:</span>
                                        <button onClick={() => { handleAddFamilyMember(); setEditingFamilyMemberIndex(formData.familyMembers.length); }} style={{ background: 'var(--border-blue)', border: 'none', color: 'white', width: '28px', height: '28px', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}>+</button>
                                    </div>
                                    <div className="image-history-card-body" style={{ padding: '25px', backgroundColor: 'white' }}>
                                        {/* Entry Form (Always Visible) */}
                                        <div className="image-edit-form" style={{ marginBottom: '30px', borderBottom: '2px solid #eee', paddingBottom: '30px' }}>
                                            <div style={{ fontWeight: '600', color: 'var(--primary-dark-blue)', marginBottom: '15px' }}>{editingFamilyMemberIndex !== null ? 'Edit Family Member' : 'Add New Family Member'}</div>
                                            <div style={{ border: '1px solid #eee', padding: '20px', borderRadius: '10px' }}>
                                                <div className="image-field-row" style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '15px' }}>
                                                    <label style={{ width: '120px', fontSize: '15px', fontWeight: '500' }}>Name</label>
                                                    <div className="image-name-triple-input" style={{ display: 'flex', gap: '15px', flex: 1 }}>
                                                        <input type="text" placeholder="First Name" style={{ flex: 1, padding: '10px', border: '1px solid #ccc', borderRadius: '6px' }} value={familyMemberForm.name.first} onChange={(e) => setFamilyMemberForm(prev => ({ ...prev, name: { ...prev.name, first: e.target.value } }))} />
                                                        <input type="text" placeholder="Middle Name" style={{ flex: 1, padding: '10px', border: '1px solid #ccc', borderRadius: '6px' }} value={familyMemberForm.name.middle} onChange={(e) => setFamilyMemberForm(prev => ({ ...prev, name: { ...prev.name, middle: e.target.value } }))} />
                                                        <input type="text" placeholder="Last Name" style={{ flex: 1, padding: '10px', border: '1px solid #ccc', borderRadius: '6px' }} value={familyMemberForm.name.last} onChange={(e) => setFamilyMemberForm(prev => ({ ...prev, name: { ...prev.name, last: e.target.value } }))} />
                                                    </div>
                                                </div>
                                                <div className="image-field-row-cols" style={{ display: 'flex', gap: '30px', marginBottom: '15px' }}>
                                                    <div className="image-field" style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '20px' }}>
                                                        <label style={{ width: '120px' }}>Date of Birth</label>
                                                        <input type="date" style={{ flex: 1, padding: '10px', border: '1px solid #ccc', borderRadius: '6px' }} value={familyMemberForm.dateOfBirth} onChange={(e) => setFamilyMemberForm(prev => ({ ...prev, dateOfBirth: e.target.value }))} />
                                                    </div>
                                                    <div className="image-field" style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '20px' }}>
                                                        <label style={{ width: '80px' }}>Gender</label>
                                                        <select style={{ flex: 1, padding: '10px', border: '1px solid #ccc', borderRadius: '6px' }} value={familyMemberForm.gender} onChange={(e) => setFamilyMemberForm(prev => ({ ...prev, gender: e.target.value }))}>
                                                            <option value="">Select</option>
                                                            <option value="Male">Male</option>
                                                            <option value="Female">Female</option>
                                                            <option value="Other">Other</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="image-field-row-cols" style={{ display: 'flex', gap: '30px', marginBottom: '15px' }}>
                                                    <div className="image-field" style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '20px' }}>
                                                        <label style={{ width: '120px' }}>Relationship</label>
                                                        <input type="text" placeholder="e.g. Father, Mother" style={{ flex: 1, padding: '10px', border: '1px solid #ccc', borderRadius: '6px' }} value={familyMemberForm.relationship} onChange={(e) => setFamilyMemberForm(prev => ({ ...prev, relationship: e.target.value }))} />
                                                    </div>
                                                    <div className="image-field" style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '20px' }}>
                                                        <label style={{ width: '80px' }}>Deceased</label>
                                                        <input type="checkbox" style={{ width: '22px', height: '22px' }} checked={familyMemberForm.deceased} onChange={(e) => setFamilyMemberForm(prev => ({ ...prev, deceased: e.target.checked }))} />
                                                    </div>
                                                </div>
                                                <div className="image-field-row" style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '10px' }}>
                                                    <label style={{ width: '120px' }}>Medical Conditions</label>
                                                    <input type="text" placeholder="Write Here" style={{ flex: 1, padding: '10px', border: '1px solid #ccc', borderRadius: '6px' }} value={familyMemberForm.medicalConditions} onChange={(e) => setFamilyMemberForm(prev => ({ ...prev, medicalConditions: e.target.value }))} />
                                                </div>
                                                <div style={{ textAlign: 'center', marginTop: '20px' }}>
                                                    <button
                                                        onClick={() => {
                                                            if (editingFamilyMemberIndex !== null) {
                                                                setFormData(prev => {
                                                                    const updated = [...prev.familyMembers];
                                                                    updated[editingFamilyMemberIndex] = familyMemberForm;
                                                                    return { ...prev, familyMembers: updated };
                                                                });
                                                                setEditingFamilyMemberIndex(null);
                                                            } else {
                                                                setFormData(prev => ({
                                                                    ...prev,
                                                                    familyMembers: [...prev.familyMembers, familyMemberForm]
                                                                }));
                                                            }
                                                            setFamilyMemberForm({ name: { first: '', middle: '', last: '' }, relationship: '', dateOfBirth: '', deceased: false, gender: '', medicalConditions: '' });
                                                        }}
                                                        style={{ padding: '10px 30px', backgroundColor: 'var(--primary-dark-blue)', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}
                                                    >
                                                        {editingFamilyMemberIndex !== null ? 'Update Member' : 'Add Member'}
                                                    </button>
                                                    {editingFamilyMemberIndex !== null && (
                                                        <button onClick={() => { setEditingFamilyMemberIndex(null); setFamilyMemberForm({ name: { first: '', middle: '', last: '' }, relationship: '', dateOfBirth: '', deceased: false, gender: '', medicalConditions: '' }); }} style={{ marginLeft: '10px', padding: '10px 20px', background: 'none', border: '1px solid #ccc', borderRadius: '6px', cursor: 'pointer' }}>Cancel</button>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Summary List Below */}
                                        <div style={{ fontWeight: '600', color: '#1a5f7a', marginBottom: '15px' }}>Existing Family Members:</div>
                                        <div className="image-summary-list" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '15px' }}>
                                            {formData.familyMembers.length === 0 || (formData.familyMembers.length === 1 && !formData.familyMembers[0].name.first) ? (
                                                <div style={{ color: '#999', fontStyle: 'italic' }}>No members added yet.</div>
                                            ) : (
                                                formData.familyMembers.filter(m => m.name.first || m.relationship).map((member, index) => (
                                                    <div key={index} className="image-summary-box" style={{ padding: '15px', border: '1px solid #e0e0e0', borderRadius: '10px', backgroundColor: '#f9f9f9', position: 'relative' }}>
                                                        <div style={{ fontWeight: '600', color: 'var(--primary-dark-blue)', marginBottom: '5px' }}>{member.relationship || 'Member'}</div>
                                                        <div style={{ fontSize: '14px' }}>{member.name.first} {member.name.last}</div>
                                                        <div style={{ marginTop: '10px', display: 'flex', gap: '10px' }}>
                                                            <button onClick={() => { setEditingFamilyMemberIndex(index); setFamilyMemberForm(member); }} style={{ padding: '5px 10px', fontSize: '12px', borderRadius: '4px', border: '1px solid var(--primary-dark-blue)', background: 'none', color: 'var(--primary-dark-blue)', cursor: 'pointer' }}>Edit</button>
                                                            <button onClick={() => handleRemoveFamilyMember(index)} style={{ padding: '5px 10px', fontSize: '12px', borderRadius: '4px', border: '1px solid #d9534f', background: 'none', color: '#d9534f', cursor: 'pointer' }}>Remove</button>
                                                        </div>
                                                    </div>
                                                ))
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="image-history-card" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.1)', borderRadius: '12px', overflow: 'hidden' }}>
                                    <div className="image-history-card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'var(--primary-dark-blue)', color: 'white', padding: '12px 20px' }}>
                                        <span style={{ fontWeight: '600' }}>Genetic Conditions:</span>
                                        <button onClick={() => { handleAddGeneticCondition(); setEditingGeneticConditionIndex(formData.geneticConditions.length); }} style={{ background: 'var(--border-blue)', border: 'none', color: 'white', width: '28px', height: '28px', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}>+</button>
                                    </div>
                                    <div className="image-history-card-body" style={{ padding: '25px', backgroundColor: 'white' }}>
                                        {/* Entry Form (Always Visible) */}
                                        <div className="image-edit-form" style={{ marginBottom: '30px', borderBottom: '2px solid #eee', paddingBottom: '30px' }}>
                                            <div style={{ fontWeight: '600', color: '#1a5f7a', marginBottom: '15px' }}>{editingGeneticConditionIndex !== null ? 'Edit Genetic Condition' : 'Add New Genetic Condition'}</div>
                                            <div style={{ border: '1px solid #eee', padding: '20px', borderRadius: '10px' }}>
                                                <div className="image-field-row" style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '15px' }}>
                                                    <label style={{ width: '200px', fontSize: '15px', fontWeight: '500' }}>Condition Name</label>
                                                    <input type="text" style={{ flex: 1, padding: '10px', border: '1px solid #ccc', borderRadius: '6px' }} value={geneticConditionForm.conditionName} onChange={(e) => setGeneticConditionForm(prev => ({ ...prev, conditionName: e.target.value }))} />
                                                </div>
                                                <div className="image-field-row" style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '15px' }}>
                                                    <label style={{ width: '200px', fontSize: '15px', fontWeight: '500' }}>Affected Family Members Name</label>
                                                    <input type="text" placeholder="e.g. Self, Father" style={{ flex: 1, padding: '10px', border: '1px solid #ccc', borderRadius: '6px' }} value={geneticConditionForm.affectedMember} onChange={(e) => setGeneticConditionForm(prev => ({ ...prev, affectedMember: e.target.value }))} />
                                                </div>
                                                <div className="image-field-row" style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '10px' }}>
                                                    <label style={{ width: '200px', fontSize: '15px', fontWeight: '500' }}>Genetic Testing Results</label>
                                                    <input type="text" placeholder="Write Here" style={{ flex: 1, padding: '10px', border: '1px solid #ccc', borderRadius: '6px' }} value={geneticConditionForm.testingResults} onChange={(e) => setGeneticConditionForm(prev => ({ ...prev, testingResults: e.target.value }))} />
                                                </div>
                                                <div style={{ textAlign: 'center', marginTop: '20px' }}>
                                                    <button
                                                        onClick={() => {
                                                            if (editingGeneticConditionIndex !== null) {
                                                                setFormData(prev => {
                                                                    const updated = [...prev.geneticConditions];
                                                                    updated[editingGeneticConditionIndex] = geneticConditionForm;
                                                                    return { ...prev, geneticConditions: updated };
                                                                });
                                                                setEditingGeneticConditionIndex(null);
                                                            } else {
                                                                setFormData(prev => ({
                                                                    ...prev,
                                                                    geneticConditions: [...prev.geneticConditions, geneticConditionForm]
                                                                }));
                                                            }
                                                            setGeneticConditionForm({ conditionName: '', affectedMember: '', testingResults: '' });
                                                        }}
                                                        style={{ padding: '10px 30px', backgroundColor: 'var(--primary-dark-blue)', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}
                                                    >
                                                        {editingGeneticConditionIndex !== null ? 'Update Condition' : 'Add Condition'}
                                                    </button>
                                                    {editingGeneticConditionIndex !== null && (
                                                        <button onClick={() => { setEditingGeneticConditionIndex(null); setGeneticConditionForm({ conditionName: '', affectedMember: '', testingResults: '' }); }} style={{ marginLeft: '10px', padding: '10px 20px', background: 'none', border: '1px solid #ccc', borderRadius: '6px', cursor: 'pointer' }}>Cancel</button>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Summary List Below */}
                                        <div style={{ fontWeight: '600', color: '#1a5f7a', marginBottom: '15px' }}>Existing Genetic Conditions:</div>
                                        <div className="image-summary-list" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '15px' }}>
                                            {formData.geneticConditions.length === 0 || (formData.geneticConditions.length === 1 && !formData.geneticConditions[0].conditionName) ? (
                                                <div style={{ color: '#999', fontStyle: 'italic' }}>No conditions added yet.</div>
                                            ) : (
                                                formData.geneticConditions.filter(gc => gc.conditionName || gc.affectedMember).map((gc, index) => (
                                                    <div key={index} className="image-summary-box" style={{ padding: '15px', border: '1px solid #e0e0e0', borderRadius: '10px', backgroundColor: '#f9f9f9', position: 'relative' }}>
                                                        <div style={{ fontWeight: '600', color: 'var(--primary-dark-blue)', marginBottom: '5px' }}>{gc.conditionName || 'Condition'}</div>
                                                        <div style={{ fontSize: '14px' }}>Member: {gc.affectedMember}</div>
                                                        <div style={{ marginTop: '10px', display: 'flex', gap: '10px' }}>
                                                            <button onClick={() => { setEditingGeneticConditionIndex(index); setGeneticConditionForm(gc); }} style={{ padding: '5px 10px', fontSize: '12px', borderRadius: '4px', border: '1px solid var(--primary-dark-blue)', background: 'none', color: 'var(--primary-dark-blue)', cursor: 'pointer' }}>Edit</button>
                                                            <button onClick={() => handleRemoveGeneticCondition(index)} style={{ padding: '5px 10px', fontSize: '12px', borderRadius: '4px', border: '1px solid #d9534f', background: 'none', color: '#d9534f', cursor: 'pointer' }}>Remove</button>
                                                        </div>
                                                    </div>
                                                ))
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="image-form-footer-nav-dual" style={{ marginTop: '40px' }}>
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
                                <button className="image-save-btn-styled" onClick={handleSave} disabled={loading}>{loading ? 'Saving...' : 'Save'}</button>
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
}

export default AddPatient;
