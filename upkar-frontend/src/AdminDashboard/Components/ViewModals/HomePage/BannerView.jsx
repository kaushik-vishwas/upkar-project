// import { X } from 'lucide-react';

// const BannerView = ({ isOpen, onClose, banner }) => {
//   if (!isOpen || !banner) return null;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
//       <div className="bg-white w-full max-w-lg max-h-[90vh] overflow-y-auto p-6 rounded shadow-lg relative">
//         <button
//           onClick={onClose}
//           className="absolute top-3 right-3 text-gray-600 hover:text-black"
//         >
//           <X className="w-5 h-5" />
//         </button>

//         <h2 className="text-xl font-bold mb-4">Banner Details</h2>

//         <div className="space-y-4">
//           <div className="p-3 border rounded">
//             <strong className="block mb-1 text-gray-700">Title:</strong>
//             <p className="text-gray-900">{banner.title}</p>
//           </div>

//           <div className="p-3 border rounded">
//             <strong className="block mb-1 text-gray-700">Subtitle:</strong>
//             <p className="text-gray-900">{banner.subtitle}</p>
//           </div>

//           <div className="p-3 border rounded">
//             <strong className="block mb-1 text-gray-700">Image:</strong>
//             <img
//               src={banner.image}
//               alt={banner.title}
//               className="mt-2 w-full h-60 object-cover rounded border"
//             />
//           </div>

//           <div className="p-3 border rounded">
//             <strong className="block mb-1 text-gray-700">Created At:</strong>
//             <p className="text-gray-900">
//               {new Date(banner.createdAt).toLocaleString()}
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BannerView;

import { X } from 'lucide-react';

const BannerView = ({ isOpen, onClose, banner }) => {
  if (!isOpen || !banner) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-lg max-h-[90vh] overflow-y-auto p-6 rounded shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-black"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-xl font-bold mb-4">Banner Details</h2>

        <div className="space-y-4">
          <div className="p-3 border rounded">
            <strong className="block mb-1 text-gray-700">Title:</strong>
            <p className="text-gray-900">{banner.title}</p>
          </div>

          {banner.subtitle && (
            <div className="p-3 border rounded">
              <strong className="block mb-1 text-gray-700">Subtitle:</strong>
              <p className="text-gray-900">{banner.subtitle}</p>
            </div>
          )}

          <div className="p-3 border rounded">
            <strong className="block mb-2 text-gray-700">
              Images ({banner.images?.length || 0}):
            </strong>
            {banner.images && banner.images.length > 0 ? (
              <div className="grid grid-cols-2 gap-2 mt-1">
                {banner.images.map((src, i) => (
                  <div key={i} className="relative">
                    <img
                      src={src}
                      alt={`${banner.title} - ${i + 1}`}
                      className="w-full h-36 object-cover rounded border"
                    />
                    <span className="absolute bottom-1 right-1 bg-black bg-opacity-50 text-white text-xs px-1.5 py-0.5 rounded">
                      {i + 1}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-400 text-sm">No images available</p>
            )}
          </div>

          <div className="p-3 border rounded">
            <strong className="block mb-1 text-gray-700">Created At:</strong>
            <p className="text-gray-900">
              {new Date(banner.createdAt).toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BannerView;
