import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getApiUrl } from '../api';
import './Doctors.css'; // Reusing common styles

function Patients() {
    const navigate = useNavigate();
    const [patients, setPatients] = useState([]);
    const [selectedIds, setSelectedIds] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchField, setSearchField] = useState('all');

    const handleToggleStatus = async (p) => {
        const newStatus = p.status === 'Inactive' ? 'Active' : 'Inactive';
        const pId = p._id || p.id;
        try {
            const res = await fetch(getApiUrl(`/api/patients/${pId}`), {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...p, status: newStatus })
            });
            if (res.ok) {
                setPatients(prev => prev.map(item => (item._id || item.id) === pId ? { ...item, status: newStatus } : item));
            } else {
                console.error('Failed to update status');
            }
        } catch (err) {
            console.error('Error toggling status', err);
        }
    };

    const toggleSelectAll = () => {
        if (selectedIds.length === filteredPatients.length) {
            setSelectedIds([]);
        } else {
            setSelectedIds(filteredPatients.map(p => p._id || p.id));
        }
    };

    const toggleSelect = (id) => {
        setSelectedIds(prev =>
            prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
        );
    };

    useEffect(() => {
        const fetchPatients = async () => {
            try {
                const res = await fetch(getApiUrl('/api/patients'));
                const data = await res.json();
                // Sort by latest first
                const sortedData = Array.isArray(data) ? [...data].sort((a, b) => {
                    const idA = a._id || a.id || '';
                    const idB = b._id || b.id || '';
                    return idB.localeCompare(idA);
                }) : [];
                setPatients(sortedData);
            } catch (err) {
                console.error('Failed to fetch patients', err);
            }
        };
        fetchPatients();
    }, []);

    const getFieldValue = (p, field) => {
        const name = `${p.name?.first || ''} ${p.name?.last || ''}`.trim();
        const role = p.role || 'Patient';
        const contact = p.contact_info?.mobile?.number || p.contact_info?.phone || '';
        const email = p.contact_info?.email || '';
        const status = p.status || 'Active';
        const pid = p._id || p.id || '';
        switch (field) {
            case 'id': return pid;
            case 'name': return name;
            case 'role': return role;
            case 'contact': return contact;
            case 'email': return email;
            case 'status': return status;
            default: return `${pid} ${name} ${role} ${contact} ${email} ${status}`;
        }
    };

    const filteredPatients = patients.filter(p => {
        if (!searchTerm.trim()) return true;
        return getFieldValue(p, searchField).toLowerCase().includes(searchTerm.toLowerCase());
    });

    return (
        <div className="image-doctors-page">
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
                            <option value="id">Patient ID</option>
                            <option value="name">Name</option>
                            <option value="role">Role</option>
                            <option value="contact">Contact</option>
                            <option value="email">Email</option>
                            <option value="status">Status</option>
                        </select>
                    </div>
                    <input
                        type="text"
                        className="image-search-input"
                        placeholder={searchField === 'all' ? 'Search all fields...' : `Search by ${searchField}...`}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button className="image-search-btn" onClick={() => { }}>🔍</button>
                </div>
                <button className="image-add-doctor-action-btn" onClick={() => navigate('/patients/add')}>
                    Add Patient
                </button>
            </div>

            <div className="image-doctors-list-section">
                <div className="image-list-title-header">
                    <h2>Patient List</h2>
                    <div className="image-total-count-pill">
                        Total Patients : {filteredPatients.length}
                    </div>
                </div>

                <div className="image-doctors-table-container">
                    <table className="image-doctors-list-table">
                        <thead>
                            <tr>
                                <th className="checkbox-col-placeholder">
                                    <div
                                        className={`radio-style-selection ${selectedIds.length === filteredPatients.length && filteredPatients.length > 0 ? 'selected' : ''}`}
                                        onClick={toggleSelectAll}
                                        title="Select All"
                                    >
                                        <div className="radio-inner-circle"></div>
                                    </div>
                                </th>
                                <th>Patient ID</th>
                                <th>Patient Name</th>
                                <th>Role</th>
                                <th>Contact no.</th>
                                <th>Email</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredPatients.map((p) => {
                                const id = p._id || p.id;
                                const name = `${p.name?.first || ''} ${p.name?.last || ''}`.trim();
                                const role = p.role || 'Patient';
                                const contact = p.contact_info?.mobile?.number || p.contact_info?.phone || '';
                                const email = p.contact_info?.email || '';
                                const status = p.status || 'Active';
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
                                        <td>{id}</td>
                                        <td>
                                            <div className="name-avatar-cell">
                                                <div className="image-table-avatar">
                                                    {p.photo ? (
                                                        <img src={p.photo} alt={name} />
                                                    ) : (
                                                        <div className="image-table-avatar-placeholder">
                                                            {p.name?.first?.[0] || 'P'}
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
                                                onClick={(e) => { e.stopPropagation(); handleToggleStatus(p); }}
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
                                                    onClick={() => navigate('/patients/view', { state: { patient: p } })}
                                                >
                                                    View
                                                </button>
                                                <button
                                                    className="image-action-btn edit-btn"
                                                    style={{ padding: '6px 10px', borderRadius: 8, background: '#1B7A9F', color: 'white', border: 'none', cursor: 'pointer' }}
                                                    onClick={() => navigate('/patients/add', { state: { patient: p } })}
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

export default Patients;
