import { useState } from 'react';
import { api } from '../api';
import { Stethoscope, AlertCircle, CheckCircle2, Loader2 } from 'lucide-react';

export default function RequestLabTest() {
  const [formData, setFormData] = useState({
    patient_id: '',
    requested_by: '',
    test_type: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const ALLOWED_TESTS = [
    "CBC and Platelet Count",
    "Blood Chemistry",
    "Fasting Blood Sugar",
    "Lipid Profile",
    "Uric Acid",
    "Serum Creatinine",
    "Urinalysis"
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!ALLOWED_TESTS.includes(formData.test_type)) {
      setError("Please select a valid laboratory test from the list.");
      return;
    }

    setLoading(true);
    try {
      const response = await api.requestLabTest({
        ...formData,
        patient_id: parseInt(formData.patient_id, 10),
        requested_by: parseInt(formData.requested_by, 10)
      });
      setSuccess(`Lab test requested successfully! Test ID: ${response.lab_test_id}`);
      setFormData({
        patient_id: '',
        requested_by: '',
        test_type: ''
      });
    } catch (err) {
      setError(err?.toString() || 'Failed to request lab test. Ensure Patient and Staff IDs are valid.');
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
        <div className="p-3 bg-teal-50 text-teal-600 rounded-lg">
          <Stethoscope size={24} />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Request Lab Test</h2>
          <p className="text-gray-500 text-sm">Submit a new laboratory test request</p>
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Patient ID</label>
            <input
              type="number"
              name="patient_id"
              required
              value={formData.patient_id}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all"
              placeholder="Enter Patient ID"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Staff ID (Requested By)</label>
            <input
              type="number"
              name="requested_by"
              required
              value={formData.requested_by}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all"
              placeholder="Enter Staff ID"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Laboratory Test Type</label>
          <select
            name="test_type"
            required
            value={formData.test_type}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all bg-white"
          >
            <option value="" disabled>Select Test Type</option>
            {ALLOWED_TESTS.map(test => (
              <option key={test} value={test}>{test}</option>
            ))}
          </select>
        </div>

        <div className="pt-4 border-t border-gray-100">
          <button
            type="submit"
            disabled={loading}
            className="w-full md:w-auto px-6 py-3 bg-teal-600 text-white font-medium rounded-lg hover:bg-teal-700 focus:ring-4 focus:ring-teal-200 transition-all disabled:opacity-70 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 size={20} className="animate-spin" />
                Processing...
              </>
            ) : (
              'Submit Lab Request'
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
