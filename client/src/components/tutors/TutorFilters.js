
import React, { useState } from 'react';
import './TutorFilters.css';

// Subject options
const SUBJECTS = [
  'Mathematics',
  'Physics',
  'Chemistry',
  'Biology',
  'English',
  'Urdu',
  'Computer Science',
  'History',
  'Geography',
  'Economics',
  'Accounting',
  'Islamic Studies'
];

// Location options
const LOCATIONS = [
  'Online',
  'Lahore',
  'Karachi',
  'Islamabad',
  'Rawalpindi',
  'Peshawar',
  'Quetta',
  'Multan',
  'Faisalabad',
  'Sialkot'
];

const TutorFilters = ({ onFilter }) => {
  const [filters, setFilters] = useState({
    subject: '',
    location: '',
    minPrice: 500,
    maxPrice: 5000,
    minRating: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onFilter(filters);
  };

  const handleReset = () => {
    const resetFilters = {
      subject: '',
      location: '',
      minPrice: 500,
      maxPrice: 5000,
      minRating: 0,
    };
    
    setFilters(resetFilters);
    onFilter(resetFilters);
  };

  return (
    <div className="tutor-filters">
      <h2 className="filters-title">Filter Tutors</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="filter-section">
          <label htmlFor="subject" className="filter-label">Subject</label>
          <select
            id="subject"
            name="subject"
            value={filters.subject}
            onChange={handleChange}
            className="filter-select"
          >
            <option value="">All Subjects</option>
            {SUBJECTS.map(subject => (
              <option key={subject} value={subject}>
                {subject}
              </option>
            ))}
          </select>
        </div>
        
        <div className="filter-section">
          <label htmlFor="location" className="filter-label">Location</label>
          <select
            id="location"
            name="location"
            value={filters.location}
            onChange={handleChange}
            className="filter-select"
          >
            <option value="">All Locations</option>
            {LOCATIONS.map(location => (
              <option key={location} value={location}>
                {location}
              </option>
            ))}
          </select>
        </div>
        
        <div className="filter-section">
          <div className="filter-label-row">
            <label className="filter-label">Price Range (PKR)</label>
            <span className="filter-value">
              {filters.minPrice} - {filters.maxPrice}
            </span>
          </div>
          <div className="double-slider">
            <input
              type="range"
              name="minPrice"
              min="0"
              max="10000"
              step="100"
              value={filters.minPrice}
              onChange={handleChange}
              className="price-slider"
            />
            <input
              type="range"
              name="maxPrice"
              min="0"
              max="10000"
              step="100"
              value={filters.maxPrice}
              onChange={handleChange}
              className="price-slider"
            />
          </div>
        </div>
        
        <div className="filter-section">
          <div className="filter-label-row">
            <label className="filter-label">Minimum Rating</label>
            <span className="filter-value">
              {filters.minRating} / 5
            </span>
          </div>
          <input
            type="range"
            name="minRating"
            min="0"
            max="5"
            step="0.5"
            value={filters.minRating}
            onChange={handleChange}
            className="rating-slider"
          />
        </div>
        
        <div className="filter-actions">
          <button type="submit" className="btn btn-primary">Apply Filters</button>
          <button type="button" className="btn btn-outline" onClick={handleReset}>
            Reset
          </button>
        </div>
      </form>
    </div>
  );
};

export default TutorFilters;
