import React from "react";
import Sidebar from "../Sidebar/Sidebar";
import Header from "./Header";
import { TrendingUp, Users, Briefcase, DollarSign } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell, Legend, ResponsiveContainer } from 'recharts';
import { useEffect } from "react";
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





  {/*  
  const lineData = [
    { month: 'January', jobs: 10 },
    { month: 'February', jobs: 20 },
    { month: 'March', jobs: 15 },
    { month: 'April', jobs: 30 },
    { month: 'May', jobs: 25 },
  ];

  const pieData = [
    { name: 'React Developer', value: 400 },
    { name: 'AI Engineer', value: 300 },
    { name: 'Backend Developer', value: 300 },
    { name: 'Data Scientist', value: 200 },
  ];
*/}




  const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042'];

  return (
    <div className={` flex flex-col ${theme === 'dark' ? 'bg-[#1f2937fb]' : 'bg-[#F8F8F8]'}`}>
    
      

        {/* Statistics */}
        <div className=" p-6 flex flex-col gap-5 overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            <div className={`rounded-2xl p-6 shadow-md transform transition duration-300 hover:scale-105 ${theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-gray-800"}`}>
              <div className="flex items-center gap-4">
                <Users size={28} className="text-green-500" />
                <div>
                  <p className="text-sm text-gray-400">Number of Companies</p>
                  <h3 className="text-2xl font-bold">{stats?.num_companies}</h3>
                </div>
              </div>
            </div>

            <div className={`rounded-2xl p-6 shadow-md transform transition duration-300 hover:scale-105 ${theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-gray-800"}`}>
              <div className="flex items-center gap-4">
                <TrendingUp size={28} className="text-blue-500" />
                <div>
                  <p className="text-sm text-gray-400">Most Hiring Companies</p>
                  <h3 className="text-lg font-semibold">{stats?.most_hiring_company}</h3>
                </div>
              </div>
            </div>

            <div className={`rounded-2xl p-6 shadow-md transform transition duration-300 hover:scale-105 ${theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-gray-800"}`}>
              <div className="flex items-center gap-4">
                <Briefcase size={28} className="text-yellow-500" />
                <div>
                  <p className="text-sm text-gray-400">Most Demanded Jobs</p>
                  <h3 className="text-lg font-semibold">{stats?.most_demanded_jobs.join(', ')}</h3>
                </div>
              </div>
            </div>

            <div className={`rounded-2xl p-6 shadow-md transform transition duration-300 hover:scale-105 ${theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-gray-800"}`}>
              <div className="flex items-center gap-4">
                <DollarSign size={28} className="text-purple-500" />
                <div>
                  <p className="text-sm text-gray-400">Highest Paying Jobs</p>
                  <h3 className="text-lg font-semibold"> {stats?.highest_paying_job.title} - ${stats?.highest_paying_job.salary}</h3>
                </div>
              </div>
            </div>
          </div>

          {/* Line Chart */}
          <div className={`rounded-2xl p-6 shadow-md ${theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-gray-800"}`}>
            <h2 className="text-xl font-semibold mb-4 sticky top-0 bg-inherit z-10">Job Demand Change Over Months</h2>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={lineData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip /><Line type="monotone" dataKey="count" stroke="#8884d8" strokeWidth={3} isAnimationActive={true} />
                <Line type="monotone" dataKey="jobs" stroke="#8884d8" strokeWidth={3} isAnimationActive={true} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Pie Chart */}
          <div className={`rounded-2xl p-6 shadow-md ${theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-gray-800"}`}>
            <h2 className="text-xl font-semibold mb-4 sticky top-0 bg-inherit z-10">Job Distribution by Specialization</h2>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label
                  isAnimationActive={true}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

      
    </div>
  );
};

export default Dashboard;
