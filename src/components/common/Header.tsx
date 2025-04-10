
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { LogOut, User, BookOpen, Settings, Heart } from 'lucide-react';

const Header = () => {
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <header className="border-b bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="text-xl font-bold text-primary">
            EduConnect<span className="text-secondary">Pakistan</span>
          </Link>
        </div>

        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-gray-600 hover:text-primary">
            Home
          </Link>
          <Link to="/tutors" className="text-gray-600 hover:text-primary">
            Find Tutors
          </Link>
          <Link to="/about" className="text-gray-600 hover:text-primary">
            About Us
          </Link>
          <Link to="/contact" className="text-gray-600 hover:text-primary">
            Contact
          </Link>
        </nav>

        <div>
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center space-x-2">
                  <Avatar>
                    <AvatarImage src={user?.avatar} alt={user?.name} />
                    <AvatarFallback>{user?.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <Link to="/profile" className="flex-1">Profile</Link>
                </DropdownMenuItem>
                
                {user?.role === 'student' && (
                  <>
                    <DropdownMenuItem>
                      <BookOpen className="mr-2 h-4 w-4" />
                      <Link to="/sessions" className="flex-1">My Sessions</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Heart className="mr-2 h-4 w-4" />
                      <Link to="/wishlist" className="flex-1">Wishlist</Link>
                    </DropdownMenuItem>
                  </>
                )}
                
                {user?.role === 'tutor' && (
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    <Link to="/tutor-dashboard" className="flex-1">Dashboard</Link>
                  </DropdownMenuItem>
                )}
                
                {user?.role === 'admin' && (
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    <Link to="/admin-dashboard" className="flex-1">Admin Dashboard</Link>
                  </DropdownMenuItem>
                )}
                
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center space-x-4">
              <Link to="/login">
                <Button variant="outline">Login</Button>
              </Link>
              <Link to="/signup">
                <Button>Sign Up</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
