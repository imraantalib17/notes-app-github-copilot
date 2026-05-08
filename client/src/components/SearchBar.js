import React, { useState, useEffect } from 'react';
import {
  FiSearch,
  FiX,
} from 'react-icons/fi';
import axios from 'axios';
import './SearchBar.css';

function SearchBar({ onSearch, onClear }) {
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const handleChange = async (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.trim() === '') {
      setIsSearching(false);
      onClear();
    } else {
      setIsSearching(true);
      try {
        const response = await axios.get(`/api/search?q=${encodeURIComponent(value)}`);
        onSearch(response.data);
      } catch (err) {
        console.error('Search error:', err);
      }
    }
  };

  const handleClear = () => {
    setQuery('');
    setIsSearching(false);
    onClear();
  };

  return (
    <div className="search-bar-container">
      <div className="search-input-wrapper">
        <FiSearch className="search-icon" size={18} />
        <input
          type="text"
          className="search-input"
          placeholder="Search notes..."
          value={query}
          onChange={handleChange}
        />
        {query && (
          <button
            className="search-clear-btn"
            onClick={handleClear}
            title="Clear search"
          >
            <FiX size={18} />
          </button>
        )}
      </div>
      {isSearching && query && (
        <div className="search-status">
          Searching...
        </div>
      )}
    </div>
  );
}

export default SearchBar;
