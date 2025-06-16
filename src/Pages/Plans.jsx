import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createPlan, resetStatus } from '../redux/planSlice';

const AddPlan = () => {
  const dispatch = useDispatch();
  const { theme } = useSelector((state) => state.theme);
  const { loading, error, success } = useSelector((state) => state.plans);

  const [form, setForm] = useState({
    name: 'free',
    job_post_limit: '',
    can_generate_tests: false,
    can_schedule_interviews: false,
    candidate_suggestions: 'none',
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
    dispatch(createPlan(form));
  };

  useEffect(() => {
    if (success) {
      alert('✅ Plan created successfully.');
      setForm({
        name: 'free',
        job_post_limit: '',
        can_generate_tests: false,
        can_schedule_interviews: false,
        candidate_suggestions: 'none',
      });
      dispatch(resetStatus());
    }

    if (error) {
      if (error.name && error.name[0] === "subscription plan with this name already exists.") {
        alert("⚠️ A subscription plan with this name already exists. Please choose another name.");
      } else {
        alert("❌ Failed to create plan. Please check the form and try again.");
      }
      dispatch(resetStatus());
    }
  }, [success, error, dispatch]);

  // Theme-based classes
  const containerClasses = `max-w-3xl mx-auto mb-9 p-8 mt-10 rounded-xl shadow-lg ${
    theme === "dark" ? "bg-gray-900 text-gray-100" : "bg-white text-gray-900"
  }`;

  const inputClasses = `w-full px-4 py-2 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
    theme === "dark" ? "bg-gray-800 border-gray-700 text-gray-100" : "bg-white border-gray-300 text-gray-900"
  } border`;

  const labelClasses = `block text-sm font-medium ${
    theme === "dark" ? "text-gray-300" : "text-gray-700"
  }`;

  const radioOptionClasses = `flex items-center space-x-2 p-3 border rounded-lg cursor-pointer transition-colors ${
    theme === "dark" 
      ? "border-gray-700 hover:bg-gray-800" 
      : "border-gray-200 hover:bg-gray-50"
  }`;

  const checkboxClasses = `w-5 h-5 rounded focus:ring-indigo-500 ${
    theme === "dark" ? "bg-gray-800 border-gray-600" : "bg-white border-gray-300"
  } border`;

  return (
    <div className={containerClasses} >
      <div className="mb-9">
        <h2 className={`text-3xl font-bold font-serif ${
          theme === "dark" ? "text-white" : "text-gray-900"
        }`}>
          Add New Subscription Plan
        </h2>
        <p className={`mt-2 ${
          theme === "dark" ? "text-gray-400" : "text-gray-600"
        }`}>
          Fill in the details below to create a new subscription plan
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Plan Type */}
          <div className="space-y-2">
  <label className={labelClasses}>Plan Name *</label>
  <input
    type="text"
    name="name"
    placeholder="Enter plan name (e.g. Free Text)"
    value={form.name}
    onChange={handleChange}
    className={inputClasses}
    required
  />
</div>

          {/* Job Post Limit */}
          <div className="space-y-2">
            <label className={labelClasses}>Job Post Limit</label>
            <input
              type="number"
              name="job_post_limit"
              placeholder="Number of allowed job posts"
              value={form.job_post_limit}
              onChange={handleChange}
              className={inputClasses}
            />
          </div>

          {/* Generate Tests */}
          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              name="can_generate_tests"
              checked={form.can_generate_tests}
              onChange={handleChange}
              className={checkboxClasses}
              id="generateTests"
            />
            <label htmlFor="generateTests" className={labelClasses}>
              Can generate employment tests
            </label>
          </div>

          {/* Schedule Interviews */}
          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              name="can_schedule_interviews"
              checked={form.can_schedule_interviews}
              onChange={handleChange}
              className={checkboxClasses}
              id="scheduleInterviews"
            />
            <label htmlFor="scheduleInterviews" className={labelClasses}>
              Can schedule interviews
            </label>
          </div>

          {/* Candidate Suggestions */}
          <div className="space-y-2 col-span-1 md:col-span-2">
            <label className={labelClasses}>Candidate Suggestions</label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <label className={radioOptionClasses}>
                <input
                  type="radio"
                  name="candidate_suggestions"
                  value="none"
                  checked={form.candidate_suggestions === 'none'}
                  onChange={handleChange}
                  className="w-4 h-4 text-indigo-600 focus:ring-indigo-500"
                />
                <span className={labelClasses}>No suggestions</span>
              </label>
              <label className={radioOptionClasses}>
                <input
                  type="radio"
                  name="candidate_suggestions"
                  value="once"
                  checked={form.candidate_suggestions === 'once'}
                  onChange={handleChange}
                  className="w-4 h-4 text-indigo-600 focus:ring-indigo-500"
                />
                <span className={labelClasses}>One-time suggestion</span>
              </label>
              <label className={radioOptionClasses}>
                <input
                  type="radio"
                  name="candidate_suggestions"
                  value="always"
                  checked={form.candidate_suggestions === 'always'}
                  onChange={handleChange}
                  className="w-4 h-4 text-indigo-600 focus:ring-indigo-500"
                />
                <span className={labelClasses}>Continuous suggestions</span>
              </label>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end pt-4">
          <button
            type="submit"
            disabled={loading}
            className={`px-6 py-3 rounded-lg font-medium shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
              loading
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-indigo-600 hover:bg-indigo-700 text-white focus:ring-indigo-500'
            } ${
              theme === "dark" ? "focus:ring-offset-gray-900" : "focus:ring-offset-white"
            }`}
          >
            {loading ? 'Creating...' : 'Save Plan'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddPlan;