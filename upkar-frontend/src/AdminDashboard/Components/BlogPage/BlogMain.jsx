import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Eye } from 'lucide-react';
import Swal from 'sweetalert2';
import { toast, ToastContainer } from 'react-toastify';
import BlogMainAdd from '../../Components/Common/BlogMainAdd';
import BlogMainEdit from '../../Components/Common/BlogMainEdit';
import BlogMainViewModal from '../../Components/ViewModals/BlogPage/BlogMainView';
import { getAllBlogMain, deleteBlogMain } from '../../../Api';

const BlogMain = () => {
  const [blogs, setBlogs] = useState([]);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);

  const token = localStorage.getItem('adminToken');

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await getAllBlogMain();
      const list = Array.isArray(response.data) ? response.data : [];
      setBlogs(list);
    } catch (error) {
      console.error(error);
      toast.error('Failed to fetch blogs!');
    }
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

    if (confirm.isConfirmed) {
      try {
        await deleteBlogMain(id, token);
        setBlogs(blogs.filter((b) => b._id !== id));
        toast.success('Blog deleted successfully!');
      } catch (error) {
        console.error(error);
        toast.error('Failed to delete blog!');
      }
    }
  };

  const handleAdded = () => {
    fetchBlogs();
    toast.success('Blog added successfully!');
  };

  const handleUpdated = () => {
    fetchBlogs();
    toast.success('Blog updated successfully!');
  };

  const truncate = (text) =>
    text?.length > 20 ? text.slice(0, 20) + '...' : text;

  return (
    <div className="flex-1 p-4 sm:p-6 bg-gray-100 min-h-screen">
      <ToastContainer position="top-right" autoClose={1500} />

      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">Blog Main</h1>
        <button
          onClick={() => setIsAddOpen(true)}
          className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          <Plus className="w-4 h-4" /> Add
        </button>
      </div>

      <div className="overflow-x-auto w-full bg-white rounded shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">
                Heading
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">
                Heading1
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">
                Description
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">
                Image
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200">
            {blogs.map((item) => (
              <tr key={item._id}>
                <td className="px-4 py-2">{truncate(item.heading)}</td>
                <td className="px-4 py-2">{truncate(item.heading1)}</td>
                <td className="px-4 py-2">{truncate(item.description)}</td>
                <td className="px-4 py-2">
                  {item.mainImage && (
                    <img
                      src={item.mainImage}
                      alt=""
                      className="w-20 h-12 object-cover rounded"
                    />
                  )}
                </td>
                <td className="px-4 py-2 flex gap-2">
                  <button
                    onClick={() => {
                      setSelectedBlog(item);
                      setIsViewOpen(true);
                    }}
                    className="text-green-500 hover:text-green-700"
                  >
                    <Eye size={18} />
                  </button>

                  <button
                    onClick={() => {
                      setSelectedBlog(item);
                      setIsEditOpen(true);
                    }}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <Edit size={18} />
                  </button>

                  <button
                    onClick={() => handleDelete(item._id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}

            {blogs.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center py-4 text-gray-500">
                  No Blogs Found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <BlogMainAdd
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        onAdded={handleAdded}
      />

      <BlogMainEdit
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        blog={selectedBlog}
        onUpdated={handleUpdated}
      />

      <BlogMainViewModal
        isOpen={isViewOpen}
        onClose={() => setIsViewOpen(false)}
        blog={selectedBlog}
      />
    </div>
  );
};

export default BlogMain;
