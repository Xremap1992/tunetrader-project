import React, { useState } from 'react';

interface FileModificationOption {
  id: string;
  name: string;
  description: string;
  category: string;
  engineType: string[];
  price: number;
  popular: boolean;
}

const FileModificationOptions: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedEngineType, setSelectedEngineType] = useState<string>('all');
  
  // Sample data for modification options
  const modificationOptions: FileModificationOption[] = [
    {
      id: 'dpf-off',
      name: 'DPF Off',
      description: 'Remove diesel particulate filter restrictions',
      category: 'emissions',
      engineType: ['diesel'],
      price: 80,
      popular: true
    },
    {
      id: 'egr-off',
      name: 'EGR Off',
      description: 'Disable exhaust gas recirculation system',
      category: 'emissions',
      engineType: ['diesel', 'petrol'],
      price: 70,
      popular: true
    },
    {
      id: 'adblue-off',
      name: 'AdBlue Off',
      description: 'Disable AdBlue/SCR system',
      category: 'emissions',
      engineType: ['diesel'],
      price: 90,
      popular: false
    },
    {
      id: 'dtc-off',
      name: 'DTC Off',
      description: 'Remove diagnostic trouble codes',
      category: 'emissions',
      engineType: ['diesel', 'petrol'],
      price: 50,
      popular: false
    },
    {
      id: 'stage1',
      name: 'Stage 1 Tuning',
      description: 'Optimized ECU mapping for better performance',
      category: 'performance',
      engineType: ['diesel', 'petrol'],
      price: 150,
      popular: true
    },
    {
      id: 'stage2',
      name: 'Stage 2 Tuning',
      description: 'Advanced tuning with hardware modifications',
      category: 'performance',
      engineType: ['diesel', 'petrol'],
      price: 250,
      popular: false
    },
    {
      id: 'pops-bangs',
      name: 'Pops & Bangs',
      description: 'Add exhaust pops and bangs on deceleration',
      category: 'performance',
      engineType: ['petrol'],
      price: 100,
      popular: true
    },
    {
      id: 'vmax-off',
      name: 'Speed Limiter Removal',
      description: 'Remove factory speed limitations',
      category: 'performance',
      engineType: ['diesel', 'petrol'],
      price: 80,
      popular: false
    },
    {
      id: 'launch-control',
      name: 'Launch Control',
      description: 'Add or optimize launch control functionality',
      category: 'performance',
      engineType: ['petrol'],
      price: 120,
      popular: false
    },
    {
      id: 'start-stop-off',
      name: 'Start-Stop Disable',
      description: 'Disable automatic start-stop system',
      category: 'comfort',
      engineType: ['diesel', 'petrol'],
      price: 40,
      popular: true
    },
    {
      id: 'readiness-fix',
      name: 'Readiness Fix',
      description: 'Fix readiness status for emissions testing',
      category: 'emissions',
      engineType: ['diesel', 'petrol'],
      price: 60,
      popular: false
    },
    {
      id: 'checksum-fix',
      name: 'Checksum Fix',
      description: 'Correct checksum values in ECU file',
      category: 'technical',
      engineType: ['diesel', 'petrol'],
      price: 30,
      popular: false
    }
  ];

  // Filter options based on selected category and engine type
  const filteredOptions = modificationOptions.filter(option => 
    (selectedCategory === 'all' || option.category === selectedCategory) &&
    (selectedEngineType === 'all' || option.engineType.includes(selectedEngineType))
  );

  // Group options by category for display
  const categories = ['emissions', 'performance', 'comfort', 'technical'];
  
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">File Modification Options</h2>
        
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <div className="flex items-center">
            <label htmlFor="category-filter" className="mr-2 font-medium">Category:</label>
            <select 
              id="category-filter"
              className="border rounded-md px-3 py-2"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="all">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>
          </div>
          
          <div className="flex items-center">
            <label htmlFor="engine-filter" className="mr-2 font-medium">Engine Type:</label>
            <select 
              id="engine-filter"
              className="border rounded-md px-3 py-2"
              value={selectedEngineType}
              onChange={(e) => setSelectedEngineType(e.target.value)}
            >
              <option value="all">All Engines</option>
              <option value="diesel">Diesel</option>
              <option value="petrol">Petrol</option>
            </select>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredOptions.map(option => (
            <div 
              key={option.id} 
              className={`border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition ${
                option.popular ? 'border-blue-500' : 'border-gray-200'
              }`}
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-semibold">{option.name}</h3>
                  {option.popular && (
                    <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                      Popular
                    </span>
                  )}
                </div>
                <p className="text-gray-600 mb-4">{option.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold">€{option.price}</span>
                  <span className={`px-2 py-1 rounded text-xs font-semibold ${
                    option.category === 'emissions' ? 'bg-red-100 text-red-800' :
                    option.category === 'performance' ? 'bg-purple-100 text-purple-800' :
                    option.category === 'comfort' ? 'bg-green-100 text-green-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {option.category.charAt(0).toUpperCase() + option.category.slice(1)}
                  </span>
                </div>
              </div>
              <div className="px-6 py-3 bg-gray-50 border-t border-gray-200">
                <button className="w-full py-2 bg-blue-600 text-white font-medium rounded hover:bg-blue-700 transition">
                  Select Option
                </button>
              </div>
            </div>
          ))}
        </div>
        
        {filteredOptions.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">No modification options match your filters.</p>
          </div>
        )}
        
        <div className="mt-8 text-center">
          <p className="text-gray-600 mb-4">
            Don't see what you're looking for? Contact us for custom modifications.
          </p>
          <button className="px-6 py-2 border-2 border-blue-600 text-blue-600 font-semibold rounded-md hover:bg-blue-50 transition">
            Request Custom Modification
          </button>
        </div>
      </div>
    </section>
  );
};

export default FileModificationOptions;
