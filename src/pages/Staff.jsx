import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { getApiUrl } from '../api';
import './Doctors.css'; // Reusing common styles from Doctors.css

function Staff() {
    const navigate = useNavigate();
    const [staff, setStaff] = useState([]);
    const [selectedIds, setSelectedIds] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [roleFilter, setRoleFilter] = useState('all');

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
        const name = `${s.name?.first || ''} ${s.name?.last || ''}`.trim();
        const role = (s.role || '').toLowerCase();
        const contact = s.contact_info?.phone || '';
        const email = s.contact_info?.email || '';
        const status = s.status || 'Active';
        const allFields = `${name} ${role} ${contact} ${email} ${status}`;

        const matchesSearch = !searchTerm.trim() || allFields.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesRole = roleFilter === 'all' || role === roleFilter.toLowerCase();
        return matchesSearch && matchesRole;
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

    const toggleSelectAll = () => {
        if (selectedIds.length === filteredStaff.length) {
            setSelectedIds([]);
        } else {
            setSelectedIds(filteredStaff.map(s => s._id || s.id));
        }
    };

    const toggleSelect = (id) => {
        setSelectedIds(prev =>
            prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
        );
    };

    return (
        <div className="image-doctors-page"> {/* Reusing class names for layout consistency */}

            <div className="image-doctors-controls-row">
                <div className="image-search-container">
                    <div className="specialization-select-box">
                        <select value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)}>
                            <option value="all">All Roles</option>
                            <option value="Nurse">Nurse</option>
                            <option value="Receptionist">Receptionist</option>
                            <option value="Pharmacist">Pharmacist</option>
                            <option value="Lab Technician">Lab Technician</option>
                            <option value="Admin">Admin</option>
                            <option value="Doctor">Doctor</option>
                            <option value="Business">Business</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                    <input
                        type="text"
                        className="image-search-input"
                        placeholder="Search by name..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button className="image-search-btn" onClick={() => { }}>🔍</button>
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
                                    <div
                                        className={`radio-style-selection ${selectedIds.length === filteredStaff.length && filteredStaff.length > 0 ? 'selected' : ''}`}
                                        onClick={toggleSelectAll}
                                        title="Select All"
                                    >
                                        <div className="radio-inner-circle"></div>
                                    </div>
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
                                            <div
                                                className={`radio-style-selection ${selectedIds.includes(id) ? 'selected' : ''}`}
                                                onClick={() => toggleSelect(id)}
                                            >
                                                <div className="radio-inner-circle"></div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="name-avatar-cell">
                                                <div className="image-table-avatar">
                                                    {s.photo ? (
                                                        <img src={s.photo} alt={name} />
                                                    ) : (
                                                        <div className="image-table-avatar-placeholder">
                                                            {s.name?.first?.[0] || 'S'}
                                                        </div>
                                                    )}
                                                </div>
                                                <span>{name}</span>
                                            </div>
                                        </td>
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
