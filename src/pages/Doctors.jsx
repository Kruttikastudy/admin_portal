import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getApiUrl } from '../api';
import './Doctors.css';

function Doctors() {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [specialityFilter, setSpecialityFilter] = useState('all');
    const [doctors, setDoctors] = useState([]);
    const [selectedIds, setSelectedIds] = useState([]);

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
            case 'speciality': return category;
            case 'contact': return contact;
            case 'email': return email;
            case 'status': return status;
            default: return `${name} ${category} ${contact} ${email} ${status}`;
        }
    };

    const filteredDoctors = doctors.filter(doc => {
        const name = `${doc.name?.first || ''} ${doc.name?.last || ''}`.trim();
        const speciality = (doc.specialization || '').toLowerCase();
        const contact = doc.contact_info?.phone || '';
        const email = doc.contact_info?.email || '';
        const status = doc.status || 'Active';
        const allFields = `${name} ${speciality} ${contact} ${email} ${status}`;

        const matchesSearch = !searchTerm.trim() || allFields.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesSpeciality = specialityFilter === 'all' || speciality === specialityFilter.toLowerCase();
        return matchesSearch && matchesSpeciality;
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

    const toggleSelectAll = () => {
        if (selectedIds.length === filteredDoctors.length) {
            setSelectedIds([]);
        } else {
            setSelectedIds(filteredDoctors.map(d => d._id || d.id));
        }
    };

    const toggleSelect = (id) => {
        setSelectedIds(prev =>
            prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
        );
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
                        <select value={specialityFilter} onChange={(e) => setSpecialityFilter(e.target.value)}>
                            <option value="all">All Specialities</option>
                            <option value="General Medicine">General Medicine</option>
                            <option value="Cardiology">Cardiology</option>
                            <option value="Neurology">Neurology</option>
                            <option value="Orthopedics">Orthopedics</option>
                            <option value="Pediatrics">Pediatrics</option>
                            <option value="Dermatology">Dermatology</option>
                            <option value="Gynecology & Obstetrics">Gynecology &amp; Obstetrics</option>
                            <option value="ENT (Ear, Nose, Throat)">ENT</option>
                            <option value="Ophthalmology">Ophthalmology</option>
                            <option value="Psychiatry">Psychiatry</option>
                            <option value="Gastroenterology">Gastroenterology</option>
                            <option value="Urology">Urology</option>
                            <option value="Nephrology">Nephrology</option>
                            <option value="Pulmonology">Pulmonology</option>
                            <option value="Endocrinology">Endocrinology</option>
                            <option value="Oncology">Oncology</option>
                            <option value="Radiology">Radiology</option>
                            <option value="Anesthesiology">Anesthesiology</option>
                            <option value="Emergency Medicine">Emergency Medicine</option>
                            <option value="Pathology">Pathology</option>
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
                                    <div
                                        className={`radio-style-selection ${selectedIds.length === filteredDoctors.length && filteredDoctors.length > 0 ? 'selected' : ''}`}
                                        onClick={toggleSelectAll}
                                        title="Select All"
                                    >
                                        <div className="radio-inner-circle"></div>
                                    </div>
                                </th>
                                <th>Doctors Name</th>
                                <th>Speciality</th>
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
                                                    {doc.photo ? (
                                                        <img src={doc.photo} alt={name} />
                                                    ) : (
                                                        <div className="image-table-avatar-placeholder">
                                                            {doc.name?.first?.[0] || 'D'}
                                                        </div>
                                                    )}
                                                </div>
                                                <span>{name}</span>
                                            </div>
                                        </td>
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
