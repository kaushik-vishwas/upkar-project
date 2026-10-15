import React, { useEffect, useState } from 'react';
import { getAllEventEnquiries, deleteEventEnquiry } from '../../../Api';
import Swal from 'sweetalert2';
import { Trash2 } from 'lucide-react';
import { toast } from 'react-toastify';

const ITEMS_PER_PAGE = 6;

const EventEnquiryList = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [filteredEnquiries, setFilteredEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState('');
  const [date, setDate] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchEnquiries();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [search, date, enquiries]);

  const fetchEnquiries = async () => {
    try {
      const data = await getAllEventEnquiries();
      if (Array.isArray(data)) {
        setEnquiries(data);
        setFilteredEnquiries(data);
      }
    } catch (error) {
      toast.error('Failed to fetch event enquiries');
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
          item.mobile?.includes(search),
      );
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
      await deleteEventEnquiry(id);

      const updated = enquiries.filter((item) => item._id !== id);
      setEnquiries(updated);
      setFilteredEnquiries(updated);

      toast.success('Event enquiry deleted.');
    } catch (error) {
      toast.error('Failed to delete enquiry');
    }
  };

  const timeAgo = (date) => {
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);

    const intervals = [
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

  if (loading) return <p className="p-6">Loading event enquiries...</p>;

  return (
    <div className="p-6 bg-[#F7F8FA] min-h-screen font-figtree">
      <h2 className="text-2xl font-semibold mb-4">Manage Event Enquiries</h2>

      {/* Filters */}
      <div className="bg-white p-4 rounded-xl border mb-6 flex flex-col md:flex-row gap-4">
        <input
          type="text"
          placeholder="Search enquiry..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded-lg px-4 py-2 w-full md:w-1/3"
        />

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="border rounded-lg px-4 py-2 w-full md:w-1/4"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {currentEnquiries.map((item, index) => (
          <div
            key={item._id}
            className="bg-white rounded-xl border p-5 shadow-sm relative"
          >
            <button
              onClick={() => handleDelete(item._id)}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100"
            >
              <Trash2 size={16} className="text-red-600" />
            </button>

            <p className="text-sm text-gray-500 mb-3">
              Enquiry no - {startIndex + index + 1}
            </p>

            <div className="space-y-2 text-[16px]">
              <p>
                <strong>Name:</strong> {item.name}
              </p>

              <p>
                <strong>Location:</strong> {item.location}
              </p>

              <p>
                <strong>Mobile:</strong> {item.mobile}
              </p>

              <p>
                <strong>Email:</strong> {item.email}
              </p>
            </div>

            <p className="text-sm text-green-600 mt-3">
              Received {timeAgo(item.createdAt)}
            </p>
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center mt-8 gap-2">
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              className={`px-4 py-2 rounded-lg border ${
                currentPage === index + 1 ? 'bg-black text-white' : 'bg-white'
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default EventEnquiryList;
