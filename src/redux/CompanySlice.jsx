
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:8000/admin-dash/companies/';

export const fetchCompanies = createAsyncThunk(
  'company/fetchCompanies',
  async (_, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");
      console.log("Token from localStorage:", token);

      if (!token) {
        return thunkAPI.rejectWithValue('Authentication token is missing');
      }

      const response = await axios.get(API_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data.data;
    } catch (error) {
      console.error("Error fetching companies:", error);
      return thunkAPI.rejectWithValue(error.response?.data?.detail || 'Error occurred while fetching companies');
    }
  }
);

export const deleteCompany = createAsyncThunk(
  'company/deleteCompany',
  async (id, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        return thunkAPI.rejectWithValue('Authentication token is missing');
      }

      await axios.delete(`http://localhost:8000/admin-dash/companies/${id}/delete/`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      

      return id;
    } catch (error) {
      console.error("Error deleting company:", error);
      return thunkAPI.rejectWithValue('Failed to delete the company');
    }
  }
);

export const updateCompany = createAsyncThunk(
  'company/updateCompany',
  async ({ id, data }, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(`http://localhost:8000/admin-dash/companies/${id}/update/`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || 'Error occurred while updating the company');
    }
  }
);
export const addCompany = createAsyncThunk(
  'company/addCompany',
  async (data, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("employees", data.employees);
      formData.append("address", data.address);
      formData.append("description", data.description);
      formData.append("website", data.website);

      if (data.logo) {
        formData.append("logo", data.logo);
      }

      const response = await axios.post('http://localhost:8000/admin-dash/companies/create/', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || 'Error occurred while adding the company');
    }
  }
);


const companySlice = createSlice({
  name: 'company',
  initialState: {
    companies: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCompanies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCompanies.fulfilled, (state, action) => {
        state.loading = false;
        state.companies = action.payload;
      })
      .addCase(fetchCompanies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteCompany.fulfilled, (state, action) => {
        state.companies = state.companies.filter(c => c.id !== action.payload);
      })
      .addCase(deleteCompany.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(updateCompany.fulfilled, (state, action) => {
        const updatedCompany = action.payload;
        const index = state.companies.findIndex(c => c.id === updatedCompany.id);
        if (index !== -1) {
          state.companies[index] = updatedCompany;
        }
      })
      .addCase(addCompany.fulfilled, (state, action) => {
        state.companies.push(action.payload);
      })
      .addCase(addCompany.rejected, (state, action) => {
        state.error = action.payload;
      });
      
  },
});

export default companySlice.reducer;
