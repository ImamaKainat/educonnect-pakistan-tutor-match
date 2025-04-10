
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Heart } from 'lucide-react';
import { formatPrice } from '@/utils/helpers';

export interface Tutor {
  id: string;
  name: string;
  avatar: string;
  subjects: string[];
  location: string;
  hourlyRate: number;
  rating: number;
  totalReviews: number;
  isVerified: boolean;
  about: string;
}

interface TutorCardProps {
  tutor: Tutor;
  onAddToWishlist?: (tutorId: string) => void;
  inWishlist?: boolean;
}

const TutorCard = ({ tutor, onAddToWishlist, inWishlist = false }: TutorCardProps) => {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={tutor.avatar} alt={tutor.name} />
              <AvatarFallback>{tutor.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-lg font-semibold">
                {tutor.name}
                {tutor.isVerified && (
                  <Badge variant="outline" className="ml-2 bg-blue-50 text-blue-600 border-blue-200">
                    Verified
                  </Badge>
                )}
              </h3>
              <div className="flex items-center mt-1">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <svg 
                      key={i} 
                      className={`w-4 h-4 ${i < Math.floor(tutor.rating) ? 'text-yellow-400' : 'text-gray-300'}`} 
                      fill="currentColor" 
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="ml-1 text-sm text-gray-600">({tutor.totalReviews} reviews)</span>
              </div>
              <div className="mt-2 space-x-2">
                {tutor.subjects.slice(0, 3).map((subject, index) => (
                  <Badge key={index} variant="secondary" className="mr-1">
                    {subject}
                  </Badge>
                ))}
                {tutor.subjects.length > 3 && (
                  <Badge variant="outline">+{tutor.subjects.length - 3}</Badge>
                )}
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-lg font-bold text-primary">
              {formatPrice(tutor.hourlyRate)}<span className="text-sm font-normal text-gray-500">/hr</span>
            </div>
            <div className="text-sm text-gray-500 mt-1">{tutor.location}</div>
          </div>
        </div>
        
        <p className="mt-4 text-gray-600 line-clamp-3">{tutor.about}</p>
      </CardContent>
      
      <CardFooter className="bg-gray-50 px-6 py-3 border-t flex justify-between">
        <Link to={`/tutors/${tutor.id}`}>
          <Button variant="outline">View Profile</Button>
        </Link>
        <div className="flex space-x-2">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => onAddToWishlist && onAddToWishlist(tutor.id)}
            className={inWishlist ? 'text-red-500' : 'text-gray-400'}
          >
            <Heart className="h-5 w-5" fill={inWishlist ? 'currentColor' : 'none'} />
          </Button>
          <Link to={`/book/${tutor.id}`}>
            <Button>Book Session</Button>
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
};

export default TutorCard;
