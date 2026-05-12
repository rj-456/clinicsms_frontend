import { useState } from 'react';
import { api } from '../api';
import { ListPlus, AlertCircle, CheckCircle2, Loader2 } from 'lucide-react';

export default function AddToQueue() {
  const [formData, setFormData] = useState({
    patient_id: '',
    service_area: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const response = await api.addToQueue({
        ...formData,
        patient_id: parseInt(formData.patient_id, 10)
      });
      setSuccess(`Added to queue! Service: ${response.service_area}, Queue Number: ${response.queue_number}`);
      setFormData({ patient_id: '', service_area: '' });
    } catch (err) {
      setError(err?.toString() || 'Failed to add patient to queue. Please check service hours and patient ID.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-sm border border-gray-100">
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
        <div className="p-3 bg-purple-50 text-purple-600 rounded-lg">
          <ListPlus size={24} />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Service Queue</h2>
          <p className="text-gray-500 text-sm">Add patient to a service queue</p>
        </div>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-lg border border-red-100 flex items-start gap-3">
          <AlertCircle size={20} className="shrink-0 mt-0.5" />
          <p className="whitespace-pre-wrap">{error}</p>
        </div>
      )}

      {success && (
        <div className="mb-6 p-4 bg-green-50 text-green-700 rounded-lg border border-green-100 flex items-center gap-3">
          <CheckCircle2 size={20} className="shrink-0" />
          <p>{success}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Patient ID</label>
          <input
            type="number"
            name="patient_id"
            required
            value={formData.patient_id}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all"
            placeholder="Enter Patient ID"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Service Area</label>
          <select
            name="service_area"
            required
            value={formData.service_area}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all bg-white"
          >
            <option value="" disabled>Select Service Area</option>
            <option value="Consultation">Consultation (Tue-Thu, 9AM-11AM)</option>
            <option value="Laboratory">Laboratory (Tue-Thu, 9AM-11AM)</option>
            <option value="Animal Bite Treatment">Animal Bite Treatment (Mon-Fri, 9AM-3PM)</option>
          </select>
        </div>

        <div className="pt-4 border-t border-gray-100">
          <button
            type="submit"
            disabled={loading}
            className="w-full md:w-auto px-6 py-3 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 focus:ring-4 focus:ring-purple-200 transition-all disabled:opacity-70 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 size={20} className="animate-spin" />
                Processing...
              </>
            ) : (
              'Add to Queue'
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
