import { X } from 'lucide-react';

const UpcomingProjectView = ({ isOpen, onClose, project }) => {
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

        <h2 className="text-xl font-bold mb-4">Project Details</h2>

        <div className="space-y-4">
          <div className="p-3 border rounded">
            <strong className="block mb-1 text-gray-700">Heading:</strong>
            <p className="text-gray-900">{project.heading}</p>
          </div>

          <div className="p-3 border rounded">
            <strong className="block mb-1 text-gray-700">Type:</strong>
            <p className="text-gray-900">{project.type}</p>
          </div>

          <div className="p-3 border rounded">
            <strong className="block mb-1 text-gray-700">Location:</strong>
            <p className="text-gray-900">{project.location}</p>
          </div>

          {project.description && (
            <div className="p-3 border rounded">
              <strong className="block mb-1 text-gray-700">Description:</strong>
              <p className="text-gray-900">{project.description}</p>
            </div>
          )}

          {(project.mainImage || project.projectImage) && (
            <div className="p-3 border rounded">
              <strong className="block mb-1 text-gray-700">Image:</strong>
              <img
                src={project.mainImage || project.projectImage}
                alt={project.heading}
                className="mt-2 w-full h-60 object-cover rounded border"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UpcomingProjectView;
