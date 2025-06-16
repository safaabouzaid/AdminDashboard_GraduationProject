import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import config from '../../src/config';

export const fetchSubscriptionRequests = createAsyncThunk(
  "subscriptionRequests/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${config.API_BASE_URL}admin-dash/list-subscription/`, {
        headers: {
          "Content-Type": "application/json",
          'ngrok-skip-browser-warning': 'true',
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const handleSubscriptionRequest = createAsyncThunk(
  "subscriptionRequests/handle",
  async ({ request_id, action }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${config.API_BASE_URL}admin-dash/handle-subscription/`,
        { request_id, action },
        {
          headers: {
            "Content-Type": "application/json",
            'ngrok-skip-browser-warning': 'true',
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      return { request_id, action, data };
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const subscriptionRequestsSlice = createSlice({
  name: "subscriptionRequests",
  initialState: {
    loading: false,
    requests: [],
    error: null,
  },
  reducers: {
    clearSubscriptionRequestsErrors: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSubscriptionRequests.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSubscriptionRequests.fulfilled, (state, action) => {
        state.loading = false;
        state.requests = action.payload;
      })
      .addCase(fetchSubscriptionRequests.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(handleSubscriptionRequest.fulfilled, (state, action) => {
        const { request_id, action: reqAction } = action.payload;
        const requestIndex = state.requests.findIndex(req => req.id === request_id);
        
        if (requestIndex !== -1) {
          state.requests[requestIndex].status = reqAction === 'approve' ? 'approved' : 'rejected';
        }
      });
  },
});

export const { clearSubscriptionRequestsErrors } = subscriptionRequestsSlice.actions;
export default subscriptionRequestsSlice.reducer;