import { X } from 'lucide-react';

const PlotLayoutViewModal = ({ isOpen, onClose, layout }) => {
  if (!isOpen || !layout) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-lg max-h-[90vh] overflow-y-auto p-6 rounded shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-black"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-xl font-bold mb-4">
          {layout.heading || 'Plot Layout Details'}
        </h2>

        <div className="space-y-4">
          {layout.mainImage && (
            <div className="p-3 border rounded">
              <strong className="block mb-1 text-gray-700">Main Image:</strong>
              <img
                src={layout.mainImage}
                alt="Main"
                className="w-full h-60 object-cover rounded border mt-2"
              />
            </div>
          )}

          {layout.icons?.length > 0 && (
            <div className="p-3 border rounded">
              <strong className="block mb-1 text-gray-700">Icons:</strong>
              <div className="flex flex-col gap-2 mt-2">
                {layout.icons.map((icon) => (
                  <div key={icon._id} className="flex items-center gap-3">
                    {icon.icon && (
                      <img
                        src={icon.icon}
                        alt={icon.heading}
                        className="w-12 h-12 object-cover rounded"
                      />
                    )}
                    <div>
                      <div className="font-semibold">{icon.heading}</div>
                      <div className="text-sm text-gray-500">
                        {icon.subheading}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="p-3 border rounded">
            <strong className="block mb-1 text-gray-700">Created At:</strong>
            <p className="text-gray-900">
              {new Date(layout.createdAt).toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlotLayoutViewModal;
