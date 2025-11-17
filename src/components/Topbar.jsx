import React from 'react';

// The Topbar needs to get the search query and a change handler
// from its parent (the Layout) so it can filter the page content.
function Topbar({ searchQuery, onSearchChange , userName }) {
  return (
    <header className="topbar">
      <div className="topbar-inner">
        <div className="search" style={{ minWidth: '260px' }}>
          🔎 
          <input 
            id="search" 
            placeholder="Search features, files, events... " 
            value={searchQuery} // Controlled by React state
            onChange={onSearchChange} // Passes changes up to the parent
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