
// Format price in PKR
export const formatPrice = (price) => {
  return `PKR ${price.toLocaleString()}`;
};

// Generate array of dates for booking
export const generateDays = (numDays) => {
  const days = [];
  const today = new Date();
  
  for (let i = 0; i < numDays; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    days.push(date);
  }
  
  return days;
};

// Generate time slots
export const generateTimeSlots = () => {
  const slots = [];
  for (let hour = 8; hour <= 20; hour++) {
    const hourStr = hour % 12 === 0 ? 12 : hour % 12;
    const period = hour < 12 ? 'AM' : 'PM';
    slots.push(`${hourStr}:00 ${period}`);
  }
  return slots;
};

// Filter tutors based on criteria
export const filterTutors = (tutors, filters) => {
  return tutors.filter(tutor => {
    // Filter by subject
    if (filters.subject && !tutor.subjects.includes(filters.subject)) {
      return false;
    }
    
    // Filter by location
    if (filters.location && tutor.location !== filters.location) {
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
    
    return true;
  });
};

// Truncate text with ellipsis
export const truncateText = (text, maxLength) => {
  if (text.length <= maxLength) return text;
  return text.substr(0, maxLength) + '...';
};

// Get initials from name
export const getInitials = (name) => {
  if (!name) return '';
  const names = name.split(' ');
  if (names.length === 1) return names[0].charAt(0).toUpperCase();
  return (names[0].charAt(0) + names[names.length - 1].charAt(0)).toUpperCase();
};
