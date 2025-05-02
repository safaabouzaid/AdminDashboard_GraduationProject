import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchCompanies } from "../redux/CompanySlice";
import { HiOutlineTrash, HiOutlinePencil, HiOutlineSearch, HiOutlinePlus } from "react-icons/hi";
import { FiChevronLeft, FiChevronRight, FiChevronsLeft, FiChevronsRight } from "react-icons/fi";
import DeleteCompany from "./DeleteCompany";
import EditCompany from "./EditCompany";
import defaultLogo from "../assets/user1.jpeg";

export default function DashCompany() {
  const { theme } = useSelector((state) => state.theme);
  const { companies, loading, error } = useSelector((state) => state.company);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(4);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editedCompany, setEditedCompany] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedCompanyId, setSelectedCompanyId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) dispatch(fetchCompanies());
  }, [dispatch]);

  // Filter companies based on search term
  const filteredCompanies = (companies || [])
  .slice() 
  .sort((a, b) => {
    const dateA = new Date(a.created_at || a.createdAt);
    const dateB = new Date(b.created_at || b.createdAt);
    return dateB - dateA; 
  })
  .filter(company => 
    (company.name && company.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (company.address && company.address.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (company.website && company.website.toLowerCase().includes(searchTerm.toLowerCase()))
  );
  
  

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredCompanies.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredCompanies.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleDelete = (id) => {
    setSelectedCompanyId(id);
    setDeleteModalOpen(true);
  };

  const handleEditClick = (company) => {
    setEditedCompany(company);
    setEditModalOpen(true);
  };

  const handleRowClick = (id) => {
    navigate(`/company/${id}`);
  };

  const goToFirstPage = () => paginate(1);
  const goToLastPage = () => paginate(totalPages);
  const goToPrevPage = () => setCurrentPage(prev => Math.max(prev - 1, 1));
  const goToNextPage = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));

  return (
    <div className={`p-6 ${theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-800"}`}>
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold">Company Management</h1>
          <p className="text-sm text-gray-500">
            {filteredCompanies.length} companies found
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          {/* Search Bar */}
          <div className={`relative flex-grow ${theme === "dark" ? "bg-gray-800" : "bg-white"} rounded-lg shadow`}>
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <HiOutlineSearch className={`${theme === "dark" ? "text-gray-400" : "text-gray-500"}`} />
            </div>
            <input
              type="text"
              placeholder="Search companies..."
              className={`w-full pl-10 pr-4 py-2 rounded-lg focus:outline-none ${theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-gray-800"}`}
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>
          
          {/* Add Company Button */}
          <button
            onClick={() => navigate("/dashboard?tab=addcompany")}
            className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${theme === "dark" ? "gradient-to-r from-indigo-500 to-indigo-600  hover:bg-indigo-700" : "bg-indigo-500 hover:bg-indigo-600"} text-white`}
          >
            <HiOutlinePlus className="w-5 h-5" />
            <span>Add Company</span>
          </button>
        </div>
      </div>

      {/* Main Table */}
      <div className={`rounded-xl shadow-lg overflow-hidden ${theme === "dark" ? "bg-gray-800" : "bg-white"}`}>
        {loading ? (
          <div className="p-8 text-center">
            <p>Loading companies...</p>
          </div>
        ) : error ? (
          <div className="p-8 text-center text-red-500">
            <p>{error}</p>
          </div>
        ) : filteredCompanies.length > 0 ? (
          <>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className={`${theme === "dark" ? "bg-gray-700" : "bg-gray-100"}`}>
                  <tr>
                    {["Date", "Logo", "Name", "Location", "Website", "Actions"].map((header) => (
                      <th
                        key={header}
                        className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {currentItems.map((company) => (
                    <tr
                      key={company.id}
                      onClick={() => handleRowClick(company.id)}
                      className={`cursor-pointer transition ${theme === "dark" ? "hover:bg-gray-700" : "hover:bg-gray-50"}`}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm">
                          {new Date(company.created_at || company.createdAt).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex-shrink-0 h-12 w-12">
                          <img
                            src={company.logo ? `http://localhost:8000${company.logo}` : defaultLogo}
                            alt={company.name}
                            className="h-12 w-12 rounded-md object-cover"
                          />
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium">
                          {company.name}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm">
                          {company.address}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <a
                          href={company.website && company.website.startsWith("http") ? company.website : `https://${company.website}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className={`text-sm ${theme === "dark" ? "text-indigo-400 hover:text-indigo-300" : "text-indigo-600 hover:text-indigo-800"}`}
                        >
                          {company.website}
                        </a>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex gap-2  justify-end">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleEditClick(company);
                            }}
                            className={`p-2 rounded-md ${theme === "dark" ? "text-indigo-400 hover:bg-gray-700" : "text-indigo-600 hover:bg-gray-100"}`}
                            title="Edit"
                          >
                            <HiOutlinePencil className="w-5 h-5" />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDelete(company.id);
                            }}
                            className={`p-2 rounded-md ${theme === "dark" ? "text-red-400 hover:bg-gray-700" : "text-red-600 hover:bg-gray-100"}`}
                            title="Delete"
                          >
                            <HiOutlineTrash className="w-5 h-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className={`px-6 py-3 flex items-center justify-between ${theme === "dark" ? "bg-gray-700" : "bg-gray-50"}`}>
              <div className="flex-1 flex justify-between sm:hidden">
                <button
                  onClick={goToPrevPage}
                  disabled={currentPage === 1}
                  className={`relative inline-flex items-center px-4 py-2 border rounded-md text-sm font-medium ${theme === "dark" ? "border-gray-600 bg-gray-800 text-gray-300" : "border-gray-300 bg-white text-gray-700"} ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-50 dark:hover:bg-gray-700"}`}
                >
                  Previous
                </button>
                <button
                  onClick={goToNextPage}
                  disabled={currentPage === totalPages}
                  className={`ml-3 relative inline-flex items-center px-4 py-2 border rounded-md text-sm font-medium ${theme === "dark" ? "border-gray-600 bg-gray-800 text-gray-300" : "border-gray-300 bg-white text-gray-700"} ${currentPage === totalPages ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-50 dark:hover:bg-gray-700"}`}
                >
                  Next
                </button>
              </div>
              <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                  <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-700"}`}>
                    Showing <span className="font-medium">{indexOfFirstItem + 1}</span> to{' '}
                    <span className="font-medium">{Math.min(indexOfLastItem, filteredCompanies.length)}</span> of{' '}
                    <span className="font-medium">{filteredCompanies.length}</span> results
                  </p>
                </div>
                <div>
                  <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                    <button
                      onClick={goToFirstPage}
                      disabled={currentPage === 1}
                      className={`relative inline-flex items-center px-2 py-2 rounded-l-md border text-sm font-medium ${theme === "dark" ? "border-gray-600 bg-gray-800 text-gray-400 hover:bg-gray-700" : "border-gray-300 bg-white text-gray-500 hover:bg-gray-50"} ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""}`}
                    >
                      <span className="sr-only">First</span>
                      <FiChevronsLeft className="h-5 w-5" />
                    </button>
                    <button
                      onClick={goToPrevPage}
                      disabled={currentPage === 1}
                      className={`relative inline-flex items-center px-2 py-2 border text-sm font-medium ${theme === "dark" ? "border-gray-600 bg-gray-800 text-gray-400 hover:bg-gray-700" : "border-gray-300 bg-white text-gray-500 hover:bg-gray-50"} ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""}`}
                    >
                      <span className="sr-only">Previous</span>
                      <FiChevronLeft className="h-5 w-5" />
                    </button>
                    
                    {[...Array(Math.min(5, totalPages)).keys()].map((number) => {
                      const pageNumber = currentPage <= 3 
                        ? number + 1 
                        : currentPage >= totalPages - 2 
                          ? totalPages - 4 + number 
                          : currentPage - 2 + number;
                      
                      if (pageNumber < 1 || pageNumber > totalPages) return null;
                      
                      return (
                        <button
                          key={pageNumber}
                          onClick={() => paginate(pageNumber)}
                          className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${currentPage === pageNumber 
                            ? theme === "dark" 
                              ? "bg-indigo-600 border-indigo-600 text-white" 
                              : "bg-indigo-50 border-indigo-500 text-indigo-600"
                            : theme === "dark" 
                              ? "border-gray-600 bg-gray-800 text-gray-400 hover:bg-gray-700" 
                              : "border-gray-300 bg-white text-gray-500 hover:bg-gray-50"}`}
                        >
                          {pageNumber}
                        </button>
                      );
                    })}
                    
                    <button
                      onClick={goToNextPage}
                      disabled={currentPage === totalPages}
                      className={`relative inline-flex items-center px-2 py-2 border text-sm font-medium ${theme === "dark" ? "border-gray-600 bg-gray-800 text-gray-400 hover:bg-gray-700" : "border-gray-300 bg-white text-gray-500 hover:bg-gray-50"} ${currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""}`}
                    >
                      <span className="sr-only">Next</span>
                      <FiChevronRight className="h-5 w-5" />
                    </button>
                    <button
                      onClick={goToLastPage}
                      disabled={currentPage === totalPages}
                      className={`relative inline-flex items-center px-2 py-2 rounded-r-md border text-sm font-medium ${theme === "dark" ? "border-gray-600 bg-gray-800 text-gray-400 hover:bg-gray-700" : "border-gray-300 bg-white text-gray-500 hover:bg-gray-50"} ${currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""}`}
                    >
                      <span className="sr-only">Last</span>
                      <FiChevronsRight className="h-5 w-5" />
                    </button>
                  </nav>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="p-8 text-center">
            <p className="text-gray-500">No companies found. Try adjusting your search.</p>
          </div>
        )}
      </div>

      {/* Modals */}
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
    </div>
  );
}