import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuthStore } from '@/store/authStore';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ username: '', password: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.password) {
      toast.error('Please fill in your secret code!');
      return;
    }

    setLoading(true);
    try {
      const result = await login(formData);
      if (result.success) {
        toast.success('Welcome back!');
        navigate('/dashboard');
      } else {
        toast.error(result.error);
      }
    } catch (error) {
      toast.error('Login failed...');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label className="block text-xl font-hand font-bold text-pencil ml-1 rotate-slight-n1">
            Who are you?
          </label>
          <input
            type="text"
            name="username"
            placeholder="Username or Email"
            className="input-hand"
            value={formData.username}
            onChange={(e) => setFormData({...formData, username: e.target.value})}
            disabled={loading}
          />
        </div>

        <div className="space-y-2">
          <label className="block text-xl font-hand font-bold text-pencil ml-1 rotate-slight-1">
            Secret Password
          </label>
          <input
            type="password"
            name="password"
            placeholder="Shhh..."
            className="input-hand"
            value={formData.password}
            onChange={(e) => setFormData({...formData, password: e.target.value})}
            disabled={loading}
          />
        </div>

        <button 
          type="submit" 
          className="btn-primary w-full mt-8 text-2xl font-bold py-3 rotate-slight-n1 disabled:opacity-50"
          disabled={loading}
        >
          {loading ? 'Opening...' : 'Open Diary'}
        </button>
      </form>

      <div className="mt-8 text-center">
        <p className="font-hand text-lg text-gray-500">
          First time here? <Link to="/register" className="text-marker-blue underline decoration-wavy font-bold hover:text-blue-500">Get a Sketchbook</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
