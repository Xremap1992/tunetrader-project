import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <div className="relative h-screen flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/30 to-black z-0">
          <div className="absolute inset-0 bg-[url('/src/assets/images/car-dashboard.jpeg')] bg-cover bg-center opacity-30 mix-blend-overlay"></div>
        </div>
        
        <div className="container mx-auto px-4 z-10">
          <nav className="absolute top-0 left-0 right-0 py-6 px-4 md:px-8">
            <div className="flex justify-between items-center">
              <div className="text-2xl font-bold text-blue-500">TuneTrader</div>
              <div className="flex space-x-4">
                <Link to="/login" className="px-4 py-2 border border-blue-500 text-blue-500 rounded hover:bg-blue-500 hover:text-black transition">
                  Login
                </Link>
                <Link to="/register" className="px-4 py-2 bg-blue-500 text-black rounded hover:bg-blue-600 transition">
                  Register
                </Link>
              </div>
            </div>
          </nav>
          
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="text-blue-500">Professional</span> ECU Tuning Marketplace
            </h1>
            <p className="text-xl md:text-2xl mb-10 text-gray-300">
              Connect with verified tuning experts, get competitive bids, and optimize your vehicle's performance with our secure platform.
            </p>
            <div className="flex flex-col md:flex-row justify-center gap-4">
              <Link to="/register" className="px-8 py-4 bg-blue-500 text-black text-lg font-semibold rounded-md hover:bg-blue-600 transition">
                Get Started
              </Link>
              <Link to="/pricing" className="px-8 py-4 border border-white text-white text-lg font-semibold rounded-md hover:bg-white/10 transition">
                View Pricing
              </Link>
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-10 left-0 right-0 flex justify-center">
          <div className="animate-bounce p-2 bg-blue-500 rounded-full">
            <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </div>
      
      {/* Features Section */}
      <div className="py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">How TuneTrader Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="bg-black p-8 rounded-lg border border-blue-500/30 hover:border-blue-500 transition">
              <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Upload Your File</h3>
              <p className="text-gray-400">
                Securely upload your original ECU file through our encrypted platform. We support all major file formats from leading manufacturers.
              </p>
            </div>
            
            <div className="bg-black p-8 rounded-lg border border-blue-500/30 hover:border-blue-500 transition">
              <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Select Modifications</h3>
              <p className="text-gray-400">
                Choose from our comprehensive range of tuning options including DPF/EGR removal, performance enhancements, and custom modifications.
              </p>
            </div>
            
            <div className="bg-black p-8 rounded-lg border border-blue-500/30 hover:border-blue-500 transition">
              <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Receive Competitive Bids</h3>
              <p className="text-gray-400">
                Our network of verified professional tuners will review your request and place competitive bids to complete your modifications.
              </p>
            </div>
          </div>
          
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="bg-black p-8 rounded-lg border border-blue-500/30 hover:border-blue-500 transition">
              <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Choose Your Tuner</h3>
              <p className="text-gray-400">
                Select the best offer based on price, tuner ratings, and delivery time. Our secure messaging system lets you discuss details directly with the tuner.
              </p>
            </div>
            
            <div className="bg-black p-8 rounded-lg border border-blue-500/30 hover:border-blue-500 transition">
              <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Download Your Modified File</h3>
              <p className="text-gray-400">
                Once complete, download your professionally modified ECU file, ready to be flashed to your vehicle. All files come with a satisfaction guarantee.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Benefits Section */}
      <div className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0 md:pr-10">
              <h2 className="text-4xl font-bold mb-6">Why Choose TuneTrader?</h2>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-xl font-semibold mb-1">Verified Professionals</h3>
                    <p className="text-gray-400">All tuners on our platform are verified experts with proven track records and customer reviews.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-xl font-semibold mb-1">Secure Transactions</h3>
                    <p className="text-gray-400">Our escrow payment system ensures you only pay when you're satisfied with the completed work.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-xl font-semibold mb-1">Competitive Pricing</h3>
                    <p className="text-gray-400">Get the best price through our bidding system where tuners compete for your business.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-xl font-semibold mb-1">File Security</h3>
                    <p className="text-gray-400">All files are encrypted during transfer and storage, ensuring your data remains protected.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="md:w-1/2">
              <div className="bg-gray-900 p-8 rounded-lg border border-blue-500/30">
                <h3 className="text-2xl font-bold mb-6">Ready to optimize your vehicle?</h3>
                <p className="text-gray-400 mb-8">
                  Join thousands of satisfied customers who have enhanced their vehicle's performance through our platform.
                </p>
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="bg-black p-4 rounded-lg text-center">
                    <div className="text-3xl font-bold text-blue-500 mb-1">5,000+</div>
                    <div className="text-sm text-gray-400">Completed Tunes</div>
                  </div>
                  <div className="bg-black p-4 rounded-lg text-center">
                    <div className="text-3xl font-bold text-blue-500 mb-1">98%</div>
                    <div className="text-sm text-gray-400">Satisfaction Rate</div>
                  </div>
                  <div className="bg-black p-4 rounded-lg text-center">
                    <div className="text-3xl font-bold text-blue-500 mb-1">100+</div>
                    <div className="text-sm text-gray-400">Verified Tuners</div>
                  </div>
                  <div className="bg-black p-4 rounded-lg text-center">
                    <div className="text-3xl font-bold text-blue-500 mb-1">24/7</div>
                    <div className="text-sm text-gray-400">Support</div>
                  </div>
                </div>
                <Link to="/register" className="block w-full py-3 bg-blue-500 text-black text-center font-semibold rounded-md hover:bg-blue-600 transition">
                  Create Free Account
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Testimonials Section */}
      <div className="py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">What Our Customers Say</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-black p-8 rounded-lg border border-blue-500/30">
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-500">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
              <p className="text-gray-300 mb-6">
                "The Stage 1 tune I received for my BMW 320d completely transformed the car. More power, better throttle response, and even slightly improved fuel economy. The process was simple and the tuner was very professional."
              </p>
              <div className="flex items-center">
                <div className="font-semibold">Michael K.</div>
                <div className="mx-2">•</div>
                <div className="text-gray-400">BMW 320d</div>
              </div>
            </div>
            
            <div className="bg-black p-8 rounded-lg border border-blue-500/30">
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-500">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
              <p className="text-gray-300 mb-6">
                "I needed a DPF and EGR delete for my Mercedes Sprinter. Got multiple bids within hours and chose a tuner with great reviews. The file was ready in 24 hours and works perfectly. No more regeneration issues!"
              </p>
              <div className="flex items-center">
                <div className="font-semibold">Sarah T.</div>
                <div className="mx-2">•</div>
                <div className="text-gray-400">Mercedes Sprinter</div>
              </div>
            </div>
            
            <div className="bg-black p-8 rounded-lg border border-blue-500/30">
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-500">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
              <p className="text-gray-300 mb-6">
                "As a tuner on this platform, I appreciate how well it's designed. The secure payment system protects both parties, and the messaging system makes communication with clients seamless. Highly recommended for professionals."
              </p>
              <div className="flex items-center">
                <div className="font-semibold">Alex P.</div>
                <div className="mx-2">•</div>
                <div className="text-gray-400">Verified Tuner</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* CTA Section */}
      <div className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-blue-900 to-blue-700 rounded-xl p-10 text-center">
            <h2 className="text-4xl font-bold mb-6">Ready to Unlock Your Vehicle's Potential?</h2>
            <p className="text-xl mb-10 max-w-2xl mx-auto">
              Join TuneTrader today and connect with professional tuners who can optimize your vehicle's performance.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/register" className="px-8 py-4 bg-black text-white text-lg font-semibold rounded-md hover:bg-gray-900 transition">
                Create Free Account
              </Link>
              <Link to="/pricing" className="px-8 py-4 bg-white text-blue-700 text-lg font-semibold rounded-md hover:bg-gray-100 transition">
                View Pricing
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="bg-gray-900 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="text-2xl font-bold text-blue-500 mb-4">TuneTrader</div>
              <p className="text-gray-400 mb-4">
                The premier marketplace connecting vehicle owners with professional ECU tuners.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-blue-500">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-blue-500">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-blue-500">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" />
                  </svg>
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Services</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-blue-500">ECU Remapping</a></li>
                <li><a href="#" className="text-gray-400 hover:text-blue-500">DPF/EGR Solutions</a></li>
                <li><a href="#" className="text-gray-400 hover:text-blue-500">Performance Tuning</a></li>
                <li><a href="#" className="text-gray-400 hover:text-blue-500">AdBlue Solutions</a></li>
                <li><a href="#" className="text-gray-400 hover:text-blue-500">Diagnostic Services</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-blue-500">About Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-blue-500">How It Works</a></li>
                <li><Link to="/pricing" className="text-gray-400 hover:text-blue-500">Pricing</Link></li>
                <li><a href="#" className="text-gray-400 hover:text-blue-500">FAQ</a></li>
                <li><a href="#" className="text-gray-400 hover:text-blue-500">Contact Us</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-blue-500">Terms of Service</a></li>
                <li><a href="#" className="text-gray-400 hover:text-blue-500">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-blue-500">Cookie Policy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-blue-500">Refund Policy</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} TuneTrader. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
