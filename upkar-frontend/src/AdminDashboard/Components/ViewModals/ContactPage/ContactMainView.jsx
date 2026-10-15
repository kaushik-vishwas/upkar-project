const ContactMainView = ({ isOpen, onClose, data }) => {
  if (!isOpen || !data) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded w-96">
        <h2 className="text-xl font-bold mb-3">Contact Details</h2>
        <p>
          <strong>Heading:</strong> {data.heading}
        </p>
        <p>
          <strong>Description:</strong> {data.description}
        </p>

        {data.mainImage && (
          <img
            src={data.mainImage}
            className="mt-3 w-full h-40 object-cover rounded"
          />
        )}

        <button onClick={onClose} className="mt-4">
          Close
        </button>
      </div>
    </div>
  );
};

export default ContactMainView;
