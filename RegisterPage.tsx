import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authAPI } from '../api';

interface RegisterFormData {
  email: string;
  password: string;
  confirmPassword: string;
  role: string;
  agreeTerms: boolean;
}

const RegisterPage = () => {
  const [formData, setFormData] = useState<RegisterFormData>({
    email: '',
    password: '',
    confirmPassword: '',
    role: 'customer',
    agreeTerms: false
  });
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    // Validate terms agreement
    if (!formData.agreeTerms) {
      setError('You must agree to the Terms of Service');
      setLoading(false);
      return;
    }

    try {
      const response = await authAPI.register({
        email: formData.email,
        password: formData.password,
        role: formData.role
      });

      if (response.data && response.data.success) {
        // Redirect to login page with success message
        navigate('/login', { state: { message: 'Registration successful! Please log in.' } });
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Грешка при регистрация. Моля, опитайте отново.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-8">
        <header className="flex justify-between items-center mb-16">
          <a href="/" className="text-3xl font-bold text-blue-500">TuneTrader</a>
          <a href="/login" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Login</a>
        </header>

        <div className="flex flex-col items-center justify-center">
          <div className="w-full max-w-md">
            <h1 className="text-4xl font-bold text-center mb-2">Create Account</h1>
            <p className="text-gray-400 text-center mb-8">Join our community of tuning enthusiasts</p>

            <div className="bg-gray-900 rounded-lg p-8">
              <form onSubmit={handleSubmit}>
                {error && (
                  <div className="bg-red-900 text-white p-3 rounded mb-4">
                    {error}
                  </div>
                )}

                <div className="mb-4">
                  <label htmlFor="email" className="block text-gray-300 mb-2">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-gray-800 border border-gray-700 rounded py-2 px-3 text-white focus:outline-none focus:border-blue-500"
                    placeholder="your@email.com"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="password" className="block text-gray-300 mb-2">Password</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full bg-gray-800 border border-gray-700 rounded py-2 px-3 text-white focus:outline-none focus:border-blue-500"
                    placeholder="••••••••"
                    required
                    minLength={8}
                  />
                  <p className="text-gray-500 text-xs mt-1">Must be at least 8 characters</p>
                </div>

                <div className="mb-4">
                  <label htmlFor="confirmPassword" className="block text-gray-300 mb-2">Confirm Password</label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full bg-gray-800 border border-gray-700 rounded py-2 px-3 text-white focus:outline-none focus:border-blue-500"
                    placeholder="••••••••"
                    required
                  />
                </div>

                <div className="mb-6">
                  <label htmlFor="role" className="block text-gray-300 mb-2">I am a:</label>
                  <select
                    id="role"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="w-full bg-gray-800 border border-gray-700 rounded py-2 px-3 text-white focus:outline-none focus:border-blue-500"
                    required
                  >
                    <option value="customer">Customer looking for tuning files</option>
                    <option value="tuner">Professional tuner offering services</option>
                  </select>
                </div>

                <div className="mb-6">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="agreeTerms"
                      name="agreeTerms"
                      checked={formData.agreeTerms}
                      onChange={handleChange}
                      className="mr-2"
                      required
                    />
                    <label htmlFor="agreeTerms" className="text-gray-400">
                      I agree to the <a href="/terms" className="text-blue-500 hover:text-blue-400">Terms of Service</a> and <a href="/privacy" className="text-blue-500 hover:text-blue-400">Privacy Policy</a>
                    </label>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline"
                  disabled={loading}
                >
                  {loading ? 'Creating Account...' : 'Create Account'}
                </button>
              </form>

              <div className="mt-8 text-center">
                <p className="text-gray-400 mb-4">Or continue with</p>
                <div className="flex justify-center space-x-4">
                  <button className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                    </svg>
                    GitHub
                  </button>
                  <button className="bg-red-700 hover:bg-red-800 text-white font-bold py-2 px-4 rounded flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M6.94 5a2 2 0 1 1-4-.002 2 2 0 0 1 4 .002zM7 8.48H3V21h4V8.48zm6.32 0H9.34V21h3.94v-6.57c0-3.66 4.77-4 4.77 0V21H22v-7.93c0-6.17-7.06-5.94-8.72-2.91l.04-1.68z" />
                    </svg>
                    LinkedIn
                  </button>
                </div>
              </div>

              <div className="mt-8 text-center">
                <p className="text-gray-400">
                  Already have an account? <a href="/login" className="text-blue-500 hover:text-blue-400">Sign in</a>
                </p>
              </div>
            </div>
          </div>
        </div>

        <footer className="mt-16 text-center text-gray-500">
          <p>© 2025 TuneTrader. All rights reserved.</p>
          <div className="flex justify-center mt-2 space-x-4">
            <a href="/privacy" className="text-blue-500 hover:text-blue-400">Privacy Policy</a>
            <a href="/terms" className="text-blue-500 hover:text-blue-400">Terms of Service</a>
            <a href="/contact" className="text-blue-500 hover:text-blue-400">Contact</a>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default RegisterPage;
