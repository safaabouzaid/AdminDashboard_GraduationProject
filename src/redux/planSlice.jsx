import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import config from '../../src/config';  

const API_URL = `${config.API_BASE_URL}admin-dash/plans/create/`; 

export const createPlan = createAsyncThunk(
  'plans/createPlan',
  async (planData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token'); 
      const response = await axios.post(API_URL, planData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || 'Something went wrong');
    }
  }
);

const planSlice = createSlice({
  name: 'plans',
  initialState: {
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    resetStatus: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createPlan.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(createPlan.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(createPlan.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { resetStatus } = planSlice.actions;
export default planSlice.reducer;
