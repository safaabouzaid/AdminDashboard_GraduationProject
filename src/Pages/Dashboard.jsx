import React, { useEffect } from "react";
import { TrendingUp, Users, Briefcase, DollarSign, FileText } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell, Legend, ResponsiveContainer } from 'recharts';
import { useDispatch, useSelector } from "react-redux";
import { fetchDashboardStats } from "../redux/dashboardStatsSlice";

const Dashboard = () => {
  const { theme } = useSelector((state) => state.theme);
  const dispatch = useDispatch();
  const { stats, loading } = useSelector((state) => state.dashboardStats);
  const lineData = stats?.line_chart_data || [];
  const pieData = stats?.pie_chart_data || [];

  useEffect(() => {
    dispatch(fetchDashboardStats());
  }, [dispatch]);

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D'];

  const additionalStats = {
    activeJobs: 124,
    pendingApplications: 48,
    upcomingInterviews: 7,
    newCompaniesThisMonth: 12,
    recentlyUpdated: 30
  };

  return (
    <div className={`p-6 min-h-screen ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-800'}`}>
      
      {/* Main Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        
        {/* Number of Companies */}
        <div className={`p-6 rounded-xl shadow-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
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
        </div>

        {/* Most Hiring Company */}
        <div className={`p-6 rounded-xl shadow-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
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
        </div>

        {/* Most Demanded Jobs */}
        <div className={`p-6 rounded-xl shadow-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">In-Demand Jobs</p>
              <h3 className="text-xl font-bold mt-1">{stats?.most_demanded_jobs?.[0] || 'N/A'}</h3>
              <p className="text-xs text-gray-500 mt-1 truncate">
                {stats?.most_demanded_jobs?.slice(0, 3).join(', ') || 'N/A'}
              </p>
            </div>
            <div className={`p-3 rounded-full ${theme === 'dark' ? 'bg-gray-700' : 'bg-yellow-100'}`}>
              <Briefcase className="text-yellow-500" size={24} />
            </div>
          </div>
        </div>

        {/* Highest Paying Job */}
        <div className={`p-6 rounded-xl shadow-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
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
        </div>

      </div>

      {/* Additional Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">

        {/* Active Jobs */}
        <div className={`p-4 rounded-lg shadow ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-full ${theme === 'dark' ? 'bg-gray-700' : 'bg-blue-50'}`}>
              <FileText size={18} className="text-blue-400" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Active Jobs</p>
              <h3 className="text-lg font-semibold">{stats?.active_jobs || 0}</h3>
            </div>
          </div>
        </div>

        {/* Premium Members */}
        <div className={`p-4 rounded-lg shadow ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-full ${theme === 'dark' ? 'bg-gray-700' : 'bg-purple-50'}`}>
              <DollarSign size={18} className="text-purple-400" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Premium Members</p>
              <h3 className="text-lg font-semibold">{stats?.premium_members || 0}</h3>
            </div>
          </div>
        </div>

        {/* Avg. Company Size */}
        <div className={`p-4 rounded-lg shadow ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
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
        </div>

        {/* New Companies */}
        <div className={`p-4 rounded-lg shadow ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
         <div className="flex items-center gap-3">
           <div className={`p-2 rounded-full ${theme === 'dark' ? 'bg-gray-700' : 'bg-purple-50'}`}>
             <Users size={18} className="text-purple-400" />
           </div>
           <div>
             <p className="text-xs text-gray-500">New Companies</p>
             <h3 className="text-lg font-semibold">+{stats?.new_companies || 0}</h3>
           </div>
         </div>
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
        <div className={`p-6 rounded-xl shadow-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
          <h2 className="text-lg font-semibold mb-4">Job Category Distribution</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={pieData} dataKey="value" nameKey="name" outerRadius={80} fill="#8884d8" label>
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Dashboard;
