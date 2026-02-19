import React, { useState, useEffect } from 'react';
import { getApiUrl } from '../api';
import './Dashboard.css'; // Reuse dashboard styles for table

function AuditLogs() {
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [limit, setLimit] = useState(100);

    const fetchLogs = async (l) => {
        setLoading(true);
        try {
            const url = l === 'all' ? '/api/audit-logs?limit=all' : `/api/audit-logs?limit=${l}`;
            const res = await fetch(getApiUrl(url));
            if (res.ok) {
                const data = await res.json();
                setLogs(data);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLogs(limit);
    }, [limit]);

    const formatTime = (dateStr) => {
        return new Date(dateStr).toLocaleString();
    };

    const renderChanges = (changes) => {
        if (!changes || changes.length === 0) return '-';
        return (
            <div style={{ fontSize: '0.85em' }}>
                {changes.map((c, i) => (
                    <div key={i}>
                        <strong>{c.field}:</strong> {String(c.oldValue || '""')} &rarr; {String(c.newValue)}
                    </div>
                ))}
            </div>
        );
    };

    return (
        <div className="page-container fade-in" style={{ padding: '30px' }}>
            <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h1 className="page-title">Audit Logs</h1>
                <div>
                    <select
                        value={limit}
                        onChange={(e) => setLimit(e.target.value)}
                        style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                    >
                        <option value="100">Last 100</option>
                        <option value="500">Last 500</option>
                        <option value="1000">Last 1000</option>
                        <option value="all">All Logs</option>
                    </select>
                </div>
            </div>

            <div className="table-container">
                {loading ? (
                    <div style={{ padding: '20px', textAlign: 'center' }}>Loading logs...</div>
                ) : (
                    <table className="doctors-table">
                        <thead>
                            <tr>
                                <th>Date/Time</th>
                                <th>Action</th>
                                <th>Entity</th>
                                <th>Name/ID</th>
                                <th>Performed By</th>
                                <th>Details</th>
                            </tr>
                        </thead>
                        <tbody>
                            {logs.map(log => (
                                <tr key={log._id}>
                                    <td>{formatTime(log.createdAt)}</td>
                                    <td>
                                        <span style={{
                                            fontWeight: 'bold',
                                            color: log.action === 'Created' ? 'green' : (log.action === 'Deleted' ? 'red' : 'orange')
                                        }}>
                                            {log.action}
                                        </span>
                                    </td>
                                    <td>{log.entity_type}</td>
                                    <td>{log.entity_name || log.entity_id}</td>
                                    <td>{log.performed_by}</td>
                                    <td>{log.action === 'Updated' ? renderChanges(log.changes) : '-'}</td>
                                </tr>
                            ))}
                            {logs.length === 0 && (
                                <tr>
                                    <td colSpan="6" style={{ textAlign: 'center', padding: '20px' }}>No logs found.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}

export default AuditLogs;
