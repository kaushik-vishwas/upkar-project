import React, { useState, useEffect } from 'react';
import { updateContactMain } from '../../../Api';

const ContactMainEdit = ({ isOpen, onClose, data, onUpdated }) => {
  const [form, setForm] = useState({
    heading: '',
    description: '',
    mainImage: null,
  });

  const [preview, setPreview] = useState('');

  useEffect(() => {
    if (data) {
      setForm({ heading: data.heading, description: data.description });
      setPreview(data.mainImage);
    }
  }, [data]);

  if (!isOpen) return null;

  const handleSubmit = async () => {
    const fd = new FormData();
    Object.keys(form).forEach((key) => form[key] && fd.append(key, form[key]));

    const token = localStorage.getItem('adminToken');
    await updateContactMain(fd, token);
    onUpdated();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
      <div className="bg-white p-6 rounded w-96">
        <h2>Edit Contact Main</h2>

        <input
          value={form.heading}
          onChange={(e) => setForm({ ...form, heading: e.target.value })}
        />

        <textarea
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />

        <input
          type="file"
          onChange={(e) => {
            setPreview(URL.createObjectURL(e.target.files[0]));
            setForm({ ...form, mainImage: e.target.files[0] });
          }}
        />

        {preview && <img src={preview} className="w-full h-40 object-cover" />}

        <button onClick={handleSubmit}>Update</button>
      </div>
    </div>
  );
};

export default ContactMainEdit;
