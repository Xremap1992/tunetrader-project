import React, { useState, useEffect } from 'react';
import { generateUserId } from '../utils/userIdGenerator';

interface BidProps {
  fileId?: string;
  fileName?: string;
  carModel?: string;
  modifications?: string[];
}

const BiddingPage: React.FC<BidProps> = ({ 
  fileId = 'FILE123456', 
  fileName = 'BMW_320d_2019.bin', 
  carModel = 'BMW 320d 2019',
  modifications = ['EGR OFF', 'DPF OFF', 'Stage 1']
}) => {
  const [timeLeft, setTimeLeft] = useState<number>(7200); // 2 hours in seconds
  const [currentBid, setCurrentBid] = useState<string>('');
  const [bids, setBids] = useState<Array<{id: string; userId: string; amount: number; time: string}>>([
    { id: '1', userId: 'TUNER123456', amount: 120, time: '2 minutes ago' },
    { id: '2', userId: 'TUNER234567', amount: 110, time: '15 minutes ago' },
    { id: '3', userId: 'TUNER345678', amount: 130, time: '25 minutes ago' },
  ]);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');
  
  // Format time left as HH:MM:SS
  const formatTimeLeft = () => {
    const hours = Math.floor(timeLeft / 3600);
    const minutes = Math.floor((timeLeft % 3600) / 60);
    const seconds = timeLeft % 60;
    
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };
  
  // Countdown timer
  useEffect(() => {
    if (timeLeft <= 0) return;
    
    const timer = setTimeout(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [timeLeft]);
  
  // Handle bid submission
  const handleBidSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate bid
    const bidAmount = parseFloat(currentBid);
    if (isNaN(bidAmount) || bidAmount <= 0) {
      setError('Please enter a valid bid amount');
      return;
    }
    
    // Check if bid is lower than existing bids
    const lowestBid = Math.min(...bids.map(bid => bid.amount));
    if (bidAmount >= lowestBid) {
      setError('Your bid must be lower than the current lowest bid');
      return;
    }
    
    // Add new bid
    const newBid = {
      id: (bids.length + 1).toString(),
      userId: generateUserId('TUNER'),
      amount: bidAmount,
      time: 'Just now'
    };
    
    setBids([newBid, ...bids]);
    setCurrentBid('');
    setError('');
    setSuccess('Your bid has been submitted successfully!');
    
    // Clear success message after 3 seconds
    setTimeout(() => {
      setSuccess('');
    }, 3000);
  };
  
  // Handle accepting a bid
  const handleAcceptBid = (bidId: string) => {
    const bid = bids.find(b => b.id === bidId);
    if (!bid) return;
    
    // Calculate commission
    const commission = bid.amount * 0.3; // 30% commission
    const tunerAmount = bid.amount * 0.7; // 70% to tuner
    
    alert(`Bid accepted! 
    Total amount: €${bid.amount}
    Platform commission (30%): €${commission.toFixed(2)}
    Amount to tuner (70%): €${tunerAmount.toFixed(2)}`);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="bg-gray-900 border-b border-gray-800 py-4 px-6">
        <div className="container mx-auto">
          <div className="flex justify-between items-center">
            <div className="text-2xl font-bold text-blue-500">TuneTrader</div>
            <nav className="hidden md:flex space-x-6">
              <a href="#" className="text-gray-300 hover:text-blue-500">Dashboard</a>
              <a href="#" className="text-gray-300 hover:text-blue-500">Upload File</a>
              <a href="#" className="text-blue-500">Active Bids</a>
              <a href="#" className="text-gray-300 hover:text-blue-500">My Files</a>
              <a href="#" className="text-gray-300 hover:text-blue-500">Wallet</a>
            </nav>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-400">USER123456</span>
              <button className="px-3 py-1 bg-gray-800 hover:bg-gray-700 rounded text-sm">
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>
      
      <div className="container mx-auto py-8 px-4">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* File Details */}
          <div className="lg:w-2/3">
            <div className="bg-gray-900 rounded-lg p-6 mb-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h1 className="text-2xl font-bold mb-2">{fileName}</h1>
                  <p className="text-gray-400 mb-2">File ID: {fileId}</p>
                  <p className="text-gray-400">Car Model: {carModel}</p>
                </div>
                <div className="bg-blue-900/30 text-blue-300 px-4 py-2 rounded-lg flex flex-col items-center">
                  <div className="text-sm mb-1">Bidding ends in</div>
                  <div className="text-xl font-mono font-bold">{formatTimeLeft()}</div>
                </div>
              </div>
              
              <div className="border-t border-gray-800 pt-4 mb-4">
                <h2 className="text-lg font-semibold mb-2">Requested Modifications</h2>
                <div className="flex flex-wrap gap-2">
                  {modifications.map((mod, index) => (
                    <span key={index} className="bg-gray-800 text-blue-300 px-3 py-1 rounded-lg text-sm">
                      {mod}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="border-t border-gray-800 pt-4">
                <h2 className="text-lg font-semibold mb-4">File Description</h2>
                <p className="text-gray-300">
                  Original ECU file from a {carModel}. Looking for performance tuning with the specified modifications.
                  Need this done quickly and professionally. The file has been scanned and is virus-free.
                </p>
              </div>
            </div>
            
            {/* Current Bids */}
            <div className="bg-gray-900 rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Current Bids</h2>
              
              {bids.length === 0 ? (
                <p className="text-gray-400">No bids yet. Be the first to bid!</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead>
                      <tr className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wider border-b border-gray-800">
                        <th className="px-4 py-3">Tuner ID</th>
                        <th className="px-4 py-3">Amount</th>
                        <th className="px-4 py-3">Time</th>
                        <th className="px-4 py-3">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-800">
                      {bids.map(bid => (
                        <tr key={bid.id} className="hover:bg-gray-800/50">
                          <td className="px-4 py-4 whitespace-nowrap">
                            <span className="font-medium">{bid.userId}</span>
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap">
                            <span className="text-green-400">€{bid.amount}</span>
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-gray-400">
                            {bid.time}
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap">
                            <button 
                              onClick={() => handleAcceptBid(bid.id)}
                              className="px-3 py-1 bg-green-700 hover:bg-green-600 text-white rounded-md text-sm"
                            >
                              Accept Bid
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
          
          {/* Bid Form */}
          <div className="lg:w-1/3">
            <div className="bg-gray-900 rounded-lg p-6 sticky top-6">
              <h2 className="text-xl font-semibold mb-4">Place Your Bid</h2>
              
              {error && (
                <div className="bg-red-900/30 border border-red-800 text-red-300 px-4 py-3 rounded mb-4">
                  {error}
                </div>
              )}
              
              {success && (
                <div className="bg-green-900/30 border border-green-800 text-green-300 px-4 py-3 rounded mb-4">
                  {success}
                </div>
              )}
              
              <form onSubmit={handleBidSubmit}>
                <div className="mb-4">
                  <label htmlFor="bidAmount" className="block text-sm font-medium text-gray-300 mb-1">
                    Your Bid Amount (€)
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">€</span>
                    <input
                      type="number"
                      id="bidAmount"
                      value={currentBid}
                      onChange={(e) => setCurrentBid(e.target.value)}
                      className="w-full pl-8 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                      placeholder="Enter your bid amount"
                      step="0.01"
                      min="0"
                      required
                    />
                  </div>
                  <p className="mt-1 text-sm text-gray-400">
                    Enter your best price. Lower bids have a better chance of being accepted.
                  </p>
                </div>
                
                <div className="mb-4">
                  <label htmlFor="estimatedTime" className="block text-sm font-medium text-gray-300 mb-1">
                    Estimated Completion Time
                  </label>
                  <select
                    id="estimatedTime"
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                    defaultValue="24h"
                  >
                    <option value="1h">1 hour</option>
                    <option value="3h">3 hours</option>
                    <option value="6h">6 hours</option>
                    <option value="12h">12 hours</option>
                    <option value="24h">24 hours</option>
                    <option value="48h">48 hours</option>
                  </select>
                </div>
                
                <div className="mb-6">
                  <label htmlFor="bidNotes" className="block text-sm font-medium text-gray-300 mb-1">
                    Notes (Optional)
                  </label>
                  <textarea
                    id="bidNotes"
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                    rows={3}
                    placeholder="Add any notes about your bid..."
                  ></textarea>
                </div>
                
                <div className="bg-gray-800 p-4 rounded-lg mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-300">Your Bid:</span>
                    <span className="text-green-400">€{currentBid || '0.00'}</span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-300">Platform Fee (30%):</span>
                    <span className="text-red-400">-€{currentBid ? (parseFloat(currentBid) * 0.3).toFixed(2) : '0.00'}</span>
                  </div>
                  <div className="border-t border-gray-700 my-2"></div>
                  <div className="flex justify-between items-center font-semibold">
                    <span className="text-gray-300">You Receive:</span>
                    <span className="text-blue-400">€{currentBid ? (parseFloat(currentBid) * 0.7).toFixed(2) : '0.00'}</span>
                  </div>
                </div>
                
                <button
                  type="submit"
                  className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-md transition"
                >
                  Submit Bid
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BiddingPage;
