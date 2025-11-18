import React from 'react';


function Topbar({ searchQuery, onSearchChange , userName }) {
  return (
    <header className="topbar">
      <div className="topbar-inner">
        <div className="search" style={{ minWidth: '260px' }}>
          🔎 
          <input 
            id="search" 
            placeholder="Search features, files, events... " 
            value={searchQuery} 
            onChange={onSearchChange} 
          />
        </div>
        <div className="user-profile">
  {userName ? userName.split(" ")[0] : "User"}
</div>

      </div>
    </header>
  );
}

export default Topbar;