import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { getApiUrl } from '../api';
import ExportModal from './ExportModal';
import LogModal from './LogModal';
import './TopBar.css';

function TopBar() {
    const navigate = useNavigate();
    const [showNotifications, setShowNotifications] = useState(false);
    const [showExport, setShowExport] = useState(false);
    const [logs, setLogs] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const notifRef = useRef(null);

    // Fetch unread count on mount and periodically
    useEffect(() => {
        fetchUnreadCount();
        const interval = setInterval(fetchUnreadCount, 30000);
        return () => clearInterval(interval);
    }, []);

    // Close notification dropdown on outside click
    useEffect(() => {
        const handleClick = (e) => {
            if (notifRef.current && !notifRef.current.contains(e.target)) {
                setShowNotifications(false);
            }
        };
        document.addEventListener('mousedown', handleClick);
        return () => document.removeEventListener('mousedown', handleClick);
    }, []);

    const fetchUnreadCount = async () => {
        try {
            const res = await fetch(getApiUrl('/api/audit-logs/unread-count'));
            if (res.ok) {
                const data = await res.json();
                setUnreadCount(data.count);
            }
        } catch (err) {
            console.error('Error fetching unread count:', err);
        }
    };

    const fetchLogs = async () => {
        try {
            const res = await fetch(getApiUrl('/api/audit-logs'));
            if (res.ok) {
                const data = await res.json();
                setLogs(Array.isArray(data) ? data : []);
            }
        } catch (err) {
            console.error('Error fetching logs:', err);
        }
    };

    const handleBellClick = async () => {
        if (!showNotifications) {
            await fetchLogs();
            // Mark all as read
            try {
                await fetch(getApiUrl('/api/audit-logs/mark-read'), { method: 'POST' });
                setUnreadCount(0);
            } catch (err) { /* ignore */ }
        }
        setShowNotifications(!showNotifications);
    };

    const getActionIcon = (action) => {
        if (action === 'Created') return '➕';
        if (action === 'Updated') return '✏️';
        if (action === 'Deleted') return '🗑️';
        return '📋';
    };

    const getActionColor = (action) => {
        if (action === 'Created') return '#27AE60';
        if (action === 'Updated') return '#F39C12';
        if (action === 'Deleted') return '#E74C3C';
        return '#7F8C8D';
    };

    const formatTime = (dateStr) => {
        const date = new Date(dateStr);
        const now = new Date();
        const diffMs = now - date;
        const diffMin = Math.floor(diffMs / 60000);
        const diffHr = Math.floor(diffMs / 3600000);
        const diffDay = Math.floor(diffMs / 86400000);

        if (diffMin < 1) return 'Just now';
        if (diffMin < 60) return `${diffMin}m ago`;
        if (diffHr < 24) return `${diffHr}h ago`;
        if (diffDay < 7) return `${diffDay}d ago`;
        return date.toLocaleDateString();
    };

    return (
        <>
            <div className="topbar-strip">
                <div className="topbar-right">
                    {/* Notification Bell */}
                    <div className="topbar-icon-wrapper">
                        <div className="topbar-icon-box" onClick={() => setShowNotifications(true)} title="Notifications">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
                                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                                <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                            </svg>
                            {unreadCount > 0 && (
                                <span className="topbar-badge">{unreadCount > 99 ? '99+' : unreadCount}</span>
                            )}
                        </div>
                    </div>

                    {/* Export Button */}
                    <div className="topbar-icon-box" onClick={() => setShowExport(true)} title="Export Data">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                            <polyline points="7 10 12 15 17 10" />
                            <line x1="12" y1="15" x2="12" y2="3" />
                        </svg>
                    </div>

                    {/* Profile Circle */}
                    <div className="topbar-profile-circle" onClick={() => navigate('/profile')} title="Profile">
                        <svg viewBox="0 0 100 100" fill="var(--primary-blue, #1B7A9F)">
                            <circle cx="50" cy="50" r="45" />
                            <circle cx="50" cy="35" r="15" fill="white" />
                            <path d="M25,75 Q50,55 75,75" fill="white" />
                        </svg>
                    </div>
                </div>
            </div>

            {showExport && <ExportModal onClose={() => setShowExport(false)} />}
            {showNotifications && <LogModal onClose={() => { setShowNotifications(false); fetchUnreadCount(); }} />}
        </>
    );
}

export default TopBar;
