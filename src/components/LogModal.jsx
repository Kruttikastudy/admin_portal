import React, { useEffect, useState } from 'react';
import { getApiUrl } from '../api';
import './LogModal.css';

function LogModal({ onClose }) {
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLogs = async () => {
            try {
                const res = await fetch(getApiUrl('/api/audit-logs?limit=50'));
                if (res.ok) {
                    const data = await res.json();
                    setLogs(Array.isArray(data) ? data : []);
                }
            } catch (err) {
                console.error('Error fetching logs:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchLogs();

        // Mark as read when opening modal
        fetch(getApiUrl('/api/audit-logs/mark-read'), { method: 'POST' }).catch(() => { });
    }, []);

    const formatTime = (dateStr) => {
        return new Date(dateStr).toLocaleString();
    };

    return (
        <div className="log-modal-overlay" onClick={onClose}>
            <div className="log-modal" onClick={e => e.stopPropagation()}>
                <div className="log-modal-header">
                    <h2>Recent Activities</h2>
                    <button className="close-btn" onClick={onClose}>&times;</button>
                </div>
                <div className="log-modal-body">
                    {loading ? (
                        <div className="loading-txt">Loading logs...</div>
                    ) : logs.length === 0 ? (
                        <div className="empty-txt">No recent activity.</div>
                    ) : (
                        <div className="logs-list">
                            {logs.map(log => (
                                <div key={log._id} className="log-item">
                                    <div className="log-icon" data-action={log.action}>
                                        {log.action === 'Created' ? '➕' :
                                            log.action === 'Updated' ? '✏️' :
                                                log.action === 'Deleted' ? '🗑️' : '📋'}
                                    </div>
                                    <div className="log-content">
                                        <div className="log-title">
                                            <strong>{log.performed_by}</strong> {log.action.toLowerCase()} <strong>{log.entity_type}</strong>
                                        </div>
                                        <div className="log-details">
                                            {log.entity_name || log.entity_id}
                                        </div>
                                        <div className="log-time">
                                            {formatTime(log.createdAt)}
                                        </div>
                                        {log.changes && log.changes.length > 0 && (
                                            <div className="log-changes">
                                                {log.changes.map((c, i) => (
                                                    <span key={i} className="change-tag">
                                                        {c.field}: {String(c.oldValue || '""')} &rarr; {String(c.newValue)}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                <div className="log-modal-footer">
                    <button className="view-all-btn" onClick={() => { onClose(); window.location.href = '/audit-logs'; }}>View All Logs</button>
                    <button className="close-modal-btn" onClick={onClose}>Close</button>
                </div>
            </div>
        </div>
    );
}

export default LogModal;
