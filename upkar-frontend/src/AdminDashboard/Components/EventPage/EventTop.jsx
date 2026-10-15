import React, { useState, useEffect } from 'react';
import EventTopAdd from '../../../Components/Events/EventTopAdd';
import { getEventTop } from '../../../Api';

const EventTop = () => {
  const [openModal, setOpenModal] = useState(false);
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await getEventTop();
      setData(res.eventPage);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Event Top Section</h1>

      {/* Table */}
      <div className="bg-white shadow rounded overflow-hidden">
        <table className="w-full border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left border">Main Title</th>
              <th className="p-3 text-left border">Main Image</th>
              <th className="p-3 text-left border">Sub Title</th>
              <th className="p-3 text-left border">Sub Image</th>
              <th className="p-3 text-center border">Action</th>
            </tr>
          </thead>

          <tbody>
            {data ? (
              <tr>
                <td className="p-3 border">{data.mainTitle}</td>

                <td className="p-3 border">
                  {data.mainImage && (
                    <img
                      src={data.mainImage}
                      alt="Main"
                      className="w-16 h-16 object-cover rounded"
                    />
                  )}
                </td>

                <td className="p-3 border">{data.subTitle}</td>

                <td className="p-3 border">
                  {data.subImage && (
                    <img
                      src={data.subImage}
                      alt="Sub"
                      className="w-16 h-16 object-cover rounded"
                    />
                  )}
                </td>

                <td className="p-3 border text-center">
                  <button
                    onClick={() => setOpenModal(true)}
                    className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ) : (
              <tr>
                <td colSpan="5" className="p-4 text-center">
                  No Data Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      <EventTopAdd
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
        onUpdated={fetchData}
      />
    </div>
  );
};

export default EventTop;
