import { X } from 'lucide-react';

const AboutMainViewModal = ({ isOpen, onClose, item }) => {
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

        <h2 className="text-xl font-bold mb-4">{item.heading}</h2>

        <div className="space-y-4">
          <div className="p-3 border rounded">
            <strong className="block mb-1 text-gray-700">Plot:</strong>
            <p className="font-semibold">{item.plotNumber}</p>
            <p>{item.plotTitle}</p>
            {item.plotImage && (
              <img
                src={item.plotImage}
                className="w-32 h-32 mt-2 rounded object-cover border"
                alt="Plot"
              />
            )}
          </div>

          <div className="p-3 border rounded">
            <strong className="block mb-1 text-gray-700">Acres:</strong>
            <p className="font-semibold">{item.acresNumber}</p>
            <p>{item.acresTitle}</p>
            {item.acresImage && (
              <img
                src={item.acresImage}
                className="w-32 h-32 mt-2 rounded object-cover border"
                alt="Acres"
              />
            )}
          </div>

          {item.mainImages?.length > 0 && (
            <div className="p-3 border rounded">
              <strong className="block mb-1 text-gray-700">Main Images:</strong>
              <div className="flex gap-2 overflow-x-auto mt-2">
                {item.mainImages.map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    className="w-24 h-24 object-cover rounded border flex-shrink-0"
                    alt={`Main ${i}`}
                  />
                ))}
              </div>
            </div>
          )}

          <div className="p-3 border rounded">
            <strong className="block mb-1 text-gray-700">Paragraphs:</strong>
            <p>{item.paragraph1}</p>
            <p className="mt-1">{item.paragraph2}</p>
            <p className="mt-1">{item.paragraph3}</p>
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

export default AboutMainViewModal;
