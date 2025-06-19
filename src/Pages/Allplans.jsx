import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPlans,updatePlan,deletePlan } from '../redux/AllplansSlice';
import { useNavigate } from "react-router-dom";
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
const Allplans = () => {
  const dispatch = useDispatch();
  const { plans, loading, error, updateStatus } = useSelector(state => state.allplans);
  const { theme } = useSelector(state => state.theme);
  const navigate = useNavigate();

  
  // States
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [planToDelete, setPlanToDelete] = useState(null);
  const [currentPlan, setCurrentPlan] = useState(null);
  const [updateError, setUpdateError] = useState(null);
  const [formData, setFormData] = useState({
    job_post_limit: '',
    can_generate_tests: false,
    can_schedule_interviews: false,
    candidate_suggestions: 'none',
    price: '',
    is_active: true
  });


  useEffect(() => {
    dispatch(fetchPlans());
  }, [dispatch]);

  const openEditModal = (plan) => {
    setCurrentPlan(plan);
    setFormData({
      job_post_limit: plan.job_post_limit || '',
      can_generate_tests: plan.can_generate_tests || false,
      can_schedule_interviews: plan.can_schedule_interviews || false,
      candidate_suggestions: plan.candidate_suggestions || 'none',
      price: plan.price || '',
      is_active: plan.is_active || true
  });
  setIsEditOpen(true);
};
  const closeEditModal = () => {
    setIsEditOpen(false);
    setCurrentPlan(null);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setUpdateError(null);
  
  const token = localStorage.getItem("token");
  
  if (!token) {
    setUpdateError('Please login to update plans');
    return;
  }

  try {
    const resultAction = await dispatch(updatePlan({
      id: currentPlan.id,
      data: {
        ...formData,
        job_post_limit: Number(formData.job_post_limit),
        price: formData.price ? Number(formData.price) : null
      }
    }));

    if (updatePlan.fulfilled.match(resultAction)) {
      closeEditModal();
    } else {
      throw new Error(resultAction.payload || 'Failed to update plan');
    }
  } catch (error) {
    console.error('Update error:', error);
    setUpdateError(error.message || 'Failed to update plan. Please try again.');
    
    if (error.message.includes('401')) {
      setUpdateError('Session expired. Please login again.');
      dispatch(logout());
      navigate('/login');
    }
  }
};

//delete
const openDeleteConfirm = (plan) => {
    setPlanToDelete(plan);
    setIsDeleteConfirmOpen(true);
  };

  const closeDeleteConfirm = () => {
    setIsDeleteConfirmOpen(false);
    setPlanToDelete(null);
  };

  const handleDeletePlan = async () => {
    if (!planToDelete) return;
    
    try {
      const resultAction = await dispatch(deletePlan(planToDelete.id));
      if (deletePlan.fulfilled.match(resultAction)) {
        closeDeleteConfirm();
      } else {
        throw new Error(resultAction.payload || 'Failed to delete plan');
      }
    } catch (error) {
      console.error('Delete error:', error);
      setUpdateError(error.message || 'Failed to delete plan. Please try again.');
    }
  };
  const togglePlanStatus = async (plan) => {
  try {
    const resultAction = await dispatch(updatePlan({
      id: plan.id,
      data: { is_active: !plan.is_active }
    }));

    if (updatePlan.fulfilled.match(resultAction)) {
    } else {
      console.error('Update failed:', resultAction.payload);
    }
  } catch (error) {
    console.error('Failed to toggle plan status:', error);
    
    setUpdateError(error.message || 'Failed to update plan status');
  }
};

  if (loading) return (
    <div className={`flex justify-center items-center min-h-[60vh] ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}>
      <div className="animate-pulse flex space-x-4">
        <div className="flex-1 space-y-6 py-1">
          <div className={`h-8 rounded w-3/4 mx-auto ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'}`}></div>
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-4">
              <div className={`h-64 rounded-xl ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'}`}></div>
              <div className={`h-64 rounded-xl ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'}`}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

   if (loading) return (
    <div className={`flex justify-center items-center h-64 ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}>
      <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-indigo-500"></div>
    </div>
  );

  if (error) return (
    <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-rose-900/20 border border-rose-400' : 'bg-rose-100 border border-rose-500'}`}>
      <div className="flex items-center">
        <svg className={`h-5 w-5 ${theme === 'dark' ? 'text-rose-400' : 'text-rose-500'}`} fill="none" viewBox="0 0 24 24">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
        </svg>
        <div className="ml-3">
          <h3 className={`text-sm font-medium ${theme === 'dark' ? 'text-rose-200' : 'text-rose-800'}`}>Error loading plans</h3>
          <button
            onClick={() => dispatch(fetchPlans())}
            className={`mt-1 text-xs ${theme === 'dark' ? 'text-rose-300 hover:text-rose-400' : 'text-rose-700 hover:text-rose-600'}`}
          >
            Retry
          </button>
        </div>
      </div>
    </div>
  );
  return (
    <div className={`max-w-7xl mx-auto px-3 rounded-2xl sm:px-6 lg:px-8 py-1  min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}>
      {/* Admin Header Section */}
      <div className="sm:flex sm:items-center sm:justify-between  mb-2">
        <div>
          <h1 className={`text-3xl mt-0 font-bold tracking-tight font-serif ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Plans Management
          </h1>
          <p className={`mt-2 text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            Admin dashboard for managing all subscription tiers
          </p>
        </div>
        <button 
          onClick={() => navigate("/dashboard?tab=plans")}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200">
          Add New Plan
        </button>
      </div>

      {/* Plans Grid */}
      <div className="grid gap-30 md:grid-cols-2 ">
        {Array.isArray(plans) && plans.length > 0 ? (
  plans.map(plan => (
            <div 
              key={plan.id} 
              className={`rounded-xl shadow-lg mt-0 overflow-hidden transition-all duration-300 hover:shadow-xl ${
                plan.name === 'free' 
                  ? theme === 'dark' 
                    ? 'border border-gray-700' 
                    : 'border border-gray-200'
                  : theme === 'dark'
                    ? 'border border-indigo-400/30'
                    : 'border border-indigo-500/30'
              }`}
            >
              <div className={`p-5  ${
                plan.name === 'free'
                  ? theme === 'dark'
                    ? 'bg-gray-900'
                    : 'bg-white'
                  : theme === 'dark'
                    ? 'bg-gradient-to-br from-gray-900 to-indigo-900/10'
                    : 'bg-gradient-to-br from-indigo-50 to-white'
              }`}>
                {/* Plan Header */}
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className={`text-2xl font-bold capitalize font-serif ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>
                      {plan.name} Plan
                    </h2>
                    <div className="mt-2 flex items-center space-x-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          theme === 'dark'
                            ? 'bg-green-900/30 text-green-200'
                            : 'bg-green-100 text-green-800'
                        }`}>
                          Active
                        </span>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => openEditModal(plan)}
                      className={`transition-colors duration-200 ${
                        theme === 'dark' ? 'text-gray-400 hover:text-indigo-400' : 'text-gray-400 hover:text-indigo-600'
                      }`}
                    >
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                      </svg>
                    </button>
                    <button 
  onClick={() => openDeleteConfirm(plan)}
  className={`transition-colors duration-200 ${
    theme === 'dark' ? 'text-gray-400 hover:text-rose-400' : 'text-gray-400 hover:text-rose-600'
  }`}
>
  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
  </svg>
</button>
                  </div>
                </div>

                {/* Pricing */}
                <div className="mt-6 flex items-baseline">
                  <span className={`text-5xl font-bold font-serif ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>
                    {plan.price ? `$${plan.price}` : 'Free'}
                  </span>
                  {plan.price && (
                    <span className={`ml-2 text-lg font-medium ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                      /month
                    </span>
                  )}
                </div>

                {/* Features List */}
                <div className="mt-8 space-y-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 text-emerald-500 mt-0.5">
                      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className={`ml-3 text-base ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      <span className="font-semibold">{plan.job_post_limit}</span> job posts included
                    </p>
                  </div>
                  
                  <div className="flex items-start">
                    <div className={`flex-shrink-0 h-6 w-6 mt-0.5 ${
                      plan.can_generate_tests ? 'text-emerald-500' : theme === 'dark' ? 'text-gray-500' : 'text-gray-400'
                    }`}>
                      {plan.can_generate_tests ? (
                        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                      ) : (
                        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      )}
                    </div>
                    <p className={`ml-3 text-base ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      Test generation {plan.can_generate_tests ? '' : 'not'} available
                    </p>
                  </div>
                  
                  <div className="flex items-start">
                    <div className={`flex-shrink-0 h-6 w-6 mt-0.5 ${
                      plan.can_schedule_interviews ? 'text-emerald-500' : theme === 'dark' ? 'text-gray-500' : 'text-gray-400'
                    }`}>
                      {plan.can_schedule_interviews ? (
                        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                      ) : (
                        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      )}
                    </div>
                    <p className={`ml-3 text-base ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      Interview scheduling {plan.can_schedule_interviews ? '' : 'not'} included
                    </p>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 text-emerald-500 mt-0.5">
                      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className={`ml-3 text-base ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      {plan.candidate_suggestions === 'none' ? 'No candidate suggestions' : 
                       plan.candidate_suggestions === 'once' ? 'One-time candidate matching' : 
                       'AI-powered candidate matching'}
                    </p>
                  </div>
                </div>

                {/* Admin Actions */}
                <div className="mt-8 flex justify-end">
                  
                  <button
                    onClick={() => openEditModal(plan)}
                    className="px-4 py-3 bg-indigo-600 text-white hover:bg-indigo-700 rounded-md font-medium transition-all duration-200"
                  >
                    Edit Plan
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-2 text-center py-12">
            <div className={`mx-auto h-24 w-24 ${
              theme === 'dark' ? 'text-gray-600' : 'text-gray-400'
            }`}>
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h3 className={`mt-4 text-lg font-medium font-serif ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              No plans available
            </h3>
            <p className={`mt-1 text-sm ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
            }`}>
              Create your first subscription plan
            </p>
            <button className="mt-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200">
              Add New Plan
            </button>
          </div>
        )}
      </div>

      {/* Edit Plan Modal */}
      <Transition appear show={isEditOpen} as={Fragment}>
  <Dialog as="div" className="relative z-10" onClose={closeEditModal}>
    <Transition.Child
      as={Fragment}
      enter="ease-out duration-300"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="ease-in duration-200"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div className={`fixed inset-0 ${theme === 'dark' ? 'bg-black bg-opacity-50' : 'bg-gray-500 bg-opacity-75'}`} />
    </Transition.Child>

    <div className="fixed inset-0 overflow-y-auto">
      <div className="flex min-h-full items-center justify-center p-4 text-center">
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <Dialog.Panel className={`w-full max-w-md transform overflow-hidden rounded-2xl p-6 m-9 ml-145 text-left align-middle shadow-xl transition-all mx-auto ${
            theme === 'dark' ? 'bg-gray-800' : 'bg-white'
          }`}>
            <Dialog.Title
              as="h3"
              className={`text-lg font-medium leading-6 text-center ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}
            >
              Edit {currentPlan?.name} Plan
            </Dialog.Title>
            
            <form onSubmit={handleSubmit} className="mt-4 space-y-4">
              <div className="mx-auto max-w-xs">
                <label className={`block text-sm font-medium ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Job Post Limit
                </label>
                <input
                  type="number"
                  name="job_post_limit"
                  value={formData.job_post_limit}
                  onChange={handleInputChange}
                  className={`mt-1 block w-full rounded-md shadow-sm ${
                    theme === 'dark' 
                      ? 'bg-gray-700 border-gray-600 text-white' 
                      : 'border-gray-300 text-gray-900'
                  }`}
                />
              </div>

              <div className="mx-auto max-w-xs">
                <label className={`block text-sm font-medium ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Price
                </label>
                <input
                  type="number"
                  step="0.01"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  className={`mt-1 block w-full rounded-md shadow-sm ${
                    theme === 'dark' 
                      ? 'bg-gray-700 border-gray-600 text-white' 
                      : 'border-gray-300 text-gray-900'
                  }`}
                />
              </div>

              <div className="flex items-center justify-center">
                <input
                  type="checkbox"
                  id="can_generate_tests"
                  name="can_generate_tests"
                  checked={formData.can_generate_tests}
                  onChange={handleInputChange}
                  className={`h-4 w-4 rounded ${
                    theme === 'dark' 
                      ? 'bg-gray-700 border-gray-600 text-indigo-400' 
                      : 'border-gray-300 text-indigo-600'
                  } focus:ring-indigo-500`}
                />
                <label htmlFor="can_generate_tests" className={`ml-2 block text-sm ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Can Generate Tests
                </label>
              </div>

              <div className="flex items-center justify-center">
                <input
                  type="checkbox"
                  id="can_schedule_interviews"
                  name="can_schedule_interviews"
                  checked={formData.can_schedule_interviews}
                  onChange={handleInputChange}
                  className={`h-4 w-4 rounded ${
                    theme === 'dark' 
                      ? 'bg-gray-700 border-gray-600 text-indigo-400' 
                      : 'border-gray-300 text-indigo-600'
                  } focus:ring-indigo-500`}
                />
                <label htmlFor="can_schedule_interviews" className={`ml-2 block text-sm ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Can Schedule Interviews
                </label>
              </div>

              <div className="mx-auto max-w-xs">
                <label className={`block text-sm font-medium ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Candidate Suggestions
                </label>
                <select
                  name="candidate_suggestions"
                  value={formData.candidate_suggestions}
                  onChange={handleInputChange}
                  className={`mt-1 block w-full rounded-md shadow-sm ${
                    theme === 'dark' 
                      ? 'bg-gray-700 border-gray-600 text-white' 
                      : 'border-gray-300 text-gray-900'
                  }`}
                >
                  <option value="none">No suggestions</option>
                  <option value="once">One-time matching</option>
                  <option value="always">AI-powered matching</option>
                </select>
              </div>

              <div className="mt-6 flex justify-center space-x-3">
                <button
                  type="button"
                  onClick={closeEditModal}
                  className={`px-4 py-2 text-sm font-medium rounded-md ${
                    theme === 'dark'
                      ? 'bg-gray-700 text-gray-200 hover:bg-gray-600'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </Dialog.Panel>
        </Transition.Child>
      </div>
    </div>
  </Dialog>
</Transition>
{/* Delete Confirmation Modal */}
<Transition appear show={isDeleteConfirmOpen} as={Fragment}>
  <Dialog as="div" className="relative z-20" onClose={closeDeleteConfirm}>
    <Transition.Child
      as={Fragment}
      enter="ease-out duration-300"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="ease-in duration-200"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div className={`fixed inset-0 ${theme === 'dark' ? 'bg-black bg-opacity-50' : 'bg-gray-500 bg-opacity-75'}`} />
    </Transition.Child>

    <div className="fixed inset-0 overflow-y-auto">
      <div className="flex min-h-full items-center justify-center p-4 text-center">
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <Dialog.Panel className={`w-full max-w-md transform overflow-hidden rounded-2xl p-6 text-left align-middle shadow-xl transition-all ${
            theme === 'dark' ? 'bg-gray-800' : 'bg-white'
          }`}>
            <Dialog.Title
              as="h3"
              className={`text-lg font-medium leading-6 ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}
            >
              Confirm Deletion
            </Dialog.Title>
            
            <div className="mt-4">
              <p className={`text-sm ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-500'
              }`}>
                Are you sure you want to delete the "{planToDelete?.name}" plan? This action cannot be undone.
              </p>
            </div>

            <div className="mt-6 flex justify-end space-x-3">
              <button
                type="button"
                onClick={closeDeleteConfirm}
                className={`px-4 py-2 text-sm font-medium rounded-md ${
                  theme === 'dark'
                    ? 'bg-gray-700 text-gray-200 hover:bg-gray-600'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDeletePlan}
                className="px-4 py-2 text-sm font-medium rounded-md text-white bg-rose-600 hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500"
              >
                Delete Plan
              </button>
            </div>
          </Dialog.Panel>
        </Transition.Child>
      </div>
    </div>
  </Dialog>
</Transition>
    </div>
  );
};

export default Allplans;