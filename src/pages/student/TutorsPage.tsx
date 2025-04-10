
import React, { useState, useEffect } from 'react';
import Layout from '@/components/common/Layout';
import TutorCard, { Tutor } from '@/components/tutors/TutorCard';
import TutorFilters from '@/components/tutors/TutorFilters';
import { FilterOptions, filterTutors } from '@/utils/helpers';
import { useToast } from '@/components/ui/use-toast';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

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
  const [searchTerm, setSearchTerm] = useState('');
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Load wishlist from localStorage on component mount
  useEffect(() => {
    const storedWishlist = localStorage.getItem('wishlist');
    if (storedWishlist) {
      setWishlist(JSON.parse(storedWishlist));
    }
  }, []);

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
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
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

  // Add/remove tutor from wishlist
  const handleWishlist = (tutorId: string) => {
    let newWishlist: string[];
    
    if (wishlist.includes(tutorId)) {
      // Remove from wishlist
      newWishlist = wishlist.filter(id => id !== tutorId);
      toast({
        title: 'Removed from wishlist',
        description: 'Tutor has been removed from your wishlist',
      });
    } else {
      // Add to wishlist
      newWishlist = [...wishlist, tutorId];
      toast({
        title: 'Added to wishlist',
        description: 'Tutor has been added to your wishlist',
      });
    }
    
    // Update state and localStorage
    setWishlist(newWishlist);
    localStorage.setItem('wishlist', JSON.stringify(newWishlist));
  };

  return (
    <Layout>
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-8">Find Tutors</h1>
        
        {/* Search bar */}
        <div className="mb-8">
          <form onSubmit={handleSearch} className="flex w-full max-w-3xl mx-auto">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                type="text"
                placeholder="Search by tutor name or subject..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full"
              />
            </div>
            <Button type="submit" className="ml-2">Search</Button>
          </form>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filters column */}
          <div className="lg:col-span-1">
            <TutorFilters onFilter={handleFilter} />
          </div>
          
          {/* Tutors list column */}
          <div className="lg:col-span-3">
            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
              </div>
            ) : filteredTutors.length > 0 ? (
              <div className="space-y-6">
                {filteredTutors.map((tutor) => (
                  <TutorCard 
                    key={tutor.id} 
                    tutor={tutor} 
                    onAddToWishlist={handleWishlist}
                    inWishlist={wishlist.includes(tutor.id)}
                  />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-lg p-8 text-center">
                <h3 className="text-lg font-semibold mb-2">No tutors found</h3>
                <p className="text-gray-600">
                  Try adjusting your search criteria or filters to find more tutors.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TutorsPage;
