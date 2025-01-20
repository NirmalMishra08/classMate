import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const Layout = () => {
    return (
        <div style={{ display: 'flex' }}>
            {/* Sidebar */}
            <div style={{ width: '250px', backgroundColor: '#1e293b', color: '#fff', height: '100vh', padding: '1rem' }}>
                <div style={{ marginBottom: '2rem' }}>
                    <img src="logo.png" alt="Logo" style={{ width: '100px' }} />
                </div>
                <div className='flex flex-col justify-between'>

                
                <nav>
                    <ul  className='flex flex-col items-center gap-4' style={{ listStyle: 'none', padding: 0 }}>
                        <li><Link to="/mark-attendance" style={{ color: '#fff', textDecoration: 'none' }}>Mark Attendance</Link></li>
                        <li><Link to="/view-attendance" style={{ color: '#fff', textDecoration: 'none' }}>View Attendance</Link></li>
                        <li><Link to="/create-schedule" style={{ color: '#fff', textDecoration: 'none' }}>Create Schedule</Link></li>
                        <li><Link to="/view-schedule" style={{ color: '#fff', textDecoration: 'none' }}>View Schedule</Link></li>
                        <li><Link to="/attendance-summary" style={{ color: '#fff', textDecoration: 'none' }}>Attendance Summary</Link></li>
                    </ul>
                </nav>
                <div className='flex flex-col' style={{ marginTop: 'auto' }}>
                    <button style={{ background: 'none', color: '#fff', border: 'none', cursor: 'pointer' }}>
                        Logout
                    </button>
                </div>
                </div>
            </div>

            {/* Main Content */}
            <div className='' style={{ flex: 1, padding: '2rem' }}>
                <Outlet />
            </div>
        </div>
    );
};

export default Layout;
