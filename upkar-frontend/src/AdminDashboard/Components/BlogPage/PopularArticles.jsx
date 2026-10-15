import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Eye } from 'lucide-react';
import Swal from 'sweetalert2';
import { toast, ToastContainer } from 'react-toastify';
import PopularArticleAdd from '../../Components/Common/PopularArticleAdd';
import PopularArticleEdit from '../../Components/Common/PopularArticleEdit';
import PopularArticleViewModal from '../../Components/ViewModals/BlogPage/PopularArticleView';
import { getAllArticles, deleteArticle } from '../../../Api';

const PopularArticlesMain = () => {
  const [articles, setArticles] = useState([]);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);

  const token = localStorage.getItem('adminToken');

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      const response = await getAllArticles();
      setArticles(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error(error);
      toast.error('Failed to fetch articles!');
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
      confirmButtonText: 'Yes, delete!',
    });

    if (confirm.isConfirmed) {
      try {
        await deleteArticle(id, token);
        setArticles(articles.filter((a) => a._id !== id));
        toast.success('Deleted successfully!');
      } catch (error) {
        console.error(error);
        toast.error('Failed to delete!');
      }
    }
  };

  const truncate = (text, limit = 20) =>
    text?.length > limit ? text.slice(0, limit) + '...' : text;

  return (
    <div className="flex-1 p-4 sm:p-6 bg-gray-100 min-h-screen">
      <ToastContainer autoClose={1500} />

      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">Articles</h1>
        <button
          onClick={() => setIsAddOpen(true)}
          className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          <Plus className="w-4 h-4" /> Add
        </button>
      </div>

      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2">Main Description</th>
              <th className="px-4 py-2">Main Image</th>
              <th className="px-4 py-2">Sub Items</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>

          <tbody>
            {articles.map((article) => (
              <tr key={article._id} className="border-b">
                <td className="px-4 py-2">
                  {truncate(article.mainDescription)}
                </td>

                <td className="px-4 py-2">
                  <img
                    src={
                      typeof article.mainImage === 'string'
                        ? article.mainImage
                        : article.mainImage?.url || ''
                    }
                    className="w-20 h-12 object-cover rounded"
                  />
                </td>

                <td className="px-4 py-2">
                  {article.subItems.map((sub, i) => (
                    <div key={i} className="border p-1 rounded mb-2">
                      <p className="font-semibold text-sm">
                        {truncate(sub.subHeading)}
                      </p>

                      <img
                        src={
                          typeof sub.subImage === 'string'
                            ? sub.subImage
                            : sub.subImage?.url || ''
                        }
                        className="w-16 h-10 object-cover rounded mt-1"
                      />
                    </div>
                  ))}
                </td>

                <td className="px-4 py-2 flex gap-2">
                  <button
                    onClick={() => {
                      setSelectedArticle(article);
                      setIsViewOpen(true);
                    }}
                    className="text-green-500"
                  >
                    <Eye size={18} />
                  </button>

                  <button
                    onClick={() => {
                      setSelectedArticle(article);
                      setIsEditOpen(true);
                    }}
                    className="text-blue-500"
                  >
                    <Edit size={18} />
                  </button>

                  <button
                    onClick={() => handleDelete(article._id)}
                    className="text-red-500"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}

            {articles.length === 0 && (
              <tr>
                <td colSpan={4} className="text-center py-4 text-gray-500">
                  No Articles Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <PopularArticleAdd
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        onAdded={fetchArticles}
      />

      <PopularArticleEdit
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        article={selectedArticle}
        onUpdated={fetchArticles}
      />

      <PopularArticleViewModal
        isOpen={isViewOpen}
        onClose={() => setIsViewOpen(false)}
        article={selectedArticle}
      />
    </div>
  );
};

export default PopularArticlesMain;
