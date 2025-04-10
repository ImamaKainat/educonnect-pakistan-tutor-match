
import { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';

export const useWishlist = () => {
  const [wishlist, setWishlist] = useState<string[]>([]);
  const { toast } = useToast();

  // Load wishlist from localStorage on component mount
  useEffect(() => {
    const storedWishlist = localStorage.getItem('wishlist');
    if (storedWishlist) {
      setWishlist(JSON.parse(storedWishlist));
    }
  }, []);

  // Add/remove tutor from wishlist
  const handleWishlist = (tutorId: string) => {
    let newWishlist: string[];
    
    if (wishlist.includes(tutorId)) {
      // Remove from wishlist
      newWishlist = wishlist.filter(id => id !== tutorId);
      toast({
        title: 'Removed from wishlist',
        description: 'Tutor has been removed from your wishlist',
      });
    } else {
      // Add to wishlist
      newWishlist = [...wishlist, tutorId];
      toast({
        title: 'Added to wishlist',
        description: 'Tutor has been added to your wishlist',
      });
    }
    
    // Update state and localStorage
    setWishlist(newWishlist);
    localStorage.setItem('wishlist', JSON.stringify(newWishlist));
  };

  return { wishlist, handleWishlist };
};
