import { X } from 'lucide-react';

const VisionMissionViewModal = ({ isOpen, onClose, data }) => {
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

        <h2 className="text-xl font-bold mb-4">Vision & Mission Details</h2>

        <div className="space-y-4">
          {data.image && (
            <div className="p-3 border rounded">
              <strong className="block mb-1 text-gray-700">Image:</strong>
              <img
                src={data.image}
                alt="Vision Mission"
                className="mt-2 w-full h-60 object-cover rounded border"
              />
            </div>
          )}

          <div className="p-3 border rounded">
            <strong className="block mb-1 text-gray-700">Description:</strong>
            <p className="text-gray-900 whitespace-pre-line">
              {data.description}
            </p>
          </div>

          <div className="p-3 border rounded">
            <strong className="block mb-1 text-gray-700">
              {data.missionTitle || 'Mission:'}
            </strong>
            <p className="text-gray-900 whitespace-pre-line">
              {data.missionText}
            </p>
          </div>

          <div className="p-3 border rounded">
            <strong className="block mb-1 text-gray-700">
              {data.visionTitle || 'Vision:'}
            </strong>
            <p className="text-gray-900 whitespace-pre-line">
              {data.visionText}
            </p>
          </div>

          <div className="p-3 border rounded">
            <strong className="block mb-1 text-gray-700">
              Total Experience:
            </strong>
            <p className="text-gray-900">{data.totalExperience}</p>
          </div>

          {data.stats?.length > 0 && (
            <div className="p-3 border rounded">
              <strong className="block mb-1 text-gray-700">Stats:</strong>
              {data.stats.map((s, index) => (
                <p key={index} className="text-gray-900">
                  {s.number} — {s.label}
                </p>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VisionMissionViewModal;
