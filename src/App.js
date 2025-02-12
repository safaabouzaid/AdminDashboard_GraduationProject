import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "./Pages/Login";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Privacy } from "./Pages/Privacy";
import Dashboard from './Pages/Dashboard';
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
    <div className="App">
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<Login />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/privacy" element={<Privacy />} />
            <Route exact path="/dashboard" element={<Dashboard />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;
