import React, { useEffect, useState } from 'react';
import JoinTeamModal from './../Career/JoinTeam';
import { getCareerRoles } from '../../Api';

const CareerOpenings = () => {
  const [openings, setOpenings] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedRole, setSelectedRole] = useState('');
  const [open, setOpen] = useState(false);

  const handleApply = (role) => {
    setSelectedRole(role);
    setOpen(true);
  };

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const res = await getCareerRoles();
        const activeRoles = res.filter((item) => item.isActive);

        setOpenings(activeRoles);
      } catch (error) {
        console.error('Failed to fetch career roles', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRoles();
  }, []);

  return (
    <div
      id="job-openings"
      className="px-4 lg:px-10 py-5 sm:py-5 md:py-5 lg:py-5 font-[Figtree] bg-white"
    >
      {/* <h1 className="text-3xl md:text-4xl lg:text-4xl font-semibold text-[#2D5C3A] mb-10">
        Openings
      </h1> */}
      <div className="flex items-center gap-4 mb-10">
        <div className="flex-1 h-[2px] bg-gray-300"></div>

        <h1 className="text-3xl sm:text-3xl md:text-4xl lg:text-4xl font-semibold text-[#2D5C3A] whitespace-nowrap">
          Openings
        </h1>

        <div className="flex-1 h-[2px] bg-gray-300"></div>
      </div>

      <div className="flex text-base justify-between text-gray-500 mb-4">
        <span>Available Roles</span>
        <span>Location</span>
      </div>

      {loading && <p className="text-gray-400 py-6">Loading openings...</p>}

      {!loading && openings.length === 0 && (
        <p className="text-gray-400 py-6">No openings available right now</p>
      )}

      <div className="space-y-6">
        {openings.map((item) => (
          <div
            key={item._id}
            className="flex justify-between items-center border-b pb-4"
          >
            <div>
              <h2 className="text-2xl md:text-2xl lg:text-2xl font-medium  cursor-pointer">
                {item.role}
              </h2>

              <button
                onClick={() => handleApply(item.role)}
                className="text-sm font-semibold lg:text-sm text-[#2D5C3A] mt-2 hover:underline"
                style={{
                  display: 'inline-block',
                  animation: 'moveUpDown 1.5s ease-in-out infinite',
                }}
              >
                Apply Now →
              </button>
            </div>

            <span className="px-4 py-1 border rounded-full text-sm">
              {item.location}, IND
            </span>
          </div>
        ))}
      </div>

      {/* Modal */}
      {open && (
        <JoinTeamModal role={selectedRole} onClose={() => setOpen(false)} />
      )}

      <style>
        {`
@keyframes moveUpDown {
  0% { transform: translateY(0px); }
  50% { transform: translateY(-4px); }
  100% { transform: translateY(0px); }
}
`}
      </style>
    </div>
  );
};

export default CareerOpenings;
