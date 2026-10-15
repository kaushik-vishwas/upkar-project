import React, { useState } from 'react';
import { createQuoteAPI } from '../../../Api';

const QuoteCertificateAdd = ({ isOpen, onClose, onQuoteAdded }) => {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem('adminToken');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text) return alert('Quote text is required!');

    try {
      setLoading(true);
      await createQuoteAPI({ text }, token);
      onQuoteAdded();
      onClose();
    } catch (error) {
      console.error('Error creating quote:', error);
      alert('Failed to create quote.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Add Quote</h2>
        <form onSubmit={handleSubmit}>
          <textarea
            placeholder="Quote Text"
            className="border p-2 w-full mb-3 rounded"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
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
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              {loading ? 'Saving...' : 'Add'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default QuoteCertificateAdd;
