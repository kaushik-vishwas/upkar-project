import React, { useState, useEffect } from 'react';
import { updateQuestionAPI } from '../../../Api';

const QAsEdit = ({ isOpen, onClose, qa, onUpdate }) => {
  const [form, setForm] = useState({ question: '', answer: '' });
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem('adminToken');

  useEffect(() => {
    if (qa) {
      setForm({
        question: qa.question || '',
        answer: qa.answer || '',
      });
    }
  }, [qa]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!form.question || !form.answer)
      return alert('Question and Answer are required!');
    try {
      setLoading(true);
      await updateQuestionAPI(qa._id, form, token);
      onUpdate();
      onClose();
    } catch (error) {
      console.error('Error updating Q&A:', error);
      alert('Failed to update Q&A.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Edit Q&A</h2>

        <input
          name="question"
          value={form.question}
          onChange={handleChange}
          className="border p-2 w-full mb-3 rounded"
          placeholder="Question"
        />
        <textarea
          name="answer"
          value={form.answer}
          onChange={handleChange}
          className="border p-2 w-full mb-3 rounded"
          placeholder="Answer"
        />

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

export default QAsEdit;
