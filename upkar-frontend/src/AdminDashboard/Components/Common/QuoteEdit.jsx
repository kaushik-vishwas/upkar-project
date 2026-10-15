import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { updateQuote } from '../../../Api';
const token = localStorage.getItem('adminToken');

const QuoteEdit = ({ isOpen, onClose, item, onQuoteUpdated }) => {
  const [form, setForm] = useState({
    quoteContent: '',
    name: '',
    position: '',
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (item) {
      setForm({
        quoteContent: item.quoteContent || '',
        name: item.name || '',
        position: item.position || '',
      });
    }
  }, [item]);

  if (!isOpen) return null;

  const handleSubmit = async () => {
    if (!form.quoteContent || !form.name || !form.position)
      return toast.error('All fields are required!');

    try {
      setLoading(true);
      await updateQuote(item._id, form, token);
      toast.success('Quote updated successfully!');
      onQuoteUpdated();
      onClose();
    } catch (error) {
      console.error(error);
      toast.error('Failed to update quote.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-40 z-50 p-4">
      <div className="bg-white p-6 rounded w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-semibold mb-4">Edit Quote</h2>
        <div className="space-y-3">
          <textarea
            placeholder="Quote Content"
            className="border p-2 w-full rounded"
            rows={3}
            value={form.quoteContent}
            onChange={(e) => setForm({ ...form, quoteContent: e.target.value })}
          />
          <input
            type="text"
            placeholder="Name"
            className="border p-2 w-full rounded"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <input
            type="text"
            placeholder="Position"
            className="border p-2 w-full rounded"
            value={form.position}
            onChange={(e) => setForm({ ...form, position: e.target.value })}
          />
          <div className="flex justify-end gap-2 mt-4">
            <button onClick={onClose} className="px-4 py-2 border rounded">
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="px-4 py-2 bg-green-500 text-white rounded"
            >
              {loading ? 'Updating...' : 'Update'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuoteEdit;
