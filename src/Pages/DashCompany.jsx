import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchCompanies } from "../redux/CompanySlice";
import { HiOutlineTrash, HiOutlinePencil } from "react-icons/hi";
import DeleteCompany from "./DeleteCompany";
import EditCompany from "./EditCompany";

export default function DashCompany() {
  const { theme } = useSelector((state) => state.theme);
  const { companies, loading, error } = useSelector((state) => state.company);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editedCompany, setEditedCompany] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedCompanyId, setSelectedCompanyId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) dispatch(fetchCompanies());
  }, [dispatch]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = companies.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(companies.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleDelete = (id) => {
    setSelectedCompanyId(id);
    setDeleteModalOpen(true);
  };

  const handleEditClick = (company) => {
    setEditedCompany(company);
    setEditModalOpen(true);
  };

  return (
    <>
      <div className="text-end mb-4">
        <button
          onClick={() => navigate("/dashboard?tab=addcompany")}
          className="bg-[oklch(0.723_0.219_149.579)] hover:bg-[oklch(0.627_0.194_149.214)] text-white font-bold rounded-full px-6 py-2 text-base transition duration-300"
        >
          Add Company
        </button>
      </div>

      <div
        className={`rounded-xl shadow-md p-6 ${
          theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-gray-800"
        }`}
      >
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : companies.length > 0 ? (
          <>
            <div className="overflow-x-auto max-h-[400px]">
              <table className="min-w-full text-sm text-left">
              <thead>
  <tr className="border-b border-gray-300">
    {["Date", "Image", "Name", "Description","Location", "Website", "Employees", "Actions"].map(
      (header) => (
        <th
          key={header}
          className={`px-4 py-3 ${
            theme === "dark" ? "text-white" : "text-gray-700"
          }`}
        >
          {header}
        </th>
      )
    )}
  </tr>
</thead>
<tbody>
  {currentItems.map((company) => (
    <tr
      key={company.id}
      className="transition hover:scale-[1.01] border-b border-gray-200"
    >
      <td className="px-4 py-2">
        {new Date(company.created_at || company.createdAt).toLocaleDateString()}
      </td>
      <td className="px-4 py-2">
        <img
          src={`http://localhost:8000${company.logo}`}
          alt={company.name}
          className="w-20 h-20 object-contain rounded-md"
        />
      </td>
      <td className="px-4 py-2">{company.name}</td>
      <td className="px-4 py-2">{company.description}</td>
      <td className="px-4 py-2">{company.address}</td>
      <td className="px-4 py-2">{company.website}</td> 
      <td className="px-4 py-2">{company.employees}</td>
      <td className="px-4 py-2">
        <div className="flex gap-2">
          <button
            onClick={() => handleEditClick(company)}
            className="border border-blue-500 text-blue-500 px-2 py-1 rounded-md hover:bg-blue-500 hover:text-white transition"
          >
            <HiOutlinePencil className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleDelete(company.id)}
            className="border border-red-500 text-red-500 px-2 py-1 rounded-md hover:bg-red-500 hover:text-white transition"
          >
            <HiOutlineTrash className="w-4 h-4" />
          </button>
        </div>
      </td>
    </tr>
  ))}
</tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-4 gap-2">
              {[...Array(totalPages).keys()].map((number) => (
                <button
                  key={number + 1}
                  onClick={() => paginate(number + 1)}
                  className={`px-4 py-2 rounded-xl font-medium ${
                    currentPage === number + 1
                      ? "bg-[oklch(0.723_0.219_149.579)] text-white"
                      : "border border-gray-300 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {number + 1}
                </button>
              ))}
            </div>
          </>
        ) : (
          <p>No companies found.</p>
        )}
      </div>

      <DeleteCompany
        showModal={deleteModalOpen}
        setShowModal={setDeleteModalOpen}
        companyId={selectedCompanyId}
      />
      <EditCompany
        open={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        company={editedCompany}
      />
    </>
  );
}
