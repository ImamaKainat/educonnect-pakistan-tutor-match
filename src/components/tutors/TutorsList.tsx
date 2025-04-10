
import React from 'react';
import TutorCard, { Tutor } from '@/components/tutors/TutorCard';

interface TutorsListProps {
  tutors: Tutor[];
  isLoading: boolean;
  wishlist: string[];
  onAddToWishlist: (tutorId: string) => void;
}

const TutorsList = ({ tutors, isLoading, wishlist, onAddToWishlist }: TutorsListProps) => {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (tutors.length === 0) {
    return (
      <div className="bg-white rounded-lg p-8 text-center">
        <h3 className="text-lg font-semibold mb-2">No tutors found</h3>
        <p className="text-gray-600">
          Try adjusting your search criteria or filters to find more tutors.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
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
