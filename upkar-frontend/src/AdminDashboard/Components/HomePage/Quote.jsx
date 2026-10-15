import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Eye } from 'lucide-react';
import QuoteAdd from '../Common/QuoteCertificateAdd';
import QuoteEdit from '../Common/QuoteEditCertificate';
import QuoteViewModal from '../../Components/ViewModals/HomePage/QuoteView';
import { getQuotesAPI, deleteQuoteAPI } from '../../../Api';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';

const QuoteMain = () => {
  const [quotes, setQuotes] = useState([]);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [selectedQuote, setSelectedQuote] = useState(null);

  const token = localStorage.getItem('adminToken');

  useEffect(() => {
    fetchQuotes();
  }, []);

  const fetchQuotes = async () => {
    try {
      const data = await getQuotesAPI();
      setQuotes(data);
    } catch (error) {
      console.error('Error fetching quotes:', error);
      toast.error('Failed to fetch quotes!');
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
        await deleteQuoteAPI(id, token);
        setQuotes(quotes.filter((q) => q._id !== id));
        toast.success('Quote deleted successfully!');
      } catch (error) {
        console.error('Error deleting quote:', error);
        toast.error('Failed to delete quote!');
      }
    }
  };

  const handleQuoteAdded = () => {
    fetchQuotes();
    toast.success('Quote added successfully!');
  };

  const handleQuoteUpdated = () => {
    fetchQuotes();
    toast.success('Quote updated successfully!');
  };

  const truncateText = (text) => {
    if (!text) return '';
    return text.length > 50 ? text.substring(0, 50) + '...' : text;
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
                Created At
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {quotes.map((q) => (
              <tr key={q._id}>
                <td className="px-4 py-2">{truncateText(q.text)}</td>
                <td className="px-4 py-2">
                  {new Date(q.createdAt).toLocaleDateString()}
                </td>
                <td className="px-4 py-2 flex gap-2">
                  {/* View */}
                  <button
                    onClick={() => {
                      setSelectedQuote(q);
                      setIsViewOpen(true);
                    }}
                    className="text-green-600 hover:text-green-800"
                  >
                    <Eye className="w-4 h-4" />
                  </button>

                  {/* Edit */}
                  <button
                    onClick={() => {
                      setSelectedQuote(q);
                      setIsEditOpen(true);
                    }}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <Edit className="w-4 h-4" />
                  </button>

                  {/* Delete */}
                  <button
                    onClick={() => handleDelete(q._id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
            {quotes.length === 0 && (
              <tr>
                <td colSpan={3} className="text-center py-4 text-gray-500">
                  No quotes found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <QuoteAdd
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        onQuoteAdded={handleQuoteAdded}
      />
      <QuoteEdit
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        quote={selectedQuote}
        onUpdate={handleQuoteUpdated}
      />
      <QuoteViewModal
        isOpen={isViewOpen}
        onClose={() => setIsViewOpen(false)}
        quote={selectedQuote}
      />
    </div>
  );
};

export default QuoteMain;
