// import cron from 'node-cron';
// import axios from 'axios';

// export const startRenderSelfPing = () => {
//   const BACKEND_URL = 'https://upkar.delicod.com';

//   console.log(' Render self-ping service initialized...');

//   // Ping every 15 minutes
//   cron.schedule('*/15 * * * *', async () => {
//     try {
//       const res = await axios.get(`${BACKEND_URL}/health`);
//       console.log(' Self-ping successful:', res.data?.message || 'OK');
//     } catch (err) {
//       console.error(' Self-ping failed:', err.message);
//     }
//   });
// };
