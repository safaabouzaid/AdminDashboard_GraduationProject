import { Modal, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button } from '@mui/material';
import { useState } from 'react';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { FaCheck, FaTimes } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function DashCompany() {
  const { theme } = useSelector((state) => state.theme);
  const navigate = useNavigate(); 
  const [users, setUsers] = useState([
    {
      id: 1,
      username: "ALsham University",
      email: "info@aspu.edu.sy",
      createdAt: "2025-02-10",
    },
    {
      id: 2,
      username: "Forsa-Tech",
      email: "forsa-tech@gmail.com",
      createdAt: "2025-01-15",
    },
    {
      id: 3,
      username: "ALsham University",
      email: "info@aspu.edu.sy",
      createdAt: "2025-02-10",
    },
    {
      id: 4,
      username: "ALsham University",
      email: "info@aspu.edu.sy",
      createdAt: "2025-02-10",
    },
    {
      id: 5,
      username: "ALsham University",
      email: "info@aspu.edu.sy",
      createdAt: "2025-02-10",
    },
  ]);

  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState('');

  const handleConfirmDelete = () => {
    setUsers(prevUsers => prevUsers.filter(user => user.id !== userIdToDelete));
    setShowModal(false); 
  };

  return (
    <><div className="mb-0 pt-0 text-end ">
    <Button
  onClick={() => navigate("/dashboard?tab=addcompany")}     
  className="bg-gradient-to-r from-emerald-700 to-emerald-700 rounded-full text-white shadow-md "
  variant="contained"
>
  Add Company
</Button></div>
    <div className={`w-full shadow-inner shadow-gray-700 md:mx-auto ${theme === "dark" ? "text-white bg-gray-800" : "text-gray-800 bg-white"} w-full m-4 shadow-inner rounded-2xl shadow-blue-200 md:mx-auto p-3`}>
    
      

      {users.length > 0 ? (
        <>
          <TableContainer>
            <Table className={`${theme === "dark" ? "text-white bg-gray-800" : "text-gray-800 bg-white"}`}>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ color: theme === "dark" ? "white" : "black" }}>Date created</TableCell>
                  <TableCell sx={{ color: theme === "dark" ? "white" : "black" }}>Company image</TableCell>
                  <TableCell sx={{ color: theme === "dark" ? "white" : "black" }}>Company name</TableCell>
                  <TableCell sx={{ color: theme === "dark" ? "white" : "black" }}>Email</TableCell>
                  <TableCell sx={{ color: theme === "dark" ? "white" : "black" }}>Delete</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell sx={{ color: theme === "dark" ? "white" : "black" }}>{new Date(user.createdAt).toLocaleDateString()}</TableCell>
                    <TableCell sx={{ color: theme === "dark" ? "white" : "black" }}>
                      <img
                        src={user.profilePicture || 'default-image.jpg'}
                        alt={user.username}
                        className="w-10 h-10 object-cover bg-gray-500 rounded-full"
                      />
                    </TableCell>
                    <TableCell sx={{ color: theme === "dark" ? "white" : "black" }}>{user.username}</TableCell>
                    <TableCell sx={{ color: theme === "dark" ? "white" : "black" }}>{user.email}</TableCell>
                    <TableCell sx={{ color: theme === "dark" ? "white" : "black" }}>
                      <span
                        onClick={() => {
                          setUserIdToDelete(user.id);
                          setShowModal(true);
                        }}
                        className="font-medium text-red-700 hover:underline cursor-pointer"
                      >
                        Delete
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {showMore && (
            <button onClick={() => console.log("Load more clicked")} className="w-full text-teal-500 self-center text-sm py-7">
              Show more
            </button>
          )}
        </>
      ) : (
        <p className="text-gray-500 dark:text-gray-400">You have no companies yet!</p>
      )}

      <Modal open={showModal} onClose={() => setShowModal(false)}>
        <div className="flex justify-center items-center min-h-screen backdrop-opacity-100">
          <div className="bg-white p-6 rounded-lg text-center">
            <HiOutlineExclamationCircle className="h-14 w-14 !text-red-700 dark:text-gray-200 mb-4 mx-auto" />
            <h3 className="mb-5 text-lg !text-gray-800 dark:text-gray-400">
              Are you sure you want to delete this company?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="error" onClick={handleConfirmDelete}>
                Yes, I'm sure
              </Button>
              <Button color="inherit" onClick={() => setShowModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    </div></>
  );
}
