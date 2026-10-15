import { X } from 'lucide-react';

const QuoteViewModal = ({ isOpen, onClose, item }) => {
  if (!isOpen || !item) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-lg max-h-[90vh] overflow-y-auto p-6 rounded shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-black"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-xl font-bold mb-4">Quote Details</h2>

        <div className="space-y-4">
          <div className="p-3 border rounded">
            <strong className="block mb-1 text-gray-700">Quote:</strong>
            <p className="text-gray-900">{item.quoteContent}</p>
          </div>

          <div className="p-3 border rounded">
            <strong className="block mb-1 text-gray-700">Name:</strong>
            <p className="text-gray-900">{item.name}</p>
          </div>

          <div className="p-3 border rounded">
            <strong className="block mb-1 text-gray-700">Position:</strong>
            <p className="text-gray-900">{item.position}</p>
          </div>

          <div className="p-3 border rounded">
            <strong className="block mb-1 text-gray-700">Created At:</strong>
            <p className="text-gray-900">
              {new Date(item.createdAt).toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuoteViewModal;
