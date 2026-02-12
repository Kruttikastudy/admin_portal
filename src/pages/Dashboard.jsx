import React from 'react';
import './Dashboard.css';

function Dashboard() {
    const dashboardData = {
        totalDoctors: 10,
        totalStaff: 10,
        totalPatients: 10,
        activeDoctors: [
            { name: 'Doctor Name', category: 'Category', status: 'Status' },
            // Empty row to match image's empty state look
        ],
        activeStaff: [
            { name: 'Staff Name', department: 'Department', status: 'Status' },
        ],
        pendingApprovals: [
            { type: 'Type', submittedBy: 'Submitted by', date: 'Date', action: 'Action' },
        ],
    };

    return (
        <div className="image-dashboard-container">
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

            <div className="image-stats-row">
                <div className="image-stat-box blue-stat">
                    <div className="image-stat-label">Total Doctors</div>
                    <div className="image-stat-value">{dashboardData.totalDoctors}</div>
                </div>
                <div className="image-stat-box blue-stat">
                    <div className="image-stat-label">Total Staff</div>
                    <div className="image-stat-value">{dashboardData.totalStaff}</div>
                </div>
                <div className="image-stat-box blue-stat">
                    <div className="image-stat-label">Total Patients</div>
                    <div className="image-stat-value">{dashboardData.totalPatients}</div>
                </div>
            </div>

            <div className="image-dashboard-content-grid">
                <div className="image-content-table-wrapper">
                    <div className="image-table-header">Active Doctors</div>
                    <div className="image-table-body">
                        <table className="image-data-table">
                            <thead>
                                <tr>
                                    <th>Doctor Name</th>
                                    <th>Category</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        <div className="grey-circle-placeholder"></div>
                                    </td>
                                    <td></td>
                                    <td></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="image-content-table-wrapper">
                    <div className="image-table-header">Active Staff</div>
                    <div className="image-table-body">
                        <table className="image-data-table">
                            <thead>
                                <tr>
                                    <th>Staff Name</th>
                                    <th>Department</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        <div className="grey-circle-placeholder"></div>
                                    </td>
                                    <td></td>
                                    <td></td>
                                </tr>
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
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
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
