import React, { useState, useEffect } from 'react';
import { updateEvent } from '../../../Api';

const EventEdit = ({ isOpen, onClose, event, onUpdate }) => {
  const [form, setForm] = useState({
    eventTitle: '',
    eventDescription: '',
    eventLocation: '',
    eventDate: '',
  });

  const [existingImages, setExistingImages] = useState([]);
  const [newImages, setNewImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem('adminToken');

  useEffect(() => {
    if (event) {
      setForm({
        eventTitle: event.eventTitle || '',
        eventDescription: event.eventDescription || '',
        eventLocation: event.eventLocation || '',
        eventDate: event.eventDate ? event.eventDate.split('T')[0] : '',
      });

      setExistingImages(event.eventImages || []);
      setNewImages([]);
    }
  }, [event]);

  if (!isOpen) return null;

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    if (existingImages.length + newImages.length + files.length > 5) {
      alert('Maximum 5 images allowed');
      return;
    }

    setNewImages([...newImages, ...files]);
  };

  const removeExistingImage = (index) => {
    const updated = existingImages.filter((_, i) => i !== index);
    setExistingImages(updated);
  };

  const removeNewImage = (index) => {
    const updated = newImages.filter((_, i) => i !== index);
    setNewImages(updated);
  };

  const handleSubmit = async () => {
    if (!form.eventTitle || !form.eventDescription) {
      return alert('Title and Description are required!');
    }

    if (existingImages.length + newImages.length === 0) {
      return alert('At least one image is required!');
    }

    const formData = new FormData();

    formData.append('eventTitle', form.eventTitle);
    formData.append('eventDescription', form.eventDescription);
    formData.append('eventLocation', form.eventLocation);
    formData.append('eventDate', form.eventDate);
    formData.append('existingImages', JSON.stringify(existingImages));
    newImages.forEach((img) => {
      formData.append('eventImages', img);
    });

    try {
      setLoading(true);
      await updateEvent(event._id, formData, token);

      alert('Event updated successfully');
      onUpdate();
      onClose();
    } catch (error) {
      console.error(error);
      alert('Failed to update event.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-semibold mb-4 text-center">Edit Event</h2>

        <input
          name="eventTitle"
          value={form.eventTitle}
          placeholder="Event Title"
          className="border p-2 w-full mb-2 rounded"
          onChange={handleChange}
        />

        <textarea
          name="eventDescription"
          value={form.eventDescription}
          placeholder="Description"
          className="border p-2 w-full mb-2 rounded"
          onChange={handleChange}
        />

        <input
          name="eventLocation"
          value={form.eventLocation}
          placeholder="Location"
          className="border p-2 w-full mb-2 rounded"
          onChange={handleChange}
        />

        <input
          type="date"
          name="eventDate"
          value={form.eventDate}
          className="border p-2 w-full mb-2 rounded"
          onChange={handleChange}
        />

        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageChange}
          className="border p-2 w-full mb-3 rounded"
        />

        {existingImages.length > 0 && (
          <>
            <h4 className="font-medium mb-2">Existing Images</h4>
            <div className="grid grid-cols-2 gap-3 mb-3">
              {existingImages.map((img, index) => (
                <div key={index} className="relative border rounded p-2">
                  <img
                    src={img}
                    alt="existing"
                    className="h-24 w-full object-cover rounded"
                  />
                  <button
                    type="button"
                    onClick={() => removeExistingImage(index)}
                    className="absolute top-1 right-1 bg-red-500 text-white text-xs px-2 py-0.5 rounded"
                  >
                    X
                  </button>
                </div>
              ))}
            </div>
          </>
        )}

        {newImages.length > 0 && (
          <>
            <h4 className="font-medium mb-2">New Images</h4>
            <div className="grid grid-cols-2 gap-3 mb-3">
              {newImages.map((file, index) => (
                <div key={index} className="relative border rounded p-2">
                  <img
                    src={URL.createObjectURL(file)}
                    alt="preview"
                    className="h-24 w-full object-cover rounded"
                  />
                  <button
                    type="button"
                    onClick={() => removeNewImage(index)}
                    className="absolute top-1 right-1 bg-red-500 text-white text-xs px-2 py-0.5 rounded"
                  >
                    X
                  </button>
                </div>
              ))}
            </div>
          </>
        )}

        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            {loading ? 'Updating...' : 'Update'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventEdit;
