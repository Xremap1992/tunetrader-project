import React, { useState, useEffect } from 'react';
import type { Bid } from '../api';

interface TunerRankingsProps {
  showTitle?: boolean;
}

const TunerRankings: React.FC<TunerRankingsProps> = ({ showTitle = true }) => {
  const [tuners, setTuners] = useState<any[]>([]);
  const [bids, setBids] = useState<Bid[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [selectedTuner, setSelectedTuner] = useState<string | null>(null);

  useEffect(() => {
    // Mock data for tuners
    setTuners([
      { _id: '1', name: 'Иван Петров', rating: 4.9, completedJobs: 128, userId: 'user1' },
      { _id: '2', name: 'Мария Иванова', rating: 4.8, completedJobs: 95, userId: 'user2' },
      { _id: '3', name: 'Георги Димитров', rating: 4.7, completedJobs: 76, userId: 'user3' },
    ]);
    setLoading(false);
  }, []);

  const fetchBids = async (id: string) => {
    try {
      // Mock data for bids
      setBids([
        { _id: '101', fileId: 'file1', bidderId: { _id: id, userId: id, email: 'tuner@example.com', role: 'tuner', createdAt: '', updatedAt: '' }, amount: 150, status: 'pending', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
        { _id: '102', fileId: 'file2', bidderId: { _id: id, userId: id, email: 'tuner@example.com', role: 'tuner', createdAt: '', updatedAt: '' }, amount: 200, message: 'Мога да направя тази настройка за 2 дни', status: 'accepted', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
      ]);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Грешка при зареждане на офертите');
    }
  };

  const handleAcceptBid = async (bidId: string) => {
    try {
      // Mock API call
      console.log(`Accepting bid ${bidId}`);
      // Update bid status in state
      setBids(bids.map(bid => bid._id === bidId ? { ...bid, status: 'accepted' } : bid));
    } catch (err: any) {
      setError(err.response?.data?.message || 'Грешка при приемане на офертата');
    }
  };

  return (
    <div className="bg-gray-900 text-white p-6 rounded-lg">
      {showTitle && <h2 className="text-2xl font-bold mb-6">Топ Тунери</h2>}
      
      {error && (
        <div className="bg-red-900 text-white p-3 rounded mb-4">
          {error}
        </div>
      )}
      
      {loading ? (
        <div className="flex justify-center items-center h-32">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tuners.map((tuner) => (
            <div 
              key={tuner._id} 
              className={`bg-gray-800 p-4 rounded-lg cursor-pointer hover:bg-gray-700 ${selectedTuner === tuner._id ? 'border-2 border-blue-500' : ''}`}
              onClick={() => {
                setSelectedTuner(tuner._id);
                fetchBids(tuner._id);
              }}
            >
              <div className="flex items-center mb-3">
                <div className="bg-blue-700 rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold mr-3">
                  {tuner.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-bold">{tuner.name}</h3>
                  <div className="flex items-center text-yellow-500">
                    <span className="mr-1">{tuner.rating}</span>
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                  </div>
                </div>
              </div>
              <div className="text-gray-400">
                <p>{tuner.completedJobs} завършени проекта</p>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {selectedTuner && bids.length > 0 && (
        <div className="mt-8">
          <h3 className="text-xl font-bold mb-4">Оферти от избрания тунер</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-gray-800 rounded-lg overflow-hidden">
              <thead className="bg-gray-700">
                <tr>
                  <th className="px-4 py-3 text-left">ID</th>
                  <th className="px-4 py-3 text-left">Сума</th>
                  <th className="px-4 py-3 text-left">Съобщение</th>
                  <th className="px-4 py-3 text-left">Статус</th>
                  <th className="px-4 py-3 text-left">Действия</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {bids.map((bid) => (
                  <tr key={bid._id} className="hover:bg-gray-700">
                    <td className="px-4 py-3">
                      {bid.bidderId.userId}
                    </td>
                    <td className="px-4 py-3">
                      €{bid.amount.toFixed(2)}
                    </td>
                    <td className="px-4 py-3">
                      {bid.message || 'Няма съобщение'}
                    </td>
                    <td className="px-4 py-3">
                      {bid.status === 'pending' && (
                        <span className="bg-yellow-900 text-white px-2 py-1 rounded-full text-xs">В изчакване</span>
                      )}
                      {bid.status === 'accepted' && (
                        <span className="bg-green-900 text-white px-2 py-1 rounded-full text-xs">Приета</span>
                      )}
                      {bid.status === 'rejected' && (
                        <span className="bg-red-900 text-white px-2 py-1 rounded-full text-xs">Отхвърлена</span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      {bid.status === 'pending' && (
                        <button
                          onClick={() => handleAcceptBid(bid._id)}
                          className="bg-green-700 hover:bg-green-800 text-white px-3 py-1 rounded text-xs"
                        >
                          Приеми
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default TunerRankings;
