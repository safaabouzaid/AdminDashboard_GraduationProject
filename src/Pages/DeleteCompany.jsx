import { Modal, Button } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteCompany } from "../redux/CompanySlice";


export default function DeleteCompany({ showModal, setShowModal, companyId }) {
  const dispatch = useDispatch();

  const handleConfirmDelete = () => {
    dispatch(deleteCompany(companyId)); 
    setShowModal(false); 
  };

  return (
    <Modal open={showModal} onClose={() => setShowModal(false)}>
      <div className="flex justify-center items-center min-h-screen bg-opacity-30">
        <div className="p-8 rounded-xl w-[90%] max-w-md bg-amber-50 shadow-lg">
          <div className="text-center">
            <h3 className="text-xl font-semibold mb-6">Are you sure you want to delete this company?</h3>
            <div className="flex justify-center gap-6">
              <Button variant="contained" color="error" onClick={handleConfirmDelete}>
                Yes, I'm sure
              </Button>
              <Button onClick={() => setShowModal(false)} color="inherit">
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}
