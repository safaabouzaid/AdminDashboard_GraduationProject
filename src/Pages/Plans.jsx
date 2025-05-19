import React, { useState } from 'react';
import { useSelector } from 'react-redux';

const AddPlan = () => {
  const [form, setForm] = useState({
    name: 'free',
    job_post_limit: '',
    can_generate_tests: false,
    can_schedule_interviews: false,
    candidate_suggestions: 'none',
  });

  const { theme } = useSelector((state) => state.theme);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
  };

  // Theme-based classes
  const containerClasses = `max-w-3xl mx-auto p-8 rounded-2xl shadow-xl ${
    theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-gray-900"
  }`;

  const inputClasses = `w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
    theme === "dark" ? "bg-gray-700 border-gray-600" : "bg-white border-gray-300"
  }`;

  const labelClasses = `block text-sm font-medium ${
    theme === "dark" ? "text-gray-300" : "text-gray-700"
  }`;

  const radioOptionClasses = `flex items-center space-x-2 p-3 border rounded-lg ${
    theme === "dark" ? "hover:bg-gray-700 border-gray-600" : "hover:bg-gray-50 border-gray-300"
  }`;

  return (
    <div className={containerClasses}>
      <div className="mb-8">
        <h2 className={`text-3xl font-bold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
          Add New Subscription Plan
        </h2>
        <p className={theme === "dark" ? "text-gray-400" : "text-gray-600"}>
          Fill in the details below to create a new subscription plan
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Plan Type  */}
          <div className="space-y-2">
            <label className={labelClasses}>Plan Type *</label>
            <select
              name="name"
              value={form.name}
              onChange={handleChange}
              className={inputClasses}
              required
            >
              <option value="free">Free</option>
              <option value="paid">Paid</option>
            </select>
          </div>

          {/* Job Post Limit  */}
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

          {/* Generate Tests  */}
          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              name="can_generate_tests"
              checked={form.can_generate_tests}
              onChange={handleChange}
              className={`w-5 h-5 text-indigo-600 rounded focus:ring-indigo-500 ${
                theme === "dark" ? "bg-gray-700 border-gray-600" : "bg-white border-gray-300"
              }`}
              id="generateTests"
            />
            <label htmlFor="generateTests" className={labelClasses}>
              Can generate employment tests
            </label>
          </div>

          {/* Schedule Interviews  */}
          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              name="can_schedule_interviews"
              checked={form.can_schedule_interviews}
              onChange={handleChange}
              className={`w-5 h-5 text-indigo-600 rounded focus:ring-indigo-500 ${
                theme === "dark" ? "bg-gray-700 border-gray-600" : "bg-white border-gray-300"
              }`}
              id="scheduleInterviews"
            />
            <label htmlFor="scheduleInterviews" className={labelClasses}>
              Can schedule interviews
            </label>
          </div>

          {/*  Suggestions  */}
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
                  className={`w-4 h-4 text-indigo-600 focus:ring-indigo-500 ${
                    theme === "dark" ? "bg-gray-700" : "bg-white"
                  }`}
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
                  className={`w-4 h-4 text-indigo-600 focus:ring-indigo-500 ${
                    theme === "dark" ? "bg-gray-700" : "bg-white"
                  }`}
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
                  className={`w-4 h-4 text-indigo-600 focus:ring-indigo-500 ${
                    theme === "dark" ? "bg-gray-700" : "bg-white"
                  }`}
                />
                <span className={labelClasses}>Always suggest</span>
              </label>
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end pt-4">
          <button
            type="submit"
            className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg shadow-sm transition duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Save Plan
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddPlan;