import React from 'react';

const DeleteModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-40">
      <div className="bg-white p-6 rounded-lg w-[350px] text-center">
        <h2 className="text-lg font-semibold mb-4">Delete this item?</h2>
        <div className="flex justify-center gap-4">
          <button onClick={onClose} className="px-4 py-1 border rounded">
            Cancel
          </button>
          <button className="px-4 py-1 bg-red-500 text-white rounded">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
