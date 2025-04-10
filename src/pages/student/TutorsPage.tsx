import React, { useState } from 'react';
import Layout from '@/components/common/Layout';
import { Tutor } from '@/components/tutors/TutorCard';
import TutorFilters from '@/components/tutors/TutorFilters';
import { FilterOptions, filterTutors } from '@/utils/helpers';
import SearchBar from '@/components/tutors/SearchBar';
import TutorsList from '@/components/tutors/TutorsList';
import { useWishlist } from '@/hooks/useWishlist';

// Mock data for tutors
const mockTutors: Tutor[] = [
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

const TutorsPage = () => {
  const [tutors, setTutors] = useState<Tutor[]>(mockTutors);
  const [filteredTutors, setFilteredTutors] = useState<Tutor[]>(mockTutors);
  const [isLoading, setIsLoading] = useState(false);
  const { wishlist, handleWishlist } = useWishlist();

  // Apply filters
  const handleFilter = (filters: FilterOptions) => {
    setIsLoading(true);
    
    // Simulate API delay
    setTimeout(() => {
      const filtered = filterTutors(tutors, filters);
      setFilteredTutors(filtered);
      setIsLoading(false);
    }, 500);
  };

  // Search functionality
  const handleSearch = (searchTerm: string) => {
    if (!searchTerm.trim()) {
      setFilteredTutors(tutors);
      return;
    }
    
    const searchResults = tutors.filter(tutor => 
      tutor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tutor.subjects.some(subject => 
        subject.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    
    setFilteredTutors(searchResults);
  };

  return (
    <Layout>
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-8">Find Tutors</h1>
        
        {/* Search bar */}
        <div className="mb-8">
          <SearchBar onSearch={handleSearch} />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filters column */}
          <div className="lg:col-span-1">
            <TutorFilters onFilter={handleFilter} />
          </div>
          
          {/* Tutors list column */}
          <div className="lg:col-span-3">
            <TutorsList 
              tutors={filteredTutors} 
              isLoading={isLoading} 
              wishlist={wishlist}
              onAddToWishlist={handleWishlist}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TutorsPage;
