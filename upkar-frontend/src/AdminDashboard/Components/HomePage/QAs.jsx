import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Eye } from 'lucide-react';
import QAsAdd from '../Common/QAsAdd';
import QAsEdit from '../Common/QAsEdit';
import QAsViewModal from '../ViewModals/HomePage/QAsView';
import { getQuestionsAPI, deleteQuestionAPI } from '../../../Api';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';

const QAs = () => {
  const [qas, setQAs] = useState([]);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [selectedQA, setSelectedQA] = useState(null);

  const token = localStorage.getItem('adminToken');

  useEffect(() => {
    fetchQAs();
  }, []);

  const fetchQAs = async () => {
    try {
      const data = await getQuestionsAPI(token);
      setQAs(data);
    } catch (error) {
      console.error('Error fetching Q&As:', error);
      toast.error('Failed to fetch Q&As!');
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#28a745',
      confirmButtonText: 'Yes, delete it!',
    });

    if (result.isConfirmed) {
      try {
        await deleteQuestionAPI(id, token);
        setQAs(qas.filter((qa) => qa._id !== id));
        toast.success('Question deleted successfully!');
      } catch (error) {
        console.error('Error deleting question:', error);
        toast.error('Failed to delete question!');
      }
    }
  };

  const handleQAAdded = () => {
    fetchQAs();
    toast.success('Question added successfully!');
  };

  const handleQAUpdated = () => {
    fetchQAs();
    toast.success('Question updated successfully!');
  };

  const truncateText = (text) => {
    if (!text) return '';
    return text.length > 20 ? text.substring(0, 20) + '...' : text;
  };

  return (
    <div className="flex-1 p-4 sm:p-6 bg-gray-100 min-h-screen">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
        <h1 className="text-2xl font-bold">Q&As</h1>
        <button
          onClick={() => setIsAddOpen(true)}
          className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          <Plus className="w-4 h-4" /> Add
        </button>
      </div>

      <div className="overflow-x-auto w-full bg-white rounded shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">
                Question
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">
                Answer
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">
                Created At
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {qas.map((qa) => (
              <tr key={qa._id}>
                <td className="px-4 py-2">{truncateText(qa.question)}</td>
                <td className="px-4 py-2">{truncateText(qa.answer)}</td>
                <td className="px-4 py-2">
                  {new Date(qa.createdAt).toLocaleDateString()}
                </td>
                <td className="px-4 py-2 flex gap-2">
                  <button
                    onClick={() => {
                      setSelectedQA(qa);
                      setIsViewOpen(true);
                    }}
                    className="text-green-600 hover:text-green-800"
                  >
                    <Eye className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => {
                      setSelectedQA(qa);
                      setIsEditOpen(true);
                    }}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <Edit className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => handleDelete(qa._id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
            {qas.length === 0 && (
              <tr>
                <td colSpan={4} className="text-center py-4 text-gray-500">
                  No Q&As found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <QAsAdd
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        onQAAdded={handleQAAdded}
      />
      <QAsEdit
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        qa={selectedQA}
        onUpdate={handleQAUpdated}
      />
      <QAsViewModal
        isOpen={isViewOpen}
        onClose={() => setIsViewOpen(false)}
        qa={selectedQA}
      />
    </div>
  );
};

export default QAs;
