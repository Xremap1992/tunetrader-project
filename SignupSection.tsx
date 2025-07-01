import React from 'react';

const SignupSection: React.FC = () => {
  return (
    <section className="py-12 bg-blue-700 text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl mb-8">
            Join our platform today and connect with professional tuners for your vehicle optimization needs.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="px-8 py-3 bg-white text-blue-700 font-semibold rounded-md hover:bg-gray-100 transition">
              Sign Up as Customer
            </button>
            <button className="px-8 py-3 border-2 border-white text-white font-semibold rounded-md hover:bg-blue-600 transition">
              Register as Tuner
            </button>
          </div>
          
          <p className="mt-6 text-blue-100">
            Already have an account? <a href="#" className="underline hover:text-white">Log in here</a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default SignupSection;
