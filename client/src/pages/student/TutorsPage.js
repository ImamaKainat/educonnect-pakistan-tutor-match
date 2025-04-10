
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Layout from '../../components/common/Layout';
import SearchBar from '../../components/tutors/SearchBar';
import TutorFilters from '../../components/tutors/TutorFilters';
import TutorsList from '../../components/tutors/TutorsList';
import { filterTutors } from '../../utils/helpers';
import { toast } from 'react-toastify';
import axios from 'axios';
import './TutorsPage.css';

// Parse query parameters
const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const TutorsPage = () => {
  const [tutors, setTutors] = useState([]);
  const [filteredTutors, setFilteredTutors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [wishlist, setWishlist] = useState([]);
  const query = useQuery();
  
  useEffect(() => {
    const fetchTutors = async () => {
      try {
        // Get initial parameters from URL if they exist
        const subjectParam = query.get('subject');
        const searchParam = query.get('search');
        
        let url = '/api/tutors';
        let params = {};
        
        if (subjectParam) {
          params.subject = subjectParam;
        }
        
        if (searchParam) {
          params.search = searchParam;
        }
        
        // Fetch tutors with optional filters
        const response = await axios.get(url, { params });
        setTutors(response.data);
        setFilteredTutors(response.data);
        
        // Check if there are URL parameters to apply as filters
        if (subjectParam || searchParam) {
          toast.info(`Showing results for ${subjectParam || searchParam}`);
        }
      } catch (error) {
        console.error('Error fetching tutors:', error);
        toast.error('Failed to fetch tutors');
        
        // Fallback to mock data if API fails
        fetchMockData();
      } finally {
        setIsLoading(false);
      }
    };
    
    const fetchWishlist = async () => {
      try {
        const token = localStorage.getItem('token');
        
        if (token) {
          const response = await axios.get('/api/wishlist');
          setWishlist(response.data.map(tutor => tutor.id));
        } else {
          // Get wishlist from localStorage if not logged in
          const storedWishlist = localStorage.getItem('wishlist');
          if (storedWishlist) {
            setWishlist(JSON.parse(storedWishlist));
          }
        }
      } catch (error) {
        console.error('Error fetching wishlist:', error);
        
        // Fallback to localStorage if API fails
        const storedWishlist = localStorage.getItem('wishlist');
        if (storedWishlist) {
          setWishlist(JSON.parse(storedWishlist));
        }
      }
    };
    
    fetchTutors();
    fetchWishlist();
  }, [query]);
  
  // Mock data for fallback
  const fetchMockData = () => {
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
        about: 'Experienced tutor with 8+ years teaching Mathematics and Physics. I specialize in O/A Levels and university-level courses.'
      },
      {
        id: '2',
        name: 'Fatima Ali',
        avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
        subjects: ['English', 'Urdu', 'History'],
        location: 'Online',
        hourlyRate: 1200,
        rating: 4.5,
        totalReviews: 42,
        isVerified: true,
        about: 'Dedicated language tutor with a passion for helping students improve their communication skills. I offer personalized lessons tailored to your needs.'
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
        about: 'Software engineer with a strong background in teaching programming, data structures, and algorithms. I make complex concepts easy to understand.'
      },
      {
        id: '4',
        name: 'Sara Malik',
        avatar: 'https://randomuser.me/api/portraits/women/4.jpg',
        subjects: ['Chemistry', 'Biology'],
        location: 'Islamabad',
        hourlyRate: 1800,
        rating: 4.7,
        totalReviews: 35,
        isVerified: false,
        about: 'PhD candidate in Biochemistry with a passion for teaching science. I believe in practical learning and connecting theories to real-world applications.'
      },
      {
        id: '5',
        name: 'Usman Khalid',
        avatar: 'https://randomuser.me/api/portraits/men/5.jpg',
        subjects: ['Economics', 'Accounting'],
        location: 'Online',
        hourlyRate: 1600,
        rating: 4.4,
        totalReviews: 28,
        isVerified: true,
        about: 'Finance professional with teaching experience at top universities. I can help with coursework, exam preparation, and career guidance.'
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
        about: 'Physics teacher with experience in preparing students for competitive exams. My approach focuses on building strong foundations and problem-solving skills.'
      }
    ];
    
    setTutors(mockTutors);
    setFilteredTutors(mockTutors);
  };
  
  // Handle filtering
  const handleFilter = (filters) => {
    setIsLoading(true);
    
    setTimeout(() => {
      const filtered = filterTutors(tutors, filters);
      setFilteredTutors(filtered);
      setIsLoading(false);
    }, 500);
  };
  
  // Handle search
  const handleSearch = async (searchTerm) => {
    if (!searchTerm.trim()) {
      setFilteredTutors(tutors);
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Try to search via API
      const response = await axios.get('/api/tutors', {
        params: { search: searchTerm }
      });
      setFilteredTutors(response.data);
    } catch (error) {
      console.error('Error searching tutors:', error);
      
      // Fallback to local filtering
      const searchResults = tutors.filter(tutor => 
        tutor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tutor.subjects.some(subject => 
          subject.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
      
      setFilteredTutors(searchResults);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Handle wishlist
  const handleWishlist = async (tutorId) => {
    try {
      const token = localStorage.getItem('token');
      
      if (token) {
        // User is logged in, use API
        await axios.post(`/api/wishlist/${tutorId}`);
        
        // Update local wishlist state
        if (wishlist.includes(tutorId)) {
          setWishlist(wishlist.filter(id => id !== tutorId));
          toast.success('Removed from wishlist');
        } else {
          setWishlist([...wishlist, tutorId]);
          toast.success('Added to wishlist');
        }
      } else {
        // User is not logged in, use localStorage
        let localWishlist = [];
        const storedWishlist = localStorage.getItem('wishlist');
        
        if (storedWishlist) {
          localWishlist = JSON.parse(storedWishlist);
        }
        
        if (localWishlist.includes(tutorId)) {
          localWishlist = localWishlist.filter(id => id !== tutorId);
          toast.success('Removed from wishlist');
        } else {
          localWishlist.push(tutorId);
          toast.success('Added to wishlist');
        }
        
        localStorage.setItem('wishlist', JSON.stringify(localWishlist));
        setWishlist(localWishlist);
      }
    } catch (error) {
      console.error('Error updating wishlist:', error);
      toast.error('Failed to update wishlist');
    }
  };

  return (
    <Layout>
      <div className="tutors-page">
        <div className="container">
          <h1 className="page-title">Find Tutors</h1>
          
          {/* Search bar */}
          <div className="search-section">
            <SearchBar onSearch={handleSearch} />
          </div>
          
          <div className="tutors-content">
            {/* Filters column */}
            <div className="filters-column">
              <TutorFilters onFilter={handleFilter} />
            </div>
            
            {/* Tutors list column */}
            <div className="tutors-column">
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
