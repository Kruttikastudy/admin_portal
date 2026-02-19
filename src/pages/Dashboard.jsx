import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getApiUrl } from '../api';
import './Dashboard.css';

function Dashboard() {
    const navigate = useNavigate();
    const [totalDoctors, setTotalDoctors] = useState(null);
    const [staffCount, setStaffCount] = useState('...');
    const [patientCount, setPatientCount] = useState('...');
    const [activeDoctors, setActiveDoctors] = useState([]);
    const [activeStaff, setActiveStaff] = useState([]);

    useEffect(() => {
        const fetchCounts = async () => {
            try {
                const [docRes, staffRes, patRes] = await Promise.all([
                    fetch(getApiUrl('/api/doctors')),
                    fetch(getApiUrl('/api/staff')),
                    fetch(getApiUrl('/api/patients'))
                ]);
                const docs = await docRes.json();
                const staffData = await staffRes.json();
                const patients = await patRes.json();

                setTotalDoctors(Array.isArray(docs) ? docs.length : 0);
                setStaffCount(Array.isArray(staffData) ? staffData.length : 0);
                setPatientCount(Array.isArray(patients) ? patients.length : 0);

                // Sort by latest first before slicing
                const sortedDocs = Array.isArray(docs) ? [...docs].sort((a, b) => (b._id || b.id || '').localeCompare(a._id || a.id || '')) : [];
                const sortedStaff = Array.isArray(staffData) ? [...staffData].sort((a, b) => (b._id || b.id || '').localeCompare(a._id || a.id || '')) : [];

                setActiveDoctors(sortedDocs.slice(0, 5));
                setActiveStaff(sortedStaff.slice(0, 5));
            } catch (err) {
                console.error('Failed to fetch dashboard data', err);
                setTotalDoctors(0);
                setStaffCount(0);
                setPatientCount(0);
            }
        };
        fetchCounts();
    }, []);

    return (
        <div className="image-dashboard-container">

            <div className="image-stats-row">
                <div className="image-stat-box blue-stat">
                    <div className="image-stat-label">Total Doctors</div>
                    <div className="image-stat-value">{totalDoctors !== null ? totalDoctors : '…'}</div>
                </div>
                <div className="image-stat-box blue-stat">
                    <div className="image-stat-label">Total Staff</div>
                    <div className="image-stat-value">{staffCount !== '...' ? staffCount : '…'}</div>
                </div>
                <div className="image-stat-box blue-stat">
                    <div className="image-stat-label">Total Patients</div>
                    <div className="image-stat-value">{patientCount !== '...' ? patientCount : '…'}</div>
                </div>
            </div>

            <div className="image-dashboard-content-grid">
                <div className="image-content-table-wrapper active-doctors-card">
                    <div className="image-table-header">
                        <h3>Active Doctors</h3>
                    </div>
                    <div className="image-table-body">
                        <table className="image-data-table">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Specialty</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {activeDoctors.length > 0 ? activeDoctors.map((d, i) => (
                                    <tr key={d._id || i} onClick={() => navigate('/doctors/view', { state: { doctor: d } })} className="clickable-row">
                                        <td>{`${d.name?.first || ''} ${d.name?.last || ''}`.trim()}</td>
                                        <td>{d.specialization || '-'}</td>
                                        <td><span>{d.status || 'Active'}</span></td>
                                    </tr>
                                )) : (
                                    <tr><td colSpan="3" style={{ textAlign: 'center' }}>No active doctors found</td></tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="image-content-table-wrapper active-staff-card">
                    <div className="image-table-header">
                        <h3>Active Staff</h3>
                    </div>
                    <div className="image-table-body">
                        <table className="image-data-table">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Role</th>
                                    <th>Department</th>
                                </tr>
                            </thead>
                            <tbody>
                                {activeStaff.length > 0 ? activeStaff.map((s, i) => (
                                    <tr key={s._id || i} onClick={() => navigate('/staff/view', { state: { staff: s } })} className="clickable-row">
                                        <td>{`${s.name?.first || ''} ${s.name?.last || ''}`.trim()}</td>
                                        <td>{s.role || '-'}</td>
                                        <td>{s.department || '-'}</td>
                                    </tr>
                                )) : (
                                    <tr><td colSpan="3" style={{ textAlign: 'center' }}>No active staff found</td></tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="image-content-table-wrapper">
                    <div className="image-table-header">Pending Approvals</div>
                    <div className="image-table-body">
                        <table className="image-data-table">
                            <thead>
                                <tr>
                                    <th>Type</th>
                                    <th>Submitted by</th>
                                    <th>Date</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="empty-row-matching-image">
                                    <td>-</td>
                                    <td>-</td>
                                    <td>-</td>
                                    <td>-</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
