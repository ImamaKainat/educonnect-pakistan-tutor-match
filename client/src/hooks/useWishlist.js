
import { useState, useEffect, useContext } from 'react';
import { toast } from 'react-toastify';
import { AuthContext } from '../context/AuthContext';

export const useWishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { isAuthenticated, user } = useContext(AuthContext);

  // Load wishlist on component mount
  useEffect(() => {
    const fetchWishlist = async () => {
      if (isAuthenticated && user?.role === 'student') {
        try {
          const storedToken = localStorage.getItem('token');
          
          // Try from API first
          try {
            const response = await fetch('/api/wishlist', {
              headers: {
                'Authorization': `Bearer ${storedToken}`
              }
            });
            
            if (response.ok) {
              const data = await response.json();
              setWishlist(data.map(tutor => tutor.id));
              setIsLoading(false);
              return;
            }
          } catch (error) {
            console.error('API wishlist fetch failed, using localStorage', error);
          }
          
          // Fallback to localStorage
          const storedWishlist = localStorage.getItem('wishlist');
          if (storedWishlist) {
            setWishlist(JSON.parse(storedWishlist));
          }
        } catch (error) {
          console.error('Error fetching wishlist:', error);
        } finally {
          setIsLoading(false);
        }
      } else {
        // Not authenticated or not a student, use localStorage only
        const storedWishlist = localStorage.getItem('wishlist');
        if (storedWishlist) {
          setWishlist(JSON.parse(storedWishlist));
        }
        setIsLoading(false);
      }
    };

    fetchWishlist();
  }, [isAuthenticated, user]);

  // Add/remove tutor from wishlist
  const handleWishlist = async (tutorId) => {
    let newWishlist = [...wishlist];
    
    if (wishlist.includes(tutorId)) {
      // Remove from wishlist
      newWishlist = wishlist.filter(id => id !== tutorId);
      toast.success('Removed from wishlist');
    } else {
      // Add to wishlist
      newWishlist = [...wishlist, tutorId];
      toast.success('Added to wishlist');
    }
    
    // Update state and localStorage
    setWishlist(newWishlist);
    localStorage.setItem('wishlist', JSON.stringify(newWishlist));
    
    // If authenticated as student, also update on server
    if (isAuthenticated && user?.role === 'student') {
      try {
        const storedToken = localStorage.getItem('token');
        
        await fetch(`/api/wishlist/${tutorId}`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${storedToken}`
          }
        });
      } catch (error) {
        console.error('Error updating wishlist on server:', error);
      }
    }
  };

  return { wishlist, isLoading, handleWishlist };
};

export default useWishlist;
