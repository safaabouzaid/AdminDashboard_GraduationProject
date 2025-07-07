import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchSubscriptionRequests,
  handleSubscriptionRequest,
  clearSubscriptionRequestsErrors,
} from '../redux/subscriptionRequestsSlice';
import {
  Check as ApproveIcon,
  Close as RejectIcon,
  Info as DetailsIcon,
} from '@mui/icons-material';

const SubscriptionRequestsPage = () => {
  const dispatch = useDispatch();
  const { theme } = useSelector((state) => state.theme);

  
  const subscriptionRequests = useSelector((state) => state.subscriptionRequests);
  const { requests = [], loading = false, error = null } = subscriptionRequests || {};

  const [confirmDialog, setConfirmDialog] = useState({ open: false, requestId: null, action: null });
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [selectedRequest, setSelectedRequest] = useState(null);

  useEffect(() => {
    dispatch(fetchSubscriptionRequests());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      setSnackbar({ open: true, message: error, severity: 'error' });
      dispatch(clearSubscriptionRequestsErrors());
    }
  }, [error, dispatch]);

  const handleRequestAction = (requestId, action) => {
    setConfirmDialog({ open: true, requestId, action });
  };

  const confirmAction = () => {
    dispatch(handleSubscriptionRequest({
      request_id: confirmDialog.requestId,
      action: confirmDialog.action
    })).then(() => {
      setSnackbar({
        open: true,
        message: `Request ${confirmDialog.action}d successfully`,
        severity: 'success'
      });
    });
    setConfirmDialog({ open: false, requestId: null, action: null });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const openDetails = (request) => {
    setSelectedRequest(request);
  };

  const closeDetails = () => {
    setSelectedRequest(null);
  };

  const displayPlan = (planId, planName) => {
    if (planName) return planName;
    switch (planId) {
      case 1: return 'Free';
      case 2: return 'Paid';
      case 3: return 'Enterprise';
      default: return 'Unknown';
    }
  };

  return (
    <div className="min-h-screen p-6 ">
      <div className={`rounded-xl shadow-md p-6 transition-colors duration-300 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>

        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className={`text-3xl font-bold bg-gradient-to-rbg-clip-text text-transparent ${theme === 'dark' ? 'text-white' : 'text-zinc-950'}`} >
            Subscription Requests
          </h1>
        </div> 

        

        {loading && !requests.length ? (
          <div className="flex justify-center mt-8">
            <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="border border-indigo-200 rounded-lg overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className={`${theme === 'dark' ? 'bg-indigo-500' : 'bg-indigo-500'}`}>

                <tr>
                  {['Company', 'Requested Plan', 'Status', 'Request Date', 'Actions'].map((header) => (
                    <th 
                      key={header}
                      className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className={`${theme === 'dark' ? 'bg-gray-900 divide-gray-700' : 'bg-white divide-gray-200'}`}>

                {requests.map((request) => (
                  <tr key={request.id} className={`hover:${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'} even:${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 bg-purple-500 rounded-full flex items-center justify-center text-white font-medium">
                          {request.company_name?.charAt(0) || 'C'}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {request.company_name || 'Unknown Company'}
                          </div>
                          <div className="text-sm text-gray-500">
                            ID: {request.company}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 text-sm font-medium text-white bg-indigo-300 rounded-full">
                        {displayPlan(request.requested_plan, request.requested_plan_name)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-bold rounded-full ${getStatusColor(request.status)}`}>
                        {request.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(request.created_at).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button 
                          onClick={() => openDetails(request)}
                          className="text-indigo-500 hover:bg-indigo-100 p-1 rounded-full"
                          title="Details"
                        >
                          <DetailsIcon className="h-5 w-5" />
                        </button>
                        
                        {request.status === 'pending' && (
                          <>
                            <button
                              onClick={() => handleRequestAction(request.id, 'approve')}
                              className="text-green-600 hover:bg-green-100 p-1 rounded-full"
                              title="Approve"
                            >
                              <ApproveIcon className="h-5 w-5" />
                            </button>
                            <button
                              onClick={() => handleRequestAction(request.id, 'reject')}
                              className="text-red-600 hover:bg-red-100 p-1 rounded-full"
                              title="Reject"
                            >
                              <RejectIcon className="h-5 w-5" />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Details Dialog */}
        {selectedRequest && (
          <div className="fixed inset-0   bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className={`  bg-opacity-80  rounded-xl w-full max-w-2xl overflow-hidden ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
              <div className="bg-indigo-500 text-white px-6 py-4 font-bold text-lg">
                Request Details
              </div>
              <div className="p-6">
                <div className={`flex items-center mb-6 p-4  rounded-lg ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
                  <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mr-6">
                    {selectedRequest.company_name?.charAt(0) || 'C'}
                  </div>
                  <div>
                    <h2 className={`text-2xl font-bold ${theme === 'dark' ? '!text-amber-300' : '!text-indigo-700'}`}>
  {selectedRequest.company_name}
</h2>

                    <p className="text-gray-500">
                      Company ID: {selectedRequest.company}
                    </p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <DetailCard 
                    title="Requested Plan"
                    value={displayPlan(selectedRequest.requested_plan, selectedRequest.requested_plan_name)}
                    color="border-indigo-300"
                  />
                  
                  <DetailCard 
                    title="Status"
                    value={selectedRequest.status}
                    color="border-indigo-500"
                    status={selectedRequest.status}
                  />
                  
                  <DetailCard 
                    title="Request Date"
                    value={new Date(selectedRequest.created_at).toLocaleString()}
                    color="border-purple-500"
                  />
                  
                  <DetailCard 
                    title="Request ID"
                    value={selectedRequest.id}
                    color="border-indigo-500"
                  />
                </div>
              </div>
              <div className={`px-6 py-3 flex justify-end${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
                <button 
                  onClick={closeDetails}
                  className="text-indigo-500 font-bold px-4 ml-140 py-2 rounded-lg hover:bg-indigo-50"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Confirmation Dialog */}
        {confirmDialog.open && (
          <div className="fixed inset-0  bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className={`${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'} rounded-xl p-6 max-w-md w-full border-2 ${confirmDialog.action === 'approve' ? 'border-indigo-300' : 'border-red-500'}`}>
              <h3 className="text-lg font-bold mb-4">Confirm Action</h3>
              <p className="mb-6">
                {`Are you sure you want to ${confirmDialog.action} this request?`}
              </p>
              <div className="flex justify-end space-x-3">
                <button 
                  onClick={() => setConfirmDialog({ ...confirmDialog, open: false })}
                  className="text-gray-500 px-4 py-2 rounded-lg hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button 
                  onClick={confirmAction} 
                  className={`px-4 py-2 rounded-lg font-bold text-white ${confirmDialog.action === 'approve' ? 'bg-indigo-300 hover:bg-indigo-500' : 'bg-red-500 hover:bg-red-700'}`}
                >
                  {confirmDialog.action === 'approve' ? 'Approve' : 'Reject'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Snackbar for notifications */}
        {snackbar.open && (
          <div className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg ${snackbar.severity === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            <div className="flex items-center">
              {snackbar.severity === 'success' ? (
                <ApproveIcon className="h-5 w-5 mr-2" />
              ) : (
                <RejectIcon className="h-5 w-5 mr-2" />
              )}
              <span className="font-medium">{snackbar.message}</span>
              <button 
                onClick={() => setSnackbar({ ...snackbar, open: false })}
                className="ml-4 text-lg font-bold"
              >
                &times;
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const DetailCard = ({ title, value, color, status }) => {
  const { theme } = useSelector((state) => state.theme);

  const getStatusClass = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return theme === 'dark' ? 'bg-gray-800 text-gray-200' : 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className={`p-4 rounded-lg shadow-sm border-l-4 ${color} ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}>
      <p className="text-sm text-gray-500 mb-2">{title}</p>
      {status ? (
        <span className={`px-2 py-1 text-xs font-bold rounded-full ${getStatusClass(status)}`}>
          {value}
        </span>
      ) : (
        <p className="font-medium">{value}</p>
      )}
    </div>
  );
};


export default SubscriptionRequestsPage;