// EditPlanModal.jsx
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updatePlan } from '../redux/AllplansSlice';

const EditPlanModal = ({ plan, onClose }) => {
  const dispatch = useDispatch();
  const { theme } = useSelector(state => state.theme);
  const [form, setForm] = useState({
    job_post_limit: plan.job_post_limit,
    can_generate_tests: plan.can_generate_tests,
    can_schedule_interviews: plan.can_schedule_interviews,
    candidate_suggestions: plan.candidate_suggestions,
    price: plan.price
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updatePlan({ id: plan.id, ...form }));
    onClose();
  };

  // Theme classes
  const modalClasses = `fixed inset-0 z-50 flex items-center justify-center p-4 ${
    theme === 'dark' ? 'bg-black bg-opacity-70' : 'bg-gray-500 bg-opacity-50'
  }`;

  const contentClasses = `rounded-xl shadow-xl w-full max-w-md p-6 ${
    theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
  }`;

  const inputClasses = `w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
    theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
  }`;

  const labelClasses = `block text-sm font-medium ${
    theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
  }`;

  return (
    <div className={modalClasses}>
      <div className={contentClasses}>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold font-serif">Edit {plan.name} Plan</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Job Post Limit */}
          <div>
            <label className={labelClasses}>Job Post Limit</label>
            <input
              type="number"
              name="job_post_limit"
              value={form.job_post_limit || ''}
              onChange={handleChange}
              className={inputClasses}
            />
          </div>

          {/* Price (for paid plans) */}
          {plan.name === 'paid' && (
            <div>
              <label className={labelClasses}>Price ($)</label>
              <input
                type="number"
                step="0.01"
                name="price"
                value={form.price || ''}
                onChange={handleChange}
                className={inputClasses}
              />
            </div>
          )}

          {/* Features */}
          <div className="space-y-2">
            <div className="flex items-center">
              <input
                type="checkbox"
                name="can_generate_tests"
                checked={form.can_generate_tests}
                onChange={handleChange}
                className={`h-4 w-4 rounded ${theme === 'dark' ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'} text-indigo-600 focus:ring-indigo-500`}
              />
              <label className={`ml-2 ${labelClasses}`}>Can generate tests</label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                name="can_schedule_interviews"
                checked={form.can_schedule_interviews}
                onChange={handleChange}
                className={`h-4 w-4 rounded ${theme === 'dark' ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'} text-indigo-600 focus:ring-indigo-500`}
              />
              <label className={`ml-2 ${labelClasses}`}>Can schedule interviews</label>
            </div>
          </div>

          {/* Candidate Suggestions */}
          <div>
            <label className={labelClasses}>Candidate Suggestions</label>
            <select
              name="candidate_suggestions"
              value={form.candidate_suggestions}
              onChange={handleChange}
              className={inputClasses}
            >
              <option value="none">No suggestions</option>
              <option value="once">One-time suggestion</option>
              <option value="always">Always suggest</option>
            </select>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className={`px-4 py-2 rounded-md font-medium ${
                theme === 'dark' 
                  ? 'bg-gray-700 text-white hover:bg-gray-600' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded-md font-medium hover:bg-indigo-700"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPlanModal;