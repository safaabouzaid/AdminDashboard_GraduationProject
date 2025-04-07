import {
  Modal,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function DashCompany() {
  const { theme } = useSelector((state) => state.theme);
  const navigate = useNavigate();

  const [users, setUsers] = useState([
    {
      id: 1,
      username: "ALsham University",
      email: "info@aspu.edu.sy",
      createdAt: "2025-02-10",
      employees: 130,
      profilePicture: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpve8QCCPBiCCxagjx5ei3qUSB_7UyDEepfg&s",
    },
    {
      id: 2,
      username: "Forsa-Tech",
      email: "forsa-tech@gmail.com",
      createdAt: "2025-01-15",
      employees: 25,
      profilePicture: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpve8QCCPBiCCxagjx5ei3qUSB_7UyDEepfg&s",
    
    },
    {
      id: 3,
      username: "Forsa-Tech",
      email: "forsa-tech@gmail.com",
      createdAt: "2025-01-15",
      employees: 25,
      profilePicture: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpve8QCCPBiCCxagjx5ei3qUSB_7UyDEepfg&s",
    
    },
    {
      id: 4,
      username: "Forsa-Tech",
      email: "forsa-tech@gmail.com",
      createdAt: "2025-01-15",
      employees: 25,
      profilePicture: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpve8QCCPBiCCxagjx5ei3qUSB_7UyDEepfg&s",
    
    },
    {
      id: 5,
      username: "Forsa-Tech",
      email: "forsa-tech@gmail.com",
      createdAt: "2025-01-15",
      employees: 25,
      profilePicture: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpve8QCCPBiCCxagjx5ei3qUSB_7UyDEepfg&s",
    
    },
    {
      id: 6,
      username: "Forsa-Tech",
      email: "forsa-tech@gmail.com",
      createdAt: "2025-01-15",
      employees: 25,
      profilePicture: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpve8QCCPBiCCxagjx5ei3qUSB_7UyDEepfg&s",
    
    },
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [showModal, setShowModal] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState("");
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editedCompany, setEditedCompany] = useState(null);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = users.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(users.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleConfirmDelete = () => {
    setUsers((prev) => prev.filter((u) => u.id !== userIdToDelete));
    setShowModal(false);
  };

  const handleEditClick = (company) => {
    setEditedCompany({ ...company });
    setEditModalOpen(true);
  };

  const handleEditSave = () => {
    setUsers((prev) =>
      prev.map((user) => (user.id === editedCompany.id ? editedCompany : user))
    );
    setEditModalOpen(false);
  };

  return (
    <>
      <div className="text-end mb-4">
        <Button
          onClick={() => navigate("/dashboard?tab=addcompany")}
          sx={{
            backgroundColor: "oklch(0.723 0.219 149.579)",
            "&:hover": { backgroundColor: "oklch(0.627 0.194 149.214)" },
            color: "white",
            fontWeight: "bold",
            borderRadius: "50px",
            textTransform: "none",
            px: 3,
            py: 1,
            fontSize: "1rem",
          }}
        >
          Add Company
        </Button>
      </div>

      <div className={`rounded-xl shadow-md p-6 ${theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-gray-800"}`}>
        {users.length > 0 ? (
          <>
            <TableContainer
              component="div"
              sx={{
                maxHeight: 400,
                overflowY: "auto",
                scrollbarWidth: "none",
                "&::-webkit-scrollbar": { display: "none" },
              }}
            >
              <Table>
              <TableHead>
  <TableRow>
    <TableCell style={{ color: theme === "dark" ? "white" : "#2D3748" }}>Date</TableCell>
    <TableCell style={{ color: theme === "dark" ? "white" : "#2D3748" }}>Image</TableCell>
    <TableCell style={{ color: theme === "dark" ? "white" : "#2D3748" }}>Name</TableCell>
    <TableCell style={{ color: theme === "dark" ? "white" : "#2D3748" }}>Email</TableCell>
    <TableCell style={{ color: theme === "dark" ? "white" : "#2D3748" }}>Employees</TableCell>
    <TableCell style={{ color: theme === "dark" ? "white" : "#2D3748" }}>
                      <div className=" ml-9">Actions</div>
                    </TableCell>
  </TableRow>
</TableHead>

<TableBody>
  {currentItems.map((user) => (
    <TableRow
      key={user.id}
      className={`transition hover:transform hover:scale-105 `}
    >
      <TableCell style={{ color: theme === "dark" ? "white" : "#2D3748" }}>
        {new Date(user.createdAt).toLocaleDateString()}
      </TableCell>
      <TableCell style={{ color: theme === "dark" ? "white" : "#2D3748" }}>
        <img
          src={user.profilePicture || "/default-company.png"}
          alt={user.username}
          className="w-12 h-12 rounded-full object-cover bg-gray-400"
        />
      </TableCell>
      <TableCell style={{ color: theme === "dark" ? "white" : "#2D3748" }}>{user.username}</TableCell>
      <TableCell style={{ color: theme === "dark" ? "white" : "#2D3748" }}>{user.email}</TableCell>
      <TableCell style={{ color: theme === "dark" ? "white" : "#2D3748" }}>{user.employees}</TableCell>
      <TableCell>
        <div className="flex gap-2">
          <Button
            variant="outlined"
            size="small"
            sx={{
              borderColor: "oklch(0.723 0.219 149.579)",
              color: "oklch(0.723 0.219 149.579)",
              textTransform: "none",
              fontWeight: "bold",
              borderRadius: "999px",
              "&:hover": {
                backgroundColor: "oklch(0.723 0.219 149.579 / 0.1)",
                borderColor: "oklch(0.723 0.219 149.579)",
              },
            }}
            onClick={() => handleEditClick(user)}
          >
            Edit
          </Button>
          <Button
            variant="outlined"
            color="error"
            size="small"
            sx={{ textTransform: "none", borderRadius: "999px",fontWeight: "bold" }}
            onClick={() => {
              setUserIdToDelete(user.id);
              setShowModal(true);
            }}
          >
            Delete
          </Button>
        </div>
      </TableCell>
    </TableRow>
  ))}
</TableBody>


              </Table>
            </TableContainer>

            <div className="flex justify-center mt-6 gap-2 flex-wrap">
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i + 1}
                  onClick={() => paginate(i + 1)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium border ${
                    theme === "dark" ? "border-gray-600 text-white hover:bg-gray-700" : "border-gray-300 text-gray-800 hover:bg-gray-200"
                  } ${currentPage === i + 1 ? "bg-[oklch(0.627_0.265_303.9)] text-white" : ""}`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </>
        ) : (
          <p className="text-gray-400 dark:text-gray-500">You have no companies yet!</p>
        )}

        {/* Delete Modal */}
        <Modal open={showModal} onClose={() => setShowModal(false)}>
          <div className="flex justify-center items-center min-h-screen bg-opacity-30">
            <div className={`p-8 rounded-xl w-[90%] max-w-md shadow-lg ${theme === "dark" ? "bg-gray-800 text-white" : "bg-white"}`}>
              <div className="text-center">
                <HiOutlineExclamationCircle className="w-14 h-14 mx-auto text-red-600 mb-6" />
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

        {/* Edit Modal */}
        {/* Edit Modal */}
<Modal open={editModalOpen} onClose={() => setEditModalOpen(false)}>
  <div className="flex justify-center items-center min-h-screen bg-opacity-40">
    <div
      className={`p-8 rounded-2xl w-[90%] max-w-md shadow-xl ${
        theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-gray-900"
      }`}
    >
      <h2 className="text-2xl font-semibold mb-6 text-center">Edit Company</h2>
      <div className="flex flex-col gap-5">
        <TextField
          label="Company Name"
          value={editedCompany?.username || ""}
          onChange={(e) => setEditedCompany({ ...editedCompany, username: e.target.value })}
          fullWidth
          variant="outlined"
          InputLabelProps={{ style: { color: theme === "dark" ? "white" : undefined } }}
          InputProps={{
            style: {
              color: theme === "dark" ? "white" : undefined,
              borderColor: theme === "dark" ? "white" : undefined,
            },
          }}
        />
        <TextField
          label="Email"
          value={editedCompany?.email || ""}
          onChange={(e) => setEditedCompany({ ...editedCompany, email: e.target.value })}
          fullWidth
          variant="outlined"
          InputLabelProps={{ style: { color: theme === "dark" ? "white" : undefined } }}
          InputProps={{
            style: {
              color: theme === "dark" ? "white" : undefined,
              borderColor: theme === "dark" ? "white" : undefined,
            },
          }}
        />
        <TextField
          label="Number of Employees"
          type="number"
          value={editedCompany?.employees || ""}
          onChange={(e) =>
            setEditedCompany({ ...editedCompany, employees: parseInt(e.target.value) })
          }
          fullWidth
          variant="outlined"
          InputLabelProps={{ style: { color: theme === "dark" ? "white" : undefined } }}
          InputProps={{
            style: {
              color: theme === "dark" ? "white" : undefined,
              borderColor: theme === "dark" ? "white" : undefined,
            },
          }}
        />
        <div className="flex justify-end gap-3 pt-4">
          <Button
            variant="contained"
            sx={{
              backgroundColor: "oklch(0.723 0.219 149.579)",
              "&:hover": { backgroundColor: "oklch(0.627 0.194 149.214)" },
              textTransform: "none",
              fontWeight: "bold",
              borderRadius: "999px",
              px: 3,
            }}
            onClick={handleEditSave}
          >
            Save
          </Button>
          <Button
            variant="outlined"
            color="error"
            sx={{
              textTransform: "none",
              fontWeight: "bold",
              borderColor: "#f87171",
              borderRadius: "999px",
              color: "#f87171",
              "&:hover": {
                backgroundColor: "#f87171",
                color: "white",
              },
            }}
            onClick={() => setEditModalOpen(false)}
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  </div>
</Modal>


      </div>
    </>
  );
}









