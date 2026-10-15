import { X } from 'lucide-react';

const AboutImagesViewModal = ({ isOpen, onClose, data }) => {
  if (!isOpen || !data) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-lg max-h-[90vh] overflow-y-auto p-6 rounded shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-black"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-xl font-bold mb-4">About Images Details</h2>

        <div className="space-y-4">
          <div className="p-3 border rounded">
            <strong className="block mb-1 text-gray-700">Images:</strong>
            <div className="flex flex-wrap gap-2 mt-2">
              {data.images.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`About ${idx}`}
                  className="w-32 h-20 object-cover rounded border"
                />
              ))}
            </div>
          </div>

          {data.createdAt && (
            <div className="p-3 border rounded">
              <strong className="block mb-1 text-gray-700">Created At:</strong>
              <p className="text-gray-900">
                {new Date(data.createdAt).toLocaleString()}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AboutImagesViewModal;
