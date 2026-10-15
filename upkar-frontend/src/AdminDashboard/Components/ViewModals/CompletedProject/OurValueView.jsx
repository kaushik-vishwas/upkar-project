import { X } from 'lucide-react';

const OurValueViewModal = ({ isOpen, onClose, value }) => {
  if (!isOpen || !value) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-md max-h-[90vh] overflow-y-auto p-6 rounded shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-black"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-xl font-bold mb-4">Value Details</h2>

        <div className="space-y-4">
          <div className="p-3 border rounded">
            <strong className="block mb-1 text-gray-700">Title:</strong>
            <p className="text-gray-900">{value.title}</p>
          </div>

          <div className="p-3 border rounded">
            <strong className="block mb-1 text-gray-700">Icon:</strong>
            <img
              src={value.iconImage}
              alt={value.title}
              className="w-24 h-24 object-cover rounded mt-1"
            />
          </div>

          {value.createdAt && (
            <div className="p-3 border rounded">
              <strong className="block mb-1 text-gray-700">Created At:</strong>
              <p className="text-gray-900">
                {new Date(value.createdAt).toLocaleString()}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OurValueViewModal;
