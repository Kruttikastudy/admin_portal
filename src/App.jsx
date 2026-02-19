import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Doctors from './pages/Doctors';
import AddDoctor from './pages/AddDoctor';
import Staff from './pages/Staff';
import AddStaff from './pages/AddStaff';
import Patients from './pages/Patients';
import AddPatient from './pages/AddPatient';
import ViewPatient from './pages/ViewPatient';
import Appointments from './pages/Appointments';
import AddAppointment from './pages/AddAppointment';
import ViewAppointment from './pages/ViewAppointment';
import Schedule from './pages/Schedule';
import Messages from './pages/Messages';
import Settings from './pages/Settings';
import ViewDoctor from './pages/ViewDoctor';
import ViewStaff from './pages/ViewStaff';
import Profile from './pages/Profile';
import AuditLogs from './pages/AuditLogs';
import './App.css';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route element={<Layout />}>
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="doctors" element={<Doctors />} />
                    <Route path="doctors/add" element={<AddDoctor />} />
                    <Route path="doctors/view" element={<ViewDoctor />} />
                    {/* More specific path first so /staff/add matches AddStaff */}
                    <Route path="staff/add" element={<AddStaff />} />
                    <Route path="staff/view" element={<ViewStaff />} />
                    <Route path="staff" element={<Staff />} />
                    <Route path="patients" element={<Patients />} />
                    <Route path="patients/view" element={<ViewPatient />} />
                    <Route path="patients/add" element={<AddPatient />} />
                    <Route path="appointments" element={<Appointments />} />
                    <Route path="appointments/add" element={<AddAppointment />} />
                    <Route path="appointments/view" element={<ViewAppointment />} />
                    <Route path="schedule" element={<Schedule />} />
                    <Route path="messages" element={<Messages />} />
                    <Route path="settings" element={<Settings />} />
                    <Route path="profile" element={<Profile />} />
                    <Route path="audit-logs" element={<AuditLogs />} />
                </Route>
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </Router>
    );
}

export default App;
