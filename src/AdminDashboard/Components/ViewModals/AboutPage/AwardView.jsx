const AwardView = ({ isOpen, onClose, award }) => {
  if (!isOpen || !award) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
      <div className="bg-white p-6 w-[400px] rounded relative">
        <button onClick={onClose} className="absolute right-3 top-2">
          ✕
        </button>

        <h2 className="text-xl font-bold mb-3">{award.title}</h2>

        <p className="mb-2">{award.subtitle}</p>

        {award.icon && (
          <img src={award.icon} className="w-20 h-20 object-cover rounded" />
        )}
      </div>
    </div>
  );
};

export default AwardView;
