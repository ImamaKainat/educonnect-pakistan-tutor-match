
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/common/Layout';
import TutorCard from '../components/tutors/TutorCard';
import './HomePage.css';

// Mock data for featured tutors
const featuredTutors = [
  {
    id: '1',
    name: 'Ahmed Khan',
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
    subjects: ['Mathematics', 'Physics'],
    location: 'Lahore',
    hourlyRate: 1500,
    rating: 4.8,
    totalReviews: 56,
    isVerified: true,
    about: 'Experienced tutor with 8+ years teaching Mathematics and Physics.'
  },
  {
    id: '3',
    name: 'Zain Ahmad',
    avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
    subjects: ['Computer Science', 'Mathematics'],
    location: 'Karachi',
    hourlyRate: 2000,
    rating: 4.9,
    totalReviews: 78,
    isVerified: true,
    about: 'Software engineer with a strong background in teaching programming.'
  },
  {
    id: '6',
    name: 'Amna Siddiqui',
    avatar: 'https://randomuser.me/api/portraits/women/6.jpg',
    subjects: ['Physics', 'Mathematics'],
    location: 'Lahore',
    hourlyRate: 1500,
    rating: 4.6,
    totalReviews: 45,
    isVerified: true,
    about: 'Physics teacher with experience in preparing students for competitive exams.'
  }
];

// Popular subjects
const popularSubjects = [
  { name: 'Mathematics', icon: '📐' },
  { name: 'Physics', icon: '🔬' },
  { name: 'Chemistry', icon: '⚗️' },
  { name: 'Biology', icon: '🧬' },
  { name: 'English', icon: '📝' },
  { name: 'Computer Science', icon: '💻' }
];

const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const handleSearch = (e) => {
    e.preventDefault();
    window.location.href = `/tutors?search=${searchTerm}`;
  };
  
  return (
    <Layout>
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">
              Find the Perfect Tutor in Pakistan
            </h1>
            <p className="hero-subtitle">
              Connect with qualified tutors for personalized learning experiences tailored to your needs.
            </p>
            
            <form onSubmit={handleSearch} className="hero-search">
              <div className="search-input-container">
                <input
                  type="text"
                  placeholder="What would you like to learn?"
                  className="search-input"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <span className="search-icon"></span>
              </div>
              <button type="submit" className="btn btn-secondary">
                Search
              </button>
            </form>
            
            <div className="popular-subjects">
              <span className="popular-label">Popular:</span>
              {popularSubjects.slice(0, 4).map((subject, index) => (
                <Link 
                  key={index} 
                  to={`/tutors?subject=${subject.name}`}
                  className="popular-subject"
                >
                  {subject.icon} {subject.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* How It Works Section */}
      <section className="how-it-works">
        <div className="container">
          <h2 className="section-title">How EduConnect Works</h2>
          
          <div className="steps-container">
            <div className="step-card">
              <div className="step-icon search-step-icon"></div>
              <h3 className="step-title">Find a Tutor</h3>
              <p className="step-description">
                Search for qualified tutors based on subject, location, price, and availability.
              </p>
            </div>
            
            <div className="step-card">
              <div className="step-icon calendar-step-icon"></div>
              <h3 className="step-title">Book a Session</h3>
              <p className="step-description">
                Schedule lessons that fit your timetable, either online or in-person.
              </p>
            </div>
            
            <div className="step-card">
              <div className="step-icon learn-step-icon"></div>
              <h3 className="step-title">Start Learning</h3>
              <p className="step-description">
                Connect with your tutor and begin your personalized learning journey.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Tutors Section */}
      <section className="featured-tutors">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Featured Tutors</h2>
            <Link to="/tutors" className="btn btn-outline">View All Tutors</Link>
          </div>
          
          <div className="tutors-grid">
            {featuredTutors.map(tutor => (
              <TutorCard key={tutor.id} tutor={tutor} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Popular Subjects Section */}
      <section className="popular-subjects-section">
        <div className="container">
          <h2 className="section-title">Popular Subjects</h2>
          
          <div className="subjects-grid">
            {popularSubjects.map((subject, index) => (
              <Link 
                key={index} 
                to={`/tutors?subject=${subject.name}`}
                className="subject-card"
              >
                <div className="subject-icon">{subject.icon}</div>
                <h3 className="subject-name">{subject.name}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <h2 className="section-title">Why Choose EduConnect Pakistan</h2>
          <p className="section-description">
            We're committed to providing the best tutoring experience for students across Pakistan
          </p>
          
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon shield-icon"></div>
              <h3 className="feature-title">Verified Tutors</h3>
              <p className="feature-description">
                All tutors undergo a thorough verification process to ensure quality.
              </p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon star-icon"></div>
              <h3 className="feature-title">Quality Reviews</h3>
              <p className="feature-description">
                Transparent reviews and ratings from students who've taken sessions.
              </p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon pen-icon"></div>
              <h3 className="feature-title">Tailored Learning</h3>
              <p className="feature-description">
                Personalized learning experiences based on your specific needs.
              </p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon users-icon"></div>
              <h3 className="feature-title">Community Support</h3>
              <p className="feature-description">
                Join a community dedicated to educational excellence in Pakistan.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="cta-section">
        <div className="container">
          <h2 className="cta-title">Ready to Start Your Learning Journey?</h2>
          <p className="cta-description">
            Join thousands of students across Pakistan who are achieving their academic goals with EduConnect.
          </p>
          <div className="cta-buttons">
            <Link to="/tutors" className="btn btn-secondary btn-lg">
              Find a Tutor
            </Link>
            <Link to="/signup" className="btn btn-outline btn-lg outline-white">
              Sign Up
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default HomePage;
