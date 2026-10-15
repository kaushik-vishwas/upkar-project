import { X } from 'lucide-react';

const BrandMotiveViewModal = ({ isOpen, onClose, motive }) => {
  if (!isOpen || !motive) return null;

  const truncateText = (text) => {
    if (!text) return '';
    return text.length > 40 ? text.substring(0, 40) + '...' : text;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-md max-h-[90vh] overflow-y-auto p-6 rounded shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-black"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-xl font-bold mb-4">{truncateText(motive.title)}</h2>

        <div className="space-y-4">
          <div className="p-3 border rounded">
            <strong className="block mb-1 text-gray-700">Title:</strong>
            <p className="text-gray-900">{truncateText(motive.title)}</p>
          </div>

          <div className="p-3 border rounded">
            <strong className="block mb-1 text-gray-700">
              Highlight Text:
            </strong>
            <p className="text-gray-900">{motive.highlightText}</p>
          </div>

          <div className="p-3 border rounded">
            <strong className="block mb-1 text-gray-700">Created At:</strong>
            <p className="text-gray-900">
              {new Date(motive.createdAt).toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrandMotiveViewModal;
