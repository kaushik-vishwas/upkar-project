import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Eye } from 'lucide-react';
import AboutAdd from '../../Components/Common/AboutMainAdd';
import AboutEdit from '../../Components/Common/AboutMainEdit';
import AboutMainViewModal from '../../Components/ViewModals/AboutPage/AboutMainView';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import { getAllAboutMain, deleteAboutMain } from '../../../Api';

const AboutMain = () => {
  const [aboutData, setAboutData] = useState([]);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [selectedAbout, setSelectedAbout] = useState(null);

  const token = localStorage.getItem('adminToken');

  useEffect(() => {
    fetchAboutData();
  }, []);

  const fetchAboutData = async () => {
    try {
      const res = await getAllAboutMain(token);
      setAboutData(res.aboutMainList || []);
    } catch (error) {
      console.error(error);
      toast.error('Failed to fetch About data!');
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
        await deleteAboutMain(id, token);
        setAboutData(aboutData.filter((item) => item._id !== id));
        toast.success('About content deleted successfully!');
      } catch (error) {
        console.error(error);
        toast.error('Failed to delete About content!');
      }
    }
  };

  const handleAboutAdded = () => {
    fetchAboutData();
    toast.success('About content added successfully!');
  };

  const handleAboutUpdated = () => {
    fetchAboutData();
    toast.success('About content updated successfully!');
  };

  const truncateText = (text) => {
    if (!text) return '';
    return text.length > 20 ? text.substring(0, 20) + '...' : text;
  };

  return (
    <div className="flex-1 p-4 sm:p-6 bg-gray-100 min-h-screen">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
        <h1 className="text-2xl font-bold">About Main</h1>
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
                Plot
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">
                Acres
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">
                Main Images
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">
                Paragraphs
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
            {aboutData.map((item) => (
              <tr key={item._id}>
                <td className="px-4 py-2">{truncateText(item.heading)}</td>

                <td className="px-4 py-2">
                  <p className="font-semibold">
                    {truncateText(item.plotNumber)}
                  </p>
                  <p className="text-sm">{truncateText(item.plotTitle)}</p>
                </td>

                <td className="px-4 py-2">
                  <p className="font-semibold">
                    {truncateText(item.acresNumber)}
                  </p>
                  <p className="text-sm">{truncateText(item.acresTitle)}</p>
                </td>

                <td className="px-4 py-2">
                  <div className="flex gap-2 overflow-x-auto">
                    {item.mainImages?.map((img, i) => (
                      <img
                        key={i}
                        src={img}
                        className="w-16 h-16 flex-shrink-0 rounded object-cover"
                      />
                    ))}
                  </div>
                </td>

                <td className="px-4 py-2">
                  <p>{truncateText(item.paragraph1)}</p>
                  <p className="mt-1">{truncateText(item.paragraph2)}</p>
                  <p className="mt-1">{truncateText(item.paragraph3)}</p>
                </td>

                <td className="px-4 py-2">
                  {new Date(item.createdAt).toLocaleDateString()}
                </td>

                <td className="px-4 py-2 flex gap-2">
                  {/* View */}
                  <button
                    className="text-green-600 hover:text-green-800"
                    onClick={() => {
                      setSelectedAbout(item);
                      setIsViewOpen(true);
                    }}
                  >
                    <Eye className="w-4 h-4" />
                  </button>

                  {/* Edit */}
                  <button
                    className="text-blue-500 hover:text-blue-700"
                    onClick={() => {
                      setSelectedAbout(item);
                      setIsEditOpen(true);
                    }}
                  >
                    <Edit className="w-4 h-4" />
                  </button>

                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() => handleDelete(item._id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}

            {aboutData.length === 0 && (
              <tr>
                <td colSpan={7} className="text-center py-4 text-gray-500">
                  No content available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <AboutAdd
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        onAboutAdded={handleAboutAdded}
      />

      <AboutEdit
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        item={selectedAbout}
        onAboutUpdated={handleAboutUpdated}
      />

      <AboutMainViewModal
        isOpen={isViewOpen}
        onClose={() => setIsViewOpen(false)}
        item={selectedAbout}
      />
    </div>
  );
};

export default AboutMain;
