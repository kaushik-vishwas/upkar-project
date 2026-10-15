import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Eye } from 'lucide-react';
import { getAwardRecognition, deleteAwardRecognition } from '../../../Api';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

import AwardAdd from '../Common/AwardAdd';
import AwardEdit from '../Common/AwardEdit';
import AwardView from '../ViewModals/AboutPage/AwardView';

const AwardRecognitionAdmin = () => {
  const [list, setList] = useState([]);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  const token = localStorage.getItem('adminToken');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const data = await getAwardRecognition(token);
      setList(data);
    } catch (err) {
      toast.error('Failed to fetch Awards');
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'This cannot be undone!',
      // icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
    });

    if (result.isConfirmed) {
      try {
        await deleteAwardRecognition(id, token);
        setList(list.filter((i) => i._id !== id));
        toast.success('Deleted successfully');
      } catch (err) {
        toast.error('Delete failed');
      }
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">Awards & Recognition</h1>

        <button
          onClick={() => setIsAddOpen(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded flex items-center gap-2"
        >
          <Plus size={16} /> Add
        </button>
      </div>

      <div className="bg-white rounded shadow overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-3 text-left">Title</th>
              <th className="p-3 text-left">Subtitle</th>
              {/* <th className="p-3 text-left">Icon</th> */}
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {list.map((item) => (
              <tr key={item._id} className="border-t">
                <td className="p-3">{item.title}</td>
                <td className="p-3">{item.subtitle}</td>
                {/* <td className="p-3">
                  {item.icon ? (
                    <img src={item.icon} className="w-10 h-10 rounded" alt="" />
                  ) : (
                    'N/A'
                  )}
                </td> */}

                <td className="p-3 flex gap-2">
                  <button
                    onClick={() => {
                      setSelected(item);
                      setIsViewOpen(true);
                    }}
                  >
                    <Eye size={16} />
                  </button>

                  <button
                    onClick={() => {
                      setSelected(item);
                      setIsEditOpen(true);
                    }}
                  >
                    <Edit size={16} />
                  </button>

                  <button onClick={() => handleDelete(item._id)}>
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}

            {list.length === 0 && (
              <tr>
                <td className="p-4 text-center text-gray-500" colSpan={4}>
                  No Awards found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <AwardAdd
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        onAdded={fetchData}
      />

      <AwardEdit
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        award={selected}
        onUpdated={fetchData}
      />

      <AwardView
        isOpen={isViewOpen}
        onClose={() => setIsViewOpen(false)}
        award={selected}
      />
    </div>
  );
};

export default AwardRecognitionAdmin;
