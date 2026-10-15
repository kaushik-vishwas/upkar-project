import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Eye } from 'lucide-react';
import BannerAdd from '../Common/BannerAdd';
import BannerEdit from '../Common/BannerEdit';
import BannerView from '../ViewModals/HomePage/BannerView';
import { getBanners, deleteBanner } from '../../../Api';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

const Banner = () => {
  const [banners, setBanners] = useState([]);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [selectedBanner, setSelectedBanner] = useState(null);

  const token = localStorage.getItem('adminToken');

  useEffect(() => {
    fetchBanners();
  }, []);

  const fetchBanners = async () => {
    try {
      const data = await getBanners(token);
      setBanners(data);
    } catch (error) {
      console.error('Error fetching banners:', error);
      toast.error('Failed to fetch banners!');
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#28a745',
      confirmButtonText: 'Yes, delete it!',
    });

    if (result.isConfirmed) {
      try {
        await deleteBanner(id, token);
        setBanners(banners.filter((banner) => banner._id !== id));
        toast.success('Banner deleted successfully!');
      } catch (error) {
        console.error('Error deleting banner:', error);
        toast.error('Failed to delete banner!');
      }
    }
  };

  const truncateText = (text) => {
    if (!text) return '';
    return text.length > 20 ? text.substring(0, 20) + '...' : text;
  };

  const handleBannerAdded = () => {
    fetchBanners();
    toast.success('Banner added successfully!');
  };

  const handleBannerUpdated = () => {
    fetchBanners();
    toast.success('Banner updated successfully!');
  };

  return (
    <div className="flex-1 p-4 sm:p-6 font-figtree bg-gray-100 min-h-screen">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
        <h1 className="text-2xl font-bold">Banners</h1>
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
                Title
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">
                Subtitle
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">
                Image
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">
                Created At
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200">
            {banners.map((banner) => (
              <tr key={banner._id}>
                <td className="px-4 py-2">{truncateText(banner.title)}</td>
                <td className="px-4 py-2">{truncateText(banner.subtitle)}</td>
                <td className="px-4 py-2">
                  <img
                    src={banner.images?.[0]}
                    alt={banner.title}
                    className="w-20 h-12 object-cover rounded"
                  />
                </td>
                <td className="px-4 py-2">
                  {new Date(banner.createdAt).toLocaleDateString()}
                </td>

                <td className="px-4 py-2 flex gap-3">
                  <button
                    onClick={() => {
                      setSelectedBanner(banner);
                      setIsViewOpen(true);
                    }}
                    className="text-green-600 hover:text-green-800"
                  >
                    <Eye className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => {
                      setSelectedBanner(banner);
                      setIsEditOpen(true);
                    }}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <Edit className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => handleDelete(banner._id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <BannerAdd
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        onBannerAdded={handleBannerAdded}
      />

      <BannerEdit
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        banner={selectedBanner}
        onUpdate={handleBannerUpdated}
      />

      <BannerView
        isOpen={isViewOpen}
        onClose={() => setIsViewOpen(false)}
        banner={selectedBanner}
      />
    </div>
  );
};

export default Banner;
