import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Eye } from 'lucide-react';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EventAdd from './../Common/EventAdd';
import EventEdit from './../Common/EventEdit';
import EventViewModal from '../../Components/ViewModals/EventPage/EventView';
import { getAllEvents, deleteEvent } from '../../../Api';

const EventMain = () => {
  const [events, setEvents] = useState([]);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const token = localStorage.getItem('adminToken');

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const data = await getAllEvents();
      setEvents(data.events || data);
    } catch (error) {
      console.error('Error fetching events:', error);
      toast.error('Failed to fetch events!');
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      confirmButtonColor: '#d33',
      cancelButtonColor: '#28a745',
    });

    if (result.isConfirmed) {
      try {
        await deleteEvent(id, token);
        setEvents(events.filter((e) => e._id !== id));
        toast.success('Event deleted successfully!');
      } catch (error) {
        console.error('Error deleting event:', error);
        toast.error('Failed to delete event!');
      }
    }
  };

  const handleEventAdded = () => {
    fetchEvents();
    toast.success('Event added successfully!');
  };

  const handleEventUpdated = () => {
    fetchEvents();
    toast.success('Event updated successfully!');
  };

  const formatDate = (date) =>
    new Date(date).toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });

  const truncate = (text, length = 20) =>
    text?.length > length ? text.slice(0, length) + '...' : text;

  return (
    <div className="flex-1 p-4 sm:p-6 bg-gray-100 min-h-screen">
      <ToastContainer position="top-right" autoClose={2000} />
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
        <h1 className="text-2xl font-bold">Events</h1>
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
                Event Title
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">
                Description
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">
                Location
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">
                Date
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">
                Image
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-500 w-36">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {events.length > 0 ? (
              events.map((event) => (
                <tr key={event._id}>
                  <td className="px-4 py-2">{truncate(event.eventTitle)}</td>
                  <td className="px-4 py-2">
                    {truncate(event.eventDescription)}
                  </td>
                  <td className="px-4 py-2">{truncate(event.eventLocation)}</td>
                  <td className="px-4 py-2">{formatDate(event.eventDate)}</td>

                  <td className="px-4 py-2">
                    {event.eventImages?.length > 0 && (
                      <img
                        src={event.eventImages[0]}
                        alt={event.eventTitle}
                        className="w-20 h-12 object-cover rounded"
                      />
                    )}
                  </td>
                  <td className="px-4 py-2 flex items-center gap-2">
                    <button
                      type="button"
                      className="p-1 text-green-500 hover:text-green-700 rounded  hover:bg-gray-100 flex-shrink-0"
                      onClick={() => {
                        setSelectedEvent(event);
                        setIsViewOpen(true);
                      }}
                    >
                      <Eye className="w-4 h-4" />
                    </button>

                    <button
                      type="button"
                      className="p-1 text-blue-500 hover:text-blue-700 rounded  hover:bg-gray-100 flex-shrink-0"
                      onClick={() => {
                        setSelectedEvent(event);
                        setIsEditOpen(true);
                      }}
                    >
                      <Edit className="w-4 h-4" />
                    </button>

                    <button
                      type="button"
                      className="p-1 text-red-500 hover:text-red-700 rounded hover:bg-gray-100 flex-shrink-0"
                      onClick={() => handleDelete(event._id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="text-center py-4 text-gray-500">
                  No Events found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <EventAdd
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        onEventAdded={handleEventAdded}
      />
      <EventEdit
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        event={selectedEvent}
        onUpdate={handleEventUpdated}
      />
      <EventViewModal
        isOpen={isViewOpen}
        onClose={() => setIsViewOpen(false)}
        event={selectedEvent}
      />
    </div>
  );
};

export default EventMain;
