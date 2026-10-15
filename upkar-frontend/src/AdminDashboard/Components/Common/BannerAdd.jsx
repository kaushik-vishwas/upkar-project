// import React, { useState } from 'react';
// import { createBanner } from '../../../Api';

// const BannerAdd = ({ isOpen, onClose, onBannerAdded }) => {
//   const [title, setTitle] = useState('');
//   const [subtitle, setSubtitle] = useState('');
//   const [images, setImages] = useState([]);
//   const [previews, setPreviews] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const token = localStorage.getItem('adminToken');

//   const handleImageChange = (e) => {
//     const files = Array.from(e.target.files);
//     if (files.length > 5) return alert('Maximum 5 images allowed!');
//     setImages(files);
//     setPreviews(files.map((file) => URL.createObjectURL(file)));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!title || images.length === 0)
//       return alert('Title and at least one image are required!');

//     const formData = new FormData();
//     formData.append('title', title);
//     formData.append('subtitle', subtitle);
//     images.forEach((img) => formData.append('images', img)); // key must be 'images'

//     try {
//       setLoading(true);
//       await createBanner(formData, token);
//       onBannerAdded();
//       onClose();
//       setTitle('');
//       setSubtitle('');
//       setImages([]);
//       setPreviews([]);
//     } catch (error) {
//       console.error('Error creating banner:', error);
//       alert('Failed to create banner.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
//       <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
//         <h2 className="text-xl font-semibold mb-4">Add Banner</h2>
//         <form onSubmit={handleSubmit}>
//           <input
//             type="text"
//             placeholder="Title"
//             className="border p-2 w-full mb-3 rounded"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//           />
//           <input
//             type="text"
//             placeholder="Subtitle"
//             className="border p-2 w-full mb-3 rounded"
//             value={subtitle}
//             onChange={(e) => setSubtitle(e.target.value)}
//           />

//           <label className="block text-sm font-medium text-gray-700 mb-1">
//             Images (max 5)
//           </label>
//           <input
//             type="file"
//             accept="image/*"
//             multiple
//             className="mb-3"
//             onChange={handleImageChange}
//           />

//           {/* Image Previews */}
//           {previews.length > 0 && (
//             <div className="flex flex-wrap gap-2 mb-3">
//               {previews.map((src, i) => (
//                 <img
//                   key={i}
//                   src={src}
//                   alt={`preview-${i}`}
//                   className="w-16 h-16 object-cover rounded border"
//                 />
//               ))}
//             </div>
//           )}

//           <div className="flex justify-end gap-2">
//             <button
//               type="button"
//               className="px-4 py-2 bg-gray-300 rounded"
//               onClick={onClose}
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               disabled={loading}
//               className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//             >
//               {loading ? 'Uploading...' : 'Add'}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default BannerAdd;

import React, { useState } from 'react';
import { createBanner } from '../../../Api';

const BannerAdd = ({ isOpen, onClose, onBannerAdded }) => {
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [images, setImages] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem('adminToken');

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const total = images.length + files.length;
    if (total > 10)
      return alert(
        `Maximum 10 images allowed! You already have ${images.length}.`,
      );
    setImages((prev) => [...prev, ...files]);
    setPreviews((prev) => [
      ...prev,
      ...files.map((file) => URL.createObjectURL(file)),
    ]);
    e.target.value = '';
  };

  const handleRemove = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
    setPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || images.length === 0)
      return alert('Title and at least one image are required!');

    const formData = new FormData();
    formData.append('title', title);
    formData.append('subtitle', subtitle);
    images.forEach((img) => formData.append('images', img));

    try {
      setLoading(true);
      await createBanner(formData, token);
      onBannerAdded();
      onClose();
      setTitle('');
      setSubtitle('');
      setImages([]);
      setPreviews([]);
    } catch (error) {
      console.error('Error creating banner:', error);
      alert('Failed to create banner.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-semibold mb-4">Add Banner</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Title"
            className="border p-2 w-full mb-3 rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="text"
            placeholder="Subtitle"
            className="border p-2 w-full mb-3 rounded"
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
          />

          <label className="block text-sm font-medium text-gray-700 mb-1">
            Images (max 10)
          </label>
          <input
            type="file"
            accept="image/*"
            multiple
            className="mb-3"
            onChange={handleImageChange}
          />
          <p className="text-xs text-gray-400 mb-2">
            {images.length}/10 images selected
          </p>

          {/* Image Previews with remove button */}
          {previews.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3">
              {previews.map((src, i) => (
                <div key={i} className="relative w-16 h-16">
                  <img
                    src={src}
                    alt={`preview-${i}`}
                    className="w-full h-full object-cover rounded border"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemove(i)}
                    className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs leading-none"
                    title="Remove"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}

          <div className="flex justify-end gap-2">
            <button
              type="button"
              className="px-4 py-2 bg-gray-300 rounded"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              {loading ? 'Uploading...' : 'Add'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BannerAdd;
