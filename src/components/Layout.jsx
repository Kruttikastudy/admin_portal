import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import './Layout.css';

function Layout() {
    return (
        <div className="layout-container">
            <Sidebar />
            <div className="main-content">
                <Outlet />
            </div>
        </div>
    );
}

export default Layout;
