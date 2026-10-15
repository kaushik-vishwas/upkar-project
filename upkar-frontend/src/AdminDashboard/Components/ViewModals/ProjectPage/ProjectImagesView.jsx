import { X } from 'lucide-react';

const ProjectImagesViewModal = ({ isOpen, onClose, project }) => {
  if (!isOpen || !project) return null;

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
          {project.heading || 'Project Images'}
        </h2>

        <div className="space-y-4">
          {project.images?.length > 0 && (
            <div className="p-3 border rounded">
              <strong className="block mb-1 text-gray-700">Images:</strong>
              <div className="flex flex-wrap gap-2 mt-2 overflow-x-auto">
                {project.images.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt={`Project ${idx}`}
                    className="w-32 h-32 object-cover rounded"
                  />
                ))}
              </div>
            </div>
          )}

          <div className="p-3 border rounded">
            <strong className="block mb-1 text-gray-700">Created At:</strong>
            <p className="text-gray-900">
              {new Date(project.createdAt).toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectImagesViewModal;
