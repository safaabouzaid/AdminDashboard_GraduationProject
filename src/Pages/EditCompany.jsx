import { TextField, Button } from "@mui/material";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editCompany } from "../redux/actions/companyActions"; 

export default function EditCompany({ companyId }) {
  const dispatch = useDispatch();
  const company = useSelector((state) => state.companies.find((comp) => comp.id === companyId));
  const [editedCompany, setEditedCompany] = useState(company);

  useEffect(() => {
    setEditedCompany(company); 
  }, [company]);

  const handleSaveChanges = () => {
    dispatch(editCompany(editedCompany)); 
  };

  return (
    <div className="p-8 rounded-2xl w-[90%] max-w-md shadow-xl">
      <h2 className="text-2xl font-semibold mb-6 text-center">Edit Company</h2>
      <div className="flex flex-col gap-5">
        <TextField
          label="Company Name"
          value={editedCompany?.username || ""}
          onChange={(e) => setEditedCompany({ ...editedCompany, username: e.target.value })}
          fullWidth
          variant="outlined"
        />
        <TextField
          label="Company Email"
          value={editedCompany?.email || ""}
          onChange={(e) => setEditedCompany({ ...editedCompany, email: e.target.value })}
          fullWidth
          variant="outlined"
        />
        <TextField
          label="Number of Employees"
          value={editedCompany?.employees || ""}
          onChange={(e) => setEditedCompany({ ...editedCompany, employees: e.target.value })}
          fullWidth
          variant="outlined"
          type="number"
        />
        <div className="mt-4 text-center">
          <Button
            variant="contained"
            onClick={handleSaveChanges}
            sx={{ backgroundColor: "oklch(0.723 0.219 149.579)", textTransform: "none" }}
          >
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
}
