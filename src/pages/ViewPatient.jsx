import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './DetailsModal.css';

function ViewPatient() {
    const navigate = useNavigate();
    const location = useLocation();
    const [patient, setPatient] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPatientDetails = async () => {
            const pId = location?.state?.patient?._id || location?.state?.patient?.id;
            if (pId) {
                try {
                    const res = await fetch(`/api/patients/${pId}`);
                    if (res.ok) {
                        const data = await res.json();
                        setPatient(data.data || data);
                    } else {
                        // Fallback to location state if fetch fails
                        setPatient(location.state.patient);
                    }
                } catch (err) {
                    console.error('Failed to fetch patient details', err);
                    setPatient(location.state.patient);
                } finally {
                    setLoading(false);
                }
            } else {
                setLoading(false);
            }
        };
        fetchPatientDetails();
    }, [location]);

    if (loading) {
        return <div style={{ padding: '20px' }}>Loading...</div>;
    }

    if (!patient) {
        return (
            <div style={{ padding: '20px' }}>
                <p>No patient data found</p>
                <button className="details-btn primary" onClick={() => navigate('/patients')}>Back to Patients</button>
            </div>
        );
    }

    const addr = patient.contact_info?.address || patient.address || {};
    const socialHistory = patient.social_history || {};
    const contactInfo = patient.contact_info || {};

    return (
        <div className="details-modal-overlay" onClick={() => navigate('/patients')}>
            <div className="details-modal-card" onClick={(e) => e.stopPropagation()}>
                <h3 className="details-modal-title">Patient Information</h3>

                {/* Personal Details */}
                <div className="details-section">
                    <h4 className="details-section-heading">Personal Details</h4>
                    <div className="details-grid">
                        {patient.name?.first && <div className="details-row"><div className="details-label">First Name</div><div className="details-value">{patient.name.first}</div></div>}
                        {patient.name?.middle && <div className="details-row"><div className="details-label">Middle Name</div><div className="details-value">{patient.name.middle}</div></div>}
                        {patient.name?.last && <div className="details-row"><div className="details-label">Last Name</div><div className="details-value">{patient.name.last}</div></div>}
                        {(patient.date_of_birth || patient.dateOfBirth) && <div className="details-row"><div className="details-label">Date of Birth</div><div className="details-value">{patient.date_of_birth || patient.dateOfBirth}</div></div>}
                        {patient.gender && <div className="details-row"><div className="details-label">Gender</div><div className="details-value">{patient.gender}</div></div>}
                        {patient.blood_group && <div className="details-row"><div className="details-label">Blood Group</div><div className="details-value">{patient.blood_group}</div></div>}
                        {patient.marital_status && <div className="details-row"><div className="details-label">Marital Status</div><div className="details-value">{patient.marital_status}</div></div>}
                        {patient.nationality && <div className="details-row"><div className="details-label">Nationality</div><div className="details-value">{patient.nationality}</div></div>}
                        {patient.category && <div className="details-row"><div className="details-label">Category</div><div className="details-value">{patient.category}</div></div>}
                        {patient.occupation && <div className="details-row"><div className="details-label">Occupation</div><div className="details-value">{patient.occupation}</div></div>}
                        {patient.aadhaar && <div className="details-row"><div className="details-label">Aadhar No</div><div className="details-value">{patient.aadhaar}</div></div>}
                        {patient.pan && <div className="details-row"><div className="details-label">PAN No</div><div className="details-value">{patient.pan}</div></div>}
                        {(addr.street || addr.city) && (
                            <div className="details-row details-full">
                                <div className="details-label">Address</div>
                                <div className="details-value">{[addr.street, addr.street2, addr.city, addr.district, addr.state, addr.country, addr.postal_code].filter(Boolean).join(', ')}</div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Contact Details */}
                <div className="details-section">
                    <h4 className="details-section-heading">Contact Details</h4>
                    <div className="details-grid">
                        {(contactInfo.mobile?.number || contactInfo.phone) && <div className="details-row"><div className="details-label">Mobile</div><div className="details-value">{contactInfo.mobile?.code} {contactInfo.mobile?.number || contactInfo.phone}</div></div>}
                        {contactInfo.home_phone?.number && <div className="details-row"><div className="details-label">Home Phone</div><div className="details-value">{contactInfo.home_phone?.code} {contactInfo.home_phone?.number}</div></div>}
                        {contactInfo.work_phone?.number && <div className="details-row"><div className="details-label">Work Phone</div><div className="details-value">{contactInfo.work_phone?.code} {contactInfo.work_phone?.number}</div></div>}
                        {contactInfo.email && <div className="details-row"><div className="details-label">Email</div><div className="details-value">{contactInfo.email}</div></div>}
                        {contactInfo.preferred_contact_methods && contactInfo.preferred_contact_methods.length > 0 && <div className="details-row"><div className="details-label">Preferred Contact Methods</div><div className="details-value">{contactInfo.preferred_contact_methods.join(', ')}</div></div>}
                        {contactInfo.emergency_contact && contactInfo.emergency_contact.length > 0 && (
                            <>
                                {contactInfo.emergency_contact.map((ec, idx) => {
                                    const phoneNum = typeof ec.phone === 'object' ? `${ec.phone?.code || ''} ${ec.phone?.number || ''}` : ec.phone;
                                    const ecName = typeof ec.name === 'object' ? `${ec.name?.first || ''} ${ec.name?.middle || ''} ${ec.name?.last || ''}` : ec.name;
                                    return (
                                        <div key={idx} className="details-row details-full">
                                            <div className="details-label">Emergency Contact {idx + 1}</div>
                                            <div className="details-value">
                                                {ecName} ({ec.relationship || ec.relation}) - {phoneNum} / {ec.email}
                                            </div>
                                        </div>
                                    );
                                })}
                            </>
                        )}
                    </div>
                </div>

                {/* Insurance Details */}
                <div className="details-section">
                    <h4 className="details-section-heading">Insurance Details</h4>
                    <div className="details-grid">
                        {/* Primary Insurance */}
                        {patient.insurance?.primary && (
                            <>
                                <div className="details-row details-full"><div className="details-label"><strong>Primary Insurance</strong></div></div>
                                {patient.insurance.primary.company_name && <div className="details-row"><div className="details-label">Company</div><div className="details-value">{patient.insurance.primary.company_name}</div></div>}
                                {patient.insurance.primary.policy_number && <div className="details-row"><div className="details-label">Policy Number</div><div className="details-value">{patient.insurance.primary.policy_number}</div></div>}
                                {patient.insurance.primary.group_number && <div className="details-row"><div className="details-label">Group Number</div><div className="details-value">{patient.insurance.primary.group_number}</div></div>}
                                {patient.insurance.primary.plan_type && <div className="details-row"><div className="details-label">Plan Type</div><div className="details-value">{patient.insurance.primary.plan_type}</div></div>}
                                {patient.insurance.primary.effective_start && <div className="details-row"><div className="details-label">Effective From</div><div className="details-value">{patient.insurance.primary.effective_start}</div></div>}
                                {patient.insurance.primary.effective_end && <div className="details-row"><div className="details-label">Effective Until</div><div className="details-value">{patient.insurance.primary.effective_end}</div></div>}
                            </>
                        )}

                        {/* Secondary Insurance */}
                        {patient.insurance?.secondary?.company_name && (
                            <>
                                <div className="details-row details-full"><div className="details-label"><strong>Secondary Insurance</strong></div></div>
                                {patient.insurance.secondary.company_name && <div className="details-row"><div className="details-label">Company</div><div className="details-value">{patient.insurance.secondary.company_name}</div></div>}
                                {patient.insurance.secondary.policy_number && <div className="details-row"><div className="details-label">Policy Number</div><div className="details-value">{patient.insurance.secondary.policy_number}</div></div>}
                                {patient.insurance.secondary.group_number && <div className="details-row"><div className="details-label">Group Number</div><div className="details-value">{patient.insurance.secondary.group_number}</div></div>}
                                {patient.insurance.secondary.plan_type && <div className="details-row"><div className="details-label">Plan Type</div><div className="details-value">{patient.insurance.secondary.plan_type}</div></div>}
                                {patient.insurance.secondary.effective_start && <div className="details-row"><div className="details-label">Effective From</div><div className="details-value">{patient.insurance.secondary.effective_start}</div></div>}
                                {patient.insurance.secondary.effective_end && <div className="details-row"><div className="details-label">Effective Until</div><div className="details-value">{patient.insurance.secondary.effective_end}</div></div>}
                            </>
                        )}

                        {/* Insurance Contact */}
                        {patient.insurance?.insurance_contact_number && <div className="details-row details-full"><div className="details-label">Insurance Contact Number</div><div className="details-value">{patient.insurance.insurance_contact_number}</div></div>}
                    </div>
                </div>

                {/* Allergies */}
                {patient.allergies && patient.allergies.length > 0 && (
                    <div className="details-section">
                        <h4 className="details-section-heading">Allergies</h4>
                        <div className="details-grid">
                            {patient.allergies.map((allergy, index) => (
                                <div key={index} className="details-row details-full">
                                    <div className="details-label">Allergy {index + 1}</div>
                                    <div className="details-value">
                                        {allergy.allergen && <div><strong>Allergen:</strong> {allergy.allergen}</div>}
                                        {allergy.reaction && <div><strong>Reaction:</strong> {allergy.reaction}</div>}
                                        {allergy.severity && <div><strong>Severity:</strong> {allergy.severity}</div>}
                                        {allergy.category && <div><strong>Category:</strong> {allergy.category}</div>}
                                        {allergy.code && <div><strong>Code:</strong> {allergy.code}</div>}
                                        {allergy.status && <div><strong>Status:</strong> {allergy.status}</div>}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {patient.family_history?.family_members && patient.family_history.family_members.length > 0 && (
                    <div className="details-section">
                        <h4 className="details-section-heading">Family History</h4>
                        <div className="details-grid">
                            {patient.family_history.family_members.map((member, idx) => (
                                <div key={idx} className="details-row details-full">
                                    <div className="details-label">Family Member {idx + 1}</div>
                                    <div className="details-value">
                                        {member.name?.first} {member.name?.middle} {member.name?.last} - {member.relationship}
                                        {member.deceased && <span className="details-note"> (Deceased)</span>}
                                        {member.date_of_birth && <div><strong>DOB:</strong> {member.date_of_birth}</div>}
                                        {member.gender && <div><strong>Gender:</strong> {member.gender}</div>}
                                        {member.medical_conditions && (Array.isArray(member.medical_conditions) ? member.medical_conditions.length > 0 : member.medical_conditions) && (
                                            <div><strong>Medical Conditions:</strong> {Array.isArray(member.medical_conditions) ? member.medical_conditions.join(', ') : member.medical_conditions}</div>
                                        )}
                                        {member.genetic_conditions && (Array.isArray(member.genetic_conditions) ? member.genetic_conditions.length > 0 : member.genetic_conditions) && (
                                            <div><strong>Genetic Conditions:</strong> {Array.isArray(member.genetic_conditions)
                                                ? member.genetic_conditions.map(gc => typeof gc === 'object' ? `${gc.condition_name} (${gc.genetic_testing_results})` : gc).join(', ')
                                                : member.genetic_conditions}</div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Social History */}
                {Object.keys(socialHistory).length > 0 && (
                    <div className="details-section">
                        <h4 className="details-section-heading">Social History</h4>
                        <div className="details-grid">

                            {/* Tobacco Smoking */}
                            {socialHistory.tobacco_smoking?.current_status && (
                                <>
                                    <div className="details-row details-full"><div className="details-label" style={{ fontSize: '1.1em', fontWeight: '600', paddingTop: '15px' }}>Tobacco use (Smoking)</div></div>
                                    <div className="details-row"><div className="details-label">Status</div><div className="details-value">{socialHistory.tobacco_smoking.current_status}</div></div>
                                    {socialHistory.tobacco_smoking.average_daily_consumption && <div className="details-row"><div className="details-label">Daily Consumption</div><div className="details-value">{socialHistory.tobacco_smoking.average_daily_consumption}</div></div>}
                                    {socialHistory.tobacco_smoking.duration_of_use && <div className="details-row"><div className="details-label">Duration</div><div className="details-value">{socialHistory.tobacco_smoking.duration_of_use} {socialHistory.tobacco_smoking.duration_unit}</div></div>}
                                    {socialHistory.tobacco_smoking.quit_date && <div className="details-row"><div className="details-label">Quit Date</div><div className="details-value">{socialHistory.tobacco_smoking.quit_date}</div></div>}
                                    {socialHistory.tobacco_smoking.notes && <div className="details-row details-full"><div className="details-label">Notes</div><div className="details-value">{socialHistory.tobacco_smoking.notes}</div></div>}
                                </>
                            )}

                            {/* Tobacco Consumption */}
                            {socialHistory.tobacco_consumption?.current_status && (
                                <>
                                    <div className="details-row details-full"><div className="details-label" style={{ fontSize: '1.1em', fontWeight: '600', paddingTop: '15px' }}>Tobacco use (consumption)</div></div>
                                    <div className="details-row"><div className="details-label">Status</div><div className="details-value">{socialHistory.tobacco_consumption.current_status}</div></div>
                                    {socialHistory.tobacco_consumption.average_daily_consumption && <div className="details-row"><div className="details-label">Daily Consumption</div><div className="details-value">{socialHistory.tobacco_consumption.average_daily_consumption}</div></div>}
                                    {socialHistory.tobacco_consumption.duration_of_use && <div className="details-row"><div className="details-label">Duration</div><div className="details-value">{socialHistory.tobacco_consumption.duration_of_use} {socialHistory.tobacco_consumption.duration_unit}</div></div>}
                                    {socialHistory.tobacco_consumption.quit_date && <div className="details-row"><div className="details-label">Quit Date</div><div className="details-value">{socialHistory.tobacco_consumption.quit_date}</div></div>}
                                    {socialHistory.tobacco_consumption.notes && <div className="details-row details-full"><div className="details-label">Notes</div><div className="details-value">{socialHistory.tobacco_consumption.notes}</div></div>}
                                </>
                            )}

                            {/* Alcohol Use */}
                            {socialHistory.alcohol_use?.current_status && (
                                <>
                                    <div className="details-row details-full"><div className="details-label" style={{ fontSize: '1.1em', fontWeight: '600', paddingTop: '15px' }}>Alcohol use</div></div>
                                    <div className="details-row"><div className="details-label">Status</div><div className="details-value">{socialHistory.alcohol_use.current_status}</div></div>
                                    {socialHistory.alcohol_use.average_weekly_consumption && <div className="details-row"><div className="details-label">Weekly Consumption</div><div className="details-value">{socialHistory.alcohol_use.average_weekly_consumption}</div></div>}
                                    {socialHistory.alcohol_use.type_of_alcohol && <div className="details-row"><div className="details-label">Type of Alcohol</div><div className="details-value">{socialHistory.alcohol_use.type_of_alcohol}</div></div>}
                                    {socialHistory.alcohol_use.period_of_use && <div className="details-row"><div className="details-label">Period of Use</div><div className="details-value">{socialHistory.alcohol_use.period_of_use}</div></div>}
                                    {socialHistory.alcohol_use.notes && <div className="details-row details-full"><div className="details-label">Notes</div><div className="details-value">{socialHistory.alcohol_use.notes}</div></div>}
                                </>
                            )}

                            {/* Physical Activity */}
                            {socialHistory.physical_activity?.frequency && (
                                <>
                                    <div className="details-row details-full"><div className="details-label" style={{ fontSize: '1.1em', fontWeight: '600', paddingTop: '15px' }}>Physical activity</div></div>
                                    <div className="details-row"><div className="details-label">Frequency</div><div className="details-value">{socialHistory.physical_activity.frequency}</div></div>
                                    {socialHistory.physical_activity.type_of_exercise && <div className="details-row"><div className="details-label">Type of Exercise</div><div className="details-value">{socialHistory.physical_activity.type_of_exercise}</div></div>}
                                    {socialHistory.physical_activity.duration && <div className="details-row"><div className="details-label">Duration</div><div className="details-value">{socialHistory.physical_activity.duration} {socialHistory.physical_activity.duration_unit}</div></div>}
                                    {socialHistory.physical_activity.consistency && <div className="details-row"><div className="details-label">Consistency</div><div className="details-value">{socialHistory.physical_activity.consistency}</div></div>}
                                    {socialHistory.physical_activity.notes && <div className="details-row details-full"><div className="details-label">Notes</div><div className="details-value">{socialHistory.physical_activity.notes}</div></div>}
                                </>
                            )}

                            {/* Stress */}
                            {socialHistory.stress?.perceived_stress_level && (
                                <>
                                    <div className="details-row details-full"><div className="details-label" style={{ fontSize: '1.1em', fontWeight: '600', paddingTop: '15px' }}>Stress</div></div>
                                    <div className="details-row"><div className="details-label">Stress Level</div><div className="details-value">{socialHistory.stress.perceived_stress_level}</div></div>
                                    {socialHistory.stress.major_stressors && <div className="details-row"><div className="details-label">Major Stressors</div><div className="details-value">{socialHistory.stress.major_stressors}</div></div>}
                                    {socialHistory.stress.coping_mechanisms && <div className="details-row"><div className="details-label">Coping Mechanisms</div><div className="details-value">{socialHistory.stress.coping_mechanisms}</div></div>}
                                    {socialHistory.stress.notes && <div className="details-row details-full"><div className="details-label">Notes</div><div className="details-value">{socialHistory.stress.notes}</div></div>}
                                </>
                            )}

                            {/* Social Connection */}
                            {socialHistory.social_isolation_connection?.isolation_status && (
                                <>
                                    <div className="details-row details-full"><div className="details-label" style={{ fontSize: '1.1em', fontWeight: '600', paddingTop: '15px' }}>Social isolation & connection</div></div>
                                    <div className="details-row"><div className="details-label">Isolation Status</div><div className="details-value">{socialHistory.social_isolation_connection.isolation_status}</div></div>
                                    {socialHistory.social_isolation_connection.social_support && <div className="details-row"><div className="details-label">Social Support</div><div className="details-value">{socialHistory.social_isolation_connection.social_support}</div></div>}
                                    {socialHistory.social_isolation_connection.frequency_of_social_interactions && <div className="details-row"><div className="details-label">Social Interactions Frequency</div><div className="details-value">{socialHistory.social_isolation_connection.frequency_of_social_interactions}</div></div>}
                                    {socialHistory.social_isolation_connection.notes && <div className="details-row details-full"><div className="details-label">Notes</div><div className="details-value">{socialHistory.social_isolation_connection.notes}</div></div>}
                                </>
                            )}

                            {/* Exposure to Violence */}
                            {socialHistory.exposure_to_violence?.type_of_violence && (
                                <>
                                    <div className="details-row details-full"><div className="details-label" style={{ fontSize: '1.1em', fontWeight: '600', paddingTop: '15px' }}>Exposure to violence</div></div>
                                    <div className="details-row"><div className="details-label">Type</div><div className="details-value">{socialHistory.exposure_to_violence.type_of_violence}</div></div>
                                    {socialHistory.exposure_to_violence.date_of_last_exposure && <div className="details-row"><div className="details-label">Last Exposure Date</div><div className="details-value">{socialHistory.exposure_to_violence.date_of_last_exposure}</div></div>}
                                    {socialHistory.exposure_to_violence.support_or_intervention_received && <div className="details-row"><div className="details-label">Support Received</div><div className="details-value">{socialHistory.exposure_to_violence.support_or_intervention_received}</div></div>}
                                    {socialHistory.exposure_to_violence.notes && <div className="details-row details-full"><div className="details-label">Notes</div><div className="details-value">{socialHistory.exposure_to_violence.notes}</div></div>}
                                </>
                            )}

                            {/* Gender Identity */}
                            {socialHistory.gender_identity?.gender_identity && (
                                <>
                                    <div className="details-row details-full"><div className="details-label" style={{ fontSize: '1.1em', fontWeight: '600', paddingTop: '15px' }}>Gender identity</div></div>
                                    <div className="details-row"><div className="details-label">Gender Identity</div><div className="details-value">{socialHistory.gender_identity.gender_identity}</div></div>
                                    {socialHistory.gender_identity?.notes && <div className="details-row details-full"><div className="details-label">Notes</div><div className="details-value">{socialHistory.gender_identity.notes}</div></div>}
                                </>
                            )}

                            {/* Sexual Orientation */}
                            {socialHistory.sexual_orientation?.sexual_orientation && (
                                <>
                                    <div className="details-row details-full"><div className="details-label" style={{ fontSize: '1.1em', fontWeight: '600', paddingTop: '15px' }}>Sexual orientation</div></div>
                                    <div className="details-row"><div className="details-label">Sexual Orientation</div><div className="details-value">{socialHistory.sexual_orientation.sexual_orientation}</div></div>
                                    {socialHistory.sexual_orientation?.notes && <div className="details-row details-full"><div className="details-label">Notes</div><div className="details-value">{socialHistory.sexual_orientation.notes}</div></div>}
                                </>
                            )}

                            {/* Education */}
                            {socialHistory.education?.highest_level_of_education && (
                                <>
                                    <div className="details-row details-full"><div className="details-label" style={{ fontSize: '1.1em', fontWeight: '600', paddingTop: '15px' }}>Highest level of education</div></div>
                                    <div className="details-row"><div className="details-label">Education Level</div><div className="details-value">{socialHistory.education.highest_level_of_education}</div></div>
                                    {socialHistory.education.notes && <div className="details-row details-full"><div className="details-label">Notes</div><div className="details-value">{socialHistory.education.notes}</div></div>}
                                </>
                            )}

                            {/* Financial Resources */}
                            {socialHistory.financial_resources?.income_level && (
                                <>
                                    <div className="details-row details-full"><div className="details-label" style={{ fontSize: '1.1em', fontWeight: '600', paddingTop: '15px' }}>Financial resources</div></div>
                                    <div className="details-row"><div className="details-label">Income Level</div><div className="details-value">{socialHistory.financial_resources.income_level}</div></div>
                                    {socialHistory.financial_resources.employment_status && <div className="details-row"><div className="details-label">Employment Status</div><div className="details-value">{socialHistory.financial_resources.employment_status}</div></div>}
                                    {socialHistory.financial_resources.financial_support && <div className="details-row"><div className="details-label">Financial Support</div><div className="details-value">{socialHistory.financial_resources.financial_support}</div></div>}
                                    {socialHistory.financial_resources.notes && <div className="details-row details-full"><div className="details-label">Notes</div><div className="details-value">{socialHistory.financial_resources.notes}</div></div>}
                                </>
                            )}

                            {/* Nutrition */}
                            {socialHistory.nutrients_history && (
                                <>
                                    <div className="details-row details-full"><div className="details-label" style={{ fontSize: '1.1em', fontWeight: '600', paddingTop: '15px' }}>Nutrients History</div></div>
                                    {socialHistory.nutrients_history.dietary_preferences && <div className="details-row details-full"><div className="details-label">Dietary Preferences</div><div className="details-value">{socialHistory.nutrients_history.dietary_preferences}</div></div>}
                                    {socialHistory.nutrients_history.supplement_usage && <div className="details-row"><div className="details-label">Supplement Usage</div><div className="details-value">{socialHistory.nutrients_history.supplement_usage}</div></div>}
                                    {socialHistory.nutrients_history.notes && <div className="details-row details-full"><div className="details-label">Notes</div><div className="details-value">{socialHistory.nutrients_history.notes}</div></div>}
                                </>
                            )}

                            {/* Additional Notes */}
                            {socialHistory.social_history_free_text?.notes && (
                                <>
                                    <div className="details-row details-full"><div className="details-label" style={{ fontSize: '1.1em', fontWeight: '600', paddingTop: '15px' }}>Social History (free text)</div></div>
                                    <div className="details-row details-full">
                                        <div className="details-label">Notes</div>
                                        <div className="details-value">{socialHistory.social_history_free_text.notes}</div>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                )}

                <div className="details-actions">
                    <button className="details-btn primary" onClick={() => navigate('/patients/add', { state: { patient } })}>Edit</button>
                    <button className="details-btn ghost" onClick={() => navigate('/patients')}>Close</button>
                </div>
            </div>
        </div>
    );
}

export default ViewPatient;