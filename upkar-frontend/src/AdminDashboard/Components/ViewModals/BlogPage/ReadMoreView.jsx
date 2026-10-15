import { X } from 'lucide-react';

const ReadMoreViewModal = ({ isOpen, onClose, readMore }) => {
  if (!isOpen || !readMore) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-11/12 max-w-md p-6 relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X size={20} />
        </button>

        <h2 className="text-xl font-bold mb-4">ReadMore Details</h2>

        <div className="space-y-4">
          <div className="p-3 border rounded">
            <span className="font-semibold">Heading:</span>
            <p className="text-gray-900">{readMore.heading}</p>
          </div>
          <div className="p-3 border rounded">
            <span className="font-semibold">Description:</span>
            <p className="text-gray-900">{readMore.description}</p>
          </div>

          {readMore.mainImage && (
            <div className="p-3 border rounded">
              <span className="font-semibold">Image:</span>
              <img
                src={readMore.mainImage}
                alt="ReadMore"
                className="mt-2 w-full h-48 object-cover rounded"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReadMoreViewModal;
