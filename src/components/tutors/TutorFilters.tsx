
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { FilterOptions } from '@/utils/helpers';

// Subject options
const SUBJECTS = [
  'Mathematics',
  'Physics',
  'Chemistry',
  'Biology',
  'English',
  'Urdu',
  'Computer Science',
  'History',
  'Geography',
  'Economics',
  'Accounting',
  'Islamic Studies'
];

// Location options
const LOCATIONS = [
  'Online',
  'Lahore',
  'Karachi',
  'Islamabad',
  'Rawalpindi',
  'Peshawar',
  'Quetta',
  'Multan',
  'Faisalabad',
  'Sialkot'
];

interface TutorFiltersProps {
  onFilter: (filters: FilterOptions) => void;
}

const TutorFilters = ({ onFilter }: TutorFiltersProps) => {
  const [filters, setFilters] = useState<FilterOptions>({
    subject: undefined,
    location: undefined,
    minPrice: 500,
    maxPrice: 5000,
    minRating: 0,
  });

  const handleChange = (name: keyof FilterOptions, value: any) => {
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePriceChange = (value: number[]) => {
    setFilters(prev => ({
      ...prev,
      minPrice: value[0],
      maxPrice: value[1]
    }));
  };

  const handleRatingChange = (value: number[]) => {
    setFilters(prev => ({
      ...prev,
      minRating: value[0]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFilter(filters);
  };

  const handleReset = () => {
    const resetFilters = {
      subject: undefined,
      location: undefined,
      minPrice: 500,
      maxPrice: 5000,
      minRating: 0,
    };
    
    setFilters(resetFilters);
    onFilter(resetFilters);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border">
      <h2 className="text-lg font-semibold mb-4">Filter Tutors</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="space-y-6">
          {/* Subject Filter */}
          <div>
            <Label htmlFor="subject">Subject</Label>
            <Select
              value={filters.subject}
              onValueChange={(value) => handleChange('subject', value)}
            >
              <SelectTrigger id="subject">
                <SelectValue placeholder="Select subject" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Subjects</SelectItem>
                {SUBJECTS.map(subject => (
                  <SelectItem key={subject} value={subject}>
                    {subject}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          {/* Location Filter */}
          <div>
            <Label htmlFor="location">Location</Label>
            <Select
              value={filters.location}
              onValueChange={(value) => handleChange('location', value)}
            >
              <SelectTrigger id="location">
                <SelectValue placeholder="Select location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Locations</SelectItem>
                {LOCATIONS.map(location => (
                  <SelectItem key={location} value={location}>
                    {location}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          {/* Price Range Filter */}
          <div>
            <div className="flex justify-between mb-2">
              <Label>Price Range (PKR)</Label>
              <span className="text-sm text-gray-500">
                {filters.minPrice} - {filters.maxPrice}
              </span>
            </div>
            <Slider
              defaultValue={[filters.minPrice || 500, filters.maxPrice || 5000]}
              max={10000}
              min={0}
              step={100}
              onValueChange={handlePriceChange}
              className="my-4"
            />
          </div>
          
          {/* Rating Filter */}
          <div>
            <div className="flex justify-between mb-2">
              <Label>Minimum Rating</Label>
              <span className="text-sm text-gray-500">
                {filters.minRating} / 5
              </span>
            </div>
            <Slider
              defaultValue={[filters.minRating || 0]}
              max={5}
              min={0}
              step={0.5}
              onValueChange={handleRatingChange}
              className="my-4"
            />
          </div>
          
          <div className="flex space-x-2 pt-2">
            <Button type="submit" className="flex-1">Apply Filters</Button>
            <Button type="button" variant="outline" onClick={handleReset}>
              Reset
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default TutorFilters;
