import { useState } from 'react';
import { api } from '../api';
import { ListPlus, AlertCircle, CheckCircle2, Loader2 } from 'lucide-react';

export default function AddToQueue() {
  const [formData, setFormData] = useState({
    patient_id: '',
    service_area: '',
    queue_date: new Date().toISOString().split('T')[0]
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
        patient_id: parseInt(formData.patient_id.toString().replace(/\D/g, ''), 10)
      });
      setSuccess(`Appointment confirmed for ${formData.queue_date}! Patient ID: ${response.patient_id} | Queue Number: ${response.queue_number}. Please take a screenshot of this message and present it to the staff when you arrive at the clinic.`);
      setFormData({ patient_id: '', service_area: '', queue_date: new Date().toISOString().split('T')[0] });
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
    <div className="max-w-2xl mx-auto bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 to-yellow-500"></div>
      <div className="flex items-center gap-4 mb-8 pb-6 border-b border-slate-100">
        <div className="p-3.5 bg-blue-900 text-yellow-400 rounded-xl shadow-md">
          <ListPlus size={26} strokeWidth={2.5} />
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
          <label className="block text-sm font-semibold text-slate-700 mb-2">Patient ID</label>
          <input
            type="text"
            name="patient_id"
            required
            value={formData.patient_id}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900 outline-none transition-all text-slate-800 font-medium placeholder-slate-400"
            placeholder="e.g. PAT-0001"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Appointment Date</label>
          <input
            type="date"
            name="queue_date"
            required
            value={formData.queue_date}
            onChange={handleChange}
            min={new Date().toISOString().split('T')[0]}
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900 outline-none transition-all text-slate-800 font-medium"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Service Area</label>
          <select
            name="service_area"
            required
            value={formData.service_area}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900 outline-none transition-all text-slate-800 font-medium appearance-none"
          >
            <option value="" disabled>Select Service Area</option>
            <option value="Consultation">Consultation (Tue - Thu, 9AM-11AM)</option>
            <option value="Laboratory">Laboratory (Tue - Thu, 9AM-11AM)</option>
            <option value="Animal Bite Treatment">Animal Bite Treatment (Mon - Fri, 9AM-3PM)</option>
          </select>
        </div>

        {formData.service_area === 'Laboratory' && (
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 animate-in fade-in duration-300">
            <p className="text-sm font-semibold text-blue-800 mb-2">Available Laboratory Tests:</p>
            <ul className="text-sm text-blue-700 list-disc list-inside grid grid-cols-1 sm:grid-cols-2 gap-1">
              <li>Complete Blood Count (CBC)</li>
              <li>Urinalysis</li>
              <li>Fecalysis</li>
              <li>Blood Typing</li>
              <li>Fasting Blood Sugar (FBS)</li>
              <li>Cholesterol</li>
              <li>Pregnancy Test</li>
            </ul>
          </div>
        )}

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
              'Add to Queue'
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
