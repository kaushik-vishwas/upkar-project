import React, { useState } from 'react';
import { createEvent } from '../../../Api';

const EventAdd = ({ isOpen, onClose, onEventAdded }) => {
  const [form, setForm] = useState({
    eventTitle: '',
    eventDescription: '',
    eventLocation: '',
    eventDate: '',
    eventImages: [],
  });

  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem('adminToken');

  if (!isOpen) return null;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    if (files.length + form.eventImages.length > 5) {
      alert('Maximum 5 images allowed');
      return;
    }

    const updatedImages = [...form.eventImages, ...files];

    setForm({
      ...form,
      eventImages: updatedImages,
    });
  };

  const handleRemoveImage = (index) => {
    const updatedImages = form.eventImages.filter((_, i) => i !== index);

    setForm({
      ...form,
      eventImages: updatedImages,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !form.eventTitle ||
      !form.eventDescription ||
      !form.eventLocation ||
      !form.eventDate ||
      form.eventImages.length === 0
    ) {
      return alert('All fields including at least one image are required!');
    }

    const formData = new FormData();

    formData.append('eventTitle', form.eventTitle);
    formData.append('eventDescription', form.eventDescription);
    formData.append('eventLocation', form.eventLocation);
    formData.append('eventDate', form.eventDate);

    form.eventImages.forEach((image) => {
      formData.append('eventImages', image);
    });

    try {
      setLoading(true);
      const response = await createEvent(formData, token);

      console.log('API RESPONSE:', response);

      alert('Event created successfully');

      // Reset form
      setForm({
        eventTitle: '',
        eventDescription: '',
        eventLocation: '',
        eventDate: '',
        eventImages: [],
      });

      onEventAdded();
      onClose();
    } catch (error) {
      console.error('CREATE EVENT ERROR:', error);
      alert('Failed to add event.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-semibold mb-4 text-center">Add Event</h2>

        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
          <input
            name="eventTitle"
            placeholder="Event Title"
            className="border p-2 rounded w-full"
            value={form.eventTitle}
            onChange={handleChange}
          />

          <textarea
            name="eventDescription"
            placeholder="Description"
            className="border p-2 rounded w-full"
            value={form.eventDescription}
            onChange={handleChange}
          />

          <input
            name="eventLocation"
            placeholder="Location"
            className="border p-2 rounded w-full"
            value={form.eventLocation}
            onChange={handleChange}
          />

          <input
            type="date"
            name="eventDate"
            className="border p-2 rounded w-full"
            value={form.eventDate}
            onChange={handleChange}
          />

          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageChange}
            className="border p-2 rounded w-full"
          />

          {form.eventImages.length > 0 && (
            <div className="grid grid-cols-2 gap-3 mt-2">
              {form.eventImages.map((file, index) => (
                <div key={index} className="border rounded p-2 relative">
                  <img
                    src={URL.createObjectURL(file)}
                    alt="preview"
                    className="h-24 w-full object-cover rounded"
                  />

                  <p className="text-xs mt-1 truncate">{file.name}</p>

                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                    className="absolute top-1 right-1 bg-red-500 text-white text-xs px-2 py-0.5 rounded"
                  >
                    X
                  </button>
                </div>
              ))}
            </div>
          )}

          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              {loading ? 'Adding...' : 'Add Event'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EventAdd;
