import { X } from 'lucide-react';

const PopularArticleViewModal = ({ isOpen, onClose, article }) => {
  if (!isOpen || !article) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-11/12 max-w-md p-6 relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X size={20} />
        </button>

        <h2 className="text-xl font-bold mb-4">Article Details</h2>

        <div className="space-y-4">
          <div className="p-3 border rounded">
            <strong>Main Description:</strong>
            <p>{article.mainDescription}</p>
          </div>

          {article.mainImage && (
            <div className="p-3 border rounded">
              <strong>Main Image:</strong>
              <img
                src={article.mainImage}
                alt=""
                className="mt-2 w-full h-40 object-cover rounded"
              />
            </div>
          )}

          {article.subItems.map((sub, idx) => (
            <div key={idx} className="p-3 border rounded">
              <strong>Sub Heading:</strong>
              <p>{sub.subHeading}</p>
              <strong>Sub Description:</strong>
              <p>{sub.subDescription}</p>
              {sub.subImage && (
                <img
                  src={sub.subImage}
                  alt=""
                  className="mt-2 w-full h-32 object-cover rounded"
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PopularArticleViewModal;
