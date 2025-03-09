import { useState } from "react";
import { TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function AddCompany() {
  const navigate = useNavigate();
  const [company, setCompany] = useState({
    name: "",
    email: "",
    employees: "",
    address: "",
    logo: "",
  });

  const handleChange = (e) => {
    setCompany({ ...company, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Company Added:", company);
    navigate("/companies"); 
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-white p-9 rounded-2xl shadow-xl w-full max-w-5xl ">
        <h2 className="text-4xl font-semibold mb-8 text-center text-gray-800">Add a New Company</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
          <TextField
            label="Company Name"
            name="name"
            value={company.name}
            onChange={handleChange}
            required
            fullWidth
            variant="outlined"
            size="large"
          />
          <TextField
            label="Company Email"
            name="email"
            type="email"
            value={company.email}
            onChange={handleChange}
            required
            fullWidth
            variant="outlined"
            size="large"
          />
          <TextField
            label="Number of Employees"
            name="employees"
            type="number"
            value={company.employees}
            onChange={handleChange}
            required
            fullWidth
            variant="outlined"
            size="large"
          />
          <TextField
            label="Address"
            name="address"
            value={company.address}
            onChange={handleChange}
            required
            fullWidth
            variant="outlined"
            size="large"
          />
          <TextField
            label="Logo URL"
            name="logo"
            value={company.logo}
            onChange={handleChange}
            fullWidth
            size="large"
          />
          <div className="flex justify-between mt-8">
            <Button
              color="error"
              variant="outlined"
              onClick={() => navigate("/")}
              size="large"
              style={{ padding: "16px 32px" }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-gradient-to-r from-emerald-700 to-emerald-700 rounded-full text-white shadow-md"
              variant="contained"
              size="large"
              
            >
              Add
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
