import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './Sidebar.css';

function Sidebar() {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);

    const handleLogout = () => {
        setIsOpen(false);
        navigate('/');
    };

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            <div className="mobile-header">
                <div className="mobile-logo-box">
                    <img src="/logo.jpg" alt="SSPD Logo" className="mobile-logo-img" />
                    <span className="mobile-logo-text">SSPD EMR</span>
                </div>
                <div className="hamburger-menu" onClick={toggleSidebar}>
                    <div className={`bar ${isOpen ? 'open' : ''}`}></div>
                    <div className={`bar ${isOpen ? 'open' : ''}`}></div>
                    <div className={`bar ${isOpen ? 'open' : ''}`}></div>
                </div>
            </div>

            <div className={`sidebar-backdrop ${isOpen ? 'show' : ''}`} onClick={() => setIsOpen(false)}></div>

            <div className={`image-sidebar ${isOpen ? 'mobile-open' : ''}`}>
                <div className="sidebar-top-white-box">
                    <div className="image-logo-container">
                        <img src="/logo.jpg" alt="SSPD Logo" className="image-logo-img" />
                        <div className="image-logo-text">
                            <span className="blue-text-logo">SSPD EMR</span>
                        </div>
                    </div>
                </div>

                <div className="sidebar-blue-section">
                    <nav className="image-sidebar-nav">
                        {[
                            { to: '/dashboard', label: 'Dashboard' },
                            { to: '/doctors', label: 'Doctors' },
                            { to: '/staff', label: 'Staff' },
                            { to: '/patients', label: 'Patients' },
                            { to: '/appointments', label: 'Appointments' },
                            { to: '/schedule', label: 'Schedule' },
                            { to: '/messages', label: 'Messages' },
                            { to: '/settings', label: 'Settings' }
                        ].map((item) => (
                            <NavLink
                                key={item.to}
                                to={item.to}
                                className={({ isActive }) => isActive ? 'image-nav-item active' : 'image-nav-item'}
                                onClick={() => setIsOpen(false)}
                            >
                                <div className="nav-icon-square"></div>
                                <span className="nav-text-label">{item.label}</span>
                            </NavLink>
                        ))}

                        <div className="sidebar-logout-container">
                            <button className="image-logout-btn-link" onClick={handleLogout}>
                                Logout
                            </button>
                        </div>
                    </nav>
                </div>
            </div>
        </>
    );
}

export default Sidebar;
