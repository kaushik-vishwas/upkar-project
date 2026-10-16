
import dns from 'node:dns';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

// Use public DNS resolvers for MongoDB Atlas SRV lookups.
dns.setServers(['8.8.8.8', '1.1.1.1']);

dotenv.config();

import adminRoutes from './routes/adminRoutes.js';
import homepageRoutes from './routes/homePage/homepageRouter.js';
import projectpageRoutes from './routes/projectPage/projectpageRouter.js';
import aboutusRoutes from './routes/aboutUs/aboutusRouter.js';
import eventsRoutes from './routes/Events/eventspageRouter.js';
import careersRoutes from './routes/careersPage/careersRouter.js';
import completedprojectRoutes from './routes/completedProject/completedprjctpageRouter.js';
import upcomingprojectRoutes from './routes/upcomingProject/upcomingprjctpageRouter.js';
import ongoingprojectRoutes from './routes/ongoingProject/ongoingprjctpageRouter.js';
import blogsRoutes from './routes/BlogPage/blogsRouter.js';
import projectsRoutes from './routes/projects/projectRoutes.js';
import categoriesRoutes from './routes/categories/categoriesRouter.js';
import contactRoutes from './routes/contactPage/contactRouter.js';
import { createAdminOnce } from './controllers/adminController.js';
import emailRoute from './routes/sendInvestmentEmail.js';
import contactRoute from './routes/sendContactEmail.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Allowed frontend origins.
const allowedOrigins = [
  'http://localhost:5173',
  'https://upkar-frontend.vercel.app',
  'https://upkar-group.vercel.app',
  'https://upkar.vercel.app',
  'https://upkardevelopers.com',
  'https://www.upkardevelopers.com',
  'https://upkardevelopers.co.in',
  'https://www.upkardevelopers.co.in',
  'https://upkardevelopers.com/admin-login'
];

// CORS middleware must run before API routes.
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }),
);

app.use(express.json());

// Health check
app.get('/health', (req, res) => {
  res.json({ message: 'Server is alive' });
});

// API routes
app.use('/api/admin', adminRoutes);
app.use('/api/homepage', homepageRoutes);
app.use('/api/projectpage', projectpageRoutes);
app.use('/api/aboutuspage', aboutusRoutes);
app.use('/api/eventspage', eventsRoutes);
app.use('/api/careerspage', careersRoutes);
app.use('/api/completedproject', completedprojectRoutes);
app.use('/api/upcomingproject', upcomingprojectRoutes);
app.use('/api/ongoingproject', ongoingprojectRoutes);
app.use('/api/blogspage', blogsRoutes);
app.use('/api/projects', projectsRoutes);
app.use('/api/contactpage', contactRoutes);
app.use('/api/categories', categoriesRoutes);
app.use('/api', emailRoute);
app.use('/api/contact', contactRoute);

// MongoDB connection and initial admin setup
mongoose
  .connect(process.env.MONGO_URI, {
    serverSelectionTimeoutMS: 30000,
  })
  .then(async () => {
    console.log('MongoDB Connected');

    try {
      await createAdminOnce();
    } catch (err) {
      console.error('Admin setup error:', err.message);
    }
  })
  .catch((err) => {
    console.error('MongoDB Connection Error:', err.message);
  });

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
