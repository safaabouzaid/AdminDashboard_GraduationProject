import React, { useEffect, useState } from "react";
import { TrendingUp, Users, Briefcase, DollarSign, FileText, ChevronDown, ChevronUp } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell, Legend, ResponsiveContainer } from 'recharts';
import { useDispatch, useSelector } from "react-redux";
import { fetchDashboardStats } from "../redux/dashboardStatsSlice";
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

const Dashboard = () => {
  const { theme } = useSelector((state) => state.theme);
  const dispatch = useDispatch();
  const { stats, loading } = useSelector((state) => state.dashboardStats);
  const [expandedCards, setExpandedCards] = useState({});
  
  const toggleCard = (cardId) => {
    setExpandedCards(prev => ({
      ...prev,
      [cardId]: !prev[cardId]
    }));
  };

  const lineData = stats?.line_chart_data || [];
  const pieData = stats?.pie_chart_data || [];
  
  const handleExportToExcel = () => {
    const reportData = {
      'Companies': stats?.num_companies || 0,
      'New Companies This Month': stats?.new_companies || 0,
      'Top Hiring Company': stats?.most_hiring_company || 'N/A',
      'Top Hiring Jobs Count': stats?.most_hiring_company_count || 0,
      'Most Demanded Jobs': stats?.most_demanded_jobs?.slice(0, 3).join(', ') || 'N/A',
      'Highest Paying Job': stats?.highest_paying_job?.title || 'N/A',
      'Highest Salary': stats?.highest_paying_job?.salary || 'N/A',
      'Active Jobs': stats?.active_jobs || 0,
      'Premium Members': stats?.premium_members || 0,
      'Avg. Company Size': stats?.avg_company_size || 'N/A'
    };
  
    const worksheet = XLSX.utils.json_to_sheet([reportData]);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Dashboard Report");

    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(data, "Dashboard_Report.xlsx");
  };

  useEffect(() => {
    dispatch(fetchDashboardStats());
  }, [dispatch]);

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D'];

  return (
    <div className={`p-6 ml-4 mr-4 min-h-screen ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-800'}`}>
      <div className="flex justify-end mb-4">
        <button
          onClick={handleExportToExcel}
          className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-xl shadow"
        >
          Generate Report
        </button>
      </div>

      {/* Main Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Number of Companies */}
        <div 
          className={`p-6 rounded-xl shadow-lg transition-all duration-300 cursor-pointer ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} ${expandedCards['companies'] ? 'min-h-[180px]' : 'min-h-[120px]'}`}
          onClick={() => toggleCard('companies')}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Companies</p>
              <h3 className="text-3xl font-bold mt-1">+{stats?.num_companies || 0}</h3>
              <p className="text-xs text-green-500 mt-1">+{stats?.new_companies || 0}% this month</p>
            </div>
            <div className={`p-3 rounded-full ${theme === 'dark' ? 'bg-gray-700' : 'bg-blue-100'}`}>
              <Users className="text-blue-500" size={24} />
            </div>
          </div>
          {expandedCards['companies'] && (
            <div className="mt-4 text-sm">
              <p>Total registered companies in the platform</p>
              <p className="mt-1">New companies this month: {stats?.new_companies || 0}</p>
              <div className="flex justify-end mt-2">
                {expandedCards['companies'] ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </div>
            </div>
          )}
        </div>

        {/* Most Hiring Company */}
        <div 
          className={`p-6 rounded-xl shadow-lg transition-all duration-300 cursor-pointer ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} ${expandedCards['hiring'] ? 'min-h-[180px]' : 'min-h-[120px]'}`}
          onClick={() => toggleCard('hiring')}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Top Hiring Company</p>
              <h3 className="text-xl font-bold mt-1 truncate">
                {stats?.most_hiring_company || 'No data available'}
              </h3>
              <p className="text-xs text-gray-500 mt-1">
                {stats?.most_hiring_company_count || 0} jobs
              </p>
            </div>
            <div className={`p-3 rounded-full ${theme === 'dark' ? 'bg-gray-700' : 'bg-green-100'}`}>
              <TrendingUp className="text-green-500" size={24} />
            </div>
          </div>
          {expandedCards['hiring'] && (
            <div className="mt-4 text-sm">
              <p>Company with the most job postings</p>
              <p className="mt-1">Total jobs: {stats?.most_hiring_company_count || 0}</p>
              <div className="flex justify-end mt-2">
                {expandedCards['hiring'] ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </div>
            </div>
          )}
        </div>

        {/* Most Demanded Jobs */}
        <div 
          className={`p-6 rounded-xl shadow-lg transition-all duration-300 cursor-pointer ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} ${expandedCards['demanded'] ? 'min-h-[180px]' : 'min-h-[120px]'}`}
          onClick={() => toggleCard('demanded')}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">In-Demand Jobs</p>
              <h3 className="text-xl font-bold mt-1">{stats?.most_demanded_jobs?.[0] || 'N/A'}</h3>
              
            </div>
            <div className={`p-3 rounded-full ${theme === 'dark' ? 'bg-gray-700' : 'bg-yellow-100'}`}>
              <Briefcase className="text-yellow-500" size={24} />
            </div>
          </div>
          {expandedCards['demanded'] && (
            <div className="mt-4 text-sm">
              <p>Most popular job categories:</p>
              <ul className="list-disc pl-5 mt-1">
                {stats?.most_demanded_jobs?.map((job, index) => (
                  <li key={index}>{job}</li>
                )) || <li>No data available</li>}
              </ul>
              <div className="flex justify-end mt-2">
                {expandedCards['demanded'] ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </div>
            </div>
          )}
        </div>

        {/* Highest Paying Job */}
        <div 
          className={`p-6 rounded-xl shadow-lg transition-all duration-300 cursor-pointer ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} ${expandedCards['salary'] ? 'min-h-[180px]' : 'min-h-[120px]'}`}
          onClick={() => toggleCard('salary')}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Highest Salary</p>
              <h3 className="text-xl font-bold mt-1">
                {stats?.highest_paying_job?.title || 'N/A'}
              </h3>
              <p className="text-xs text-gray-500 mt-1">
                ${stats?.highest_paying_job?.salary || 'N/A'} per year
              </p>
            </div>
            <div className={`p-3 rounded-full ${theme === 'dark' ? 'bg-gray-700' : 'bg-purple-100'}`}>
              <DollarSign className="text-purple-500" size={24} />
            </div>
          </div>
          {expandedCards['salary'] && (
            <div className="mt-4 text-sm">
              <p>Job with the highest average salary</p>
              <p className="mt-1">Annual salary: ${stats?.highest_paying_job?.salary || 'N/A'}</p>
              <div className="flex justify-end mt-2">
                {expandedCards['salary'] ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Additional Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Active Jobs */}
        <div 
          className={`p-4 rounded-lg shadow transition-all duration-300 cursor-pointer ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} ${expandedCards['activeJobs'] ? 'min-h-[120px]' : 'min-h-[80px]'}`}
          onClick={() => toggleCard('activeJobs')}
        >
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-full ${theme === 'dark' ? 'bg-gray-700' : 'bg-blue-50'}`}>
              <FileText size={18} className="text-blue-400" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Active Jobs</p>
              <h3 className="text-lg font-semibold">{stats?.active_jobs || 0}</h3>
            </div>
          </div>
          {expandedCards['activeJobs'] && (
            <div className="mt-2 text-xs">
              <p>Currently available job postings</p>
              <div className="flex justify-end mt-1">
                {expandedCards['activeJobs'] ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </div>
            </div>
          )}
        </div>

        {/* Premium Members */}
        <div 
          className={`p-4 rounded-lg shadow transition-all duration-300 cursor-pointer ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} ${expandedCards['premium'] ? 'min-h-[120px]' : 'min-h-[80px]'}`}
          onClick={() => toggleCard('premium')}
        >
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-full ${theme === 'dark' ? 'bg-gray-700' : 'bg-purple-50'}`}>
              <DollarSign size={18} className="text-purple-400" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Premium Members</p>
              <h3 className="text-lg font-semibold">{stats?.premium_members || 0}</h3>
            </div>
          </div>
          {expandedCards['premium'] && (
            <div className="mt-2 text-xs">
              <p>Users with premium subscriptions</p>
              <div className="flex justify-end mt-1">
                {expandedCards['premium'] ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </div>
            </div>
          )}
        </div>

        {/* Avg. Company Size */}
        <div 
          className={`p-4 rounded-lg shadow transition-all duration-300 cursor-pointer ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} ${expandedCards['companySize'] ? 'min-h-[120px]' : 'min-h-[80px]'}`}
          onClick={() => toggleCard('companySize')}
        >
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-full ${theme === 'dark' ? 'bg-gray-700' : 'bg-green-50'}`}>
              <Users size={18} className="text-green-400" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Avg. Company Size</p>
              <h3 className="text-lg font-semibold">
                {stats?.avg_company_size ? Math.round(stats.avg_company_size) : 'N/A'}
              </h3>
            </div>
          </div>
          {expandedCards['companySize'] && (
            <div className="mt-2 text-xs">
              <p>Average number of employees per company</p>
              <div className="flex justify-end mt-1">
                {expandedCards['companySize'] ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </div>
            </div>
          )}
        </div>

        {/* New Companies */}
        <div 
          className={`p-4 rounded-lg shadow transition-all duration-300 cursor-pointer ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} ${expandedCards['newCompanies'] ? 'min-h-[120px]' : 'min-h-[80px]'}`}
          onClick={() => toggleCard('newCompanies')}
        >
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-full ${theme === 'dark' ? 'bg-gray-700' : 'bg-purple-50'}`}>
              <Users size={18} className="text-purple-400" />
            </div>
            <div>
              <p className="text-xs text-gray-500">New Companies</p>
              <h3 className="text-lg font-semibold">+{stats?.new_companies || 0}</h3>
            </div>
          </div>
          {expandedCards['newCompanies'] && (
            <div className="mt-2 text-xs">
              <p>Companies registered this month</p>
              <div className="flex justify-end mt-1">
                {expandedCards['newCompanies'] ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
  {/* Line Chart */}
  <div className={`p-6 rounded-xl shadow-lg lg:col-span-2 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
    <h2 className="text-lg font-semibold mb-4">Job Demand Trend</h2>
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={lineData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="month" 
                  tick={{ fill: theme === 'dark' ? '#fff' : '#666' }}
                />
                <YAxis 
                  tick={{ fill: theme === 'dark' ? '#fff' : '#666' }}
                />
                <Tooltip 
                  contentStyle={{
                    background: theme === 'dark' ? '#333' : '#fff',
                    borderColor: theme === 'dark' ? '#555' : '#ddd'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="count" 
                  stroke="#8884d8" 
                  activeDot={{ r: 8 }} 
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {/* Pie Chart */}
        {/* Pie Chart */}
<div className={`p-6 rounded-xl shadow-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
  <div 
    className="flex justify-between items-center cursor-pointer"
    onClick={() => toggleCard('pieChart')}
  >
    <h2 className="text-lg font-semibold">Job Category Distribution</h2>
    {expandedCards['pieChart'] ? (
      <ChevronUp className="text-gray-500" />
    ) : (
      <ChevronDown className="text-gray-500" />
    )}
  </div>

{/*PieChart*/}
  <div className="h-64">
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={pieData}
          dataKey="value"
          nameKey="name"
          outerRadius={80}
          fill="#8884d8"
          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
        >
          {pieData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip 
          formatter={(value) => [`${value} Jobs`, 'Count']}
          contentStyle={{
            background: theme === 'dark' ? '#333' : '#fff',
            borderColor: theme === 'dark' ? '#555' : '#ddd'
          }}
        />
      </PieChart>
    </ResponsiveContainer>
  </div>

  {expandedCards['pieChart'] && (
    <div className="mt-4 transition-all duration-300">
      <div className="mt-4 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className={`${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'}`}>
              <th className="p-2 text-left">Category</th>
              <th className="p-2 text-right">Jobs</th>
              <th className="p-2 text-right">Percentage</th>
            </tr>
          </thead>
          <tbody>
            {pieData.map((entry, index) => (
              <tr 
                key={index} 
                className={`border-b ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}
              >
                <td className="p-2 flex items-center">
                  <span 
                    className="w-3 h-3 rounded-full mr-2" 
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  />
                  {entry.name}
                </td>
                <td className="p-2 text-right">{entry.value}</td>
                <td className="p-2 text-right">
                  {((entry.value / pieData.reduce((sum, item) => sum + item.value, 0)) * 100).toFixed(1)}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )}
</div>
</div>




      </div>
  );
};

export default Dashboard;