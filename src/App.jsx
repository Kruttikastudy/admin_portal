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
import Appointments from './pages/Appointments';
import Schedule from './pages/Schedule';
import Messages from './pages/Messages';
import Settings from './pages/Settings';
import './App.css';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route element={<Layout />}>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/doctors" element={<Doctors />} />
                    <Route path="/doctors/add" element={<AddDoctor />} />
                    <Route path="/staff" element={<Staff />} />
                    <Route path="/staff/add" element={<AddStaff />} />
                    <Route path="/patients" element={<Patients />} />
                    <Route path="/patients/add" element={<AddPatient />} />
                    <Route path="/appointments" element={<Appointments />} />
                    <Route path="/schedule" element={<Schedule />} />
                    <Route path="/messages" element={<Messages />} />
                    <Route path="/settings" element={<Settings />} />
                </Route>
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </Router>
    );
}

export default App;
