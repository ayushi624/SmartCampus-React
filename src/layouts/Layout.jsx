import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import '../assets/index.css'; 

function Layout({role, userName}) {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="app">
      <Sidebar userType={role === 'TEACHER' ? 'teacher' : 'student'} /> 
      <main>
        <Topbar
  searchQuery={searchQuery}
  onSearchChange={(e) => setSearchQuery(e.target.value)}
  userName={userName}
/>

        <Outlet context={{ searchQuery }} />
      </main>
    </div>
  );
}

export default Layout;