import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getApiUrl } from '../api';
import './Doctors.css';

function Doctors() {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [searchField, setSearchField] = useState('all');
    const [doctors, setDoctors] = useState([]);

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const res = await fetch(getApiUrl('/api/doctors'));
                const data = await res.json();
                // Sort by latest first
                const sortedData = Array.isArray(data) ? [...data].sort((a, b) => {
                    const idA = a._id || a.id || '';
                    const idB = b._id || b.id || '';
                    return idB.localeCompare(idA);
                }) : [];
                setDoctors(sortedData);
            } catch (err) {
                console.error('Failed to fetch doctors', err);
            }
        };
        fetchDoctors();
    }, []);

    const getFieldValue = (doc, field) => {
        const name = `${doc.name?.first || ''} ${doc.name?.last || ''}`.trim();
        const category = doc.specialization || '';
        const contact = doc.contact_info?.phone || '';
        const email = doc.contact_info?.email || '';
        const status = doc.status || 'Active';
        switch (field) {
            case 'name': return name;
            case 'category': return category;
            case 'contact': return contact;
            case 'email': return email;
            case 'status': return status;
            default: return `${name} ${category} ${contact} ${email} ${status}`;
        }
    };

    const filteredDoctors = doctors.filter(doc => {
        if (!searchTerm.trim()) return true;
        return getFieldValue(doc, searchField).toLowerCase().includes(searchTerm.toLowerCase());
    });

    const handleToggleStatus = async (doc) => {
        const newStatus = doc.status === 'Inactive' ? 'Active' : 'Inactive';
        const docId = doc._id || doc.id;
        try {
            const res = await fetch(getApiUrl(`/api/doctors/${docId}`), {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...doc, status: newStatus })
            });
            if (res.ok) {
                setDoctors(prev => prev.map(d => (d._id || d.id) === docId ? { ...d, status: newStatus } : d));
            } else {
                console.error('Failed to update status');
            }
        } catch (err) {
            console.error('Error toggling status', err);
        }
    };

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
                            <option value="name">Name</option>
                            <option value="category">Category</option>
                            <option value="contact">Contact</option>
                            <option value="email">Email</option>
                            <option value="status">Status</option>
                        </select>
                    </div>
                    <input type="text" className="image-search-input" placeholder="Search..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                    <button className="image-search-btn">Search</button>
                </div>
                <button className="image-add-doctor-action-btn" onClick={() => navigate('/doctors/add')}>
                    Add Doctor
                </button>
            </div>

            <div className="image-doctors-list-section">
                <div className="image-list-title-header">
                    <h2>Doctors List</h2>
                    <div className="image-total-count-pill">
                        Total Doctor: {filteredDoctors.length}
                    </div>
                </div>

                <div className="image-doctors-table-container">
                    <table className="image-doctors-list-table">
                        <thead>
                            <tr>
                                <th className="checkbox-col-placeholder">
                                    <div className="white-circle-checkbox"></div>
                                </th>
                                <th>Doctors Name</th>
                                <th>Category</th>
                                <th>Contact no.</th>
                                <th>Email</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredDoctors.map((doc) => {
                                const id = doc._id || doc.id;
                                const name = `${doc.name?.first || ''} ${doc.name?.last || ''}`.trim();
                                const category = doc.specialization || '';
                                const contact = doc.contact_info?.phone || '';
                                const email = doc.contact_info?.email || '';
                                const status = doc.status || 'Active';
                                return (
                                    <tr key={id}>
                                        <td>
                                            <div className="grey-circle-placeholder-small"></div>
                                        </td>
                                        <td>{name}</td>
                                        <td>{category}</td>
                                        <td>{contact}</td>
                                        <td>{email}</td>
                                        <td>
                                            <span
                                                className={`status-badge ${status.toLowerCase()}`}
                                                onClick={(e) => { e.stopPropagation(); handleToggleStatus(doc); }}
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
                                                    onClick={() => navigate('/doctors/view', { state: { doctor: doc } })}
                                                >
                                                    View
                                                </button>
                                                <button
                                                    className="image-action-btn edit-btn"
                                                    style={{ padding: '6px 10px', borderRadius: 8, background: '#1B7A9F', color: 'white', border: 'none', cursor: 'pointer' }}
                                                    onClick={() => navigate('/doctors/add', { state: { doctor: doc } })}
                                                >
                                                    Edit
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                            {/* Dummy rows for spacing matching image */}
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

export default Doctors;
