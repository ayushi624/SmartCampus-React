import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import '../assets/index.css'; // Main stylesheet

function Layout({role}) {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="app">
      <Sidebar userType={role === 'TEACHER' ? 'teacher' : 'student'} /> {/* The only change is here */}
      <main>
        <Topbar 
          searchQuery={searchQuery}
          onSearchChange={(e) => setSearchQuery(e.target.value)}
        />
        <Outlet context={{ searchQuery }} />
      </main>
    </div>
  );
}

export default Layout;