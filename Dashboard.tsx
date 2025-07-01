import React, { useState } from 'react';

interface DashboardProps {
  username?: string;
}

const Dashboard: React.FC<DashboardProps> = ({ username = 'User' }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'requests' | 'sales' | 'wallet'>('overview');
  
  // Sample data for dashboard
  const stats = {
    pendingRequests: 3,
    completedRequests: 12,
    activeRequests: 2,
    unreadMessages: 5,
    walletBalance: 245.50,
    pendingPayments: 120.00,
    totalEarnings: 1250.75,
    totalSpent: 780.25
  };
  
  const recentActivity = [
    {
      id: 1,
      type: 'request',
      title: 'BMW 320d DPF Off',
      status: 'completed',
      date: new Date(Date.now() - 86400000) // 1 day ago
    },
    {
      id: 2,
      type: 'message',
      title: 'New message from TuneMaster Pro',
      status: 'unread',
      date: new Date(Date.now() - 43200000) // 12 hours ago
    },
    {
      id: 3,
      type: 'payment',
      title: 'Payment received',
      amount: 120.00,
      status: 'completed',
      date: new Date(Date.now() - 172800000) // 2 days ago
    },
    {
      id: 4,
      type: 'request',
      title: 'Audi A4 Stage 1 Tuning',
      status: 'in_progress',
      date: new Date(Date.now() - 259200000) // 3 days ago
    }
  ];

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold">Welcome back, {username}</h2>
            <p className="text-gray-600">Here's what's happening with your account today.</p>
          </div>
          <div className="mt-4 md:mt-0">
            <button className="px-4 py-2 bg-blue-600 text-white font-medium rounded hover:bg-blue-700 transition">
              New Request
            </button>
          </div>
        </div>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-500 text-sm">Pending Requests</p>
                <h3 className="text-2xl font-bold mt-1">{stats.pendingRequests}</h3>
              </div>
              <div className="p-2 bg-blue-100 rounded-lg">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
            </div>
            <div className="mt-4">
              <span className="text-green-600 text-sm font-medium">
                +2 new
              </span>
              <span className="text-gray-500 text-sm ml-2">
                since yesterday
              </span>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-500 text-sm">Unread Messages</p>
                <h3 className="text-2xl font-bold mt-1">{stats.unreadMessages}</h3>
              </div>
              <div className="p-2 bg-green-100 rounded-lg">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
              </div>
            </div>
            <div className="mt-4">
              <span className="text-green-600 text-sm font-medium">
                +3 new
              </span>
              <span className="text-gray-500 text-sm ml-2">
                since yesterday
              </span>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-500 text-sm">Wallet Balance</p>
                <h3 className="text-2xl font-bold mt-1">€{stats.walletBalance.toFixed(2)}</h3>
              </div>
              <div className="p-2 bg-purple-100 rounded-lg">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </div>
            </div>
            <div className="mt-4">
              <span className="text-green-600 text-sm font-medium">
                +€120.00
              </span>
              <span className="text-gray-500 text-sm ml-2">
                pending
              </span>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-500 text-sm">Completed Requests</p>
                <h3 className="text-2xl font-bold mt-1">{stats.completedRequests}</h3>
              </div>
              <div className="p-2 bg-yellow-100 rounded-lg">
                <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <div className="mt-4">
              <span className="text-green-600 text-sm font-medium">
                +5 new
              </span>
              <span className="text-gray-500 text-sm ml-2">
                this month
              </span>
            </div>
          </div>
        </div>
        
        {/* Tabs */}
        <div className="mb-6 border-b">
          <nav className="flex space-x-8">
            <button
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'overview'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setActiveTab('overview')}
            >
              Overview
            </button>
            <button
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'requests'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setActiveTab('requests')}
            >
              Requests
            </button>
            <button
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'sales'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setActiveTab('sales')}
            >
              Sales
            </button>
            <button
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'wallet'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setActiveTab('wallet')}
            >
              Wallet
            </button>
          </nav>
        </div>
        
        {/* Tab Content */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          {activeTab === 'overview' && (
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
              <div className="space-y-4">
                {recentActivity.map(activity => (
                  <div key={activity.id} className="flex items-center p-3 border rounded-lg hover:bg-gray-50 transition">
                    <div className={`p-2 rounded-full mr-4 ${
                      activity.type === 'request' ? 'bg-blue-100 text-blue-600' :
                      activity.type === 'message' ? 'bg-green-100 text-green-600' :
                      'bg-purple-100 text-purple-600'
                    }`}>
                      {activity.type === 'request' && (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                      )}
                      {activity.type === 'message' && (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                        </svg>
                      )}
                      {activity.type === 'payment' && (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                        </svg>
                      )}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">{activity.title}</h4>
                      <p className="text-sm text-gray-500">
                        {activity.type === 'payment' && `€${activity.amount?.toFixed(2)} • `}
                        {new Intl.DateTimeFormat('en-US', {
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        }).format(activity.date)}
                      </p>
                    </div>
                    <div>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        activity.status === 'completed' ? 'bg-green-100 text-green-800' :
                        activity.status === 'in_progress' ? 'bg-blue-100 text-blue-800' :
                        activity.status === 'unread' ? 'bg-red-100 text-red-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {activity.status === 'in_progress' ? 'In Progress' :
                         activity.status.charAt(0).toUpperCase() + activity.status.slice(1)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-4">Become a Verified Tuner</h3>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-start">
                    <div className="p-2 bg-blue-100 rounded-full mr-4">
                      <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium text-blue-800">Sell your tuning services on our platform</h4>
                      <p className="text-sm text-blue-700 mt-1">
                        Apply to become a verified tuner and start earning by providing tuning services to customers worldwide.
                      </p>
                      <button className="mt-3 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-700 transition">
                        Apply Now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'requests' && (
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-4">Your Requests</h3>
              <p className="text-gray-600">View and manage your tuning requests.</p>
              
              <div className="mt-4 border-t pt-4">
                <p className="text-center text-gray-500 py-8">
                  This tab will display all your active and past tuning requests.
                </p>
              </div>
            </div>
          )}
          
          {activeTab === 'sales' && (
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-4">Your Sales</h3>
              <p className="text-gray-600">Track your sales and earnings as a tuner.</p>
              
              <div className="mt-4 border-t pt-4">
                <p className="text-center text-gray-500 py-8">
                  This tab will display your sales statistics and history once you become a verified tuner.
                </p>
              </div>
            </div>
          )}
          
          {activeTab === 'wallet' && (
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-4">Your Wallet</h3>
              <p className="text-gray-600">Manage your funds and transactions.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-medium text-gray-700 mb-2">Balance</h4>
                  <p className="text-2xl font-bold">€{stats.walletBalance.toFixed(2)}</p>
                  <div className="mt-4 flex space-x-3">
                    <button className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition">
                      Deposit
                    </button>
                    <button className="px-3 py-1 border border-gray-300 text-gray-700 text-sm rounded hover:bg-gray-100 transition">
                      Withdraw
                    </button>
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-medium text-gray-700 mb-2">Pending</h4>
                  <p className="text-2xl font-bold">€{stats.pendingPayments.toFixed(2)}</p>
                  <p className="text-sm text-gray-500 mt-1">
                    Funds that are currently being processed
                  </p>
                </div>
              </div>
              
              <div className="mt-6">
                <h4 className="font-medium text-gray-700 mb-2">Transaction History</h4>
                <p className="text-center text-gray-500 py-8">
                  Your transaction history will appear here.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
