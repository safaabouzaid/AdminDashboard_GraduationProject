import React, { useEffect , useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllComplaints, updateComplaintStatus } from "../redux/complaintSlice";

const statusColor = {
  new: "bg-gray-200 text-gray-800",
  resolved: "bg-green-200 text-green-800"
};

const AdminComplaints = () => {
  const dispatch = useDispatch();
  const { complaints, loading, error } = useSelector((state) => state.complaint);
  const { theme } = useSelector((state) => state.theme);
  const [filterStatus, setFilterStatus] = useState("all");


  useEffect(() => {
    dispatch(getAllComplaints());
    console.log("Complaints are being fetched...");
  }, [dispatch]);
  

  console.log("Complaints after fetching: ", complaints);
  

  const handleStatusChange = (id, newStatus) => {
    dispatch(updateComplaintStatus({ id, status: newStatus }));
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  const list = complaints || [];
const filteredComplaints = complaints
  .filter((complaint) =>
    filterStatus === "all" ? true : complaint.status === filterStatus
  )
  .sort((a, b) => {
    if (filterStatus === "all") {
      if (a.status === "new" && b.status !== "new") return -1;
      if (a.status !== "new" && b.status === "new") return 1;
    }
    return 0;
  });


  return (
    <div className={`p-6 ml-4 ${theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-800"}`}>
      <div className="mb-4">
  <label htmlFor="filter" className="mr-2 font-medium">
    Filter by Status:
  </label>
  <select
    id="filter"
    value={filterStatus}
    onChange={(e) => setFilterStatus(e.target.value)}
    className="border px-2 py-1 rounded"
  >
    <option value="all">All</option>
    <option value="new">New</option>
    <option value="resolved">Resolved</option>
  </select>
</div>

      <h2 className={`text-2xl font-bold mb-4 ${theme === "dark" ? "text-white" : "text-gray-800"}`}>
        Complaints Management
      </h2>
      <div className={`overflow-x-auto ${theme === "dark" ? "bg-gray-800" : "bg-white"} rounded-lg shadow-md`}>
        <table className="min-w-full table-auto text-sm text-left">
          <thead className={`bg-gray-100 ${theme === "dark" ? "bg-gray-700" : "bg-gray-100"} text-gray-700 ${theme === "dark" ? "text-gray-300" : "text-gray-900"}`}>
            <tr>
              <th className={`px-4 py-3  ${theme === "dark" ? " text-white" : " text-gray-800"}`}>User</th>
              <th className={`px-4 py-3  ${theme === "dark" ? " text-white" : " text-gray-800"}`}>Title</th>
              <th className={`px-4 py-3  ${theme === "dark" ? " text-white" : " text-gray-800"}`}>Description</th>
              <th className={`px-4 py-3  ${theme === "dark" ? " text-white" : " text-gray-800"}`}>Status</th>
              <th className={`px-4 py-3  ${theme === "dark" ? " text-white" : " text-gray-800"}`}>Created At</th>
              <th className={`px-4 py-3 text-center ${theme === "dark" ? " text-white" : " text-gray-800"}`}>Actions</th>
            </tr>
          </thead>
          <tbody className={theme === "dark" ? "text-gray-100" : "text-gray-800"}>
          {Array.isArray(filteredComplaints) && filteredComplaints.length > 0 ? (
  filteredComplaints.map((complaint) => (
    <tr
      key={complaint.id}
      className={`border-b ${
        theme === "dark" ? "border-gray-700" : "border-gray-200"
      } hover:!bg-gray-500 dark:hover:!bg-gray-300 transition`}
    >
      <td className="px-4 py-2">{complaint.user.email}</td>
      <td className="px-4 py-2">{complaint.title}</td>
      <td className="px-4 py-2">{complaint.description}</td>
      <td className="px-4 py-2">
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${statusColor[complaint.status]}`}
        >
          {complaint.status}
        </span>
      </td>
      <td className="px-4 py-2">
        {new Date(complaint.created_at).toLocaleString()}
      </td>
      <td className="px-4 py-2 flex flex-col md:flex-row items-center justify-center gap-2">
        {complaint.status !== "resolved" && (
          <button
            onClick={() => handleStatusChange(complaint.id, "resolved")}
            className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition text-xs"
          >
            Mark Resolved
          </button>
        )}
        <a
          href={`mailto:${complaint.user.email}`}
          className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition text-xs"
        >
          Send Email
        </a>
      </td>
    </tr>
  ))
) : (
  <tr>
    <td colSpan="6" className="text-center text-gray-500 py-6">
      No complaints found.
    </td>
  </tr>
)}

          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminComplaints;
