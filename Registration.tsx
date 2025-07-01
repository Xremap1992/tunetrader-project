import React, { useState } from 'react';

interface RegistrationProps {
  initialRole?: 'customer' | 'tuner';
}

const Registration: React.FC<RegistrationProps> = ({ initialRole = 'customer' }) => {
  const [role, setRole] = useState<'customer' | 'tuner'>(initialRole);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    companyName: '',
    phoneNumber: '',
    country: '',
    specialties: [] as string[],
    experience: '',
    website: '',
    agreeTerms: false
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({
        ...prev,
        [name]: checked
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };
  
  const handleSpecialtyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    
    if (checked) {
      setFormData(prev => ({
        ...prev,
        specialties: [...prev.specialties, value]
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        specialties: prev.specialties.filter(specialty => specialty !== value)
      }));
    }
  };
  
  const handleNextStep = () => {
    setStep(prev => prev + 1);
  };
  
  const handlePrevStep = () => {
    setStep(prev => prev - 1);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, this would send the registration data to the server
    alert('Registration submitted successfully! This would create an account in a real application.');
  };

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Create Your Account</h2>
        
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
          {/* Role Selection */}
          <div className="p-6 bg-gray-100 border-b">
            <div className="flex justify-center space-x-4">
              <button
                className={`px-6 py-3 rounded-md font-medium ${
                  role === 'customer'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
                onClick={() => setRole('customer')}
              >
                Register as Customer
              </button>
              <button
                className={`px-6 py-3 rounded-md font-medium ${
                  role === 'tuner'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
                onClick={() => setRole('tuner')}
              >
                Register as Tuner
              </button>
            </div>
          </div>
          
          {/* Progress Steps */}
          <div className="px-6 py-4 border-b">
            <div className="flex justify-between">
              <div className={`flex flex-col items-center ${step >= 1 ? 'text-blue-600' : 'text-gray-400'}`}>
                <div className={`w-8 h-8 flex items-center justify-center rounded-full ${step >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>
                  1
                </div>
                <span className="text-xs mt-1">Account Info</span>
              </div>
              <div className={`flex-1 border-t-2 self-center mx-2 ${step >= 2 ? 'border-blue-600' : 'border-gray-200'}`}></div>
              <div className={`flex flex-col items-center ${step >= 2 ? 'text-blue-600' : 'text-gray-400'}`}>
                <div className={`w-8 h-8 flex items-center justify-center rounded-full ${step >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>
                  2
                </div>
                <span className="text-xs mt-1">Personal Details</span>
              </div>
              {role === 'tuner' && (
                <>
                  <div className={`flex-1 border-t-2 self-center mx-2 ${step >= 3 ? 'border-blue-600' : 'border-gray-200'}`}></div>
                  <div className={`flex flex-col items-center ${step >= 3 ? 'text-blue-600' : 'text-gray-400'}`}>
                    <div className={`w-8 h-8 flex items-center justify-center rounded-full ${step >= 3 ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>
                      3
                    </div>
                    <span className="text-xs mt-1">Tuner Profile</span>
                  </div>
                </>
              )}
              <div className={`flex-1 border-t-2 self-center mx-2 ${step >= (role === 'tuner' ? 4 : 3) ? 'border-blue-600' : 'border-gray-200'}`}></div>
              <div className={`flex flex-col items-center ${step >= (role === 'tuner' ? 4 : 3) ? 'text-blue-600' : 'text-gray-400'}`}>
                <div className={`w-8 h-8 flex items-center justify-center rounded-full ${step >= (role === 'tuner' ? 4 : 3) ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>
                  {role === 'tuner' ? 4 : 3}
                </div>
                <span className="text-xs mt-1">Confirmation</span>
              </div>
            </div>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="p-6">
              {/* Step 1: Account Information */}
              {step === 1 && (
                <div>
                  <h3 className="text-xl font-semibold mb-4">Account Information</h3>
                  <p className="text-gray-600 mb-6">
                    Create your login credentials for the platform.
                  </p>
                  
                  <div className="grid grid-cols-1 gap-4 mb-6">
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                      <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Password must be at least 8 characters long and include a number and special character.
                      </p>
                    </div>
                    <div>
                      <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                      <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                  </div>
                </div>
              )}
              
              {/* Step 2: Personal Details */}
              {step === 2 && (
                <div>
                  <h3 className="text-xl font-semibold mb-4">Personal Details</h3>
                  <p className="text-gray-600 mb-6">
                    Tell us a bit about yourself.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                      <input
                        type="tel"
                        id="phoneNumber"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                      <select
                        id="country"
                        name="country"
                        value={formData.country}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      >
                        <option value="">Select Country</option>
                        <option value="DE">Germany</option>
                        <option value="FR">France</option>
                        <option value="UK">United Kingdom</option>
                        <option value="IT">Italy</option>
                        <option value="ES">Spain</option>
                        <option value="NL">Netherlands</option>
                        <option value="BE">Belgium</option>
                        <option value="AT">Austria</option>
                        <option value="CH">Switzerland</option>
                        <option value="PL">Poland</option>
                        <option value="SE">Sweden</option>
                        <option value="DK">Denmark</option>
                        <option value="FI">Finland</option>
                        <option value="NO">Norway</option>
                        <option value="PT">Portugal</option>
                        <option value="IE">Ireland</option>
                        <option value="GR">Greece</option>
                        <option value="CZ">Czech Republic</option>
                        <option value="RO">Romania</option>
                        <option value="HU">Hungary</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Step 3: Tuner Profile (only for tuners) */}
              {step === 3 && role === 'tuner' && (
                <div>
                  <h3 className="text-xl font-semibold mb-4">Tuner Profile</h3>
                  <p className="text-gray-600 mb-6">
                    Tell us about your tuning experience and specialties.
                  </p>
                  
                  <div className="grid grid-cols-1 gap-4 mb-6">
                    <div>
                      <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-1">Company Name (Optional)</label>
                      <input
                        type="text"
                        id="companyName"
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-1">Website (Optional)</label>
                      <input
                        type="url"
                        id="website"
                        name="website"
                        value={formData.website}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="https://"
                      />
                    </div>
                    <div>
                      <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-1">Years of Experience</label>
                      <select
                        id="experience"
                        name="experience"
                        value={formData.experience}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      >
                        <option value="">Select Experience</option>
                        <option value="1-2">1-2 years</option>
                        <option value="3-5">3-5 years</option>
                        <option value="6-10">6-10 years</option>
                        <option value="10+">10+ years</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Specialties</label>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="dpf-egr"
                            name="specialties"
                            value="DPF/EGR"
                            checked={formData.specialties.includes('DPF/EGR')}
                            onChange={handleSpecialtyChange}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                          />
                          <label htmlFor="dpf-egr" className="ml-2 text-sm text-gray-700">DPF/EGR Removal</label>
                        </div>
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="stage1"
                            name="specialties"
                            value="Stage 1"
                            checked={formData.specialties.includes('Stage 1')}
                            onChange={handleSpecialtyChange}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                          />
                          <label htmlFor="stage1" className="ml-2 text-sm text-gray-700">Stage 1 Tuning</label>
                        </div>
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="stage2"
                            name="specialties"
                            value="Stage 2"
                            checked={formData.specialties.includes('Stage 2')}
                            onChange={handleSpecialtyChange}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                          />
                          <label htmlFor="stage2" className="ml-2 text-sm text-gray-700">Stage 2 Tuning</label>
                        </div>
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="adblue"
                            name="specialties"
                            value="AdBlue"
                            checked={formData.specialties.includes('AdBlue')}
                            onChange={handleSpecialtyChange}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                          />
                          <label htmlFor="adblue" className="ml-2 text-sm text-gray-700">AdBlue Solutions</label>
                        </div>
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="pops-bangs"
                            name="specialties"
                            value="Pops & Bangs"
                            checked={formData.specialties.includes('Pops & Bangs')}
                            onChange={handleSpecialtyChange}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                          />
                          <label htmlFor="pops-bangs" className="ml-2 text-sm text-gray-700">Pops & Bangs</label>
                        </div>
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="dtc"
                            name="specialties"
                            value="DTC"
                            checked={formData.specialties.includes('DTC')}
                            onChange={handleSpecialtyChange}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                          />
                          <label htmlFor="dtc" className="ml-2 text-sm text-gray-700">DTC Solutions</label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Step 4 (or 3 for customers): Confirmation */}
              {step === (role === 'tuner' ? 4 : 3) && (
                <div>
                  <h3 className="text-xl font-semibold mb-4">Confirm Registration</h3>
                  <p className="text-gray-600 mb-6">
                    Please review your information and complete your registration.
                  </p>
                  
                  <div className="bg-gray-50 rounded-lg p-4 mb-6">
                    <h4 className="font-medium mb-2">Account Information</h4>
                    <p className="text-gray-600">{formData.email}</p>
                    
                    <h4 className="font-medium mt-4 mb-2">Personal Details</h4>
                    <p className="text-gray-600">{formData.firstName} {formData.lastName}</p>
                    <p className="text-gray-600">{formData.country}</p>
                    
                    {role === 'tuner' && (
                      <>
                        <h4 className="font-medium mt-4 mb-2">Tuner Profile</h4>
                        {formData.companyName && <p className="text-gray-600">{formData.companyName}</p>}
                        <p className="text-gray-600">Experience: {formData.experience}</p>
                        <div className="mt-2">
                          <p className="text-gray-600">Specialties:</p>
                          <div className="flex flex-wrap gap-2 mt-1">
                            {formData.specialties.map(specialty => (
                              <span key={specialty} className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                                {specialty}
                              </span>
                            ))}
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                  
                  <div className="mb-6">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        name="agreeTerms"
                        checked={formData.agreeTerms}
                        onChange={handleInputChange}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        required
                      />
                      <span className="ml-2 text-sm text-gray-600">
                        I agree to the <a href="#" className="text-blue-600 hover:underline">Terms of Service</a> and <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>
                      </span>
                    </label>
                  </div>
                </div>
              )}
              
              <div className="flex justify-between mt-6">
                {step > 1 && (
                  <button
                    type="button"
                    className="px-6 py-2 border border-gray-300 text-gray-700 font-semibold rounded-md hover:bg-gray-50 transition"
                    onClick={handlePrevStep}
                  >
                    Previous
                  </button>
                )}
                
                {step < (role === 'tuner' ? 4 : 3) ? (
                  <button
                    type="button"
                    className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition ml-auto"
                    onClick={handleNextStep}
                  >
                    Next
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition ml-auto"
                    disabled={!formData.agreeTerms}
                  >
                    Complete Registration
                  </button>
                )}
              </div>
            </div>
          </form>
          
          <div className="p-6 bg-gray-50 border-t">
            <p className="text-center text-gray-600">
              Already have an account? <a href="#" className="text-blue-600 hover:underline">Log in</a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Registration;
