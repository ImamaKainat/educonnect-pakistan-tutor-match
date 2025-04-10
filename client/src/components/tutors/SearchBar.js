
import React, { useState } from 'react';
import './SearchBar.css';

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <form onSubmit={handleSearch} className="search-bar">
      <div className="search-input-container">
        <input
          type="text"
          placeholder="Search by tutor name or subject..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <span className="search-icon"></span>
      </div>
      <button type="submit" className="btn btn-primary">Search</button>
    </form>
  );
};

export default SearchBar;
