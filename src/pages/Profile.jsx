import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getApiUrl } from '../api';
import './Profile.css';

function Profile() {
    const navigate = useNavigate();
    const [profileData, setProfileData] = useState({
        name: 'Not Set',
        dob: 'Not Set',
        email: 'Not Set',
        contact: 'Not Set',
        username: 'admin'
    });
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            const res = await fetch(getApiUrl('/api/admin-profile'));
            if (res.ok) {
                const data = await res.json();
                setProfileData({
                    name: data.name || 'Not Set',
                    dob: data.dob || 'Not Set',
                    email: data.email || 'Not Set',
                    contact: data.contact || 'Not Set',
                    username: data.username || 'admin',
                    userId: data.userId || 'ADMIN001'
                });
            }
        } catch (err) {
            console.error('Failed to fetch profile:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (field, value) => {
        setProfileData(prev => ({ ...prev, [field]: value }));
    };

    const handleSave = async () => {
        try {
            const res = await fetch(getApiUrl('/api/admin-profile'), {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(profileData)
            });

            if (res.ok) {
                const updated = await res.json();
                setProfileData(updated);
                setIsEditing(false);
                alert('Profile updated successfully!');
            } else {
                alert('Failed to update profile');
            }
        } catch (err) {
            console.error('Error saving profile:', err);
            alert('Error saving profile');
        }
    };

    if (loading) return <div style={{ padding: '40px', textAlign: 'center' }}>Loading...</div>;

    return (
        <div className="profile-page-container fade-in">
            <div className="profile-card">
                <div className="profile-avatar-section">
                    <div className="profile-avatar-circle">
                        <svg viewBox="0 0 24 24" fill="#34495e">
                            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                        </svg>
                    </div>
                </div>

                <div className="profile-form">
                    <div className="profile-field-row">
                        <label>Name</label>
                        <div className="profile-input-wrapper">
                            <input
                                type="text"
                                value={profileData.name}
                                readOnly={!isEditing}
                                onChange={(e) => handleInputChange('name', e.target.value)}
                                style={isEditing ? { backgroundColor: '#fff', border: '1px solid #1B7A9F' } : {}}
                            />
                            {!isEditing && <span className="edit-cursor-icon" onClick={() => setIsEditing(true)} style={{ cursor: 'pointer', pointerEvents: 'auto' }}>✎</span>}
                        </div>
                    </div>

                    <div className="profile-field-row">
                        <label>DOB</label>
                        <div className="profile-input-wrapper">
                            <input
                                type={isEditing ? "date" : "text"}
                                value={profileData.dob}
                                readOnly={!isEditing}
                                onChange={(e) => handleInputChange('dob', e.target.value)}
                                style={isEditing ? { backgroundColor: '#fff', border: '1px solid #1B7A9F' } : {}}
                            />
                        </div>
                    </div>

                    <div className="profile-field-row">
                        <label>E-mail</label>
                        <div className="profile-input-wrapper">
                            <input
                                type="email"
                                value={profileData.email}
                                readOnly={!isEditing}
                                onChange={(e) => handleInputChange('email', e.target.value)}
                                style={isEditing ? { backgroundColor: '#fff', border: '1px solid #1B7A9F' } : {}}
                            />
                        </div>
                    </div>

                    <div className="profile-field-row">
                        <label>Contact no.</label>
                        <div className="profile-input-wrapper">
                            <input
                                type="text"
                                value={profileData.contact}
                                readOnly={!isEditing}
                                onChange={(e) => handleInputChange('contact', e.target.value)}
                                style={isEditing ? { backgroundColor: '#fff', border: '1px solid #1B7A9F' } : {}}
                            />
                        </div>
                    </div>

                    <div className="profile-field-row">
                        <label>User ID</label>
                        <div className="profile-input-wrapper">
                            <input
                                type="text"
                                value={profileData.userId}
                                readOnly={!isEditing}
                                onChange={(e) => handleInputChange('userId', e.target.value)}
                                style={isEditing ? { backgroundColor: '#fff', border: '1px solid #1B7A9F' } : {}}
                            />
                        </div>
                    </div>

                    <div className="profile-field-row">
                        <label>User Name</label>
                        <div className="profile-input-wrapper">
                            <input type="text" value={profileData.username} readOnly />
                        </div>
                    </div>

                    <div className="profile-actions">
                        {isEditing ? (
                            <div style={{ display: 'flex', gap: '15px' }}>
                                <button className="btn-save-profile" onClick={handleSave}>Save</button>
                                <button className="btn-cancel-profile" onClick={() => { setIsEditing(false); fetchProfile(); }}>Cancel</button>
                            </div>
                        ) : (
                            <button className="btn-logout" onClick={() => navigate('/')}>Logout</button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;
