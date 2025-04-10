
// Format price to PKR currency
export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('en-PK', {
    style: 'currency',
    currency: 'PKR',
    minimumFractionDigits: 0
  }).format(price);
};

// Format date to a readable format
export const formatDate = (date: Date | string): string => {
  const d = new Date(date);
  return d.toLocaleDateString('en-PK', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

// Format time to a readable format
export const formatTime = (time: Date | string): string => {
  const d = new Date(time);
  return d.toLocaleTimeString('en-PK', {
    hour: '2-digit',
    minute: '2-digit'
  });
};

// Generate a range of hours for booking slots
export const generateTimeSlots = (startHour = 8, endHour = 20): string[] => {
  const slots = [];
  for (let hour = startHour; hour <= endHour; hour++) {
    slots.push(`${hour}:00`);
    if (hour < endHour) {
      slots.push(`${hour}:30`);
    }
  }
  return slots;
};

// Generate days for the next n days
export const generateDays = (days = 7): Date[] => {
  const result = [];
  const today = new Date();
  
  for (let i = 0; i < days; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    result.push(date);
  }
  
  return result;
};

// Filter function for tutors
export interface FilterOptions {
  subject?: string;
  location?: string;
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
  availability?: string[];
}

export const filterTutors = (tutors: any[], filters: FilterOptions) => {
  return tutors.filter(tutor => {
    // Filter by subject
    if (filters.subject && !tutor.subjects.includes(filters.subject)) {
      return false;
    }
    
    // Filter by location
    if (filters.location && tutor.location !== filters.location && tutor.location !== 'online') {
      return false;
    }
    
    // Filter by price range
    if (filters.minPrice && tutor.hourlyRate < filters.minPrice) {
      return false;
    }
    if (filters.maxPrice && tutor.hourlyRate > filters.maxPrice) {
      return false;
    }
    
    // Filter by rating
    if (filters.minRating && tutor.rating < filters.minRating) {
      return false;
    }
    
    // Filter by availability
    if (filters.availability && filters.availability.length > 0) {
      // Check if at least one of the requested availability slots matches
      const hasMatchingSlot = filters.availability.some(slot => 
        tutor.availability && tutor.availability.includes(slot)
      );
      if (!hasMatchingSlot) {
        return false;
      }
    }
    
    return true;
  });
};
