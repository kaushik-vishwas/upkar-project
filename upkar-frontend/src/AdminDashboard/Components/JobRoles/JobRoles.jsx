import React, { useEffect, useState } from 'react';
import { Trash2, Plus } from 'lucide-react';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import {
  getCareerRoles,
  createCareerRole,
  deleteCareerRole,
} from '../../../Api';

const ITEMS_PER_PAGE = 6;

const JobRoles = () => {
  const [roles, setRoles] = useState([]);
  const [filteredRoles, setFilteredRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    role: '',
    location: '',
  });

  useEffect(() => {
    fetchRoles();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [search, roles]);

  const fetchRoles = async () => {
    try {
      const data = await getCareerRoles();
      setRoles(data);
      setFilteredRoles(data);
    } catch {
      toast.error('Failed to fetch roles');
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let temp = [...roles];

    if (search) {
      temp = temp.filter(
        (item) =>
          item.role.toLowerCase().includes(search.toLowerCase()) ||
          item.location.toLowerCase().includes(search.toLowerCase()),
      );
    }

    setFilteredRoles(temp);
    setCurrentPage(1);
  };

  const handleCreate = async () => {
    if (!form.role || !form.location) {
      toast.error('All fields required');
      return;
    }

    try {
      await createCareerRole(form);
      toast.success('Role created successfully');
      setOpen(false);
      setForm({ role: '', location: '' });
      fetchRoles();
    } catch {
      toast.error('Failed to create role');
    }
  };

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: 'Delete role?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      confirmButtonText: 'Yes, delete',
    });

    if (!confirm.isConfirmed) return;

    try {
      await deleteCareerRole(id);
      toast.success('Role deleted');
      const updated = roles.filter((r) => r._id !== id);
      setRoles(updated);
      setFilteredRoles(updated);
    } catch {
      toast.error('Delete failed');
    }
  };

  const totalPages = Math.ceil(filteredRoles.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentRoles = filteredRoles.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE,
  );

  if (loading) return <p className="p-6">Loading roles...</p>;

  return (
    <div className="p-6 bg-[#F7F8FA] min-h-screen font-figtree">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Manage Job Roles</h2>

        <button
          onClick={() => setOpen(true)}
          className="flex items-center gap-2 bg-[#2D5C3A] text-white px-4 py-2 rounded-lg"
        >
          <Plus size={18} /> Create Role
        </button>
      </div>

      <div className="bg-white p-4 rounded-xl border mb-6">
        <input
          type="text"
          placeholder="Search role or location..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded-lg px-4 py-2 w-full md:w-1/3"
        />
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {currentRoles.length === 0 ? (
          <p className="col-span-full text-center">No roles found</p>
        ) : (
          currentRoles.map((item, index) => (
            <div
              key={item._id}
              className="bg-white rounded-xl border p-5 shadow-sm relative"
            >
              <button
                onClick={() => handleDelete(item._id)}
                className="absolute top-4 right-4 backdrop-blur-md bg-white/20 border border-white/40 p-2 rounded-full"
              >
                <Trash2 size={16} className="text-red-600" />
              </button>

              <p className="text-sm text-gray-500 mb-3">
                Role no - {startIndex + index + 1}
              </p>

              <div className="space-y-2">
                <p>
                  <strong>Role:</strong> {item.role}
                </p>
                <p>
                  <strong>Location:</strong> {item.location}
                </p>
                <p className="text-sm text-green-600 font-medium">
                  Created on:{' '}
                  {new Date(item.createdAt).toLocaleDateString('en-IN', {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric',
                  })}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-6 mt-10">
          <button
            onClick={() => setCurrentPage((p) => p - 1)}
            disabled={currentPage === 1}
            className={`text-xl ${
              currentPage === 1 ? 'text-gray-300' : 'text-[#050F27]'
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
            className={`text-xl ${
              currentPage === totalPages ? 'text-gray-300' : 'text-[#050F27]'
            }`}
          >
            ›
          </button>
        </div>
      )}

      {open && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4">Create Job Role</h3>

            <input
              placeholder="Role name"
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
              className="border rounded-lg px-4 py-2 w-full mb-4"
            />

            <input
              placeholder="Location"
              value={form.location}
              onChange={(e) => setForm({ ...form, location: e.target.value })}
              className="border rounded-lg px-4 py-2 w-full mb-6"
            />

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setOpen(false)}
                className="border px-4 py-2 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleCreate}
                className="bg-[#2D5C3A] text-white px-4 py-2 rounded-lg"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobRoles;
