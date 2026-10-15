// import React, { useState, useEffect } from 'react';
// import { editBanner } from '../../../Api';

// const BannerEdit = ({ isOpen, onClose, banner, onUpdate }) => {
//   const [form, setForm] = useState({ title: '', subtitle: '' });
//   const [newImages, setNewImages] = useState([]);
//   const [previews, setPreviews] = useState([]);
//   const token = localStorage.getItem('adminToken');

//   useEffect(() => {
//     if (banner) {
//       setForm({ title: banner.title, subtitle: banner.subtitle || '' });
//       setPreviews(banner.images || []); // show existing images
//       setNewImages([]);
//     }
//   }, [banner]);

//   if (!isOpen) return null;

//   const handleChange = (e) =>
//     setForm({ ...form, [e.target.name]: e.target.value });

//   const handleImageChange = (e) => {
//     const files = Array.from(e.target.files);
//     if (files.length > 5) return alert('Maximum 5 images allowed!');
//     setNewImages(files);
//     setPreviews(files.map((f) => URL.createObjectURL(f)));
//   };

//   const handleSubmit = async () => {
//     try {
//       const formData = new FormData();
//       formData.append('title', form.title);
//       formData.append('subtitle', form.subtitle);
//       formData.append('removeImages', imageUrlToDelete);
//       newImages.forEach((img) => formData.append('images', img)); // key must be 'images'

//       await editBanner(banner._id, formData, token);
//       onUpdate();
//       onClose();
//     } catch (error) {
//       console.error('Error updating banner:', error);
//       alert('Failed to update banner.');
//     }
//   };

//   return (
//     <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-40 z-50">
//       <div className="bg-white p-6 rounded-lg w-[420px]">
//         <h2 className="text-lg font-semibold mb-4">Edit Banner</h2>

//         <input
//           name="title"
//           value={form.title}
//           onChange={handleChange}
//           className="border p-2 w-full mb-3 rounded"
//           placeholder="Title"
//         />

//         <input
//           name="subtitle"
//           value={form.subtitle}
//           onChange={handleChange}
//           className="border p-2 w-full mb-3 rounded"
//           placeholder="Subtitle"
//         />

//         <label className="block text-sm font-medium text-gray-700 mb-1">
//           Replace Images (max 5)
//         </label>
//         <input
//           type="file"
//           accept="image/*"
//           multiple
//           onChange={handleImageChange}
//           className="border p-2 w-full mb-3 rounded"
//         />

//         {/* Previews — existing or new */}
//         {previews.length > 0 && (
//           <div className="flex flex-wrap gap-2 mb-3">
//             {previews.map((src, i) => (
//               <img
//                 key={i}
//                 src={src}
//                 alt={`preview-${i}`}
//                 className="w-16 h-16 object-cover rounded border"
//               />
//             ))}
//           </div>
//         )}

//         <div className="flex justify-end gap-2">
//           <button onClick={onClose} className="px-4 py-1 border rounded">
//             Cancel
//           </button>
//           <button
//             onClick={handleSubmit}
//             className="px-4 py-1 bg-green-500 text-white rounded"
//           >
//             Update
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BannerEdit;

import React, { useState, useEffect } from 'react';
import { editBanner } from '../../../Api';

const BannerEdit = ({ isOpen, onClose, banner, onUpdate }) => {
  const [form, setForm] = useState({ title: '', subtitle: '' });
  const [existingImages, setExistingImages] = useState([]); // URLs already saved
  const [removedImages, setRemovedImages] = useState([]); // URLs to delete on save
  const [newImages, setNewImages] = useState([]); // new File objects
  const [newPreviews, setNewPreviews] = useState([]); // blob URLs for new files
  const token = localStorage.getItem('adminToken');

  useEffect(() => {
    if (banner) {
      setForm({ title: banner.title, subtitle: banner.subtitle || '' });
      setExistingImages(banner.images || []);
      setRemovedImages([]);
      setNewImages([]);
      setNewPreviews([]);
    }
  }, [banner]);

  if (!isOpen) return null;

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  // Remove an existing (already-saved) image
  const handleRemoveExisting = (url) => {
    setExistingImages((prev) => prev.filter((img) => img !== url));
    setRemovedImages((prev) => [...prev, url]);
  };

  // Remove a newly selected (not yet uploaded) image
  const handleRemoveNew = (index) => {
    setNewImages((prev) => prev.filter((_, i) => i !== index));
    setNewPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const total = existingImages.length + newImages.length + files.length;
    if (total > 10)
      return alert(
        `Maximum 10 images allowed! You already have ${existingImages.length + newImages.length}.`,
      );
    setNewImages((prev) => [...prev, ...files]);
    setNewPreviews((prev) => [
      ...prev,
      ...files.map((f) => URL.createObjectURL(f)),
    ]);
    e.target.value = ''; // reset input so same file can be re-added if needed
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append('title', form.title);
      formData.append('subtitle', form.subtitle);

      // Send each removed URL separately so backend gets an array
      removedImages.forEach((url) => formData.append('removeImages', url));

      // Attach new image files
      newImages.forEach((img) => formData.append('images', img));

      await editBanner(banner._id, formData, token);
      onUpdate();
      onClose();
    } catch (error) {
      console.error('Error updating banner:', error);
      alert('Failed to update banner.');
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-40 z-50">
      <div className="bg-white p-6 rounded-lg w-[460px] max-h-[90vh] overflow-y-auto">
        <h2 className="text-lg font-semibold mb-4">Edit Banner</h2>

        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          className="border p-2 w-full mb-3 rounded"
          placeholder="Title"
        />
        <input
          name="subtitle"
          value={form.subtitle}
          onChange={handleChange}
          className="border p-2 w-full mb-3 rounded"
          placeholder="Subtitle"
        />

        {/* Existing images with delete button */}
        {existingImages.length > 0 && (
          <div className="mb-3">
            <p className="text-sm font-medium text-gray-600 mb-1">
              Current Images
            </p>
            <div className="flex flex-wrap gap-2">
              {existingImages.map((src, i) => (
                <div key={i} className="relative w-16 h-16">
                  <img
                    src={src}
                    alt={`existing-${i}`}
                    className="w-full h-full object-cover rounded border"
                  />
                  <button
                    onClick={() => handleRemoveExisting(src)}
                    className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs leading-none"
                    title="Remove image"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* New image previews with delete button */}
        {newPreviews.length > 0 && (
          <div className="mb-3">
            <p className="text-sm font-medium text-gray-600 mb-1">New Images</p>
            <div className="flex flex-wrap gap-2">
              {newPreviews.map((src, i) => (
                <div key={i} className="relative w-16 h-16">
                  <img
                    src={src}
                    alt={`new-${i}`}
                    className="w-full h-full object-cover rounded border"
                  />
                  <button
                    onClick={() => handleRemoveNew(i)}
                    className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs leading-none"
                    title="Remove image"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        <label className="block text-sm font-medium text-gray-700 mb-1">
          Add More Images (max 10 total)
        </label>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageChange}
          className="border p-2 w-full mb-3 rounded"
        />
        <p className="text-xs text-gray-400 mb-3">
          {existingImages.length + newImages.length}/10 images selected
        </p>

        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-1 border rounded">
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-1 bg-green-500 text-white rounded"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default BannerEdit;
