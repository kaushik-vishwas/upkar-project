import { X } from 'lucide-react';

const BlogMainViewModal = ({ isOpen, onClose, blog }) => {
  if (!isOpen || !blog) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-11/12 max-w-md p-6 relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X size={20} />
        </button>

        <h2 className="text-xl font-bold mb-4">Blog Details</h2>

        <div className="space-y-4">
          <div className="border border-gray-300 rounded p-3">
            <span className="font-semibold text-gray-700">Heading:</span>
            <p className="text-gray-900 mt-1">{blog.heading}</p>
          </div>

          <div className="border border-gray-300 rounded p-3">
            <span className="font-semibold text-gray-700">Heading1:</span>
            <p className="text-gray-900 mt-1">{blog.heading1}</p>
          </div>

          <div className="border border-gray-300 rounded p-3">
            <span className="font-semibold text-gray-700">Description:</span>
            <p className="text-gray-900 mt-1">{blog.description}</p>
          </div>

          {blog.mainImage && (
            <div className="border border-gray-300 rounded p-3">
              <span className="font-semibold text-gray-700">Image:</span>
              <img
                src={blog.mainImage}
                alt={blog.heading}
                className="mt-2 w-full h-48 object-cover rounded border"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogMainViewModal;
