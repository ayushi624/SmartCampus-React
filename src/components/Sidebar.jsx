import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import logo from '../assets/img1.jpg';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY);


function Sidebar({ userType }) {
  const navigate = useNavigate();
  const isStudent = userType === 'student';

  const dashboardLink = isStudent ? '/dashboard' : '/teacher';
  const vaultLink = isStudent ? '/student/myvault' : '/teacher/myvault';
  const complaintsLink = isStudent ? '/student/complaints' : '/teacher/complaints';
  const lostFoundLink = isStudent ? '/student/lost-found' : '/teacher/lost-found';
  const attendanceLink = isStudent ? '/student/attendance' : '/teacher/attendance';
  const todoLink = isStudent ? '/student/todo' : '/teacher/todo';
  const calendarLink = `${dashboardLink}#calendarSection`;

  // === LOGOUT HANDLER ===
  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login', { replace: true });
  };

  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="logo">
          <img src={logo} alt="SmartCampus Logo" />
        </div>
        <div>SmartCampus</div>
      </div>

      <nav className="nav">
        <NavLink to={dashboardLink} end>🏠 Dashboard</NavLink>
        <NavLink to={vaultLink}>📂 MyVault</NavLink>
        <NavLink to={complaintsLink}>📢 Complaints</NavLink>
        <NavLink to={lostFoundLink}>🔎 Lost & Found</NavLink>
        <NavLink to={attendanceLink}>📅 Attendance</NavLink>
        <NavLink to={todoLink}>📝 To-Do</NavLink>
        <a href={calendarLink}>🗓️ Calendar</a>

        <button onClick={handleLogout} className="logout-btn">
    🔓 Logout
  </button>


      </nav>
    </aside>
  );
}

export default Sidebar;
