import React, { useState } from 'react';
import { createQuestionAPI } from '../../../Api';

const QAsAdd = ({ isOpen, onClose, onQAAdded }) => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem('adminToken');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!question || !answer) return alert('Question and Answer are required!');

    try {
      setLoading(true);
      await createQuestionAPI({ question, answer }, token);
      onQAAdded();
      onClose();
    } catch (error) {
      console.error('Error creating Q&A:', error);
      alert('Failed to create Q&A.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Add Q&A</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Question"
            className="border p-2 w-full mb-3 rounded"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
          <textarea
            placeholder="Answer"
            className="border p-2 w-full mb-3 rounded"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
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

export default QAsAdd;
