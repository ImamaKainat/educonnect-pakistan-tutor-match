
import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

export const useWishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const token = localStorage.getItem('token');
        
        if (token) {
          // User is logged in, fetch from API
          const response = await axios.get('/api/wishlist');
          setWishlistItems(response.data);
          setWishlist(response.data.map(tutor => tutor.id));
        } else {
          // User is not logged in, get from localStorage
          const storedWishlist = localStorage.getItem('wishlist');
          
          if (storedWishlist) {
            const ids = JSON.parse(storedWishlist);
            setWishlist(ids);
            
            // Try to fetch details for each tutor in wishlist
            try {
              const tutors = [];
              for (const id of ids) {
                const response = await axios.get(`/api/tutors/${id}`);
                tutors.push(response.data);
              }
              setWishlistItems(tutors);
            } catch (error) {
              console.error('Error fetching wishlist items:', error);
            }
          }
        }
      } catch (error) {
        console.error('Error fetching wishlist:', error);
        toast.error('Failed to load wishlist');
        
        // Fallback to localStorage
        const storedWishlist = localStorage.getItem('wishlist');
        if (storedWishlist) {
          setWishlist(JSON.parse(storedWishlist));
        }
      } finally {
        setLoading(false);
      }
    };
    
    fetchWishlist();
  }, []);
  
  const handleWishlist = async (tutorId) => {
    try {
      const token = localStorage.getItem('token');
      
      if (token) {
        // User is logged in, use API
        const response = await axios.post(`/api/wishlist/${tutorId}`);
        
        // Update local state
        if (wishlist.includes(tutorId)) {
          setWishlist(wishlist.filter(id => id !== tutorId));
          setWishlistItems(wishlistItems.filter(item => item.id !== tutorId));
          toast.success('Removed from wishlist');
        } else {
          // Fetch the tutor details to add to wishlistItems
          const tutorResponse = await axios.get(`/api/tutors/${tutorId}`);
          
          setWishlist([...wishlist, tutorId]);
          setWishlistItems([...wishlistItems, tutorResponse.data]);
          toast.success('Added to wishlist');
        }
      } else {
        // User is not logged in, use localStorage
        let localWishlist = [];
        const storedWishlist = localStorage.getItem('wishlist');
        
        if (storedWishlist) {
          localWishlist = JSON.parse(storedWishlist);
        }
        
        if (localWishlist.includes(tutorId)) {
          localWishlist = localWishlist.filter(id => id !== tutorId);
          setWishlistItems(wishlistItems.filter(item => item.id !== tutorId));
          toast.success('Removed from wishlist');
        } else {
          // Fetch the tutor details to add to wishlistItems
          try {
            const response = await axios.get(`/api/tutors/${tutorId}`);
            setWishlistItems([...wishlistItems, response.data]);
          } catch (error) {
            console.error('Error fetching tutor details:', error);
          }
          
          localWishlist.push(tutorId);
          toast.success('Added to wishlist');
        }
        
        localStorage.setItem('wishlist', JSON.stringify(localWishlist));
        setWishlist(localWishlist);
      }
    } catch (error) {
      console.error('Error updating wishlist:', error);
      toast.error('Failed to update wishlist');
    }
  };
  
  return { wishlist, wishlistItems, loading, handleWishlist };
};
