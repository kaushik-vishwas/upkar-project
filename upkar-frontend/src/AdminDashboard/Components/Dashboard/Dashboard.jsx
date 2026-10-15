import { useState, useEffect } from 'react';
import { getAllEnquiries, getAllProjects } from '../../../Api';
import {
  FileText,
  ArrowUp,
  PhoneCall,
  MapPin,
  Home,
  Users,
  Image as ImageIcon,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { FormControl, MenuItem, Select } from '@mui/material';
import AddProject from '../Projects/addProject';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [totalEnquiries, setTotalEnquiries] = useState(0);
  const [recentEnquiries, setRecentEnquiries] = useState([]);
  const [period, setPeriod] = useState('yearly');
  const [recentProjects, setRecentProjects] = useState([]);
  const [totalProjects, setTotalProjects] = useState(0);
  const [showAddProjectModal, setShowAddProjectModal] = useState(false);
  const [tableProjects, setTableProjects] = useState([]);
  const ITEMS_PER_PAGE = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(tableProjects.length / ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;

  const currentProjects = tableProjects.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE,
  );

  const navigate = useNavigate();

  const timeAgo = (date) => {
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);
    const intervals = [
      { label: 'year', seconds: 31536000 },
      { label: 'month', seconds: 2592000 },
      { label: 'day', seconds: 86400 },
      { label: 'hour', seconds: 3600 },
      { label: 'minute', seconds: 60 },
    ];

    for (const interval of intervals) {
      const count = Math.floor(seconds / interval.seconds);
      if (count >= 1) {
        return `${count} ${interval.label}${count > 1 ? 's' : ''} ago`;
      }
    }
    return 'just now';
  };
  useEffect(() => {
    setCurrentPage(1);
  }, [tableProjects]);

  useEffect(() => {
    fetchEnquiries();
    fetchProjects();
  }, []);

  const fetchEnquiries = async () => {
    try {
      const data = await getAllEnquiries();

      if (Array.isArray(data)) {
        setTotalEnquiries(data.length);

        const latest = [...data]
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 1);

        setRecentEnquiries(latest);
      }
    } catch (error) {
      console.error('Failed to fetch enquiries', error);
    }
  };

  const fetchProjects = async () => {
    try {
      const res = await getAllProjects();

      console.log('RAW PROJECT RESPONSE:', res);
      const projects =
        res?.projects ||
        res?.data?.projects ||
        (Array.isArray(res) ? res : res?.data);

      if (Array.isArray(projects)) {
        setTotalProjects(projects.length);

        const latestProjects = [...projects]
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 1);

        setRecentProjects(latestProjects);
        setTableProjects(projects);
      } else {
        console.error('Projects is not an array:', projects);
        setTableProjects([]);
      }
    } catch (error) {
      console.error('Failed to fetch projects', error);
      setTableProjects([]);
    }
  };

  const getProgressByStatus = (status) => {
    switch (status) {
      case 'completed':
        return 100;
      case 'ongoing':
        return 50;
      case 'upcoming':
        return 0;
      default:
        return 0;
    }
  };

  const chartData = [
    { year: 2020, value: 8000 },
    { year: 2021, value: 12000 },
    { year: 2022, value: 45000 },
    { year: 2023, value: 80000 },
    { year: 2024, value: 10000 },
    { year: 2025, value: 20000 },
    { year: 2026, value: 60000 },
  ];

  const projects = [
    {
      id: 1,
      name: 'Upkar Green Valley',
      status: 'Active',
      progress: 80,
      due: 'Jan 15, 2025',
      agent: 'Raj',
    },
    {
      id: 2,
      name: 'Upkar Green Valley',
      status: 'Active',
      progress: 60,
      due: 'Jan 15, 2025',
      agent: 'Raj',
    },
    {
      id: 3,
      name: 'Upkar Green Valley',
      status: 'Active',
      progress: 90,
      due: 'Jan 15, 2025',
      agent: 'Raj',
    },
    {
      id: 4,
      name: 'Upkar Green Valley',
      status: 'Active',
      progress: 70,
      due: 'Jan 15, 2025',
      agent: 'Raj',
    },
    {
      id: 5,
      name: 'Upkar Green Valley',
      status: 'Active',
      progress: 85,
      due: 'Jan 15, 2025',
      agent: 'Raj',
    },
  ];

  return (
    <div className="space-y-6 font-figtree">
      <h1 className="text-2xl font-semibold">Dashboard Overview</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Total Projects', value: totalProjects },
          { label: 'Total Available Plots', value: totalProjects },
          { label: 'Total Inquiry', value: totalEnquiries },
        ].map((card, i) => (
          <div
            key={i}
            className="bg-white rounded-xl shadow p-6 flex justify-between"
          >
            <div>
              <div className="p-2 border rounded-md inline-flex">
                <FileText className="text-[#2D5C3A]" size={20} />
              </div>
              <p className="text-3xl font-bold text-[#2D5C3A] mt-2">
                {card.value}
              </p>
              <p className="text-gray-600 text-sm">{card.label}</p>
            </div>
            <div className="text-[#2D5C3A] flex gap-1 text-sm">
              +2 <ArrowUp size={16} />
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-lg font-semibold mb-4">Recent Activities</h2>

        <div className="space-y-5">
          {/* Recent Enquiry */}
          {recentEnquiries.length === 0 ? (
            <p className="text-center text-gray-500">No recent enquiries</p>
          ) : (
            recentEnquiries.map((item) => (
              <div
                key={item._id}
                className="flex justify-between border-b pb-4 last:border-0"
              >
                <div className="flex gap-3">
                  <div className="bg-[#2D5C3A] p-3 rounded-full">
                    <PhoneCall className="text-white" size={18} />
                  </div>

                  <div>
                    <p className="font-medium text-gray-800">
                      Recent Project Enquiry for{' '}
                      <span className="font-semibold">
                        {item.projectName || 'Unknown Project'}
                      </span>
                    </p>

                    <p className="text-sm text-gray-500">
                      {item.name} · {timeAgo(item.createdAt)}
                    </p>
                  </div>
                </div>

                <button className="text-gray-500">⋮</button>
              </div>
            ))
          )}

          {recentProjects.length === 0
            ? null
            : recentProjects.map((project) => (
                <div
                  key={project._id}
                  className="flex justify-between border-b pb-4 last:border-0"
                >
                  <div className="flex gap-3">
                    <div className="bg-[#2D5C3A] p-3 rounded-full">
                      <Home className="text-white" size={18} />
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">
                        New Project "{project.projectName}"" added
                      </p>
                      <p className="text-sm text-gray-500">
                        {/* {project.projectName} ·{' '} */}
                        admin ·{' '}
                        {project.createdAt
                          ? timeAgo(project.createdAt)
                          : 'just now'}
                      </p>
                    </div>
                  </div>
                  <button className="text-gray-500">⋮</button>
                </div>
              ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl shadow p-6 col-span-2">
          <div className="flex justify-between mb-4">
            <h2 className="text-lg font-semibold">
              Sales <b>Revenue</b>
            </h2>
            <FormControl size="small">
              <Select
                value={period}
                onChange={(e) => setPeriod(e.target.value)}
              >
                <MenuItem value="yearly">Yearly</MenuItem>
                <MenuItem value="monthly">Monthly</MenuItem>
                <MenuItem value="weekly">Weekly</MenuItem>
              </Select>
            </FormControl>
          </div>

          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#1e5631"
                fill="#1e5631"
                fillOpacity={0.2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-2xl shadow p-6 grid grid-cols-2 gap-4">
          {[
            {
              icon: <FileText />,
              text: 'Add new Property',
              onClick: () => setShowAddProjectModal(true),
            },
            {
              icon: <MapPin />,
              text: 'Manage Plots',
              onClick: () => navigate('/admin/projects-list'),
            },

            {
              icon: <Users />,
              text: 'View Inquiries',
              onClick: () => navigate('/admin/enquiries'),
            },
            {
              icon: <ImageIcon />,
              text: 'Upload Media',
              onClick: () => navigate('/admin/media'),
            },
          ].map((b, i) => (
            <button
              key={i}
              onClick={b.onClick}
              className="bg-[#2D5C3A] text-white py-6 rounded-lg flex flex-col items-center gap-2 hover:bg-green-900 transition"
            >
              {b.icon}
              <span className="text-sm">{b.text}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow p-6">
        <h2 className="text-lg font-semibold mb-4">
          Project <b>Overviews</b>
        </h2>

        <table className="w-full border-separate border-spacing-y-3">
          <thead>
            <tr className="text-left text-black text-sm">
              <th className="px-4 py-2">S.no</th>
              <th className="px-4 py-2">Project</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Progress</th>
              <th className="px-4 py-2">Due</th>
            </tr>
          </thead>

          <tbody>
            {tableProjects.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-6 text-gray-500">
                  No projects found
                </td>
              </tr>
            ) : (
              currentProjects.map((project, index) => {
                const progress = getProgressByStatus(project.projectStatus);

                return (
                  <tr key={project._id} className="border-b">
                    <td className="px-4 py-3">{startIndex + index + 1}</td>
                    <td className="font-medium">{project.projectName}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-2 py-1 rounded text-xs text-white ${
                          project.projectStatus === 'completed'
                            ? 'bg-green-800'
                            : project.projectStatus === 'ongoing'
                              ? 'bg-yellow-600'
                              : 'bg-gray-500'
                        }`}
                      >
                        {project.projectStatus}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="w-32 h-2 bg-gray-200 rounded overflow-hidden">
                        <div
                          className={`h-2 ${
                            progress === 100
                              ? 'bg-green-800'
                              : progress === 50
                                ? 'bg-green-800'
                                : 'bg-gray-400'
                          }`}
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      {project.possessionDate
                        ? new Date(project.possessionDate).toLocaleDateString()
                        : '-'}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-6 mt-8">
            <button
              onClick={() => setCurrentPage((p) => p - 1)}
              disabled={currentPage === 1}
              className={`text-xl font-semibold ${
                currentPage === 1
                  ? 'text-gray-300 cursor-not-allowed'
                  : 'text-[#050F27]'
              }`}
            >
              ‹
            </button>

            <span className="px-4 py-2 border rounded-lg bg-white text-sm">
              {currentPage}
            </span>

            <button
              onClick={() => setCurrentPage((p) => p + 1)}
              disabled={currentPage === totalPages}
              className={`text-xl font-semibold ${
                currentPage === totalPages
                  ? 'text-gray-300 cursor-not-allowed'
                  : 'text-[#050F27]'
              }`}
            >
              ›
            </button>
          </div>
        )}
      </div>

      {showAddProjectModal && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50">
          <div className="bg-white w-[90vw] max-w-4xl max-h-[90vh] rounded-xl shadow-2xl relative flex flex-col">
            <button
              onClick={() => setShowAddProjectModal(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-2xl"
            >
              ✕
            </button>

            <div className="overflow-y-auto flex-1">
              <AddProject
                onClose={() => setShowAddProjectModal(false)}
                onSuccess={() => {
                  fetchProjects();
                  setShowAddProjectModal(false);
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
