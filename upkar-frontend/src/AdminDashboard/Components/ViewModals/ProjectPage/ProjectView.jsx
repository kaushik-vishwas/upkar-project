import { X } from 'lucide-react';

const ProjectViewModal = ({ isOpen, onClose, project }) => {
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

        <h2 className="text-xl font-bold mb-4">{project.heading}</h2>

        <div className="space-y-4">
          <div className="p-3 border rounded">
            <strong className="block mb-1 text-gray-700">Type:</strong>
            <p className="text-gray-900">{project.type}</p>
          </div>

          <div className="p-3 border rounded">
            <strong className="block mb-1 text-gray-700">Description:</strong>
            <p className="text-gray-900">{project.description}</p>
          </div>

          {project.mainImages?.length > 0 && (
            <div className="p-3 border rounded">
              <strong className="block mb-1 text-gray-700">Main Images:</strong>
              <div className="flex gap-2 mt-2 overflow-x-auto">
                {project.mainImages.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt={`Project ${index}`}
                    className="w-32 h-32 object-cover rounded"
                  />
                ))}
              </div>
            </div>
          )}

          {project.bulletPoints?.length > 0 && (
            <div className="p-3 border rounded">
              <strong className="block mb-1 text-gray-700">
                Bullet Points:
              </strong>
              <ul className="list-disc list-inside text-gray-900">
                {project.bulletPoints.map((bp, i) => (
                  <li key={i}>{bp}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="p-3 border rounded">
            <strong className="block mb-1 text-gray-700">Box Message:</strong>
            <p className="text-gray-900">{project.boxMessage}</p>
          </div>

          <div className="p-3 border rounded">
            <strong className="block mb-1 text-gray-700">
              Customer Heading:
            </strong>
            <p>{project.customerHeading}</p>
          </div>

          <div className="p-3 border rounded">
            <strong className="block mb-1 text-gray-700">
              Customer Description:
            </strong>
            <p className="text-gray-900">{project.customerDescription}</p>
          </div>

          <div className="p-3 border rounded">
            <strong className="block mb-1 text-gray-700">Rating:</strong>
            <p>{project.ratingText}</p>
          </div>

          {project.image && (
            <div className="p-3 border rounded">
              <strong className="block mb-1 text-gray-700">Image:</strong>
              <img
                src={project.image}
                alt={project.heading}
                className="mt-2 w-full h-60 object-cover rounded border"
              />
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

export default ProjectViewModal;
