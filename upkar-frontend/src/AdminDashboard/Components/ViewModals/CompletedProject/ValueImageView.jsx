import { X } from 'lucide-react';

const ValueImageView = ({ isOpen, onClose, valueImage }) => {
  if (!isOpen || !valueImage) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded w-[400px] relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-black"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-xl font-bold mb-3">View Value Image</h2>

        <img
          src={valueImage.image}
          alt=""
          className="w-full h-40 object-cover rounded"
        />

        <p className="mt-3 text-gray-600">
          Created At: {new Date(valueImage.createdAt).toLocaleString()}
        </p>
      </div>
    </div>
  );
};

export default ValueImageView;
