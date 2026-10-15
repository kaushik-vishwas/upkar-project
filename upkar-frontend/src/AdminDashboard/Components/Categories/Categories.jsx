import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Building2, X, Trash2 } from 'lucide-react';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';

import {
  getAllCategories,
  createCategory,
  getAllProjects,
  deleteCategory,
} from '../../../Api';

const Categories = () => {
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [categoryName, setCategoryName] = useState('');
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem('adminToken');

  useEffect(() => {
    fetchCategoriesWithCounts();
  }, []);

  const fetchCategoriesWithCounts = async () => {
    try {
      const catRes = await getAllCategories();
      const projRes = await getAllProjects();

      const catData = Array.isArray(catRes?.categories)
        ? catRes.categories
        : [];

      const projectsArray = Array.isArray(projRes)
        ? projRes
        : Array.isArray(projRes?.projects)
          ? projRes.projects
          : [];

      const formatted = catData.map((cat) => {
        const catProjects = projectsArray.filter(
          (p) => p.projectType === cat.categoryName,
        );

        return {
          id: cat._id,
          name: cat.categoryName,
          ongoing: catProjects.filter((p) => p.projectStatus === 'ongoing')
            .length,
          completed: catProjects.filter((p) => p.projectStatus === 'completed')
            .length,
          upcoming: catProjects.filter((p) => p.projectStatus === 'upcoming')
            .length,
        };
      });

      setCategories(formatted);
    } catch (err) {
      console.error(err);
      toast.error('Failed to fetch categories');
    }
  };

  const handleAddCategory = async () => {
    if (!categoryName.trim()) return;

    try {
      setLoading(true);
      await createCategory({ categoryName }, token);
      await fetchCategoriesWithCounts();
      setCategoryName('');
      setShowModal(false);
      toast.success('Category added successfully');
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCategory = async (e, categoryId) => {
    e.stopPropagation();

    const confirm = await Swal.fire({
      title: 'Delete Category?',
      html: `
    <p style="margin-bottom:8px; font-size:18px; line-height:1.5;">
      <strong>Only this category will be deleted.</strong><br/>
      Projects under this category will remain unchanged.<br/>
      You can manually update project categories later.
    </p>
  `,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete',
      cancelButtonText: 'Cancel',
      confirmButtonColor: '#d33',
      cancelButtonColor: '#28a745',
    });

    if (!confirm.isConfirmed) return;

    try {
      await deleteCategory(categoryId, token);
      await fetchCategoriesWithCounts();
      toast.success('Category deleted successfully');
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Delete failed');
    }
  };

  const handleRowClick = (categoryName) => {
    navigate(`/admin/category/${categoryName}`);
  };

  return (
    <div
      className="bg-white shadow-sm p-6 overflow-x-auto"
      style={{ fontFamily: 'Figtree, sans-serif' }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-1">
        <h2 className="text-[20px] font-semibold">Categories</h2>
        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2 text-[16px] font-medium bg-[#2D5C3A] text-white rounded-md hover:bg-[#244A30] transition"
        >
          + Add New Category
        </button>
      </div>

      <p className="text-[16px] text-[#4A5565] mb-4">
        Understand the data categorically
      </p>

      {/* Table */}
      <div className="border border-gray-200 rounded-lg overflow-hidden">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="border-b text-black text-[16px] bg-gray-50">
              <th className="px-6 py-4 text-left font-semibold border-r"></th>
              <th className="px-6 py-4 text-center font-semibold border-r">
                Ongoing Projects
              </th>
              <th className="px-6 py-4 text-center font-semibold border-r">
                Completed Projects
              </th>
              <th className="px-6 py-4 text-center font-semibold border-r">
                Upcoming Projects
              </th>
              <th className="px-6 py-4 text-center font-semibold">Action</th>
            </tr>
          </thead>

          <tbody>
            {categories.map((row) => (
              <tr
                key={row.id}
                onClick={() => handleRowClick(row.name)}
                className="hover:bg-gray-100 border-b cursor-pointer"
              >
                <td className="px-6 py-6 border-r">
                  <div className="flex items-center gap-2">
                    <Building2 size={18} className="text-[#2D5C3A]" />
                    <span className="font-medium text-[16px]">{row.name}</span>
                  </div>
                </td>

                <td className="px-6 py-6 text-center text-[#2D5C3A] font-bold text-[36px] border-r">
                  {row.ongoing}
                </td>

                <td className="px-6 py-6 text-center text-[#2D5C3A] font-bold text-[36px] border-r">
                  {row.completed}
                </td>

                <td className="px-6 py-6 text-center text-[#2D5C3A] font-bold text-[36px] border-r">
                  {row.upcoming}
                </td>

                <td className="px-6 py-6 text-center">
                  <button
                    onClick={(e) => handleDeleteCategory(e, row.id)}
                    className="text-red-600 hover:text-red-800"
                    title="Delete Category"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Category Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-[400px] p-6 relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4"
            >
              <X size={20} />
            </button>

            <h3 className="text-[18px] font-semibold mb-4">Add Category</h3>

            <input
              type="text"
              placeholder="Category name"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              className="w-full border rounded-md px-4 py-2 mb-4"
            />

            <button
              onClick={handleAddCategory}
              disabled={loading}
              className="w-full bg-[#2D5C3A] text-white py-2 rounded-md text-[16px]"
            >
              {loading ? 'Adding...' : 'Add'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Categories;
