import React, { useEffect, useState } from 'react';
import { Eye, Trash2, X } from 'lucide-react';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import {
  getProjectImagesAPI,
  deleteProjectImagesAPI,
  createProjectImagesAPI,
} from '../../../Api';

const ITEMS_PER_PAGE = 6;

const MediaLibrary = () => {
  const [images, setImages] = useState([]);
  const [projects, setProjects] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [viewImage, setViewImage] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const token = localStorage.getItem('adminToken');

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    if (!token) return;
    const data = await getProjectImagesAPI(token);
    setProjects(data);
    const allImages = data.flatMap((p) =>
      p.images.map((img) => ({
        url: img,
        projectId: p._id,
        projectName: p.name,
      })),
    );
    setImages(allImages);
  };

  const handleDelete = async (projectId) => {
    const res = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#28a745',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
    });
    if (res.isConfirmed) {
      await deleteProjectImagesAPI(projectId, token);
      fetchImages();
      Swal.fire('Deleted!', 'Image has been deleted.', 'success');
    }
  };

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles(files);
  };

  const handleAddImages = async () => {
    if (selectedFiles.length === 0) {
      toast.error('Please select images');
      return;
    }

    const formData = new FormData();
    selectedFiles.forEach((file) => {
      formData.append('images', file);
    });

    try {
      await createProjectImagesAPI(formData, token);
      toast.success('Images added successfully!');
      setShowAddModal(false);
      setSelectedFiles([]);
      fetchImages();
    } catch (error) {
      toast.error('Failed to add images');
    }
  };

  const totalPages = Math.ceil(images.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentImages = images.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const ImageCard = ({ img, className = '' }) => (
    <div className={`relative rounded-lg overflow-hidden group ${className}`}>
      <img src={img.url} alt="media" className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-4">
        <button
          onClick={() => setViewImage(img.url)}
          className="p-2 backdrop-blur-md rounded-full text-blue-600 hover:bg-blue-50 transition"
        >
          <Eye size={18} />
        </button>
        <button
          onClick={() => handleDelete(img.projectId)}
          className="p-2 backdrop-blur-md rounded-full text-red-600 hover:bg-red-50 transition"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );

  return (
    <div className="h-screen flex flex-col bg-gray-50 font-figtree overflow-hidden">
      <div className="flex-shrink-0 bg-white shadow-sm p-6 pb-4">
        <div className="flex items-center justify-between mb-1">
          <h2 className="text-[20px] font-semibold">Media Gallery</h2>
          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2 text-[16px] font-medium bg-[#2D5C3A] text-white rounded-md hover:bg-[#244A30] transition"
          >
            + Add Media
          </button>
        </div>
        <p className="text-[16px] text-[#4A5565]">
          Browse and manage {images.length} Images
        </p>
      </div>

      <div className="flex-1 overflow-y-auto px-6 pt-6 pb-6">
        {currentImages.length === 0 ? (
          <div className="flex items-center justify-center h-64">
            <p className="text-gray-500 text-lg">No images found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-7xl mx-auto">
            {currentImages.map((img, idx) => (
              <ImageCard key={idx} img={img} className="h-64" />
            ))}
          </div>
        )}

        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 mt-8">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className={`text-xl font-semibold ${
                currentPage === 1
                  ? 'text-gray-300 cursor-not-allowed'
                  : 'text-[#000000] hover:text-[#2D5C3A]'
              }`}
            >
              ‹
            </button>
            <span className="text-sm font-medium text-gray-700">
              {currentPage}
            </span>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className={`text-xl font-semibold ${
                currentPage === totalPages
                  ? 'text-gray-300 cursor-not-allowed'
                  : 'text-[#000000] hover:text-[#2D5C3A]'
              }`}
            >
              ›
            </button>
          </div>
        )}
      </div>

      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-[500px] max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Add New Images</h2>
              <button
                onClick={() => {
                  setShowAddModal(false);
                  setSelectedFiles([]);
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Image
                </label>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                {selectedFiles.length > 0 && (
                  <p className="text-sm text-gray-600 mt-2">
                    {selectedFiles.length} file selected
                  </p>
                )}
              </div>

              {selectedFiles.length > 0 && (
                <div className="grid grid-cols-3 gap-2">
                  {selectedFiles.map((file, idx) => (
                    <div key={idx} className="relative">
                      <img
                        src={URL.createObjectURL(file)}
                        alt={`preview-${idx}`}
                        className="w-full h-24 object-cover rounded-lg"
                      />
                    </div>
                  ))}
                </div>
              )}

              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => {
                    setShowAddModal(false);
                    setSelectedFiles([]);
                  }}
                  className="flex-1 bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddImages}
                  className="flex-1 bg-[#2D5C3A] text-white px-4 py-2 rounded-lg  transition"
                >
                  Upload
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {viewImage && (
        <div
          className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4"
          onClick={() => setViewImage(null)}
        >
          <button
            onClick={() => setViewImage(null)}
            className="absolute top-4 right-4 text-white hover:text-gray-300 z-10"
          >
            <X size={32} />
          </button>
          <div className="w-full max-w-3xl h-[500px] flex items-center justify-center ml-auto mr-32">
            <img
              src={viewImage}
              alt="Full view"
              className="w-full h-full object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default MediaLibrary;
