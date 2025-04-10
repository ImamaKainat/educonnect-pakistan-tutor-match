
import React from 'react';
import { Link } from 'react-router-dom';
import { formatPrice } from '../../utils/helpers';
import './TutorCard.css';

const TutorCard = ({ tutor, onAddToWishlist, inWishlist = false }) => {
  return (
    <div className="tutor-card">
      <div className="tutor-card-content">
        <div className="tutor-info">
          <div className="tutor-avatar">
            {tutor.avatar ? (
              <img src={tutor.avatar} alt={tutor.name} />
            ) : (
              <div className="avatar-placeholder">{tutor.name.charAt(0)}</div>
            )}
          </div>
          <div className="tutor-details">
            <h3 className="tutor-name">
              {tutor.name}
              {tutor.isVerified && <span className="verified-badge">Verified</span>}
            </h3>
            <div className="tutor-rating">
              <div className="stars">
                {[...Array(5)].map((_, i) => (
                  <span 
                    key={i} 
                    className={`star ${i < Math.floor(tutor.rating) ? '' : 'star-empty'}`}
                  >
                    ★
                  </span>
                ))}
              </div>
              <span className="reviews-count">({tutor.totalReviews} reviews)</span>
            </div>
            <div className="tutor-subjects">
              {tutor.subjects.slice(0, 3).map((subject, index) => (
                <span key={index} className="subject-badge">
                  {subject}
                </span>
              ))}
              {tutor.subjects.length > 3 && (
                <span className="subject-badge more-badge">
                  +{tutor.subjects.length - 3}
                </span>
              )}
            </div>
          </div>
          <div className="tutor-pricing">
            <div className="hourly-rate">
              {formatPrice(tutor.hourlyRate)}<span className="rate-period">/hr</span>
            </div>
            <div className="tutor-location">{tutor.location}</div>
          </div>
        </div>
        
        <p className="tutor-about">{tutor.about}</p>
      </div>
      
      <div className="tutor-card-footer">
        <Link to={`/tutors/${tutor.id}`} className="btn btn-outline">
          View Profile
        </Link>
        <div className="card-actions">
          <button 
            className={`wishlist-btn ${inWishlist ? 'active' : ''}`}
            onClick={() => onAddToWishlist && onAddToWishlist(tutor.id)}
            aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
          >
            <span className="wishlist-icon"></span>
          </button>
          <Link to={`/book/${tutor.id}`} className="btn btn-primary">
            Book Session
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TutorCard;
