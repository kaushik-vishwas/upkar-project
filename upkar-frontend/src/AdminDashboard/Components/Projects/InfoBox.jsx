const InfoBox = ({ label, value }) => {
  return (
    <div className="border rounded-md p-4">
      <p className="text-[16px] font-figtree font-normal text-gray-600">
        {label}
      </p>
      <p className="mt-1 text-[16px] font-figtree font-medium text-black">
        {value}
      </p>
    </div>
  );
};

export default InfoBox;
