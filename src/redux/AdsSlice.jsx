import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import config from '../../src/config';

const API_URL = `${config.API_BASE_URL}admin-dash/ads/`;    

export const fetchAds = createAsyncThunk(
  'ads/fetchAds',
  async (_, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(API_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
          'ngrok-skip-browser-warning': 'true',
          Accept: 'application/json',
        },
      });
      return Array.isArray(response.data) ? response.data : response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue('Error fetching ads');
    }
  }
);

export const addAd = createAsyncThunk(
  'ads/addAd',
  async (data, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(API_URL, data, {  
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue('Error creating ad');
    }
  }
);

export const deleteAd = createAsyncThunk(
  'ads/deleteAd',
  async (adId, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(`${API_URL}${adId}/`, { 
        headers: {
          Authorization: `Bearer ${token}`,
          'ngrok-skip-browser-warning': 'true',
          Accept: 'application/json',
        },
      });
      return adId;
    } catch (error) {
      console.log("Delete Ad Error:", error.response?.data || error.message);
      return thunkAPI.rejectWithValue(error.response?.data || "Delete failed");
    }
  }
);

const adsSlice = createSlice({
  name: 'ads',
  initialState: {
    ads: [],
    loading: false,
    error: null,
  },
  
  extraReducers: (builder) => {
    builder
      .addCase(fetchAds.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAds.fulfilled, (state, action) => {
        state.loading = false;
        state.ads = action.payload;
      })
      .addCase(fetchAds.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addAd.fulfilled, (state, action) => {
        state.ads.push(action.payload);
      })
      .addCase(addAd.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(deleteAd.pending, (state) => {
        state.loading = true;  
      })
      .addCase(deleteAd.fulfilled, (state, action) => {
        state.loading = false;
        state.ads = state.ads.filter((ad) => ad.id !== action.payload);
      })
      .addCase(deleteAd.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });      
  },
});

export default adsSlice.reducer;