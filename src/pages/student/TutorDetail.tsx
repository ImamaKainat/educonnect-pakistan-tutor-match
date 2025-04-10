
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '@/components/common/Layout';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { formatPrice } from '@/utils/helpers';
import { Calendar, MapPin, BookOpen, Clock, Heart, Star, CheckCircle, Zap } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Tutor } from '@/components/tutors/TutorCard';

// Mock data for a single tutor
const mockTutorDetails: Record<string, Tutor & { 
  qualifications: string[]; 
  experience: string;
  education: string;
  availability: { day: string; slots: string[] }[];
  reviews: {
    id: string;
    studentName: string;
    avatar: string;
    rating: number;
    date: string;
    comment: string;
  }[];
}> = {
  '1': {
    id: '1',
    name: 'Ahmed Khan',
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
    subjects: ['Mathematics', 'Physics', 'Calculus', 'Statistics'],
    location: 'Lahore',
    hourlyRate: 1500,
    rating: 4.8,
    totalReviews: 56,
    isVerified: true,
    about: 'Experienced tutor with 8+ years teaching Mathematics and Physics. I specialize in O/A Levels and university-level courses. My teaching philosophy focuses on building strong fundamentals and critical thinking skills. I believe every student has the potential to excel with the right guidance.',
    qualifications: ['MSc Mathematics, Punjab University', 'BSc Physics, LUMS', 'Teaching Certification'],
    experience: '8+ years of tutoring experience with students from various backgrounds. Worked with leading educational institutions in Lahore.',
    education: 'Masters in Mathematics with specialization in Applied Mathematics and Statistics.',
    availability: [
      { day: 'Monday', slots: ['10:00 AM', '12:00 PM', '4:00 PM', '6:00 PM'] },
      { day: 'Tuesday', slots: ['11:00 AM', '1:00 PM', '5:00 PM', '7:00 PM'] },
      { day: 'Wednesday', slots: ['10:00 AM', '12:00 PM', '4:00 PM', '6:00 PM'] },
      { day: 'Thursday', slots: ['11:00 AM', '1:00 PM', '5:00 PM', '7:00 PM'] },
      { day: 'Friday', slots: ['10:00 AM', '12:00 PM', '4:00 PM'] },
      { day: 'Saturday', slots: ['10:00 AM', '12:00 PM', '2:00 PM'] },
      { day: 'Sunday', slots: [] }
    ],
    reviews: [
      {
        id: 'r1',
        studentName: 'Imran Ahmed',
        avatar: 'https://randomuser.me/api/portraits/men/22.jpg',
        rating: 5,
        date: '2023-11-15',
        comment: 'Ahmed is an excellent math tutor. He explained complex calculus concepts in a way that was easy to understand. My grades improved significantly after taking his classes.'
      },
      {
        id: 'r2',
        studentName: 'Ayesha Khan',
        avatar: 'https://randomuser.me/api/portraits/women/23.jpg',
        rating: 4,
        date: '2023-10-22',
        comment: 'Very knowledgeable tutor. He helped me prepare for my Physics exam with practical examples and problem-solving techniques.'
      },
      {
        id: 'r3',
        studentName: 'Bilal Hassan',
        avatar: 'https://randomuser.me/api/portraits/men/24.jpg',
        rating: 5,
        date: '2023-09-18',
        comment: 'I highly recommend Ahmed for A-level mathematics. His teaching style is engaging and he makes sure you understand the concepts thoroughly.'
      }
    ]
  }
};

// Add more mock data for other tutors if needed

const TutorDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [tutor, setTutor] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [inWishlist, setInWishlist] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Load wishlist from localStorage
    const storedWishlist = localStorage.getItem('wishlist');
    const wishlist = storedWishlist ? JSON.parse(storedWishlist) : [];
    setInWishlist(wishlist.includes(id));

    // In a real app, this would be an API call
    // Simulate API delay
    setTimeout(() => {
      if (id && mockTutorDetails[id]) {
        setTutor(mockTutorDetails[id]);
      }
      setIsLoading(false);
    }, 500);
  }, [id]);

  const handleWishlist = () => {
    const storedWishlist = localStorage.getItem('wishlist');
    let wishlist = storedWishlist ? JSON.parse(storedWishlist) : [];
    
    if (inWishlist) {
      // Remove from wishlist
      wishlist = wishlist.filter((itemId: string) => itemId !== id);
      toast({
        title: 'Removed from wishlist',
        description: 'Tutor has been removed from your wishlist',
      });
    } else {
      // Add to wishlist
      wishlist.push(id);
      toast({
        title: 'Added to wishlist',
        description: 'Tutor has been added to your wishlist',
      });
    }
    
    // Update localStorage and state
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    setInWishlist(!inWishlist);
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="container mx-auto py-8 px-4 flex justify-center items-center h-[50vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </Layout>
    );
  }

  if (!tutor) {
    return (
      <Layout>
        <div className="container mx-auto py-8 px-4">
          <div className="bg-white p-8 rounded-lg shadow text-center">
            <h2 className="text-2xl font-bold mb-4">Tutor Not Found</h2>
            <p className="mb-6">The tutor you're looking for doesn't exist or has been removed.</p>
            <Link to="/tutors">
              <Button>Browse Other Tutors</Button>
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto py-8 px-4">
        {/* Tutor Header */}
        <div className="bg-white p-6 rounded-lg shadow-sm border mb-6">
          <div className="flex flex-col md:flex-row">
            <div className="flex-shrink-0 flex justify-center md:justify-start mb-4 md:mb-0">
              <Avatar className="h-32 w-32">
                <AvatarImage src={tutor.avatar} alt={tutor.name} />
                <AvatarFallback>{tutor.name.charAt(0)}</AvatarFallback>
              </Avatar>
            </div>
            
            <div className="flex-grow md:ml-6">
              <div className="flex flex-col md:flex-row justify-between">
                <div>
                  <h1 className="text-2xl font-bold flex items-center">
                    {tutor.name}
                    {tutor.isVerified && (
                      <CheckCircle className="ml-2 h-5 w-5 text-blue-500" />
                    )}
                  </h1>
                  
                  <div className="flex items-center mt-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`h-4 w-4 ${i < Math.floor(tutor.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                        />
                      ))}
                    </div>
                    <span className="ml-2 text-sm text-gray-600">
                      {tutor.rating} ({tutor.totalReviews} reviews)
                    </span>
                  </div>
                  
                  <div className="flex items-center mt-2 text-gray-600">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{tutor.location}</span>
                  </div>
                </div>
                
                <div className="mt-4 md:mt-0 text-right">
                  <div className="text-2xl font-bold text-primary">
                    {formatPrice(tutor.hourlyRate)}<span className="text-sm font-normal text-gray-500">/hr</span>
                  </div>
                  
                  <div className="mt-4 flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                    <Button 
                      variant="outline" 
                      onClick={handleWishlist}
                      className={inWishlist ? 'text-red-500 border-red-200' : ''}
                    >
                      <Heart className="mr-2 h-4 w-4" fill={inWishlist ? 'currentColor' : 'none'} />
                      {inWishlist ? 'Saved' : 'Save'}
                    </Button>
                    
                    <Link to={`/book/${tutor.id}`}>
                      <Button>
                        <Calendar className="mr-2 h-4 w-4" />
                        Book Session
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
              
              <div className="mt-4">
                <div className="flex flex-wrap gap-2 mt-2">
                  {tutor.subjects.map((subject: string, index: number) => (
                    <Badge key={index} variant="secondary">
                      {subject}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Tutor Details Tabs */}
        <Tabs defaultValue="about">
          <TabsList className="mb-6">
            <TabsTrigger value="about">About</TabsTrigger>
            <TabsTrigger value="availability">Availability</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>
          
          {/* About Tab */}
          <TabsContent value="about">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-xl font-semibold mb-4">About Me</h2>
                    <p className="text-gray-700 mb-6">{tutor.about}</p>
                    
                    <h3 className="text-lg font-semibold mb-3">Experience</h3>
                    <p className="text-gray-700 mb-6">{tutor.experience}</p>
                    
                    <h3 className="text-lg font-semibold mb-3">Education</h3>
                    <p className="text-gray-700">{tutor.education}</p>
                  </CardContent>
                </Card>
              </div>
              
              <div>
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-xl font-semibold mb-4">Qualifications</h2>
                    <ul className="space-y-2">
                      {tutor.qualifications.map((qualification: string, index: number) => (
                        <li key={index} className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                          <span>{qualification}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
                
                <Card className="mt-6">
                  <CardContent className="p-6">
                    <h2 className="text-xl font-semibold mb-4">Subjects</h2>
                    <div className="flex flex-wrap gap-2">
                      {tutor.subjects.map((subject: string, index: number) => (
                        <Badge key={index} variant="outline" className="text-gray-700">
                          <BookOpen className="h-3 w-3 mr-1" />
                          {subject}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          
          {/* Availability Tab */}
          <TabsContent value="availability">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-6">Weekly Availability</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {tutor.availability.map((day: { day: string; slots: string[] }, index: number) => (
                    <div key={index} className="border rounded-lg p-4">
                      <h3 className="font-semibold text-lg mb-3">{day.day}</h3>
                      {day.slots.length > 0 ? (
                        <ul className="space-y-2">
                          {day.slots.map((slot, slotIndex) => (
                            <li key={slotIndex} className="flex items-center">
                              <Clock className="h-4 w-4 text-gray-500 mr-2" />
                              <span>{slot}</span>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-gray-500 italic">Not available</p>
                      )}
                    </div>
                  ))}
                </div>
                
                <div className="mt-8 bg-blue-50 p-4 rounded-lg">
                  <div className="flex items-start">
                    <Zap className="h-6 w-6 text-blue-500 mr-3 mt-1" />
                    <div>
                      <h3 className="font-semibold">Book a Session</h3>
                      <p className="text-sm text-gray-600 mt-1">
                        You can book a session during any of the available time slots. 
                        Click the button below to proceed with booking.
                      </p>
                      <Link to={`/book/${tutor.id}`} className="mt-3 inline-block">
                        <Button size="sm">
                          <Calendar className="mr-2 h-4 w-4" />
                          Book Now
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Reviews Tab */}
          <TabsContent value="reviews">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold">Student Reviews</h2>
                  <div className="flex items-center">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`h-5 w-5 ${i < Math.floor(tutor.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                        />
                      ))}
                    </div>
                    <span className="ml-2 font-medium">
                      {tutor.rating} out of 5
                    </span>
                  </div>
                </div>
                
                <div className="space-y-6">
                  {tutor.reviews.map((review: any) => (
                    <div key={review.id} className="border-b pb-6 last:border-b-0">
                      <div className="flex items-start">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={review.avatar} alt={review.studentName} />
                          <AvatarFallback>{review.studentName.charAt(0)}</AvatarFallback>
                        </Avatar>
                        
                        <div className="ml-4 flex-grow">
                          <div className="flex items-center justify-between">
                            <h4 className="font-semibold">{review.studentName}</h4>
                            <span className="text-sm text-gray-500">
                              {new Date(review.date).toLocaleDateString('en-PK', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                              })}
                            </span>
                          </div>
                          
                          <div className="flex mt-1 mb-2">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                className={`h-4 w-4 ${i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                              />
                            ))}
                          </div>
                          
                          <p className="text-gray-700">{review.comment}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default TutorDetail;
