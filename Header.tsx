import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  
  // Mock user data - in a real app, this would come from authentication context
  const userId = 'USER123456';
  const isLoggedIn = true;
  
  const handleLogout = () => {
    // In a real app, this would clear authentication state
    navigate('/login');
  };
  
  return (
    <header className="bg-black border-b border-gray-800 py-4 px-6">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-blue-500">TuneTrader</Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6">
            <Link to="/dashboard" className="text-gray-300 hover:text-blue-500 transition">Dashboard</Link>
            <Link to="/upload" className="text-gray-300 hover:text-blue-500 transition">Upload File</Link>
            <Link to="/bidding/active" className="text-gray-300 hover:text-blue-500 transition">Active Bids</Link>
            <Link to="/wallet" className="text-gray-300 hover:text-blue-500 transition">Wallet</Link>
            <Link to="/support" className="text-gray-300 hover:text-blue-500 transition">Support</Link>
          </nav>
          
          {/* User Menu */}
          <div className="flex items-center space-x-4">
            {isLoggedIn ? (
              <>
                <span className="text-sm text-gray-400">{userId}</span>
                <button 
                  onClick={handleLogout}
                  className="px-3 py-1 bg-gray-800 hover:bg-gray-700 rounded text-sm transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <div className="flex space-x-2">
                <Link to="/login" className="px-3 py-1 border border-blue-500 text-blue-500 rounded hover:bg-blue-500 hover:text-black transition">
                  Login
                </Link>
                <Link to="/register" className="px-3 py-1 bg-blue-500 text-black rounded hover:bg-blue-600 transition">
                  Register
                </Link>
              </div>
            )}
            
            {/* Mobile menu button */}
            <button 
              className="md:hidden focus:outline-none"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg className="w-6 h-6 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 space-y-2">
            <Link 
              to="/dashboard" 
              className="block py-2 px-4 text-gray-300 hover:bg-gray-800 rounded"
              onClick={() => setIsMenuOpen(false)}
            >
              Dashboard
            </Link>
            <Link 
              to="/upload" 
              className="block py-2 px-4 text-gray-300 hover:bg-gray-800 rounded"
              onClick={() => setIsMenuOpen(false)}
            >
              Upload File
            </Link>
            <Link 
              to="/bidding/active" 
              className="block py-2 px-4 text-gray-300 hover:bg-gray-800 rounded"
              onClick={() => setIsMenuOpen(false)}
            >
              Active Bids
            </Link>
            <Link 
              to="/wallet" 
              className="block py-2 px-4 text-gray-300 hover:bg-gray-800 rounded"
              onClick={() => setIsMenuOpen(false)}
            >
              Wallet
            </Link>
            <Link 
              to="/support" 
              className="block py-2 px-4 text-gray-300 hover:bg-gray-800 rounded"
              onClick={() => setIsMenuOpen(false)}
            >
              Support
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
