import { useEffect, useState } from 'react';
import { getAllEnquiries, deleteEnquiry } from '../../../Api';
import Swal from 'sweetalert2';
import { Trash2 } from 'lucide-react';
import { toast } from 'react-toastify';

const ITEMS_PER_PAGE = 6;

const EnquiryList = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [filteredEnquiries, setFilteredEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const [date, setDate] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const token = localStorage.getItem('adminToken');

  useEffect(() => {
    fetchEnquiries();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [search, status, date, enquiries]);

  const fetchEnquiries = async () => {
    try {
      const data = await getAllEnquiries(token);
      if (Array.isArray(data)) {
        setEnquiries(data);
        setFilteredEnquiries(data);
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to fetch enquiries');
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let temp = [...enquiries];

    if (search) {
      temp = temp.filter(
        (item) =>
          item.name?.toLowerCase().includes(search.toLowerCase()) ||
          item.email?.toLowerCase().includes(search.toLowerCase()) ||
          item.phone?.includes(search),
      );
    }

    if (status) {
      temp = temp.filter((item) => item.projectStatus === status);
    }

    if (date) {
      temp = temp.filter(
        (item) => new Date(item.createdAt).toISOString().split('T')[0] === date,
      );
    }

    setFilteredEnquiries(temp);
    setCurrentPage(1);
  };

  const handleDelete = async (id) => {
    if (!token) return toast.error('You are not authorized.');

    const confirm = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#28a745',
      confirmButtonText: 'Yes, delete it!',
    });

    if (!confirm.isConfirmed) return;

    try {
      await deleteEnquiry(id, token);

      const updated = enquiries.filter((item) => item._id !== id);
      setEnquiries(updated);
      setFilteredEnquiries(updated);

      if (
        currentPage > 1 &&
        updated.length <= (currentPage - 1) * ITEMS_PER_PAGE
      ) {
        setCurrentPage(currentPage - 1);
      }

      toast.success('Enquiry deleted successfully.');
    } catch (error) {
      console.error(error);
      toast.error('Failed to delete enquiry.');
    }
  };

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

  const totalPages = Math.ceil(filteredEnquiries.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentEnquiries = filteredEnquiries.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE,
  );

  if (loading) return <p className="p-6">Loading enquiries...</p>;

  return (
    <div className="p-6 bg-[#F7F8FA] min-h-screen font-figtree">
      <h2 className="text-2xl font-semibold mb-4">Manage Project Enquiries</h2>

      <div className="bg-white p-4 rounded-xl border mb-6 flex flex-col md:flex-row gap-4">
        <input
          type="text"
          placeholder="Search enquiry..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded-lg px-4 py-2 w-full md:w-1/3"
        />

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="border rounded-lg px-4 py-2 w-full md:w-1/4"
        >
          <option value="">All Status</option>
          <option value="ongoing">Ongoing</option>
          <option value="upcoming">Upcoming</option>
          <option value="completed">Completed</option>
        </select>

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="border rounded-lg px-4 py-2 w-full md:w-1/4"
        />
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {currentEnquiries.length === 0 ? (
          <p className="text-center col-span-full">No enquiries found</p>
        ) : (
          currentEnquiries.map((item, index) => (
            <div
              key={item._id}
              className="bg-white rounded-xl border p-5 shadow-sm relative"
            >
              <button
                onClick={() => handleDelete(item._id)}
                className="absolute top-4 right-4 backdrop-blur-md bg-white/20 border border-white/40 p-2 rounded-full shadow hover:bg-white/40 transition"
              >
                <Trash2 size={16} className="text-red-600" />
              </button>

              <p className="text-sm text-gray-500 mb-3">
                Enquiry no - {startIndex + index + 1}
              </p>

              <div className="space-y-2 text-[16px]">
                <p>
                  <strong>Client Name:</strong> {item.name}
                </p>
                <p>
                  <strong>Project Status:</strong> {item.projectStatus}
                </p>
                <p>
                  <strong>Project Name:</strong> {item.projectName || '-'}
                </p>
                <p>
                  <strong>Site Visit:</strong>{' '}
                  {new Date(item.siteVisitDate).toLocaleDateString()}
                </p>
                <p>
                  <strong>Location:</strong> {item.location}
                </p>
                <p>
                  <strong>Contact:</strong> {item.phone}
                </p>
                <p>
                  <strong>Email:</strong> {item.email}
                </p>
                <p>
                  <strong>Existing Customer:</strong> {item.isExistingCustomer}
                </p>
              </div>

              <p className="text-sm text-green-600 mt-3">
                Received {timeAgo(item.createdAt)}
              </p>
            </div>
          ))
        )}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-6 mt-10">
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
  );
};

export default EnquiryList;
