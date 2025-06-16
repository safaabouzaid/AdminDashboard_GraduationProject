import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import config from '../../src/config';  
export const fetchPlans = createAsyncThunk('plans/fetchPlans', async (_, thunkAPI) => {
  try {
    const response = await axios.get(`${config.API_BASE_URL}admin-dash/plans/`);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
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
          can_generate_tests: data.can_generate_tests,
          can_schedule_interviews: data.can_schedule_interviews,
          candidate_suggestions: data.candidate_suggestions,
          price: data.price ? Number(data.price) : null,
          is_active: data.is_active
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
        state.plans = action.payload;
      })
      .addCase(fetchPlans.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      .addCase(updatePlan.pending, (state) => {
        state.updateStatus = 'loading';
      })
      .addCase(updatePlan.fulfilled, (state, action) => {
        state.updateStatus = 'succeeded';
        const updatedPlan = action.payload;
        state.plans = state.plans.map(plan => 
          plan.id === updatedPlan.id ? updatedPlan : plan
        );
      })
      .addCase(updatePlan.rejected, (state, action) => {
        state.updateStatus = 'failed';
        state.error = action.payload;
      });
  },
});

export default AllplansSlice.reducer;