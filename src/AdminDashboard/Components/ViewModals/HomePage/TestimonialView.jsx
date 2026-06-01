import { X } from 'lucide-react';

const TestimonialView = ({ isOpen, onClose, data }) => {
  if (!isOpen || !data) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded w-full max-w-lg relative">
        <button onClick={onClose} className="absolute right-4 top-4">
          <X />
        </button>

        <h2 className="text-xl font-bold mb-4">Testimonial Details</h2>

        <div className="space-y-3">
          <div className="border p-3 rounded">
            <strong>Customer Name:</strong>
            <p>{data.customerName}</p>
          </div>

          <div className="border p-3 rounded">
            <strong>Description:</strong>
            <p>{data.description}</p>
          </div>

          <div className="border p-3 rounded">
            <strong>Created At:</strong>
            <p>{new Date(data.createdAt).toLocaleString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialView;
