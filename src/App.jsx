import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "./Pages/Login";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Privacy } from "./Pages/Privacy";
import Dashboard from './Pages/Dashboard';
import MainDash from "./components/MainDash/MainDash";
import DashboardLayout from "./components/DashboardLayout";
const theme = createTheme({
  palette: {
    secondary: "",
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

        <Route path="/dashboard" element={
          <DashboardLayout>
            <MainDash />
          </DashboardLayout>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
