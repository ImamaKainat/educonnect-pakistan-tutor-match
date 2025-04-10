
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Layout from '../../components/common/Layout';
import SearchBar from '../../components/tutors/SearchBar';
import TutorFilters from '../../components/tutors/TutorFilters';
import TutorsList from '../../components/tutors/TutorsList';
import useWishlist from '../../hooks/useWishlist';
import { filterTutors } from '../../utils/helpers';
import './TutorsPage.css';

// Mock tutors data
const mockTutors = [
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
    id: '2',
    name: 'Sara Ali',
    avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
    subjects: ['English', 'Urdu'],
    location: 'Islamabad',
    hourlyRate: 1200,
    rating: 4.6,
    totalReviews: 42,
    isVerified: true,
    about: 'English literature graduate with a passion for teaching languages.'
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
    id: '4',
    name: 'Ayesha Khan',
    avatar: 'https://randomuser.me/api/portraits/women/4.jpg',
    subjects: ['Chemistry', 'Biology'],
    location: 'Lahore',
    hourlyRate: 1800,
    rating: 4.7,
    totalReviews: 63,
    isVerified: false,
    about: 'Medical student helping others excel in science subjects.'
  },
  {
    id: '5',
    name: 'Hassan Raza',
    avatar: 'https://randomuser.me/api/portraits/men/5.jpg',
    subjects: ['Economics', 'Accounting'],
    location: 'Islamabad',
    hourlyRate: 1700,
    rating: 4.5,
    totalReviews: 38,
    isVerified: true,
    about: 'Business graduate with experience in teaching economics and accounting.'
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
  },
  {
    id: '7',
    name: 'Bilal Ahmed',
    avatar: 'https://randomuser.me/api/portraits/men/7.jpg',
    subjects: ['Computer Science', 'Mathematics'],
    location: 'Karachi',
    hourlyRate: 1900,
    rating: 4.7,
    totalReviews: 52,
    isVerified: false,
    about: 'Computer science graduate specializing in programming and algorithms.'
  },
  {
    id: '8',
    name: 'Fatima Hassan',
    avatar: 'https://randomuser.me/api/portraits/women/8.jpg',
    subjects: ['Biology', 'Chemistry'],
    location: 'Islamabad',
    hourlyRate: 1600,
    rating: 4.8,
    totalReviews: 61,
    isVerified: true,
    about: 'Biology enthusiast with a knack for making complex concepts simple.'
  }
];

const TutorsPage = () => {
  const [tutors, setTutors] = useState([]);
  const [filteredTutors, setFilteredTutors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { wishlist, handleWishlist } = useWishlist();
  const location = useLocation();

  // Extract search params from URL
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const subject = searchParams.get('subject');
    const search = searchParams.get('search');
    
    // Set initial filters based on URL params
    if (subject || search) {
      const initialFilters = {
        subject: subject || '',
        search: search || '',
        location: '',
        minPrice: 500,
        maxPrice: 5000,
        minRating: 0
      };
      
      fetchTutors(initialFilters);
    } else {
      fetchTutors();
    }
  }, [location.search]);

  // Fetch tutors from API
  const fetchTutors = async (filters = {}) => {
    setIsLoading(true);
    
    try {
      // Try to fetch from API first
      const queryParams = new URLSearchParams();
      
      if (filters.subject) queryParams.append('subject', filters.subject);
      if (filters.location) queryParams.append('location', filters.location);
      if (filters.minPrice) queryParams.append('minPrice', filters.minPrice);
      if (filters.maxPrice) queryParams.append('maxPrice', filters.maxPrice);
      if (filters.minRating) queryParams.append('minRating', filters.minRating);
      if (filters.search) queryParams.append('search', filters.search);
      
      const apiUrl = `/api/tutors${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
      
      try {
        const response = await fetch(apiUrl);
        
        if (response.ok) {
          const data = await response.json();
          setTutors(data);
          setFilteredTutors(data);
          setIsLoading(false);
          return;
        }
      } catch (error) {
        console.error('API fetch failed, using mock data', error);
      }
      
      // Fallback to mock data
      let filteredMockData = [...mockTutors];
      
      if (filters.search) {
        const searchTerm = filters.search.toLowerCase();
        filteredMockData = filteredMockData.filter(tutor => 
          tutor.name.toLowerCase().includes(searchTerm) || 
          tutor.subjects.some(subject => subject.toLowerCase().includes(searchTerm))
        );
      }
      
      filteredMockData = filterTutors(filteredMockData, filters);
      
      setTutors(mockTutors);
      setFilteredTutors(filteredMockData);
    } catch (error) {
      console.error('Error fetching tutors:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle search
  const handleSearch = (searchTerm) => {
    if (!searchTerm.trim()) {
      setFilteredTutors(tutors);
      return;
    }
    
    const searchLower = searchTerm.toLowerCase();
    const filtered = tutors.filter(tutor => 
      tutor.name.toLowerCase().includes(searchLower) || 
      tutor.subjects.some(subject => subject.toLowerCase().includes(searchLower))
    );
    
    setFilteredTutors(filtered);
  };

  // Handle filters
  const handleFilter = (filters) => {
    const filtered = filterTutors(tutors, filters);
    setFilteredTutors(filtered);
  };

  return (
    <Layout>
      <div className="tutors-page">
        <div className="container">
          <h1 className="page-title">Find Tutors</h1>
          
          <div className="search-section">
            <SearchBar onSearch={handleSearch} />
          </div>
          
          <div className="tutors-content">
            <aside className="filters-sidebar">
              <TutorFilters onFilter={handleFilter} />
            </aside>
            
            <div className="tutors-grid">
              <TutorsList 
                tutors={filteredTutors} 
                isLoading={isLoading} 
                wishlist={wishlist}
                onAddToWishlist={handleWishlist}
              />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TutorsPage;
