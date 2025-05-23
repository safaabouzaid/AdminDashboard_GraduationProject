import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import config from '../../src/config'; 

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (userCredential) => {
    try {
      const { data } = await axios.post(`${config.API_BASE_URL}api/admin/login/`, userCredential, {
        headers: {      
          "Content-Type": "application/json",
          'ngrok-skip-browser-warning': 'true',
          Accept: 'application/json',
        },
      });

      if (data.access) {
        localStorage.setItem("token", data.access); 
        console.log('Token stored in localStorage:', localStorage.getItem('token'));
      }

      return data;
    } catch (error) {
      console.error("Error during login:", error);
      throw error;
    }
  }
);

const getTokenFromLocalStorage = () => {
  return localStorage.getItem("token") || null;
};

const userSlice = createSlice({
  name: "user",
  initialState: {
    loading: false,
    token: getTokenFromLocalStorage(),
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.token = null;
      localStorage.removeItem('token');
    },
  },
  
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.token = null;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.access;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.token = null;
        state.error = action.error.message;
      });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;