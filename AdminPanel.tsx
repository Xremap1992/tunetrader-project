import { useState, useEffect } from 'react';
import { adminAPI, User, File, Transaction, Stats } from '../api';

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState<string>('users');
  const [users, setUsers] = useState<User[]>([]);
  const [files, setFiles] = useState<File[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        switch (activeTab) {
          case 'users':
            const usersResponse = await adminAPI.getAllUsers();
            setUsers(usersResponse.data);
            break;
          case 'files':
            const filesResponse = await adminAPI.getAllFiles();
            setFiles(filesResponse.data);
            break;
          case 'transactions':
            const transactionsResponse = await adminAPI.getAllTransactions();
            setTransactions(transactionsResponse.data);
            break;
          case 'stats':
            const statsResponse = await adminAPI.getStats();
            setStats(statsResponse.data);
            break;
        }
      } catch (err: any) {
        setError(err.response?.data?.message || 'Error fetching data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [activeTab]);

  const handleBanUser = async (userId: string, currentBanStatus: boolean) => {
    try {
      await adminAPI.banUser(userId, !currentBanStatus);
      // Update users list
      const updatedUsers = users.map(user => 
        user._id === userId ? { ...user, banned: !currentBanStatus } : user
      );
      setUsers(updatedUsers);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error updating user');
    }
  };

  const handleDeleteFile = async (fileId: string) => {
    try {
      await adminAPI.deleteFile(fileId);
      // Update files list
      setFiles(files.filter(file => file._id !== fileId));
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error deleting file');
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Panel</h1>
      
      {error && (
        <div className="bg-red-900 text-white p-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className="flex mb-6 border-b border-gray-700">
        <button 
          className={`py-2 px-4 ${activeTab === 'users' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-400'}`}
          onClick={() => setActiveTab('users')}
        >
          Users
        </button>
        <button 
          className={`py-2 px-4 ${activeTab === 'files' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-400'}`}
          onClick={() => setActiveTab('files')}
        >
          Files
        </button>
        <button 
          className={`py-2 px-4 ${activeTab === 'transactions' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-400'}`}
          onClick={() => setActiveTab('transactions')}
        >
          Transactions
        </button>
        <button 
          className={`py-2 px-4 ${activeTab === 'stats' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-400'}`}
          onClick={() => setActiveTab('stats')}
        >
          Statistics
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <>
          {activeTab === 'users' && (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-gray-800 rounded-lg overflow-hidden">
                <thead className="bg-gray-700">
                  <tr>
                    <th className="px-4 py-3 text-left">ID</th>
                    <th className="px-4 py-3 text-left">Email</th>
                    <th className="px-4 py-3 text-left">Role</th>
                    <th className="px-4 py-3 text-left">Status</th>
                    <th className="px-4 py-3 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {users.map((user) => (
                    <tr key={user._id} className="hover:bg-gray-700">
                      <td className="px-4 py-3">{user.userId}</td>
                      <td className="px-4 py-3">{user.email}</td>
                      <td className="px-4 py-3 capitalize">{user.role}</td>
                      <td className="px-4 py-3">
                        {user.banned ? (
                          <span className="bg-red-900 text-white px-2 py-1 rounded-full text-xs">Banned</span>
                        ) : (
                          <span className="bg-green-900 text-white px-2 py-1 rounded-full text-xs">Active</span>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <button
                          onClick={() => handleBanUser(user._id, user.banned || false)}
                          className={`px-3 py-1 rounded text-xs ${user.banned ? 'bg-green-700 hover:bg-green-800' : 'bg-red-700 hover:bg-red-800'}`}
                        >
                          {user.banned ? 'Unban' : 'Ban'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'files' && (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-gray-800 rounded-lg overflow-hidden">
                <thead className="bg-gray-700">
                  <tr>
                    <th className="px-4 py-3 text-left">Name</th>
                    <th className="px-4 py-3 text-left">Uploaded By</th>
                    <th className="px-4 py-3 text-left">Vehicle</th>
                    <th className="px-4 py-3 text-left">Status</th>
                    <th className="px-4 py-3 text-left">Date</th>
                    <th className="px-4 py-3 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {files.map((file) => (
                    <tr key={file._id} className="hover:bg-gray-700">
                      <td className="px-4 py-3">{file.originalName}</td>
                      <td className="px-4 py-3">{file.uploadedBy.email}</td>
                      <td className="px-4 py-3">
                        {file.vehicleDetails.make} {file.vehicleDetails.model} {file.vehicleDetails.year}
                      </td>
                      <td className="px-4 py-3 capitalize">{file.status}</td>
                      <td className="px-4 py-3">{formatDate(file.createdAt)}</td>
                      <td className="px-4 py-3">
                        <button
                          onClick={() => handleDeleteFile(file._id)}
                          className="bg-red-700 hover:bg-red-800 px-3 py-1 rounded text-xs"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'transactions' && (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-gray-800 rounded-lg overflow-hidden">
                <thead className="bg-gray-700">
                  <tr>
                    <th className="px-4 py-3 text-left">ID</th>
                    <th className="px-4 py-3 text-left">Customer</th>
                    <th className="px-4 py-3 text-left">Tuner</th>
                    <th className="px-4 py-3 text-left">Amount</th>
                    <th className="px-4 py-3 text-left">Fee</th>
                    <th className="px-4 py-3 text-left">Status</th>
                    <th className="px-4 py-3 text-left">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {transactions.map((transaction) => (
                    <tr key={transaction._id} className="hover:bg-gray-700">
                      <td className="px-4 py-3">{transaction._id.substring(0, 8)}</td>
                      <td className="px-4 py-3">{transaction.customerId.email}</td>
                      <td className="px-4 py-3">{transaction.tunerId.email}</td>
                      <td className="px-4 py-3">€{transaction.amount.toFixed(2)}</td>
                      <td className="px-4 py-3">€{transaction.platformFee.toFixed(2)}</td>
                      <td className="px-4 py-3">
                        {transaction.status === 'pending' && (
                          <span className="bg-yellow-900 text-white px-2 py-1 rounded-full text-xs">Pending</span>
                        )}
                        {transaction.status === 'completed' && (
                          <span className="bg-green-900 text-white px-2 py-1 rounded-full text-xs">Completed</span>
                        )}
                        {transaction.status === 'failed' && (
                          <span className="bg-red-900 text-white px-2 py-1 rounded-full text-xs">Failed</span>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        {formatDate(transaction.createdAt)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'stats' && stats && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-800 p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-4">User Statistics</h3>
                <div className="space-y-4">
                  {stats.users.map((item) => (
                    <div key={item._id} className="flex justify-between items-center">
                      <span className="capitalize">{item._id} Users</span>
                      <span className="bg-blue-900 text-white px-3 py-1 rounded-full">{item.count}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gray-800 p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-4">File Statistics</h3>
                <div className="space-y-4">
                  {stats.files.map((item) => (
                    <div key={item._id} className="flex justify-between items-center">
                      <span className="capitalize">{item._id} Files</span>
                      <span className="bg-blue-900 text-white px-3 py-1 rounded-full">{item.count}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gray-800 p-6 rounded-lg md:col-span-2">
                <h3 className="text-xl font-bold mb-4">Revenue Statistics</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gradient-to-r from-blue-900 to-blue-700 p-4 rounded-lg">
                    <p className="text-gray-300 mb-2">Total Revenue</p>
                    <p className="text-white text-2xl font-bold">€{stats.earnings.totalEarnings.toFixed(2)}</p>
                  </div>
                  <div className="bg-gradient-to-r from-purple-900 to-purple-700 p-4 rounded-lg">
                    <p className="text-gray-300 mb-2">Total Transactions</p>
                    <p className="text-white text-2xl font-bold">{stats.earnings.totalTransactions}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AdminPanel;
