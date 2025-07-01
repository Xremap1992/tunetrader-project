import React from 'react';
import { Link } from 'react-router-dom';

const PricingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Header */}
      <header className="py-6 px-4 md:px-8 border-b border-gray-800">
        <div className="container mx-auto">
          <div className="flex justify-between items-center">
            <Link to="/" className="text-2xl font-bold text-blue-500">TuneTrader</Link>
            <div className="flex space-x-4">
              <Link to="/login" className="px-4 py-2 border border-blue-500 text-blue-500 rounded hover:bg-blue-500 hover:text-black transition">
                Login
              </Link>
              <Link to="/register" className="px-4 py-2 bg-blue-500 text-black rounded hover:bg-blue-600 transition">
                Register
              </Link>
            </div>
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <div className="flex-grow py-12 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Simple, Transparent Pricing</h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              TuneTrader operates on a commission-based model. No monthly fees, no hidden costs.
              You only pay when you complete a transaction.
            </p>
          </div>
          
          {/* Commission Structure */}
          <div className="bg-gray-900 rounded-lg p-8 mb-12 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-center">Commission Structure</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-black p-6 rounded-lg border border-blue-500/30">
                <h3 className="text-xl font-semibold mb-4 text-blue-500">For Customers</h3>
                <p className="text-gray-300 mb-4">
                  As a customer, you pay only the price you agree to with the tuner. There are no additional fees or commissions.
                </p>
                <div className="bg-gray-800 p-4 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span>Tuning Service Price:</span>
                    <span>€100.00</span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span>Platform Fee:</span>
                    <span className="text-green-500">€0.00</span>
                  </div>
                  <div className="border-t border-gray-700 my-2"></div>
                  <div className="flex justify-between items-center font-semibold">
                    <span>Total Payment:</span>
                    <span>€100.00</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-black p-6 rounded-lg border border-blue-500/30">
                <h3 className="text-xl font-semibold mb-4 text-blue-500">For Tuners</h3>
                <p className="text-gray-300 mb-4">
                  As a tuner, you receive 70% of the agreed price. The platform retains a 30% commission for providing the marketplace, secure payments, and customer acquisition.
                </p>
                <div className="bg-gray-800 p-4 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span>Customer Payment:</span>
                    <span>€100.00</span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span>Platform Commission (30%):</span>
                    <span className="text-red-500">-€30.00</span>
                  </div>
                  <div className="border-t border-gray-700 my-2"></div>
                  <div className="flex justify-between items-center font-semibold">
                    <span>Your Earnings:</span>
                    <span>€70.00</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* How It Works */}
          <div className="max-w-4xl mx-auto mb-12">
            <h2 className="text-2xl font-bold mb-6 text-center">How Bidding Works</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gray-900 p-6 rounded-lg">
                <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center mb-4">
                  <span className="text-blue-500 text-xl font-bold">1</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">File Upload</h3>
                <p className="text-gray-400">
                  Customer uploads their ECU file and specifies the desired modifications.
                </p>
              </div>
              
              <div className="bg-gray-900 p-6 rounded-lg">
                <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center mb-4">
                  <span className="text-blue-500 text-xl font-bold">2</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">2-Hour Bidding</h3>
                <p className="text-gray-400">
                  Tuners have 2 hours to place competitive bids on the file modification request.
                </p>
              </div>
              
              <div className="bg-gray-900 p-6 rounded-lg">
                <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center mb-4">
                  <span className="text-blue-500 text-xl font-bold">3</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Selection & Payment</h3>
                <p className="text-gray-400">
                  Customer selects a tuner, makes payment, and the tuner delivers the modified file.
                </p>
              </div>
            </div>
          </div>
          
          {/* Payment Methods */}
          <div className="bg-gray-900 rounded-lg p-8 max-w-4xl mx-auto mb-12">
            <h2 className="text-2xl font-bold mb-6 text-center">Supported Payment Methods</h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-black p-4 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <svg className="w-10 h-10 mx-auto text-blue-500" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z" />
                  </svg>
                  <p className="mt-2 text-sm">Credit Card</p>
                </div>
              </div>
              
              <div className="bg-black p-4 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <svg className="w-10 h-10 mx-auto text-blue-500" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.31-8.86c-1.77-.45-2.34-.94-2.34-1.67 0-.84.79-1.43 2.1-1.43 1.38 0 1.9.66 1.94 1.64h1.71c-.05-1.34-.87-2.57-2.49-2.97V5H10.9v1.69c-1.51.32-2.72 1.3-2.72 2.81 0 1.79 1.49 2.69 3.66 3.21 1.95.46 2.34 1.15 2.34 1.87 0 .53-.39 1.39-2.1 1.39-1.6 0-2.23-.72-2.32-1.64H8.04c.1 1.7 1.36 2.66 2.86 2.97V19h2.34v-1.67c1.52-.29 2.72-1.16 2.73-2.77-.01-2.2-1.9-2.96-3.66-3.42z" />
                  </svg>
                  <p className="mt-2 text-sm">Bank Transfer</p>
                </div>
              </div>
              
              <div className="bg-black p-4 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <svg className="w-10 h-10 mx-auto text-blue-500" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.65 10C11.83 7.67 9.61 6 7 6c-3.31 0-6 2.69-6 6s2.69 6 6 6c2.61 0 4.83-1.67 5.65-4H17v4h4v-4h2v-4H12.65zM7 14c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z" />
                  </svg>
                  <p className="mt-2 text-sm">PayPal</p>
                </div>
              </div>
              
              <div className="bg-black p-4 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <svg className="w-10 h-10 mx-auto text-blue-500" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.06 11.57c.59-.69.94-1.59.94-2.57 0-1.86-1.27-3.43-3-3.87V3h-2v2h-2V3H9v2H6v2h2v10H6v2h3v2h2v-2h2v2h2v-2c2.21 0 4-1.79 4-4 0-1.45-.78-2.73-1.94-3.43zM10 7h4c1.1 0 2 .9 2 2s-.9 2-2 2h-4V7zm5 10h-5v-4h5c1.1 0 2 .9 2 2s-.9 2-2 2z" />
                  </svg>
                  <p className="mt-2 text-sm">Cryptocurrency</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* FAQ */}
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-center">Frequently Asked Questions</h2>
            
            <div className="space-y-4">
              <div className="bg-gray-900 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-2">When do I pay for the service?</h3>
                <p className="text-gray-400">
                  Payment is made after you select a tuner's bid but before the tuner starts working on your file. This ensures both parties are protected.
                </p>
              </div>
              
              <div className="bg-gray-900 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-2">How do tuners get paid?</h3>
                <p className="text-gray-400">
                  Once the customer confirms satisfaction with the delivered file, the payment (minus the 30% platform commission) is automatically released to the tuner's account.
                </p>
              </div>
              
              <div className="bg-gray-900 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-2">Is there a minimum bid amount?</h3>
                <p className="text-gray-400">
                  No, tuners are free to set their own competitive prices based on the complexity of the work and their expertise.
                </p>
              </div>
              
              <div className="bg-gray-900 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-2">What if I'm not satisfied with the tuning?</h3>
                <p className="text-gray-400">
                  We offer a dispute resolution process. If the delivered file doesn't meet the agreed specifications, you can open a dispute within 48 hours of delivery.
                </p>
              </div>
            </div>
          </div>
          
          {/* CTA */}
          <div className="text-center mt-16">
            <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/register" className="px-8 py-4 bg-blue-500 text-black text-lg font-semibold rounded-md hover:bg-blue-600 transition">
                Create Free Account
              </Link>
              <Link to="/" className="px-8 py-4 border border-white text-white text-lg font-semibold rounded-md hover:bg-white/10 transition">
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="py-6 px-4 md:px-8 border-t border-gray-800">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} TuneTrader. All rights reserved.
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-blue-500 text-sm">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-blue-500 text-sm">Terms of Service</a>
              <a href="#" className="text-gray-400 hover:text-blue-500 text-sm">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PricingPage;
