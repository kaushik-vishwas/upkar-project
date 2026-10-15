import { X } from 'lucide-react';

const AmenityViewModal = ({ isOpen, onClose, amenity }) => {
  if (!isOpen || !amenity) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-md p-6 rounded shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-black"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-xl font-bold mb-4">Amenity Details</h2>

        <div className="space-y-4">
          <div className="p-3 border rounded text-center">
            <strong className="block mb-1 text-gray-700">Icon:</strong>
            <img
              src={amenity.icon}
              alt={amenity.heading}
              className="w-20 h-20 object-cover rounded mx-auto"
            />
          </div>

          <div className="p-3 border rounded">
            <strong className="block mb-1 text-gray-700">Heading:</strong>
            <p>{amenity.heading}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AmenityViewModal;
