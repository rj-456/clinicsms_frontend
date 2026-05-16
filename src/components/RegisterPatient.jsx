import { useState } from 'react';
import { api } from '../api';
import { UserPlus, AlertCircle, CheckCircle2, Loader2 } from 'lucide-react';

export default function RegisterPatient() {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    date_of_birth: '',
    gender: '',
    contact_number: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const validateDateOfBirth = (dob) => {
    const date = new Date(dob);
    const today = new Date();
    
    // Check if valid date
    if (isNaN(date.getTime())) {
      return 'Invalid date format.';
    }
    
    // Check if future date
    if (date > today) {
      return 'Date of birth cannot be in the future.';
    }
    
    // Check for impossible dates (e.g. year < 1900)
    if (date.getFullYear() < 1900) {
      return 'Please enter a valid year of birth.';
    }
    
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    const dobError = validateDateOfBirth(formData.date_of_birth);
    if (dobError) {
      setError(dobError);
      return;
    }

    setLoading(true);
    try {
      const response = await api.registerPatient(formData);
      setSuccess(`Successfully registered! Your Patient ID is ${response.patient_id}. Please take a screenshot of this message, as you will need it to schedule your clinic appointments.`);
      setFormData({
        first_name: '',
        last_name: '',
        date_of_birth: '',
        gender: '',
        contact_number: ''
      });
    } catch (err) {
      setError(err?.toString() || 'An error occurred while registering patient.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="max-w-2xl mx-auto bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 to-yellow-500"></div>
      <div className="flex items-center gap-4 mb-8 pb-6 border-b border-slate-100">
        <div className="p-3.5 bg-blue-900 text-yellow-400 rounded-xl shadow-md">
          <UserPlus size={26} strokeWidth={2.5} />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Register Patient</h2>
          <p className="text-gray-500 text-sm">Add a new patient to the system</p>
        </div>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-lg border border-red-100 flex items-center gap-3">
          <AlertCircle size={20} className="shrink-0" />
          <p>{error}</p>
        </div>
      )}

      {success && (
        <div className="mb-6 p-4 bg-green-50 text-green-700 rounded-lg border border-green-100 flex items-center gap-3">
          <CheckCircle2 size={20} className="shrink-0" />
          <p>{success}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">First Name</label>
            <input
              type="text"
              name="first_name"
              required
              value={formData.first_name}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900 outline-none transition-all text-slate-800 font-medium placeholder-slate-400"
              placeholder="Enter first name"
            />
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Last Name</label>
            <input
              type="text"
              name="last_name"
              required
              value={formData.last_name}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900 outline-none transition-all text-slate-800 font-medium placeholder-slate-400"
              placeholder="Enter last name"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Date of Birth</label>
            <input
              type="date"
              name="date_of_birth"
              required
              value={formData.date_of_birth}
              onChange={handleChange}
              max={new Date().toISOString().split('T')[0]}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900 outline-none transition-all text-slate-800 font-medium"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Gender</label>
            <select
              name="gender"
              required
              value={formData.gender}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900 outline-none transition-all text-slate-800 font-medium appearance-none"
            >
              <option value="" disabled>Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Contact Number</label>
          <input
            type="tel"
            name="contact_number"
            required
            value={formData.contact_number}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900 outline-none transition-all text-slate-800 font-medium placeholder-slate-400"
            placeholder="Enter contact number"
          />
        </div>

        <div className="pt-6 mt-6 border-t border-slate-100">
          <button
            type="submit"
            disabled={loading}
            className="w-full md:w-auto px-8 py-3.5 bg-blue-900 hover:bg-blue-800 text-yellow-400 font-bold tracking-wide rounded-xl shadow-lg shadow-blue-900/20 focus:ring-4 focus:ring-blue-100 transition-all disabled:opacity-70 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 size={20} className="animate-spin" />
                Processing...
              </>
            ) : (
              'Register Patient'
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
