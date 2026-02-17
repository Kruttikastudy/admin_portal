import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { getApiUrl } from '../api';
import './Doctors.css'; // Reusing common styles from Doctors.css

function Staff() {
    const navigate = useNavigate();
    const [staff, setStaff] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchField, setSearchField] = useState('all');

    useEffect(() => {
        const fetchStaff = async () => {
            try {
                const res = await fetch(getApiUrl('/api/staff'));
                const data = await res.json();
                // Sort by latest first
                const sortedData = Array.isArray(data) ? [...data].sort((a, b) => {
                    const idA = a._id || a.id || '';
                    const idB = b._id || b.id || '';
                    return idB.localeCompare(idA);
                }) : [];
                setStaff(sortedData);
            } catch (err) {
                console.error('Failed to fetch staff', err);
            }
        };
        fetchStaff();
    }, []);

    const getFieldValue = (s, field) => {
        const name = `${s.name?.first || ''} ${s.name?.last || ''}`.trim();
        const role = s.role || '';
        const contact = s.contact_info?.phone || '';
        const email = s.contact_info?.email || '';
        const status = s.status || 'Active';
        switch (field) {
            case 'name': return name;
            case 'role': return role;
            case 'contact': return contact;
            case 'email': return email;
            case 'status': return status;
            default: return `${name} ${role} ${contact} ${email} ${status}`;
        }
    };

    const filteredStaff = staff.filter(s => {
        if (!searchTerm.trim()) return true;
        return getFieldValue(s, searchField).toLowerCase().includes(searchTerm.toLowerCase());
    });

    const handleToggleStatus = async (s) => {
        const newStatus = s.status === 'Inactive' ? 'Active' : 'Inactive';
        const sId = s._id || s.id;
        try {
            const res = await fetch(getApiUrl(`/api/staff/${sId}`), {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...s, status: newStatus })
            });
            if (res.ok) {
                setStaff(prev => prev.map(item => (item._id || item.id) === sId ? { ...item, status: newStatus } : item));
            } else {
                console.error('Failed to update status');
            }
        } catch (err) {
            console.error('Error toggling status', err);
        }
    };

    return (
        <div className="image-doctors-page"> {/* Reusing class names for layout consistency */}
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

            <div className="image-doctors-controls-row">
                <div className="image-search-container">
                    <div className="specialization-select-box">
                        <select value={searchField} onChange={(e) => setSearchField(e.target.value)}>
                            <option value="all">All Fields</option>
                            <option value="name">Name</option>
                            <option value="role">Role</option>
                            <option value="contact">Contact</option>
                            <option value="email">Email</option>
                            <option value="status">Status</option>
                        </select>
                    </div>
                    <input type="text" className="image-search-input" placeholder="Search..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
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
                        Total Staff : {filteredStaff.length}
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
                            {filteredStaff.map((s) => {
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
                                        <td>
                                            <span
                                                className={`status-badge ${status.toLowerCase()}`}
                                                onClick={(e) => { e.stopPropagation(); handleToggleStatus(s); }}
                                                style={{ cursor: 'pointer' }}
                                            >
                                                {status}
                                            </span>
                                        </td>
                                        <td>
                                            <div className="image-row-actions">
                                                <button
                                                    className="image-action-btn view-btn"
                                                    style={{ padding: '6px 10px', borderRadius: 8, background: '#4FB0D2', color: 'white', border: 'none', cursor: 'pointer', marginRight: 6 }}
                                                    onClick={() => navigate('/staff/view', { state: { staff: s } })}
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
        </div>
    );
}

export default Staff;
