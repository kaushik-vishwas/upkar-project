import axios from 'axios';
const API_URL =
  // import.meta.env.VITE_API_URL || 'https://upkar-backend.onrender.com/api';
  import.meta.env.VITE_API_URL || 'https://backend.upkardevelopers.co.in/api';
// import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

//Admin Authenticaion
export const adminLoginApi = async (data) => {
  const res = await axios.post(`${API_URL}/admin/login`, data);
  return res.data;
};

// export const adminForgotPasswordApi = async (data) => {
//   const res = await axios.post(`${API_URL}/admin/forgot-password`, data);
//   return res.data;
// };
export const adminForgotPasswordApi = async (data) => {
  const res = await axios.post(`${API_URL}/admin/forgot-password`, data, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return res.data;
};

export const adminVerifyOtpApi = async (data) => {
  const res = await axios.post(`${API_URL}/admin/verify-otp`, data);
  return res.data;
};

export const adminResetPasswordApi = async (data) => {
  const res = await axios.post(`${API_URL}/admin/reset-password`, data);
  return res.data;
};

export const getAdminProfileApi = async (token) => {
  const res = await axios.get(`${API_URL}/admin/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const updateAdminProfileApi = async (formData, token) => {
  const res = await axios.put(`${API_URL}/admin/profile`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
  });
  return res.data;
};

export const changeAdminPasswordApi = async (data, token) => {
  const res = await axios.put(`${API_URL}/admin/change-password`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

//banners
export const getBanners = async () => {
  const res = await axios.get(`${API_URL}/homepage/get-all-banners`);
  return res.data;
};

export const createBanner = async (formData, token) => {
  const res = await axios.post(`${API_URL}/homepage/create-banner`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
  });
  return res.data;
};

export const deleteBanner = async (id, token) => {
  const res = await axios.delete(`${API_URL}/homepage/delete-banner/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const editBanner = async (id, formData, token) => {
  const res = await axios.put(
    `${API_URL}/homepage/edit-banner/${id}`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    },
  );
  return res.data;
};

//VisionMission
export const getVisionMission = async () => {
  const res = await axios.get(`${API_URL}/homepage/get-all-visions`);
  return res.data;
};

export const createVisionMission = async (formData, token) => {
  const res = await axios.post(`${API_URL}/homepage/create-vision`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
  });
  return res.data;
};

export const updateVisionMission = async (id, formData, token) => {
  const res = await axios.put(
    `${API_URL}/homepage/update-vision/${id}`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    },
  );
  return res.data;
};

export const deleteVisionMission = async (id, token) => {
  const res = await axios.delete(`${API_URL}/homepage/delete-vision/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

//Projects
export const getProjects = async () => {
  const res = await axios.get(`${API_URL}/homepage/get-all-projects`);
  return res.data;
};

export const createProject = async (formData, token) => {
  const res = await axios.post(`${API_URL}/homepage/create-project`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
  });
  return res.data;
};

export const updateProject = async (id, formData, token) => {
  const res = await axios.put(
    `${API_URL}/homepage/update-project/${id}`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    },
  );
  return res.data;
};

export const deleteProject = async (id, token) => {
  const res = await axios.delete(`${API_URL}/homepage/delete-project/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

//Certification
export const getCertifications = async () => {
  const res = await axios.get(`${API_URL}/homepage/get-all-certificates`);
  return res.data;
};

export const createCertification = async (formData, token) => {
  const res = await axios.post(
    `${API_URL}/homepage/create-certificate`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    },
  );
  return res.data;
};

export const deleteCertification = async (id, token) => {
  const res = await axios.delete(
    `${API_URL}/homepage/delete-certificate/${id}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    },
  );
  return res.data;
};

export const updateCertification = async (id, formData, token) => {
  const res = await axios.put(
    `${API_URL}/homepage/update-certificate/${id}`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    },
  );
  return res.data;
};

// Q&A
export const getQuestionsAPI = async () => {
  const res = await axios.get(`${API_URL}/homepage/get-all-qns`);
  return res.data;
};

export const createQuestionAPI = async (data, token) => {
  const res = await axios.post(`${API_URL}/homepage/create-qn`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const updateQuestionAPI = async (id, data, token) => {
  const res = await axios.put(`${API_URL}/homepage/update-qn/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const deleteQuestionAPI = async (id, token) => {
  const res = await axios.delete(`${API_URL}/homepage/delete-qn/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// Awards
export const getAwardsAPI = async () => {
  const { data } = await axios.get(`${API_URL}/homepage/get-all`);
  return data;
};

export const createAwardAPI = async (formData, token) => {
  const { data } = await axios.post(
    `${API_URL}/homepage/create-award`,
    formData,
    {
      headers: { Authorization: `Bearer ${token}` },
    },
  );
  return data;
};

export const updateAwardAPI = async (id, formData, token) => {
  const { data } = await axios.put(
    `${API_URL}/homepage/update/${id}`,
    formData,
    {
      headers: { Authorization: `Bearer ${token}` },
    },
  );
  return data;
};

export const deleteAwardAPI = async (id, token) => {
  const { data } = await axios.delete(`${API_URL}/homepage/delete/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};

//Project main
export const getAllProjectMain = async () => {
  const { data } = await axios.get(
    `${API_URL}/projectpage/get-all-projectmain`,
  );
  return data;
};

export const createProjectMain = async (formData, token) => {
  const { data } = await axios.post(
    `${API_URL}/projectpage/create-projectmain`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    },
  );
  return data;
};

export const updateProjectMain = async (id, formData, token) => {
  const { data } = await axios.put(
    `${API_URL}/projectpage/edit-projectmain/${id}`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    },
  );
  return data;
};

export const deleteProjectMain = async (id, token) => {
  const { data } = await axios.delete(
    `${API_URL}/projectpage/delete-projectmain/${id}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    },
  );
  return data;
};

//Features
export const createFeature = async (formData, token) => {
  const { data } = await axios.post(
    `${API_URL}/projectpage/create-feature`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    },
  );
  return data;
};

export const getAllFeatures = async () => {
  const { data } = await axios.get(`${API_URL}/projectpage/get-all-features`);
  return data;
};

export const updateFeature = async (id, formData, token) => {
  const { data } = await axios.put(
    `${API_URL}/projectpage/edit-feature/${id}`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    },
  );
  return data;
};

export const deleteFeature = async (id, token) => {
  const { data } = await axios.delete(
    `${API_URL}/projectpage/delete-feature/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return data;
};

//Plot layout
export const createPlotLayout = async (formData, token) => {
  try {
    const res = await axios.post(
      `${API_URL}/projectpage/create-plot-layout`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      },
    );
    return res.data;
  } catch (error) {
    console.error(
      'Error creating plot layout:',
      error.response?.data || error.message,
    );
    throw error;
  }
};

export const updatePlotLayout = async (id, formData, token) => {
  try {
    const res = await axios.put(
      `${API_URL}/projectpage/update-plot-layout/${id}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      },
    );
    return res.data;
  } catch (error) {
    console.error(
      'Error updating plot layout:',
      error.response?.data || error.message,
    );
    throw error;
  }
};

export const getPlotLayout = async () => {
  try {
    const res = await axios.get(`${API_URL}/projectpage/get-plot-layout`);
    return res.data;
  } catch (error) {
    console.error(
      'Error fetching plot layout:',
      error.response?.data || error.message,
    );
    throw error;
  }
};

export const deletePlotLayout = async (id, token) => {
  try {
    const res = await axios.delete(
      `${API_URL}/projectpage/delete-plot-layout/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return res.data;
  } catch (error) {
    console.error(
      'Error deleting plot layout:',
      error.response?.data || error.message,
    );
    throw error;
  }
};

// Amenities
export const getAmenitiesAPI = async () => {
  const { data } = await axios.get(`${API_URL}/projectpage/get-amenity`);
  return data;
};

export const createAmenityAPI = async (formData, token) => {
  const { data } = await axios.post(
    `${API_URL}/projectpage/create-amenity`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    },
  );
  return data;
};

export const updateAmenityAPI = async (id, formData, token) => {
  const { data } = await axios.put(
    `${API_URL}/projectpage/update-amenity/${id}`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    },
  );
  return data;
};

export const deleteAmenityAPI = async (id, token) => {
  const { data } = await axios.delete(
    `${API_URL}/projectpage/delete-amenity/${id}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    },
  );
  return data;
};

// About project
export const getAboutProjectsAPI = async () => {
  const { data } = await axios.get(`${API_URL}/projectpage/get-about-project`);
  return data;
};

export const createAboutProjectAPI = async (data, token) => {
  try {
    const res = await axios.post(
      `${API_URL}/projectpage/create-about-project`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      },
    );
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const updateAboutProjectAPI = async (id, data, token) => {
  const res = await axios.put(
    `${API_URL}/projectpage/update-about-project/${id}`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    },
  );
  return res.data;
};

export const deleteAboutProjectAPI = async (id, token) => {
  const { data } = await axios.delete(
    `${API_URL}/projectpage/delete-about-project/${id}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    },
  );
  return data;
};

//Project images
export const getProjectImagesAPI = async () => {
  const res = await axios.get(`${API_URL}/projectpage/get-all-project-images`);
  return res.data;
};

export const createProjectImagesAPI = async (formData, token) => {
  const res = await axios.post(
    `${API_URL}/projectpage/create-project-images`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    },
  );
  return res.data;
};

export const updateProjectImagesAPI = async (id, formData, token) => {
  const res = await axios.put(
    `${API_URL}/projectpage/edit-project-images/${id}`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    },
  );
  return res.data;
};

export const deleteProjectImagesAPI = async (id, token) => {
  const res = await axios.delete(
    `${API_URL}/projectpage/delete-project-images/${id}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    },
  );
  return res.data;
};

// AboutMain
export const createAboutMain = async (formData, token) => {
  const res = await axios.post(
    `${API_URL}/aboutuspage/create-aboutmain`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    },
  );
  return res.data;
};

export const getAllAboutMain = async () => {
  const res = await axios.get(`${API_URL}/aboutuspage/get-all-aboutmain`);
  return res.data;
};

export const updateAboutMain = async (id, formData, token) => {
  const res = await axios.put(
    `${API_URL}/aboutuspage/update-aboutmain/${id}`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    },
  );
  return res.data;
};

export const deleteAboutMain = async (id, token) => {
  const res = await axios.delete(
    `${API_URL}/aboutuspage/delete-aboutmain/${id}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    },
  );
  return res.data;
};

//Quotes
export const getAllQuotes = async () => {
  const res = await axios.get(`${API_URL}/aboutuspage/get-all-quotes`);
  return res.data;
};

export const createQuote = async (data, token) => {
  if (!token) throw new Error('No token provided');
  const res = await axios.post(`${API_URL}/aboutuspage/create-quote`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const updateQuote = async (id, data, token) => {
  const res = await axios.put(
    `${API_URL}/aboutuspage/update-quote/${id}`,
    data,
    {
      headers: { Authorization: `Bearer ${token}` },
    },
  );
  return res.data;
};

export const deleteQuote = async (id, token) => {
  const res = await axios.delete(`${API_URL}/aboutuspage/delete-quote/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

//Our team
export const createTeamMember = async (formData, token) => {
  const res = await axios.post(`${API_URL}/aboutuspage/create-team`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
  });
  return res.data;
};

export const getAllTeamMembers = async () => {
  const res = await axios.get(`${API_URL}/aboutuspage/get-all-team`);
  return res.data;
};

export const updateTeamMember = async (id, formData, token) => {
  const res = await axios.put(
    `${API_URL}/aboutuspage/update-team/${id}`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return res.data;
};

export const deleteTeamMember = async (id, token) => {
  const res = await axios.delete(`${API_URL}/aboutuspage/delete-team/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

// About images
export const getAboutImages = async () => {
  const res = await axios.get(`${API_URL}/aboutuspage/get-all-about-images`);
  return res.data;
};

export const createAboutImages = async (formData, token) => {
  const res = await axios.post(
    `${API_URL}/aboutuspage/create-about-images`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    },
  );
  return res.data;
};

export const updateAboutImages = async (id, formData, token) => {
  const res = await axios.put(
    `${API_URL}/aboutuspage/update-about-images/${id}`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    },
  );
  return res.data;
};

export const deleteAboutImages = async (id, token) => {
  const res = await axios.delete(
    `${API_URL}/aboutuspage/delete-about-images/${id}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    },
  );
  return res.data;
};

//Events
export const createEvent = async (formData, token) => {
  const res = await axios.post(`${API_URL}/eventspage/create-event`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
  });
  return res.data;
};

export const getAllEvents = async () => {
  const res = await axios.get(`${API_URL}/eventspage/get-all-events`);
  return res.data;
};

export const updateEvent = async (id, formData, token) => {
  const res = await axios.put(
    `${API_URL}/eventspage/update-event/${id}`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    },
  );
  return res.data;
};

export const deleteEvent = async (id, token) => {
  const res = await axios.delete(`${API_URL}/eventspage/delete-event/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

//Career main
export const createCareerMainAPI = async (formData, token) => {
  try {
    const { data } = await axios.post(
      `${API_URL}/careerspage/create-careermain`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return data;
  } catch (error) {
    throw error;
  }
};

export const getCareerMainAPI = async () => {
  try {
    const { data } = await axios.get(
      `${API_URL}/careerspage/get-all-careermain`,
    );
    return data;
  } catch (error) {
    throw error;
  }
};

export const updateCareerMainAPI = async (id, formData, token) => {
  try {
    const { data } = await axios.put(
      `${API_URL}/careerspage/update-careermain/${id}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      },
    );
    return data;
  } catch (error) {
    throw error;
  }
};

export const deleteCareerMainAPI = async (id, token) => {
  try {
    const { data } = await axios.delete(
      `${API_URL}/careerspage/delete-careermain/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return data;
  } catch (error) {
    throw error;
  }
};

//Why join
export const getWhyJoinAPI = async () => {
  try {
    const { data } = await axios.get(`${API_URL}/careerspage/get-all-whyjoin`);
    return data;
  } catch (error) {
    throw error;
  }
};

export const createWhyJoinAPI = async (formData, token) => {
  try {
    const { data } = await axios.post(
      `${API_URL}/careerspage/create-whyjoin`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      },
    );
    return data;
  } catch (error) {
    throw error;
  }
};

export const updateWhyJoinAPI = async (id, formData, token) => {
  try {
    const { data } = await axios.put(
      `${API_URL}/careerspage/update-whyjoin/${id}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      },
    );
    return data;
  } catch (error) {
    throw error;
  }
};

export const deleteWhyJoinAPI = async (id, token) => {
  try {
    const { data } = await axios.delete(
      `${API_URL}/careerspage/delete-whyjoin/${id}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );
    return data;
  } catch (error) {
    throw error;
  }
};

//Career images
export const getCareerImages = async () => {
  const res = await axios.get(`${API_URL}/careerspage/get-all-career-images`);
  return res.data;
};

export const createCareerImages = async (formData, token) => {
  const res = await axios.post(
    `${API_URL}/careerspage/create-career-images`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    },
  );
  return res.data;
};

export const updateCareerImages = async (id, formData, token) => {
  const res = await axios.put(
    `${API_URL}/careerspage/update-career-images/${id}`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    },
  );
  return res.data;
};

export const deleteCareerImages = async (id, token) => {
  const res = await axios.delete(
    `${API_URL}/careerspage/delete-career-images/${id}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    },
  );
  return res.data;
};

// Completed Project
export const createCompletedProject = async (formData, token) => {
  const res = await axios.post(
    `${API_URL}/completedproject/create-completeprjct`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    },
  );
  return res.data;
};

export const getAllCompletedProjects = async () => {
  const res = await axios.get(
    `${API_URL}/completedproject/get-all-completeprjcts`,
  );
  return res.data;
};

export const updateCompletedProject = async (id, formData, token) => {
  const res = await axios.put(
    `${API_URL}/completedproject/update-completeprjct/${id}`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    },
  );
  return res.data;
};

export const deleteCompletedProject = async (id, token) => {
  const res = await axios.delete(
    `${API_URL}/completedproject/delete-completeprjct/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return res.data;
};

// Our values
export const getAllOurValues = async () => {
  const res = await axios.get(`${API_URL}/completedproject/get-all-ourvalues`);
  return res.data;
};

export const createOurValue = async (formData, token) => {
  const res = await axios.post(
    `${API_URL}/completedproject/create-ourvalues`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    },
  );
  return res.data;
};

export const updateOurValue = async (id, formData, token) => {
  const res = await axios.put(
    `${API_URL}/completedproject/update-ourvalues/${id}`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    },
  );
  return res.data;
};

export const deleteOurValue = async (id, token) => {
  const res = await axios.delete(
    `${API_URL}/completedproject/delete-ourvalues/${id}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    },
  );
  return res.data;
};

// Projects List
export const getAllProjectsList = async () => {
  const res = await axios.get(
    `${API_URL}/completedproject/get-all-projectlists`,
  );
  return res.data;
};

export const createProjectList = async (formData, token) => {
  const res = await axios.post(
    `${API_URL}/completedproject/create-projectlist`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    },
  );
  return res.data;
};

export const updateProjectList = async (id, formData, token) => {
  const res = await axios.put(
    `${API_URL}/completedproject/update-projectlist/${id}`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    },
  );
  return res.data;
};

export const deleteProjectList = async (id, token) => {
  const res = await axios.delete(
    `${API_URL}/completedproject/delete-projectlist/${id}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    },
  );
  return res.data;
};

// Blogs main
export const createBlogMain = async (formData, token) => {
  const res = await axios.post(
    `${API_URL}/blogspage/create-blogmain`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    },
  );
  return res.data;
};

export const getAllBlogMain = async () => {
  const res = await axios.get(`${API_URL}/blogspage/get-all-blogmain`);
  return res.data;
};

export const updateBlogMain = async (id, formData, token) => {
  const res = await axios.put(
    `${API_URL}/blogspage/update-blogmain/${id}`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    },
  );
  return res.data;
};

export const deleteBlogMain = async (id, token) => {
  const res = await axios.delete(`${API_URL}/blogspage/delete-blogmain/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

//Top articles
export const createArticle = async (formData, token) => {
  const res = await axios.post(
    `${API_URL}/blogspage/create-article`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    },
  );
  return res.data;
};

export const getAllArticles = async () => {
  const res = await axios.get(`${API_URL}/blogspage/get-all-articles`);
  return res.data;
};

export const updateArticle = async (id, formData, token) => {
  const res = await axios.put(
    `${API_URL}/blogspage/update-article/${id}`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    },
  );
  return res.data;
};

export const deleteArticle = async (id, token) => {
  const res = await axios.delete(`${API_URL}/blogspage/delete-article/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

//Read more
export const getAllReadMore = async () => {
  const res = await axios.get(`${API_URL}/blogspage/get-all-readmore`);
  return res.data;
};

export const createReadMore = async (formData, token) => {
  const res = await axios.post(
    `${API_URL}/blogspage/create-readmore`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    },
  );
  return res.data;
};

export const updateReadMore = async (id, formData, token) => {
  const res = await axios.put(
    `${API_URL}/blogspage/update-readmore/${id}`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    },
  );
  return res.data;
};

export const deleteReadMore = async (id, token) => {
  const res = await axios.delete(`${API_URL}/blogspage/delete-readmore/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// Upcoming Project Main
export const createUpcomingProject = async (formData, token) => {
  const res = await axios.post(
    `${API_URL}/upcomingproject/create-upcomingprjct`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    },
  );
  return res.data;
};

export const getAllUpcomingProjects = async () => {
  const res = await axios.get(
    `${API_URL}/upcomingproject/get-all-upcomingprjcts`,
  );
  return res.data;
};

export const updateUpcomingProject = async (id, formData, token) => {
  const res = await axios.put(
    `${API_URL}/upcomingproject/update-upcomingprjct/${id}`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    },
  );
  return res.data;
};

export const deleteUpcomingProject = async (id, token) => {
  const res = await axios.delete(
    `${API_URL}/upcomingproject/delete-upcomingprjct/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return res.data;
};

// Upcoming Projects List
export const getAllUpcomingProjectsList = async () => {
  const res = await axios.get(
    `${API_URL}/upcomingproject/get-all-upcoming-projectlists`,
  );
  return res.data;
};

export const createUpcomingProjectList = async (formData, token) => {
  const res = await axios.post(
    `${API_URL}/upcomingproject/create-upcoming-projectlist`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    },
  );
  return res.data;
};

export const updateUpcomingProjectList = async (id, formData, token) => {
  const res = await axios.put(
    `${API_URL}/upcomingproject/update-upcoming-projectlist/${id}`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    },
  );
  return res.data;
};

export const deleteUpcomingProjectList = async (id, token) => {
  const res = await axios.delete(
    `${API_URL}/upcomingproject/delete-upcoming-projectlist/${id}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    },
  );
  return res.data;
};

// Ongoing Project Main
export const createOngoingProject = async (formData, token) => {
  const res = await axios.post(
    `${API_URL}/ongoingproject/create-ongoingprjct`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    },
  );
  return res.data;
};

export const getAllOngoingProjects = async () => {
  const res = await axios.get(
    `${API_URL}/ongoingproject/get-all-ongoingprjcts`,
  );
  return res.data;
};

export const updateOngoingProject = async (id, formData, token) => {
  const res = await axios.put(
    `${API_URL}/ongoingproject/update-ongoingprjct/${id}`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    },
  );
  return res.data;
};

export const deleteOngoingProject = async (id, token) => {
  const res = await axios.delete(
    `${API_URL}/ongoingproject/delete-ongoingprjct/${id}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    },
  );
  return res.data;
};

// Ongoing projects list
export const getAllOngoingProjectsList = async () => {
  const res = await axios.get(
    `${API_URL}/ongoingproject/get-all-ongoing-projectlists`,
  );
  return res.data;
};

export const createOngoingProjectList = async (formData, token) => {
  const res = await axios.post(
    `${API_URL}/ongoingproject/create-ongoing-projectlist`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    },
  );
  return res.data;
};

export const updateOngoingProjectList = async (id, formData, token) => {
  const res = await axios.put(
    `${API_URL}/ongoingproject/update-ongoing-projectlist/${id}`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    },
  );
  return res.data;
};

export const deleteOngoingProjectList = async (id, token) => {
  const res = await axios.delete(
    `${API_URL}/ongoingproject/delete-ongoing-projectlist/${id}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    },
  );
  return res.data;
};

// Quote description
export const getQuotesAPI = async () => {
  const res = await axios.get(`${API_URL}/homepage/get-all-quotes`);
  return res.data;
};

export const createQuoteAPI = async (data, token) => {
  const res = await axios.post(`${API_URL}/homepage/create-quote`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const updateQuoteAPI = async (id, data, token) => {
  const res = await axios.put(`${API_URL}/homepage/update-quote/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const deleteQuoteAPI = async (id, token) => {
  const res = await axios.delete(`${API_URL}/homepage/delete-quote/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// Value images
export const getValueImages = async () => {
  const res = await axios.get(`${API_URL}/completedproject/get-value-images`);
  return res.data;
};

export const createValueImage = async (formData, token) => {
  const res = await axios.post(
    `${API_URL}/completedproject/create-value-image`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    },
  );
  return res.data;
};

export const editValueImage = async (id, formData, token) => {
  const res = await axios.put(
    `${API_URL}/completedproject/update-value-image/${id}`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    },
  );
  return res.data;
};

export const deleteValueImage = async (id, token) => {
  const res = await axios.delete(
    `${API_URL}/completedproject/delete-value-image/${id}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    },
  );
  return res.data;
};

//Tree
export const getTreeSections = async () => {
  const res = await axios.get(`${API_URL}/homepage/get-all-tree`);
  return res.data;
};

export const createTreeSection = async (formData, token) => {
  const res = await axios.post(`${API_URL}/homepage/create-tree`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
  });
  return res.data;
};

export const editTreeSection = async (id, formData, token) => {
  const res = await axios.put(
    `${API_URL}/homepage/update-tree/${id}`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    },
  );
  return res.data;
};

export const deleteTreeSection = async (id, token) => {
  const res = await axios.delete(`${API_URL}/homepage/delete-tree/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// Enquiry

export const createEnquiry = async (payload) => {
  const res = await axios.post(`${API_URL}/homepage/create-enquiry`, payload);
  return res.data;
};

export const getAllEnquiries = async () => {
  const res = await axios.get(`${API_URL}/homepage/all-enquiry`);
  return res.data;
};

export const deleteEnquiry = async (id, token) => {
  const res = await axios.delete(`${API_URL}/homepage/delete-enquiry/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// career enquiries
export const createCareerEnquiry = async (payload) => {
  const res = await axios.post(
    `${API_URL}/careerspage/create-career-enquiry`,
    payload,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  );

  return res.data;
};

export const getAllCareerEnquiries = async () => {
  const res = await axios.get(`${API_URL}/careerspage/all-career-enquiry`);
  return res.data;
};

export const deleteCareerEnquiry = async (id) => {
  const res = await axios.delete(
    `${API_URL}/careerspage/delete-career-enquiry/${id}`,
  );
  return res.data;
};

// projects
export const createProjects = async (formData, token) => {
  const res = await axios.post(`${API_URL}/projects/create-project`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
  });
  return res.data;
};

export const getSingleProject = async (projectId) => {
  const res = await axios.get(`${API_URL}/projects/get-project/${projectId}`);
  return res.data;
};

export const getAllProjects = async () => {
  const res = await axios.get(`${API_URL}/projects/get-all-projects`);
  return res.data.projects;
};

export const updateProjects = async (id, formData, token) => {
  const res = await axios.put(
    `${API_URL}/projects/update-project/${id}`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    },
  );
  return res.data;
};

export const deleteProjects = async (id, token) => {
  const res = await axios.delete(`${API_URL}/projects/delete-project/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};
export const updateProjectVisibility = async (id, data, token) => {
  const res = await axios.patch(
    `${API_URL}/projects/update-visibility/${id}`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return res.data;
};

// Categories
export const createCategory = async (data, token) => {
  const res = await axios.post(`${API_URL}/categories/create-category`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const getAllCategories = async () => {
  const res = await axios.get(`${API_URL}/categories/get-all-categories`);
  return res.data;
};

export const deleteCategory = async (id, token) => {
  const res = await axios.delete(
    `${API_URL}/categories/delete-category/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return res.data;
};

// job roles
export const getCareerRoles = async () => {
  const res = await axios.get(`${API_URL}/careerspage/get-roles`);
  return res.data;
};

export const createCareerRole = async (payload) => {
  const res = await axios.post(`${API_URL}/careerspage/create-role`, payload);
  return res.data;
};

export const deleteCareerRole = async (id) => {
  const res = await axios.delete(`${API_URL}/careerspage/delete-role/${id}`);
  return res.data;
};

//Create or update event page
export const createOrUpdateEventTop = async (formData, token) => {
  const res = await axios.post(
    `${API_URL}/eventspage/update-event-page`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    },
  );
  return res.data;
};

export const getEventTop = async () => {
  const res = await axios.get(`${API_URL}/eventspage/get-event-page`);
  return res.data;
};

export const createEventEnquiry = async (payload) => {
  const res = await axios.post(
    `${API_URL}/eventspage/create-event-enquiry`,
    payload,
  );

  return res.data;
};

export const getAllEventEnquiries = async () => {
  const res = await axios.get(`${API_URL}/eventspage/all-event-enquiry`);
  return res.data;
};

export const deleteEventEnquiry = async (id) => {
  const res = await axios.delete(
    `${API_URL}/eventspage/delete-event-enquiry/${id}`,
  );
  return res.data;
};

export const getBrandEthos = async (token) => {
  const res = await axios.get(`${API_URL}/homepage/get-all-brand-ethos`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const createBrandEthos = async (formData, token) => {
  const res = await axios.post(
    `${API_URL}/homepage/create-brand-ethos`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    },
  );
  return res.data;
};

export const updateBrandEthos = async (id, formData, token) => {
  const res = await axios.put(
    `${API_URL}/homepage/update-brand-ethos/${id}`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    },
  );
  return res.data;
};

export const deleteBrandEthos = async (id, token) => {
  const res = await axios.delete(
    `${API_URL}/homepage/delete-brand-ethos/${id}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    },
  );
  return res.data;
};

export const getBrandMotive = async (token) => {
  const res = await axios.get(`${API_URL}/homepage/get-all-brand-motive`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const createBrandMotive = async (data, token) => {
  const res = await axios.post(
    `${API_URL}/homepage/create-brand-motive`,
    data,
    {
      headers: { Authorization: `Bearer ${token}` },
    },
  );
  return res.data;
};

export const updateBrandMotive = async (id, data, token) => {
  const res = await axios.put(
    `${API_URL}/homepage/update-brand-motive/${id}`,
    data,
    {
      headers: { Authorization: `Bearer ${token}` },
    },
  );
  return res.data;
};

export const deleteBrandMotive = async (id, token) => {
  const res = await axios.delete(
    `${API_URL}/homepage/delete-brand-motive/${id}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    },
  );
  return res.data;
};

// Contact
export const createContactMain = async (formData, token) => {
  const res = await axios.post(
    `${API_URL}/contactpage/create-contactmain`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    },
  );
  return res.data;
};

export const getContactMain = async () => {
  const res = await axios.get(`${API_URL}/contactpage/get-contactmain`);
  return res.data;
};

export const updateContactMain = async (formData, token) => {
  const res = await axios.put(
    `${API_URL}/contactpage/update-contactmain`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    },
  );
  return res.data;
};

export const deleteContactMain = async (token) => {
  const res = await axios.delete(`${API_URL}/contactpage/delete-contactmain`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// Location
export const createLocation = async (data, token) => {
  const res = await axios.post(`${API_URL}/contactpage/create-location`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const getAllLocations = async () => {
  const res = await axios.get(`${API_URL}/contactpage/get-all-locations`);
  return res.data;
};

export const updateLocation = async (id, data, token) => {
  const res = await axios.put(
    `${API_URL}/contactpage/update-location/${id}`,
    data,
    {
      headers: { Authorization: `Bearer ${token}` },
    },
  );
  return res.data;
};

export const deleteLocation = async (id, token) => {
  const res = await axios.delete(
    `${API_URL}/contactpage/delete-location/${id}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    },
  );
  return res.data;
};

export const createContactEnquiry = async (payload) => {
  const res = await axios.post(
    `${API_URL}/contactpage/create-contact-enquiry`,
    payload,
  );
  return res.data;
};

export const getAllContactEnquiries = async (token) => {
  const res = await axios.get(`${API_URL}/contactpage/all-contact-enquiry`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const deleteContactEnquiry = async (id, token) => {
  const res = await axios.delete(
    `${API_URL}/contactpage/delete-contact-enquiry/${id}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    },
  );
  return res.data;
};

// Testimonials

export const getTestimonialsAPI = async () => {
  try {
    const { data } = await axios.get(
      `${API_URL}/homepage/get-all-testimonials`,
    );
    return data;
  } catch (error) {
    throw error;
  }
};

export const createTestimonialAPI = async (formData, token) => {
  try {
    const { data } = await axios.post(
      `${API_URL}/homepage/create-testimonial`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      },
    );
    return data;
  } catch (error) {
    throw error;
  }
};

export const updateTestimonialAPI = async (id, formData, token) => {
  try {
    const { data } = await axios.put(
      `${API_URL}/homepage/update-testimonial/${id}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      },
    );
    return data;
  } catch (error) {
    throw error;
  }
};

export const deleteTestimonialAPI = async (id, token) => {
  try {
    const { data } = await axios.delete(
      `${API_URL}/homepage/delete-testimonial/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return data;
  } catch (error) {
    throw error;
  }
};

export const getAwardRecognition = async (token) => {
  const res = await axios.get(`${API_URL}/homepage/get-all-award-recognition`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const createAwardRecognition = async (formData, token) => {
  const res = await axios.post(
    `${API_URL}/homepage/create-award-recognition`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    },
  );
  return res.data;
};

export const updateAwardRecognition = async (id, formData, token) => {
  const res = await axios.put(
    `${API_URL}/homepage/update-award-recognition/${id}`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    },
  );
  return res.data;
};

export const deleteAwardRecognition = async (id, token) => {
  const res = await axios.delete(
    `${API_URL}/homepage/delete-award-recognition/${id}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    },
  );
  return res.data;
};
