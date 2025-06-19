import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import config from '../../src/config';

export const fetchPlans = createAsyncThunk('plans/fetchPlans', async (_, thunkAPI) => {
  try {
    const response = await axios.get(`${config.API_BASE_URL}admin-dash/plans/`,
       {
        headers: {
          "Content-Type": "application/json",
          'ngrok-skip-browser-warning': 'true',
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return Array.isArray(response.data) ? response.data : [];  
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data || error.message);
  }
});

export const updatePlan = createAsyncThunk(
  'plans/updatePlan',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await axios.patch(
        `${config.API_BASE_URL}admin-dash/plans/update/${id}/`,
        {
          job_post_limit: Number(data.job_post_limit),
          can_generate_tests: Boolean(data.can_generate_tests),
          can_schedule_interviews: Boolean(data.can_schedule_interviews),
          candidate_suggestions: data.candidate_suggestions || 'none',
          price: data.price ? Number(data.price) : null,
          is_active: Boolean(data.is_active)
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
            'ngrok-skip-browser-warning': 'true'
          }
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const deletePlan = createAsyncThunk(
  'plans/deletePlan',
  async (planId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error('No authentication token found');
      }

      await axios.delete(
        `${config.API_BASE_URL}admin-dash/plans/delete/${planId}/`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
            'ngrok-skip-browser-warning': 'true',
          }
        }
      );

      return planId; 
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const AllplansSlice = createSlice({
  name: 'plans',
  initialState: {
    plans: [],
    loading: false,
    error: null,
    updateStatus: 'idle',
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPlans.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPlans.fulfilled, (state, action) => {
        state.loading = false;
        state.plans = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(fetchPlans.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch plans';
      })
      .addCase(updatePlan.pending, (state) => {
        state.updateStatus = 'loading';
        state.error = null;
      })
      .addCase(updatePlan.fulfilled, (state, action) => {
        state.updateStatus = 'succeeded';
        if (action.payload && action.payload.id) {
          state.plans = state.plans.map(plan => 
            plan.id === action.payload.id ? action.payload : plan
          );
        }
      })
      .addCase(updatePlan.rejected, (state, action) => {
        state.updateStatus = 'failed';
        state.error = action.payload || 'Failed to update plan';
      })
      .addCase(deletePlan.pending, (state) => {
      state.updateStatus = 'loading';
      state.error = null;
    })
    .addCase(deletePlan.fulfilled, (state, action) => {
      state.updateStatus = 'succeeded';
      state.plans = state.plans.filter(plan => plan.id !== action.payload);
    })
    .addCase(deletePlan.rejected, (state, action) => {
      state.updateStatus = 'failed';
      state.error = action.payload || 'Failed to delete plan';
    });
  },
  
});

export default AllplansSlice.reducer;