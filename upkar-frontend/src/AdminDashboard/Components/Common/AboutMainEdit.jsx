import React, { useState, useEffect } from 'react';
import { updateAboutMain } from '../../../Api';
import { toast } from 'react-toastify';

const AboutMainEdit = ({ isOpen, onClose, item, onAboutUpdated }) => {
  const [form, setForm] = useState({
    heading: '',
    plotNumber: '',
    plotTitle: '',
    acresNumber: '',
    acresTitle: '',
    paragraph1: '',
    paragraph2: '',
    paragraph3: '',
  });

  const [plotImage, setPlotImage] = useState(null);
  const [acresImage, setAcresImage] = useState(null);
  const [newMainImages, setNewMainImages] = useState([]);
  const [deletedImages, setDeletedImages] = useState([]);
  const [plotPreview, setPlotPreview] = useState('');
  const [acresPreview, setAcresPreview] = useState('');
  const [mainPreview, setMainPreview] = useState([]);
  const [selectedForDeletion, setSelectedForDeletion] = useState([]);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem('adminToken');

  useEffect(() => {
    if (item) {
      setForm({
        heading: item.heading || '',
        plotNumber: item.plotNumber || '',
        plotTitle: item.plotTitle || '',
        acresNumber: item.acresNumber || '',
        acresTitle: item.acresTitle || '',
        paragraph1: item.paragraph1 || '',
        paragraph2: item.paragraph2 || '',
        paragraph3: item.paragraph3 || '',
      });
      setPlotPreview(item.plotImage || '');
      setAcresPreview(item.acresImage || '');
      setMainPreview(item.mainImages || []);
      setNewMainImages([]);
      setDeletedImages([]);
      setSelectedForDeletion([]);
    }
  }, [item]);

  if (!isOpen) return null;

  const handleNewMainImages = (e) => {
    const files = Array.from(e.target.files);
    setNewMainImages([...newMainImages, ...files]);

    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setMainPreview([...mainPreview, ...newPreviews]);
  };

  const toggleSelectImage = (index) => {
    if (selectedForDeletion.includes(index)) {
      setSelectedForDeletion(selectedForDeletion.filter((i) => i !== index));
    } else {
      setSelectedForDeletion([...selectedForDeletion, index]);
    }
  };

  const handleRemoveSelected = () => {
    const totalExisting = item.mainImages.length;
    const updatedPreview = [...mainPreview];
    const updatedNewImages = [...newMainImages];
    let updatedDeleted = [...deletedImages];

    selectedForDeletion.forEach((index) => {
      if (index < totalExisting) {
        updatedDeleted.push(item.mainImages[index]);
      } else {
        const newIndex = index - totalExisting;
        updatedNewImages.splice(newIndex, 1);
      }
      updatedPreview[index] = null;
    });

    setDeletedImages(updatedDeleted);
    setNewMainImages(updatedNewImages);
    setMainPreview(updatedPreview.filter((img) => img !== null));
    setSelectedForDeletion([]);
  };

  const handleSingleRemove = (index) => {
    const totalExisting = item.mainImages.length;
    const updatedPreview = [...mainPreview];
    const updatedNewImages = [...newMainImages];
    let updatedDeleted = [...deletedImages];

    if (index < totalExisting) {
      updatedDeleted.push(item.mainImages[index]);
    } else {
      const newIndex = index - totalExisting;
      updatedNewImages.splice(newIndex, 1);
    }
    updatedPreview.splice(index, 1);

    setDeletedImages(updatedDeleted);
    setNewMainImages(updatedNewImages);
    setMainPreview(updatedPreview);
    setSelectedForDeletion(selectedForDeletion.filter((i) => i !== index));
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    Object.keys(form).forEach((key) => formData.append(key, form[key]));
    if (plotImage) formData.append('plotImage', plotImage);
    if (acresImage) formData.append('acresImage', acresImage);
    newMainImages.forEach((img) => formData.append('mainImages', img));
    deletedImages.forEach((imgUrl) => formData.append('deletedImages', imgUrl));

    try {
      setLoading(true);
      await updateAboutMain(item._id, formData, token);
      onAboutUpdated();
      onClose();
    } catch (error) {
      console.error(error);
      toast.error('Failed to update About content!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-40 z-50 p-4">
      <div className="bg-white p-6 rounded w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-semibold mb-4">Edit About Main</h2>
        <div className="space-y-3">
          <input
            type="text"
            placeholder="Heading"
            className="border p-2 w-full rounded"
            value={form.heading}
            onChange={(e) => setForm({ ...form, heading: e.target.value })}
          />
          <input
            type="text"
            placeholder="Plot Number"
            className="border p-2 w-full rounded"
            value={form.plotNumber}
            onChange={(e) => setForm({ ...form, plotNumber: e.target.value })}
          />
          <input
            type="text"
            placeholder="Plot Title"
            className="border p-2 w-full rounded"
            value={form.plotTitle}
            onChange={(e) => setForm({ ...form, plotTitle: e.target.value })}
          />

          <label className="block font-medium">Plot Image</label>
          <input
            type="file"
            onChange={(e) => {
              setPlotImage(e.target.files[0]);
              setPlotPreview(URL.createObjectURL(e.target.files[0]));
            }}
          />
          {plotPreview && (
            <img
              src={plotPreview}
              className="w-full h-32 object-cover rounded"
            />
          )}

          <input
            type="text"
            placeholder="Acres Number"
            className="border p-2 w-full rounded"
            value={form.acresNumber}
            onChange={(e) => setForm({ ...form, acresNumber: e.target.value })}
          />
          <input
            type="text"
            placeholder="Acres Title"
            className="border p-2 w-full rounded"
            value={form.acresTitle}
            onChange={(e) => setForm({ ...form, acresTitle: e.target.value })}
          />

          <label className="block font-medium">Acres Image</label>
          <input
            type="file"
            onChange={(e) => {
              setAcresImage(e.target.files[0]);
              setAcresPreview(URL.createObjectURL(e.target.files[0]));
            }}
          />
          {acresPreview && (
            <img
              src={acresPreview}
              className="w-full h-32 object-cover rounded"
            />
          )}

          <label className="block font-medium">Main Images (Multiple)</label>
          <input type="file" multiple onChange={handleNewMainImages} />
          <div className="flex gap-2 mt-2 flex-wrap">
            {mainPreview.map((img, i) => (
              <div key={i} className="relative">
                <img src={img} className="w-14 h-14 object-cover rounded" />
                <button
                  type="button"
                  onClick={() => handleSingleRemove(i)}
                  className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                >
                  ×
                </button>
                <input
                  type="checkbox"
                  className="absolute bottom-0 left-0 w-4 h-4"
                  checked={selectedForDeletion.includes(i)}
                  onChange={() => toggleSelectImage(i)}
                />
              </div>
            ))}
          </div>
          {selectedForDeletion.length > 0 && (
            <button
              type="button"
              onClick={handleRemoveSelected}
              className="mt-2 px-3 py-1 bg-red-500 text-white rounded"
            >
              Remove Selected ({selectedForDeletion.length})
            </button>
          )}

          <textarea
            placeholder="Paragraph 1"
            className="border p-2 w-full rounded"
            value={form.paragraph1}
            onChange={(e) => setForm({ ...form, paragraph1: e.target.value })}
          />
          <textarea
            placeholder="Paragraph 2"
            className="border p-2 w-full rounded"
            value={form.paragraph2}
            onChange={(e) => setForm({ ...form, paragraph2: e.target.value })}
          />
          <textarea
            placeholder="Paragraph 3"
            className="border p-2 w-full rounded"
            value={form.paragraph3}
            onChange={(e) => setForm({ ...form, paragraph3: e.target.value })}
          />

          <div className="flex justify-end gap-2 mt-3">
            <button onClick={onClose} className="px-4 py-2 border rounded">
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              {loading ? 'Updating...' : 'Update'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutMainEdit;
