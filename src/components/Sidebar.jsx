import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
    LayoutDashboard,
    Stethoscope,
    Users,
    UserRound,
    CalendarCheck,
    CalendarDays,
    MessageSquare,
    Settings,
    LogOut
} from 'lucide-react';
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

    const navItems = [
        { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { to: '/doctors', label: 'Doctors', icon: Stethoscope },
        { to: '/staff', label: 'Staff', icon: Users },
        { to: '/patients', label: 'Patients', icon: UserRound },
        { to: '/appointments', label: 'Appointments', icon: CalendarCheck },
        { to: '/schedule', label: 'Schedule', icon: CalendarDays },
        { to: '/messages', label: 'Messages', icon: MessageSquare },
        { to: '/settings', label: 'Settings', icon: Settings }
    ];

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
                        {navItems.map((item) => (
                            <NavLink
                                key={item.to}
                                to={item.to}
                                className={({ isActive }) => isActive ? 'image-nav-item active' : 'image-nav-item'}
                                onClick={() => setIsOpen(false)}
                            >
                                <item.icon className="nav-icon-lucide" size={20} />
                                <span className="nav-text-label">{item.label}</span>
                            </NavLink>
                        ))}

                        <div className="sidebar-logout-container">
                            <button className="image-logout-btn-link" onClick={handleLogout}>
                                <LogOut size={20} style={{ marginRight: '12px' }} />
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
