import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requiredRole 
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const location = useLocation();

  useEffect(() => {
    // Check authentication status
    const checkAuth = () => {
      const token = localStorage.getItem('token');
      const userStr = localStorage.getItem('user');
      
      if (!token || !userStr) {
        setIsAuthenticated(false);
        return;
      }
      
      try {
        const user = JSON.parse(userStr);
        
        // If a specific role is required, check if user has that role
        if (requiredRole && user.role !== requiredRole) {
          setIsAuthenticated(false);
          return;
        }
        
        // In a real app, we would validate the token with the backend here
        // For now, we'll just check if it exists and has the right format
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Error parsing user data:', error);
        setIsAuthenticated(false);
      }
    };
    
    checkAuth();
  }, [requiredRole]);

  if (isAuthenticated === null) {
    // Still checking authentication
    return <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <p className="text-xl">Loading...</p>
    </div>;
  }

  if (!isAuthenticated) {
    // Not authenticated, redirect to login
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Authenticated, render children
  return <>{children}</>;
};

export default ProtectedRoute;
