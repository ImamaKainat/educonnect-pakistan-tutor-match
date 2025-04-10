
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '@/components/common/Layout';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { formatPrice, generateDays, generateTimeSlots } from '@/utils/helpers';
import { Calendar, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/context/AuthContext';
import { Tutor } from '@/components/tutors/TutorCard';

// Mock data for a single tutor (same as in TutorDetail, but simplified)
const mockTutorDetails: Record<string, Tutor & { 
  availability: { day: string; slots: string[] }[];
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
    about: 'Experienced tutor with 8+ years teaching Mathematics and Physics.',
    availability: [
      { day: 'Monday', slots: ['10:00 AM', '12:00 PM', '4:00 PM', '6:00 PM'] },
      { day: 'Tuesday', slots: ['11:00 AM', '1:00 PM', '5:00 PM', '7:00 PM'] },
      { day: 'Wednesday', slots: ['10:00 AM', '12:00 PM', '4:00 PM', '6:00 PM'] },
      { day: 'Thursday', slots: ['11:00 AM', '1:00 PM', '5:00 PM', '7:00 PM'] },
      { day: 'Friday', slots: ['10:00 AM', '12:00 PM', '4:00 PM'] },
      { day: 'Saturday', slots: ['10:00 AM', '12:00 PM', '2:00 PM'] },
      { day: 'Sunday', slots: [] }
    ]
  }
};

// Booking interface
interface BookingDetails {
  date: string;
  time: string;
  duration: number;
  subject: string;
  sessionType: 'online' | 'in-person';
  notes: string;
}

const BookSession = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const { toast } = useToast();
  
  const [tutor, setTutor] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  const [booking, setBooking] = useState<BookingDetails>({
    date: '',
    time: '',
    duration: 60,
    subject: '',
    sessionType: 'online',
    notes: ''
  });
  
  // Generate the next 14 days for date selection
  const availableDays = generateDays(14);
  
  useEffect(() => {
    if (!isAuthenticated) {
      toast({
        title: 'Authentication required',
        description: 'Please log in to book a session',
        variant: 'destructive',
      });
      navigate('/login');
      return;
    }
    
    // In a real app, this would be an API call
    setTimeout(() => {
      if (id && mockTutorDetails[id]) {
        setTutor(mockTutorDetails[id]);
        // Set first subject as default
        setBooking(prev => ({
          ...prev,
          subject: mockTutorDetails[id].subjects[0]
        }));
      }
      setIsLoading(false);
    }, 500);
  }, [id, isAuthenticated, navigate, toast]);
  
  // When a date is selected, update available time slots
  useEffect(() => {
    if (selectedDate && tutor) {
      const dayOfWeek = new Date(selectedDate).toLocaleDateString('en-US', { weekday: 'long' });
      const dayAvailability = tutor.availability.find((day: { day: string }) => 
        day.day === dayOfWeek
      );
      
      setAvailableSlots(dayAvailability ? dayAvailability.slots : []);
      setBooking(prev => ({
        ...prev,
        date: selectedDate,
        time: ''  // Reset time when date changes
      }));
    }
  }, [selectedDate, tutor]);
  
  const handleDateSelect = (date: Date) => {
    setSelectedDate(date.toISOString().split('T')[0]);
  };
  
  const handleTimeSelect = (time: string) => {
    setBooking(prev => ({
      ...prev,
      time
    }));
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setBooking(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleRadioChange = (name: string, value: string) => {
    setBooking(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const goToNextStep = () => {
    // Validate current step
    if (currentStep === 1 && (!booking.date || !booking.time)) {
      toast({
        title: 'Please select both date and time',
        variant: 'destructive',
      });
      return;
    }
    
    if (currentStep === 2 && (!booking.subject || !booking.sessionType)) {
      toast({
        title: 'Please fill all required fields',
        variant: 'destructive',
      });
      return;
    }
    
    setCurrentStep(prev => prev + 1);
  };
  
  const goToPreviousStep = () => {
    setCurrentStep(prev => prev - 1);
  };
  
  const handleSubmit = () => {
    // In a real app, this would be an API call to save the booking
    toast({
      title: 'Booking successful!',
      description: 'Your session has been booked. Check your email for details.',
    });
    
    // Redirect to sessions page
    setTimeout(() => {
      navigate('/sessions');
    }, 2000);
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
            <Button onClick={() => navigate('/tutors')}>Browse Other Tutors</Button>
          </div>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <div className="container mx-auto py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold mb-8">Book a Session with {tutor.name}</h1>
          
          {/* Booking Progress */}
          <div className="mb-8">
            <div className="flex items-center">
              <div className={`rounded-full h-10 w-10 flex items-center justify-center ${
                currentStep >= 1 ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500'
              }`}>
                1
              </div>
              <div className={`h-1 w-16 ${currentStep >= 2 ? 'bg-primary' : 'bg-gray-200'}`}></div>
              <div className={`rounded-full h-10 w-10 flex items-center justify-center ${
                currentStep >= 2 ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500'
              }`}>
                2
              </div>
              <div className={`h-1 w-16 ${currentStep >= 3 ? 'bg-primary' : 'bg-gray-200'}`}></div>
              <div className={`rounded-full h-10 w-10 flex items-center justify-center ${
                currentStep >= 3 ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500'
              }`}>
                3
              </div>
            </div>
            <div className="flex justify-between mt-2 text-sm">
              <span className={currentStep >= 1 ? 'text-primary font-medium' : 'text-gray-500'}>
                Select Date & Time
              </span>
              <span className={currentStep >= 2 ? 'text-primary font-medium' : 'text-gray-500'}>
                Session Details
              </span>
              <span className={currentStep >= 3 ? 'text-primary font-medium' : 'text-gray-500'}>
                Confirm & Pay
              </span>
            </div>
          </div>
          
          {/* Step 1: Select Date & Time */}
          {currentStep === 1 && (
            <Card>
              <CardHeader>
                <CardTitle>Select Date & Time</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Date Selection */}
                  <div>
                    <h3 className="font-semibold mb-4">Select Date</h3>
                    <div className="grid grid-cols-3 gap-2">
                      {availableDays.map((day, index) => {
                        const dateStr = day.toISOString().split('T')[0];
                        const dayOfWeek = day.toLocaleDateString('en-US', { weekday: 'short' });
                        const dayOfMonth = day.getDate();
                        const month = day.toLocaleDateString('en-US', { month: 'short' });
                        
                        // Check if this day has any availability
                        const fullDayOfWeek = day.toLocaleDateString('en-US', { weekday: 'long' });
                        const dayAvailability = tutor.availability.find((d: { day: string }) => 
                          d.day === fullDayOfWeek
                        );
                        const hasSlots = dayAvailability && dayAvailability.slots.length > 0;
                        
                        return (
                          <button
                            key={index}
                            className={`p-3 rounded-lg text-center ${
                              selectedDate === dateStr
                                ? 'bg-primary text-white'
                                : hasSlots
                                ? 'bg-white border hover:border-primary'
                                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            }`}
                            onClick={() => hasSlots && handleDateSelect(day)}
                            disabled={!hasSlots}
                          >
                            <div className="text-xs font-medium">{dayOfWeek}</div>
                            <div className="text-lg font-bold">{dayOfMonth}</div>
                            <div className="text-xs">{month}</div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                  
                  {/* Time Selection */}
                  <div>
                    <h3 className="font-semibold mb-4">Select Time</h3>
                    {selectedDate ? (
                      availableSlots.length > 0 ? (
                        <div className="grid grid-cols-2 gap-2">
                          {availableSlots.map((time, index) => (
                            <button
                              key={index}
                              className={`p-3 rounded-lg flex items-center ${
                                booking.time === time
                                  ? 'bg-primary text-white'
                                  : 'bg-white border hover:border-primary'
                              }`}
                              onClick={() => handleTimeSelect(time)}
                            >
                              <Clock className="h-4 w-4 mr-2" />
                              {time}
                            </button>
                          ))}
                        </div>
                      ) : (
                        <div className="flex items-center justify-center h-32 bg-gray-50 rounded-lg">
                          <p className="text-gray-500">No available slots for this date</p>
                        </div>
                      )
                    ) : (
                      <div className="flex items-center justify-center h-32 bg-gray-50 rounded-lg">
                        <p className="text-gray-500">Please select a date first</p>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="justify-end">
                <Button onClick={goToNextStep}>Next: Session Details</Button>
              </CardFooter>
            </Card>
          )}
          
          {/* Step 2: Session Details */}
          {currentStep === 2 && (
            <Card>
              <CardHeader>
                <CardTitle>Session Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Subject Selection */}
                  <div>
                    <Label className="mb-2 block">Select Subject</Label>
                    <RadioGroup value={booking.subject} onValueChange={(value) => handleRadioChange('subject', value)}>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {tutor.subjects.map((subject: string, index: number) => (
                          <div key={index} className="flex items-center space-x-2">
                            <RadioGroupItem value={subject} id={`subject-${index}`} />
                            <Label htmlFor={`subject-${index}`}>{subject}</Label>
                          </div>
                        ))}
                      </div>
                    </RadioGroup>
                  </div>
                  
                  {/* Session Duration */}
                  <div>
                    <Label className="mb-2 block">Session Duration</Label>
                    <RadioGroup value={booking.duration.toString()} onValueChange={(value) => handleRadioChange('duration', value)}>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="60" id="duration-60" />
                          <Label htmlFor="duration-60">1 hour ({formatPrice(tutor.hourlyRate)})</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="90" id="duration-90" />
                          <Label htmlFor="duration-90">1.5 hours ({formatPrice(tutor.hourlyRate * 1.5)})</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="120" id="duration-120" />
                          <Label htmlFor="duration-120">2 hours ({formatPrice(tutor.hourlyRate * 2)})</Label>
                        </div>
                      </div>
                    </RadioGroup>
                  </div>
                  
                  {/* Session Type */}
                  <div>
                    <Label className="mb-2 block">Session Type</Label>
                    <RadioGroup 
                      value={booking.sessionType} 
                      onValueChange={(value) => handleRadioChange('sessionType', value as 'online' | 'in-person')}
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="online" id="type-online" />
                          <Label htmlFor="type-online">Online</Label>
                        </div>
                        {tutor.location !== 'Online' && (
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="in-person" id="type-in-person" />
                            <Label htmlFor="type-in-person">In-person ({tutor.location})</Label>
                          </div>
                        )}
                      </div>
                    </RadioGroup>
                  </div>
                  
                  {/* Notes */}
                  <div>
                    <Label htmlFor="notes" className="mb-2 block">Additional Notes (Optional)</Label>
                    <Textarea
                      id="notes"
                      name="notes"
                      placeholder="Any specific topics you'd like to cover or questions you have"
                      value={booking.notes}
                      onChange={handleInputChange}
                      rows={4}
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="justify-between">
                <Button variant="outline" onClick={goToPreviousStep}>Back</Button>
                <Button onClick={goToNextStep}>Next: Confirm & Pay</Button>
              </CardFooter>
            </Card>
          )}
          
          {/* Step 3: Confirm & Pay */}
          {currentStep === 3 && (
            <Card>
              <CardHeader>
                <CardTitle>Confirm & Pay</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-6 flex items-center">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={tutor.avatar} alt={tutor.name} />
                    <AvatarFallback>{tutor.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="ml-4">
                    <h3 className="font-semibold text-lg">{tutor.name}</h3>
                    <div className="text-gray-600">
                      {booking.subject} • {booking.sessionType === 'online' ? 'Online' : 'In-person'}
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg mb-6">
                  <h3 className="font-semibold mb-3">Session Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center">
                      <Calendar className="h-5 w-5 text-gray-600 mr-2" />
                      <div>
                        <div className="font-medium">Date</div>
                        <div>{new Date(booking.date).toLocaleDateString('en-US', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}</div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-5 w-5 text-gray-600 mr-2" />
                      <div>
                        <div className="font-medium">Time</div>
                        <div>{booking.time}</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="border-t border-b py-4 mb-6">
                  <h3 className="font-semibold mb-3">Payment Summary</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Tutor Rate</span>
                      <span>{formatPrice(tutor.hourlyRate)}/hour</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Duration</span>
                      <span>{Number(booking.duration) / 60} hour(s)</span>
                    </div>
                    <div className="flex justify-between font-semibold">
                      <span>Total Amount</span>
                      <span>{formatPrice(tutor.hourlyRate * Number(booking.duration) / 60)}</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex items-start">
                    <AlertCircle className="h-5 w-5 text-blue-500 mt-0.5 mr-2" />
                    <div className="text-sm">
                      <p>
                        By confirming this booking, you agree to EduConnect Pakistan's 
                        terms of service and cancellation policy.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="justify-between">
                <Button variant="outline" onClick={goToPreviousStep}>Back</Button>
                <Button onClick={handleSubmit}>Confirm Booking</Button>
              </CardFooter>
            </Card>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default BookSession;
