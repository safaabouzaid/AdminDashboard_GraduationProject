import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getCompanies = createAsyncThunk(
    "companies/getCompanies", 
    async (_, { getState }) => {
      const state = getState(); 
      const user = state.user.user; 
  
    
      if (!user || !user.access) {
        throw new Error("User is not authenticated or no access token available.");
      }
  
      const token = user.access; 
  
      const response = await axios.get("http://localhost:8000/admin-dash/companies/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      return response.data.data; 
    }
  );
  


export const deleteCompany = createAsyncThunk(
  "companies/deleteCompany",
  async (companyId, { getState }) => {
    const state = getState();
    const token = state.user.token;

    const response = await axios.delete(`http://localhost:8000/admin-dash/companies/${companyId}/delete`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      

    return companyId; 
  }
);


const companySlice = createSlice({
  name: "companies",
  initialState: {
    companies: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCompanies.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCompanies.fulfilled, (state, action) => {
        state.loading = false;
        state.companies = action.payload;
      })
      .addCase(getCompanies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteCompany.fulfilled, (state, action) => {
        state.companies = state.companies.filter(
          (company) => company.id !== action.payload
        );
      });
  },
});

export default companySlice.reducer;
