import React, { useState, useEffect } from 'react';
import { updateQuoteAPI } from '../../../Api';

const QuoteEditCertificate = ({ isOpen, onClose, quote, onUpdate }) => {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem('adminToken');

  useEffect(() => {
    if (quote) {
      setText(quote.text || '');
    }
  }, [quote]);

  if (!isOpen) return null;

  const handleSubmit = async () => {
    if (!text) return alert('Quote text is required!');
    try {
      setLoading(true);
      await updateQuoteAPI(quote._id, { text }, token);
      onUpdate();
      onClose();
    } catch (error) {
      console.error('Error updating quote:', error);
      alert('Failed to update quote.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Edit Quote</h2>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="border p-2 w-full mb-3 rounded"
          placeholder="Quote Text"
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

export default QuoteEditCertificate;
