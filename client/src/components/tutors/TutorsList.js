
import React from 'react';
import TutorCard from './TutorCard';
import './TutorsList.css';

const TutorsList = ({ tutors, isLoading, wishlist, onAddToWishlist }) => {
  if (isLoading) {
    return (
      <div className="tutors-loading">
        <div className="spinner"></div>
      </div>
    );
  }

  if (tutors.length === 0) {
    return (
      <div className="tutors-empty">
        <h3 className="empty-title">No tutors found</h3>
        <p className="empty-message">
          Try adjusting your search criteria or filters to find more tutors.
        </p>
      </div>
    );
  }

  return (
    <div className="tutors-list">
      {tutors.map((tutor) => (
        <TutorCard
          key={tutor.id}
          tutor={tutor}
          onAddToWishlist={onAddToWishlist}
          inWishlist={wishlist.includes(tutor.id)}
        />
      ))}
    </div>
  );
};

export default TutorsList;
