import { useState, useEffect } from 'react';
import { createProjects } from '../../../Api';
import { getAllCategories } from '../../../Api';
import { toast } from 'react-toastify';
import RichTextEditor from './RichTextEditor';

export default function AddProject({ onClose, onSuccess }) {
  const token = localStorage.getItem('adminToken');

  const [formData, setFormData] = useState({
    projectName: '',
    projectType: '',
    projectStatus: '',
    location: '',
    projectAddress: '',
    priceStartsFrom: '',
    plotSize: '',
    possessionDate: '',
    unitConfiguration: '',
    waterSupply: '',
    projectArea: '',
    // totalUnits: '',
    totalUnits: null,
    masterPlans: null,
    brochureImage: null,
    propertyImages: [],
    noBrokerReraId: '',
    builderProjectReraId: '',
    reraDescription: '',
    // aboutProject: '',
    aboutProject: { mainDescription: '', blocks: [] },
    locationUrl: '',
    locationEmbedUrl: '',
    keyFeatures: [],
    amenities: [],
  });

  const [featureInput, setFeatureInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  const [masterPlansList, setMasterPlansList] = useState([
    { planName: '', carpetArea: '', planPhoto: null },
  ]);

  const handleMasterPlanChange = (index, field, value) => {
    setMasterPlansList((prev) =>
      prev.map((plan, i) => (i === index ? { ...plan, [field]: value } : plan)),
    );
  };

  const addMasterPlan = () => {
    setMasterPlansList((prev) => [
      ...prev,
      { planName: '', carpetArea: '', planPhoto: null },
    ]);
  };

  const removeMasterPlanFile = (index) => {
    setMasterPlansList((prev) =>
      prev.map((plan, i) =>
        i === index ? { ...plan, planPhoto: null } : plan,
      ),
    );
  };

  const removeMasterPlan = (index) => {
    setMasterPlansList((prev) => prev.filter((_, i) => i !== index));
  };

  const handleMasterPlanFileChange = (index, files) => {
    handleMasterPlanChange(index, 'planPhoto', files[0]);
  };

  const [sectionsList, setSectionsList] = useState([
    { sectionName: '', sectionDescription: '', sectionImage: null },
  ]);

  const handleSectionChange = (index, field, value) => {
    setSectionsList((prev) =>
      prev.map((s, i) => (i === index ? { ...s, [field]: value } : s)),
    );
  };

  const handleSectionFileChange = (index, files) => {
    handleSectionChange(index, 'sectionImage', files[0]);
  };

  const addSection = () => {
    setSectionsList((prev) => [
      ...prev,
      { sectionName: '', sectionDescription: '', sectionImage: null },
    ]);
  };

  const removeSection = (index) => {
    setSectionsList((prev) => prev.filter((_, i) => i !== index));
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await getAllCategories();
      setCategories(res.categories || []);
    } catch (err) {
      console.error('Failed to fetch categories', err);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSingleFileChange = (field, files) => {
    setFormData((prev) => ({
      ...prev,
      [field]: files[0],
    }));
  };

  const removeSingleFile = (field) => {
    setFormData((prev) => ({
      ...prev,
      [field]: null,
    }));
  };

  const addKeyFeature = () => {
    if (!featureInput.trim()) return;

    setFormData((prev) => ({
      ...prev,
      keyFeatures: [...prev.keyFeatures, featureInput.trim()],
    }));

    setFeatureInput('');
  };

  const removeKeyFeature = (index) => {
    setFormData((prev) => ({
      ...prev,
      keyFeatures: prev.keyFeatures.filter((_, i) => i !== index),
    }));
  };

  const handleAmenityToggle = (amenity) => {
    setFormData((prev) => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter((a) => a !== amenity)
        : [...prev.amenities, amenity],
    }));
  };

  const handleFileChange = (field, files, multiple = false) => {
    if (multiple) {
      setFormData((prev) => ({
        ...prev,
        [field]: [...prev[field], ...Array.from(files)],
      }));
    } else {
      setFormData((prev) => ({ ...prev, [field]: files[0] }));
    }
  };

  const removeFile = (field, index = null) => {
    if (index !== null) {
      setFormData((prev) => ({
        ...prev,
        [field]: prev[field].filter((_, i) => i !== index),
      }));
    } else {
      setFormData((prev) => ({ ...prev, [field]: null }));
    }
  };

  const handleSubmit = async () => {
    try {
      //  Validation
      if (
        !formData.projectName ||
        !formData.projectType ||
        !formData.projectStatus ||
        !formData.location
      ) {
        toast.error(
          'Please fill all required fields (Project Name, Type, Status, Location)',
        );
        return;
      }
      onClose();
      toast.success('Project submitted! Processing images...', {
        autoClose: 3000,
      });
      const data = new FormData();

      data.append('projectName', formData.projectName);
      data.append('projectType', formData.projectType);
      data.append('projectStatus', formData.projectStatus);
      data.append('location', formData.location);

      if (formData.projectAddress)
        data.append('projectAddress', formData.projectAddress);
      if (formData.priceStartsFrom)
        data.append('priceStartsFrom', formData.priceStartsFrom);
      if (formData.plotSize) data.append('plotSize', formData.plotSize);
      if (formData.possessionDate)
        data.append('possessionDate', formData.possessionDate);

      if (formData.unitConfiguration)
        data.append('unitConfiguration', formData.unitConfiguration);
      if (formData.waterSupply)
        data.append('waterSupply', formData.waterSupply);
      if (formData.projectArea)
        data.append('projectArea', formData.projectArea);
      if (formData.totalUnits !== null) {
        data.append('totalUnits', formData.totalUnits);
      }
      if (formData.noBrokerReraId)
        data.append('noBrokerReraId', formData.noBrokerReraId);
      if (formData.builderProjectReraId)
        data.append('builderProjectReraId', formData.builderProjectReraId);
      if (formData.reraDescription)
        data.append('reraDescription', formData.reraDescription);
      // if (formData.aboutProject)
      //   data.append('aboutProject', formData.aboutProject);
      const aboutProjectPayload = {
        mainDescription: formData.aboutProject.mainDescription || undefined,
        blocks: formData.aboutProject.blocks.filter(
          (b) => b.heading || b.description,
        ),
      };
      data.append('aboutProject', JSON.stringify(aboutProjectPayload));
      if (formData.locationUrl)
        data.append('locationUrl', formData.locationUrl);
      if (formData.locationEmbedUrl)
        data.append('locationEmbedUrl', formData.locationEmbedUrl);

      formData.keyFeatures.forEach((f) => data.append('keyFeatures[]', f));
      formData.amenities.forEach((a) => data.append('amenities[]', a));

      data.append(
        'sectionsData',
        JSON.stringify(
          sectionsList.map((s) => ({
            sectionName: s.sectionName,
            sectionDescription: s.sectionDescription,
          })),
        ),
      );

      sectionsList.forEach((s) => {
        if (s.sectionImage) data.append('sectionImages', s.sectionImage);
      });

      data.append(
        'masterPlansData',
        JSON.stringify(
          masterPlansList.map((p) => ({
            planName: p.planName,
            carpetArea: p.carpetArea,
          })),
        ),
      );

      masterPlansList.forEach((p) => {
        if (p.planPhoto) data.append('masterPlans', p.planPhoto);
      });

      if (formData.brochureImage)
        data.append('brochureImage', formData.brochureImage);

      formData.propertyImages.forEach((img) =>
        data.append('propertyImages', img),
      );

      createProjects(data, token)
        .then(() => {
          if (onSuccess) onSuccess();
          toast.success('Project fully uploaded!');
        })
        .catch((err) => {
          console.error(err);
          toast.error(err.response?.data?.message || 'Upload failed');
        });
      setTimeout(() => {
        if (onSuccess) onSuccess();
      }, 2000);
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || 'Failed to create project');
    }
  };

  return (
    <div className="p-6 max-h-screen overflow-y-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Add a project</h2>
      </div>

      <Section title="Basic Project Details">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            placeholder="Project Name *"
            value={formData.projectName}
            onChange={(e) => handleInputChange('projectName', e.target.value)}
          />
          <Select
            placeholder="Project Type *"
            options={categories.map((cat) => cat.categoryName)}
            value={formData.projectType}
            onChange={(e) => handleInputChange('projectType', e.target.value)}
          />

          <Select
            placeholder="Project Status *"
            options={['ongoing', 'completed', 'upcoming']}
            value={formData.projectStatus}
            onChange={(e) => handleInputChange('projectStatus', e.target.value)}
          />
          <Input
            placeholder="Location *"
            value={formData.location}
            onChange={(e) => handleInputChange('location', e.target.value)}
          />
          <Input
            placeholder="Project Address"
            className="md:col-span-2"
            value={formData.projectAddress}
            onChange={(e) =>
              handleInputChange('projectAddress', e.target.value)
            }
          />
          <Input
            placeholder="Price Starts From"
            type="text"
            value={formData.priceStartsFrom}
            onChange={(e) =>
              handleInputChange('priceStartsFrom', e.target.value)
            }
          />
          <Input
            placeholder="Plot Size"
            value={formData.plotSize}
            onChange={(e) => handleInputChange('plotSize', e.target.value)}
          />
          {/* <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">
              Possession Date
            </label>
            <Input
              type="date"
              className="w-full"
              value={formData.possessionDate}
              onChange={(e) =>
                handleInputChange('possessionDate', e.target.value)
              }
            />
          </div> */}
        </div>
      </Section>

      <Section title="Upload Master Plan">
        <div className="space-y-4">
          {masterPlansList.map((plan, index) => (
            <div
              key={index}
              className="border rounded-xl p-4 bg-white shadow-sm relative"
            >
              {masterPlansList.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeMasterPlan(index)}
                  className="absolute top-3 right-3 text-red-600 text-sm"
                >
                  ✕
                </button>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <Input
                  placeholder="Enter Plan Name"
                  value={plan.planName}
                  onChange={(e) =>
                    handleMasterPlanChange(index, 'planName', e.target.value)
                  }
                />

                <Input
                  placeholder="Enter Carpet Area"
                  value={plan.carpetArea}
                  onChange={(e) =>
                    handleMasterPlanChange(index, 'carpetArea', e.target.value)
                  }
                />
              </div>

              {/* <FileUpload
                label="Drag and Drop or Browse"
                onChange={(files) => handleMasterPlanFileChange(index, files)}
                selectedFile={plan.planPhoto}
              /> */}
              <FileUpload
                label="Drag and Drop or Browse"
                onChange={(files) => handleMasterPlanFileChange(index, files)}
                selectedFile={plan.planPhoto}
                onRemove={() => removeMasterPlanFile(index)}
              />
            </div>
          ))}

          <div className="flex justify-end">
            <button
              type="button"
              onClick={addMasterPlan}
              className="w-10 h-10 flex items-center justify-center rounded-lg bg-green-800 text-white text-xl hover:bg-green-900"
            >
              +
            </button>
          </div>
        </div>
      </Section>

      <Section title="Project Details">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            placeholder="Types of Plots"
            value={formData.unitConfiguration}
            onChange={(e) =>
              handleInputChange('unitConfiguration', e.target.value)
            }
          />
          {/* <Input
            placeholder="Water Supply"
            value={formData.waterSupply}
            onChange={(e) => handleInputChange('waterSupply', e.target.value)}
          /> */}
          <Input
            placeholder="Project Area"
            value={formData.projectArea}
            onChange={(e) => handleInputChange('projectArea', e.target.value)}
          />
          <Input
            type="number"
            placeholder="Total No Plots"
            value={formData.totalUnits ?? ''}
            onChange={(e) =>
              handleInputChange(
                'totalUnits',
                e.target.value === '' ? null : Number(e.target.value),
              )
            }
          />
        </div>
      </Section>

      <Section title="Add Brochure">
        <FileUpload
          label="Upload Brochure"
          onChange={(files) => handleFileChange('brochureImage', files)}
          selectedFile={formData.brochureImage}
          onRemove={() => removeFile('brochureImage')}
        />
      </Section>

      <Section title="Amenities">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
          {[
            'Common Garden',
            'CCTV Camera',
            'Community Hall',
            'Park',
            'Vastu Compliant',
            'Childrens Play Area',
            'Power Backup',
            'Fire Safety',
            'Security',
            'Jogging Track',
            'Party Area',
            'Lift',
            'Visitor parking',
            'Gym',
            'Swimming Pool',
            'Badminton Court',
            'Spa/Steam/Sauna',
            'Indoor Games',
            'Club House',
            'Auditorium',
            'Electricity',
            'Underground Electricity',
            'Solar street lights',
            '30ft Road',
            '40ft Road',
            'STP',
            'OHT',
            'Avenue Trees',
            'Open Gym',
            'Compound Wall',
          ].map((item) => (
            <label
              key={item}
              className="flex items-center gap-2 cursor-pointer"
            >
              <input
                type="checkbox"
                className="w-4 h-4 cursor-pointer"
                checked={formData.amenities.includes(item)}
                onChange={() => handleAmenityToggle(item)}
              />
              <span>{item}</span>
            </label>
          ))}
        </div>
      </Section>

      <Section title="Key Features">
        <div className="flex gap-2">
          <Input
            placeholder="Add a key feature"
            value={featureInput}
            onChange={(e) => setFeatureInput(e.target.value)}
          />
          <button
            type="button"
            onClick={addKeyFeature}
            className="px-4 rounded-lg bg-green-800 hover:bg-green-900 text-white text-sm"
          >
            +
          </button>
        </div>

        {formData.keyFeatures.length > 0 && (
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
            {formData.keyFeatures.map((feature, index) => (
              <div
                key={index}
                className="flex items-center justify-between bg-white border border-gray-200 rounded-lg px-4 py-2 shadow-sm"
              >
                <span className="text-sm text-gray-700">{feature}</span>
                <button
                  type="button"
                  onClick={() => removeKeyFeature(index)}
                  className="text-red-600 hover:text-red-800 transition"
                  title="Remove"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}
      </Section>

      <Section title="Property Images (max 10)">
        <FileUpload
          label="Upload Property Images"
          multiple
          onChange={(files) => handleFileChange('propertyImages', files, true)}
          selectedFiles={formData.propertyImages}
          onRemoveMultiple={(index) => removeFile('propertyImages', index)}
        />
      </Section>

      <Section title="RERA">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            placeholder="RERA ID"
            value={formData.noBrokerReraId}
            onChange={(e) =>
              handleInputChange('noBrokerReraId', e.target.value)
            }
          />
          {/* <Input
            placeholder="Builder Project RERA ID"
            value={formData.builderProjectReraId}
            onChange={(e) =>
              handleInputChange('builderProjectReraId', e.target.value)
            }
          /> */}
        </div>
        {/* <textarea
          className="border rounded-lg px-3 py-2 text-sm w-full h-24 resize-none mt-3 focus:outline-none focus:ring-2 focus:ring-green-800"
          placeholder="RERA Description"
          value={formData.reraDescription}
          onChange={(e) => handleInputChange('reraDescription', e.target.value)}
        /> */}
        <div className="mt-3">
          <RichTextEditor
            value={formData.reraDescription}
            onChange={(value) => handleInputChange('reraDescription', value)}
          />
        </div>
      </Section>

      {/* <Section title="About Project">
        <textarea
          className="border rounded-lg px-3 py-2 text-sm w-full h-32 resize-none focus:outline-none focus:ring-2 focus:ring-green-800"
          placeholder="About Project"
          value={formData.aboutProject}
          onChange={(e) => handleInputChange('aboutProject', e.target.value)}
        />
      </Section> */}
      <Section title="About Project">
        <div className="space-y-3">
          {/* <textarea
            className="border rounded-lg px-3 py-2 text-sm font-semibold w-full h-24 resize-none focus:outline-none focus:ring-2 focus:ring-green-800"
            placeholder="Main description (optional)"
            value={formData.aboutProject.mainDescription}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                aboutProject: {
                  ...prev.aboutProject,
                  mainDescription: e.target.value,
                },
              }))
            }
          /> */}

          <div>
            <p className="text-xs text-gray-500 font-medium mb-1">
              Main Description
            </p>
            <RichTextEditor
              value={formData.aboutProject.mainDescription}
              onChange={(value) =>
                setFormData((prev) => ({
                  ...prev,
                  aboutProject: {
                    ...prev.aboutProject,
                    mainDescription: value,
                  },
                }))
              }
            />
          </div>

          <p className="text-xs text-gray-500 font-medium">
            Heading + Description blocks
          </p>

          {formData.aboutProject.blocks.map((block, index) => (
            <div
              key={index}
              className="border rounded-xl p-4 bg-white shadow-sm relative space-y-2"
            >
              <button
                type="button"
                onClick={() =>
                  setFormData((prev) => ({
                    ...prev,
                    aboutProject: {
                      ...prev.aboutProject,
                      blocks: prev.aboutProject.blocks.filter(
                        (_, i) => i !== index,
                      ),
                    },
                  }))
                }
                className="absolute top-3 right-3 text-red-500 text-sm"
              >
                ✕
              </button>
              <input
                className="border rounded-lg px-3 py-2 font-semibold text-sm w-full focus:outline-none focus:ring-2 focus:ring-green-800"
                placeholder="Heading (optional) — e.g. Strategic Location:"
                value={block.heading}
                onChange={(e) => {
                  const updated = [...formData.aboutProject.blocks];
                  updated[index] = {
                    ...updated[index],
                    heading: e.target.value,
                  };
                  setFormData((prev) => ({
                    ...prev,
                    aboutProject: { ...prev.aboutProject, blocks: updated },
                  }));
                }}
              />
              <textarea
                className="border rounded-lg px-3 py-2 text-sm font-normal w-full h-20 resize-none focus:outline-none focus:ring-2 focus:ring-green-800"
                placeholder="Description (optional)"
                value={block.description}
                onChange={(e) => {
                  const updated = [...formData.aboutProject.blocks];
                  updated[index] = {
                    ...updated[index],
                    description: e.target.value,
                  };
                  setFormData((prev) => ({
                    ...prev,
                    aboutProject: { ...prev.aboutProject, blocks: updated },
                  }));
                }}
              />
            </div>
          ))}

          <div className="flex justify-end">
            <button
              type="button"
              onClick={() =>
                setFormData((prev) => ({
                  ...prev,
                  aboutProject: {
                    ...prev.aboutProject,
                    blocks: [
                      ...prev.aboutProject.blocks,
                      { heading: '', description: '' },
                    ],
                  },
                }))
              }
              className="w-10 h-10 flex items-center justify-center rounded-lg bg-green-800 text-white text-xl hover:bg-green-900"
            >
              +
            </button>
          </div>
        </div>
      </Section>

      <Section title="Location URL">
        <Input
          placeholder="Google Map Location URL"
          value={formData.locationUrl}
          onChange={(e) => handleInputChange('locationUrl', e.target.value)}
        />
      </Section>
      <Section title="Google Map Embed URL">
        <Input
          placeholder="Paste Google Maps Embed URL"
          value={formData.locationEmbedUrl}
          onChange={(e) =>
            handleInputChange('locationEmbedUrl', e.target.value)
          }
        />
      </Section>

      <Section title="Add New Section (Optional)">
        <div className="space-y-4">
          {sectionsList.map((section, index) => (
            <div
              key={index}
              className="border rounded-xl p-4 bg-white shadow-sm relative"
            >
              {sectionsList.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeSection(index)}
                  className="absolute top-3 right-3 text-red-600 text-sm"
                >
                  ✕
                </button>
              )}

              <div className="space-y-4 mb-4">
                <Input
                  placeholder="Section Name"
                  value={section.sectionName}
                  onChange={(e) =>
                    handleSectionChange(index, 'sectionName', e.target.value)
                  }
                />

                <Input
                  placeholder="Section Description"
                  value={section.sectionDescription}
                  onChange={(e) =>
                    handleSectionChange(
                      index,
                      'sectionDescription',
                      e.target.value,
                    )
                  }
                />
              </div>

              <FileUpload
                label="Drag and Drop or Browse"
                onChange={(files) => handleSectionFileChange(index, files)}
                selectedFile={section.sectionImage}
              />
            </div>
          ))}

          <div className="flex justify-end">
            <button
              type="button"
              onClick={addSection}
              className="w-10 h-10 flex items-center justify-center rounded-lg bg-green-800 text-white text-xl hover:bg-green-900"
            >
              +
            </button>
          </div>
        </div>
      </Section>

      <div className="flex justify-end gap-3 mt-8 pt-4 border-t">
        <button
          onClick={onClose}
          disabled={loading}
          className="px-6 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition disabled:opacity-50"
        >
          Cancel
        </button>
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="px-6 py-2 bg-green-800 hover:bg-green-900 text-white rounded-lg text-sm font-medium transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Saving...' : 'Add Project'}
        </button>
      </div>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div className="mt-7">
      <h3 className="text-sm font-semibold text-gray-800 mb-3">{title}</h3>
      {children}
    </div>
  );
}

function Input({
  placeholder,
  type = 'text',
  className = '',
  value,
  onChange,
}) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`border rounded-lg px-3 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-green-800 ${className}`}
    />
  );
}

function Select({ placeholder, options, value, onChange }) {
  return (
    <select
      value={value}
      onChange={onChange}
      className="border rounded-lg px-3 py-2 text-sm w-full text-gray-500 focus:outline-none focus:ring-2 focus:ring-green-800 cursor-pointer"
    >
      <option value="">{placeholder}</option>
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  );
}

function FileUpload({
  label,
  multiple,
  onChange,
  selectedFile,
  selectedFiles,
  onRemove,
  onRemoveMultiple,
}) {
  const files = multiple ? selectedFiles : selectedFile ? [selectedFile] : [];

  return (
    <div className="space-y-2">
      <label className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center text-sm text-gray-500 cursor-pointer hover:border-green-600 hover:bg-gray-50 transition">
        <input
          type="file"
          hidden
          multiple={multiple}
          accept="image/*,application/pdf"
          onChange={(e) => onChange(e.target.files)}
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-8 h-8 mb-2 text-gray-400"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
          />
        </svg>
        <span className="font-medium text-gray-700">{label}</span>
        <span className="text-xs mt-1 text-gray-400">
          PNG, JPG, PDF (Max 10MB)
        </span>
      </label>

      {files.length > 0 && (
        <div className="space-y-2">
          {files.map((file, index) => (
            <div
              key={index}
              className="flex items-center justify-between bg-gray-50 p-2 rounded border"
            >
              <div className="flex items-center gap-2">
                <svg
                  className="w-4 h-4 text-green-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span className="text-sm text-gray-700">{file.name}</span>
                <span className="text-xs text-gray-500">
                  ({(file.size / 1024).toFixed(1)} KB)
                </span>
              </div>
              <button
                onClick={() =>
                  multiple ? onRemoveMultiple(index) : onRemove()
                }
                className="text-red-600 hover:text-red-800 text-sm"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
