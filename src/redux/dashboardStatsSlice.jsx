import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import config from '../../src/config'; 

export const fetchDashboardStats = createAsyncThunk(
  'dashboard/fetchStats',
  async (_, thunkAPI) => {
    try {
      const token = localStorage.getItem('token'); 
      console.log("TOKEN USED:", token);
      const response = await axios.get(
        `${config.API_BASE_URL}admin-dash/dashboard/stats/`, 
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'ngrok-skip-browser-warning': 'true', 
            Accept: 'application/json'
          }
        }
      );
      return response.data;
    } catch (error) {
      console.error('ERROR RESPONSE:', error.response?.data || error.message);
      return thunkAPI.rejectWithValue('Failed to fetch dashboard statistics');
    }
  }
);

const dashboardStatsSlice = createSlice({
  name: "dashboardStats",
  initialState: {
    stats: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardStats.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDashboardStats.fulfilled, (state, action) => {
        state.loading = false;
        state.stats = action.payload;
      })
      .addCase(fetchDashboardStats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default dashboardStatsSlice.reducer;