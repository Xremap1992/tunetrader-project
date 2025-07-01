import React from 'react';

const RecentRequests: React.FC = () => {
  // Sample data for recent requests
  const recentRequests = [
    {
      id: 1,
      carMake: 'BMW',
      carModel: '320d',
      year: 2018,
      engineType: 'Diesel',
      requestType: 'DPF Off + EGR Off',
      status: 'Completed',
      price: '€120'
    },
    {
      id: 2,
      carMake: 'Audi',
      carModel: 'A4',
      year: 2019,
      engineType: 'Diesel',
      requestType: 'Stage 1 Tuning',
      status: 'In Progress',
      price: '€150'
    },
    {
      id: 3,
      carMake: 'Mercedes',
      carModel: 'C220',
      year: 2020,
      engineType: 'Diesel',
      requestType: 'AdBlue Off',
      status: 'Waiting',
      price: '€100'
    },
    {
      id: 4,
      carMake: 'Volkswagen',
      carModel: 'Golf GTI',
      year: 2021,
      engineType: 'Petrol',
      requestType: 'Stage 2 Tuning',
      status: 'Completed',
      price: '€200'
    }
  ];

  return (
    <section className="py-12 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Recent Tuning Requests</h2>
        
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-lg">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="py-3 px-4 text-left">Vehicle</th>
                <th className="py-3 px-4 text-left">Year</th>
                <th className="py-3 px-4 text-left">Engine</th>
                <th className="py-3 px-4 text-left">Request Type</th>
                <th className="py-3 px-4 text-left">Status</th>
                <th className="py-3 px-4 text-left">Price</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {recentRequests.map(request => (
                <tr key={request.id} className="hover:bg-gray-50">
                  <td className="py-3 px-4">{request.carMake} {request.carModel}</td>
                  <td className="py-3 px-4">{request.year}</td>
                  <td className="py-3 px-4">{request.engineType}</td>
                  <td className="py-3 px-4">{request.requestType}</td>
                  <td className="py-3 px-4">
                    <span className={`inline-block px-2 py-1 rounded text-xs font-semibold
                      ${request.status === 'Completed' ? 'bg-green-100 text-green-800' : 
                        request.status === 'In Progress' ? 'bg-blue-100 text-blue-800' : 
                        'bg-yellow-100 text-yellow-800'}`}>
                      {request.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-medium">{request.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="mt-8 text-center">
          <button className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition">
            View All Requests
          </button>
        </div>
      </div>
    </section>
  );
};

export default RecentRequests;
