import { X } from 'lucide-react';

const TreeSectionView = ({ isOpen, onClose, section }) => {
  if (!isOpen || !section) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-lg max-h-[90vh] overflow-y-auto p-6 rounded shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-black"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-xl font-bold mb-4">Tree Section Details</h2>

        <div className="space-y-4">
          <div className="p-3 border rounded">
            <strong className="block mb-1 text-gray-700">Heading1:</strong>
            <p className="text-gray-900">{section.heading1}</p>
          </div>

          <div className="p-3 border rounded">
            <strong className="block mb-1 text-gray-700">Heading2:</strong>
            <p className="text-gray-900">{section.heading2}</p>
          </div>

          <div className="p-3 border rounded">
            <strong className="block mb-1 text-gray-700">Description:</strong>
            <p className="text-gray-900">{section.description}</p>
          </div>

          <div className="p-3 border rounded">
            <strong className="block mb-1 text-gray-700">Image:</strong>
            <img
              src={section.image}
              alt={section.heading1}
              className="mt-2 w-full h-60 object-cover rounded border"
            />
          </div>

          <div className="p-3 border rounded">
            <strong className="block mb-1 text-gray-700">Created At:</strong>
            <p className="text-gray-900">
              {new Date(section.createdAt).toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TreeSectionView;
