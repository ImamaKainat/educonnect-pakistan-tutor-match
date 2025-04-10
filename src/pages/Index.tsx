
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Layout from '@/components/common/Layout';
import TutorCard, { Tutor } from '@/components/tutors/TutorCard';
import { Badge } from '@/components/ui/badge';
import { Search, BookOpen, Star, Calendar, Shield, PenSquare, Users } from 'lucide-react';

// Mock data for featured tutors
const featuredTutors: Tutor[] = [
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

const Index = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    window.location.href = `/tutors?search=${searchTerm}`;
  };
  
  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-accent text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Find the Perfect Tutor in Pakistan
            </h1>
            <p className="text-xl mb-8">
              Connect with qualified tutors for personalized learning experiences tailored to your needs.
            </p>
            
            <form onSubmit={handleSearch} className="flex max-w-md mx-auto">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  type="text"
                  placeholder="What would you like to learn?"
                  className="pl-10 bg-white text-gray-800 border-0"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button type="submit" variant="secondary" className="ml-2">
                Search
              </Button>
            </form>
            
            <div className="mt-8 text-sm">
              <span className="mr-2">Popular:</span>
              {popularSubjects.slice(0, 4).map((subject, index) => (
                <Link 
                  key={index} 
                  to={`/tutors?subject=${subject.name}`}
                  className="inline-block bg-white/20 rounded-full px-3 py-1 mr-2 mb-2 hover:bg-white/30"
                >
                  {subject.icon} {subject.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* How It Works Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How EduConnect Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Find a Tutor</h3>
              <p className="text-gray-600">
                Search for qualified tutors based on subject, location, price, and availability.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Book a Session</h3>
              <p className="text-gray-600">
                Schedule lessons that fit your timetable, either online or in-person.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Start Learning</h3>
              <p className="text-gray-600">
                Connect with your tutor and begin your personalized learning journey.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Tutors Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Featured Tutors</h2>
            <Link to="/tutors">
              <Button variant="outline">View All Tutors</Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredTutors.map(tutor => (
              <TutorCard key={tutor.id} tutor={tutor} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Popular Subjects Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Popular Subjects</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {popularSubjects.map((subject, index) => (
              <Link 
                key={index} 
                to={`/tutors?subject=${subject.name}`}
                className="bg-white p-6 rounded-lg shadow-sm text-center hover:shadow-md transition-shadow"
              >
                <div className="text-3xl mb-3">{subject.icon}</div>
                <h3 className="font-semibold">{subject.name}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-6">Why Choose EduConnect Pakistan</h2>
          <p className="text-center text-gray-600 max-w-3xl mx-auto mb-12">
            We're committed to providing the best tutoring experience for students across Pakistan
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <Shield className="h-10 w-10 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Verified Tutors</h3>
              <p className="text-gray-600">
                All tutors undergo a thorough verification process to ensure quality.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <Star className="h-10 w-10 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Quality Reviews</h3>
              <p className="text-gray-600">
                Transparent reviews and ratings from students who've taken sessions.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <PenSquare className="h-10 w-10 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Tailored Learning</h3>
              <p className="text-gray-600">
                Personalized learning experiences based on your specific needs.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <Users className="h-10 w-10 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Community Support</h3>
              <p className="text-gray-600">
                Join a community dedicated to educational excellence in Pakistan.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Start Your Learning Journey?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of students across Pakistan who are achieving their academic goals with EduConnect.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/tutors">
              <Button variant="secondary" size="lg">
                Find a Tutor
              </Button>
            </Link>
            <Link to="/signup">
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-primary">
                Sign Up
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
