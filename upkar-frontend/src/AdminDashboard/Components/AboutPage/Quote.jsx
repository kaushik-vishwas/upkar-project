import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Eye } from 'lucide-react';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import QuoteAdd from '../../Components/Common/QuoteAdd';
import QuoteEdit from '../../Components/Common/QuoteEdit';
import QuoteViewModal from '../../Components/ViewModals/AboutPage/QuoteView';
import { getAllQuotes, deleteQuote } from '../../../Api';

const token = localStorage.getItem('adminToken');

const Quote = () => {
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [selectedQuote, setSelectedQuote] = useState(null);
  const [quoteData, setQuoteData] = useState([]);

  const fetchQuotes = async () => {
    try {
      const res = await getAllQuotes();
      setQuoteData(res.quotes || []);
    } catch (error) {
      console.error('Error fetching quotes:', error);
      toast.error('Failed to fetch quotes.');
    }
  };

  useEffect(() => {
    fetchQuotes();
  }, []);

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
        await deleteQuote(id, token);
        toast.success('Quote deleted successfully!');
        fetchQuotes();
      } catch (error) {
        console.error('Delete failed:', error);
        toast.error('Failed to delete quote.');
      }
    }
  };

  const truncateText = (text) => {
    if (!text) return '';
    return text.length > 20 ? text.substring(0, 20) + '...' : text;
  };

  return (
    <div className="flex-1 p-4 sm:p-6 bg-gray-100 min-h-screen">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
        <h1 className="text-2xl font-bold">Quotes</h1>
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
                Quote
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">
                Name
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">
                Position
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
            {quoteData.map((item) => (
              <tr key={item._id}>
                <td className="px-4 py-2">{truncateText(item.quoteContent)}</td>
                <td className="px-4 py-2">{truncateText(item.name)}</td>
                <td className="px-4 py-2">{truncateText(item.position)}</td>
                <td className="px-4 py-2">
                  {new Date(item.createdAt).toLocaleDateString()}
                </td>
                <td className="px-4 py-2 flex gap-2">
                  <button
                    className="text-green-600 hover:text-green-800"
                    onClick={() => {
                      setSelectedQuote(item);
                      setIsViewOpen(true);
                    }}
                  >
                    <Eye className="w-4 h-4" />
                  </button>

                  <button
                    className="text-blue-500 hover:text-blue-700"
                    onClick={() => {
                      setSelectedQuote(item);
                      setIsEditOpen(true);
                    }}
                  >
                    <Edit className="w-4 h-4" />
                  </button>

                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() => handleDelete(item._id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}

            {quoteData.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center py-4 text-gray-500">
                  No quotes available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <QuoteAdd
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        onQuoteAdded={fetchQuotes}
      />
      <QuoteEdit
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        item={selectedQuote}
        onQuoteUpdated={fetchQuotes}
      />
      <QuoteViewModal
        isOpen={isViewOpen}
        onClose={() => setIsViewOpen(false)}
        item={selectedQuote}
      />
    </div>
  );
};

export default Quote;
