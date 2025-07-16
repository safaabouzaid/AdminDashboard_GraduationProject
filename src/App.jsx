import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import { Privacy } from "./Pages/Privacy";
import Dashboard from './Pages/Dashboard';
import MainDash from "./components/MainDash/MainDash";
import DashboardLayout from "./components/DashboardLayout";
import CompanyProfile from "./Pages/CompanyProfile";
import ProtectedRoute from './ProtectedRoute';

import CompaniesByOpportunity from "./Pages/CompaniesByOpportunity";

const theme = createTheme({
  palette: {
    appBar: {
      main: "#6B1A6B",
      contrastText: "#ffffff",
    },
    button: {
      main: "#6B1A6B",
      contrastText: "#ffffff",
    },
    background: {
      default: "#f9fafb",
    },
  },
  typography: {
    fontFamily: '"Roboto", "Arial", sans-serif',
  },
});

function App() {
  return (
  
      
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/company/:id" element={<CompanyProfile />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <MainDash />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
  path="/companies-by-opportunity/:opportunityName"
  element={
    <ProtectedRoute>
      <DashboardLayout>
        <CompaniesByOpportunity />
      </DashboardLayout>
    </ProtectedRoute>
  }
/>

        </Routes>
      </BrowserRouter>

  );
}

export default App;
