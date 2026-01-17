import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuthStore } from '@/store/authStore';
import { isValidEmail, validatePassword, validateUsername } from '@/utils/validation';

const RegisterPage = () => {
  const navigate = useNavigate();
  const { register } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.username) return toast.error('Who are you?');
    if (!formData.email) return toast.error('Need an email!');
    if (formData.password.length < 6) return toast.error('Password too short!');
    if (formData.password !== formData.confirmPassword) return toast.error('Passwords don\'t match!');

    setLoading(true);

    try {
      const result = await register({
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });

      if (result.success) {
        toast.success('Sketchbook created! Welcome!');
        navigate('/dashboard');
      } else {
        toast.error(result.error);
      }
    } catch (error) {
      toast.error('Could not create account...');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1">
          <label className="block text-xl font-hand font-bold text-pencil ml-1 rotate-slight-n1">
            Pick a Name
          </label>
          <input
            type="text"
            name="username"
            placeholder="Artist Name"
            className="input-hand"
            value={formData.username}
            onChange={handleChange}
            disabled={loading}
          />
        </div>

        <div className="space-y-1">
          <label className="block text-xl font-hand font-bold text-pencil ml-1 rotate-slight-1">
            Email
          </label>
          <input
            type="email"
            name="email"
            placeholder="contact@doodle.com"
            className="input-hand"
            value={formData.email}
            onChange={handleChange}
            disabled={loading}
          />
        </div>

        <div className="space-y-1">
          <label className="block text-xl font-hand font-bold text-pencil ml-1 rotate-slight-n1">
            Secret Code
          </label>
          <input
            type="password"
            name="password"
            placeholder="Min 6 chars"
            className="input-hand"
            value={formData.password}
            onChange={handleChange}
            disabled={loading}
          />
        </div>

        <div className="space-y-1">
          <label className="block text-xl font-hand font-bold text-pencil ml-1 rotate-slight-1">
            Repeat Code
          </label>
          <input
            type="password"
            name="confirmPassword"
            placeholder="Just to be sure"
            className="input-hand"
            value={formData.confirmPassword}
            onChange={handleChange}
            disabled={loading}
          />
        </div>

        <button 
          type="submit" 
          className="btn-primary w-full mt-8 text-2xl font-bold py-3 rotate-slight-n1 disabled:opacity-50"
          disabled={loading}
        >
          {loading ? 'Binding Book...' : 'Create Sketchbook'}
        </button>
      </form>

      <div className="mt-8 text-center">
        <p className="font-hand text-lg text-gray-500">
          Already have one? <Link to="/login" className="text-marker-blue underline decoration-wavy font-bold hover:text-blue-500">Open it</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
