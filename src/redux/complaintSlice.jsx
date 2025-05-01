// import
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = "https://f4d8-149-36-51-14.ngrok-free.app";

export const getAllComplaints = createAsyncThunk(
  "complaints/getAll",
  async (_, thunkAPI) => {
    const token = localStorage.getItem("token"); 
    if (!token) {
      return thunkAPI.rejectWithValue("Authentication token is missing");
    }

    try {
      const response = await axios.get("/admin-dash/complaints/", {
        headers: {
          Authorization: `Bearer ${token}`,
          'ngrok-skip-browser-warning': 'true', 
          Accept: 'application/json'
        },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);


// Update complaint status
export const updateComplaintStatus = createAsyncThunk(
  "complaints/updateStatus",
  async ({ id, status }, thunkAPI) => {
    const token = localStorage.getItem("token"); 
    if (!token) {
      return thunkAPI.rejectWithValue("Authentication token is missing");
    }

    try {
      const response = await axios.patch(
        `/admin-dash/complaints/${id}/update/`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`, 
            'ngrok-skip-browser-warning': 'true', 
            Accept: 'application/json'
          },
        }
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);


const complaintSlice = createSlice({
  name: "complaints",
  initialState: {
    complaints: [],
    loading: false,
    error: null,
    updateStatus: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllComplaints.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllComplaints.fulfilled, (state, action) => {
        state.loading = false;
        state.complaints = action.payload.complaints;
      })
      
      
      .addCase(getAllComplaints.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateComplaintStatus.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateComplaintStatus.fulfilled, (state, action) => {
        const updatedComplaint = action.payload.complaint;
        const updatedComplaints = state.complaints.map((complaint) =>
          complaint.id === updatedComplaint.id ? updatedComplaint : complaint
        );
        state.complaints = updatedComplaints;
        state.loading = false;
      })
      .addCase(updateComplaintStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
    
  }
});

export default complaintSlice.reducer;
