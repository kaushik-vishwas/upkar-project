import dotenv from 'dotenv';
import { uploadBufferToS3 } from './s3Upload.js';

dotenv.config();

const provider = (process.env.STORAGE_PROVIDER || 's3').toLowerCase();

const uploadViaCloudinary = async (fileBuffer, folder, resourceType) => {
  const [{ default: cloudinary }, { default: streamifier }] = await Promise.all([
    import('./cloudinaryConfig.js'),
    import('streamifier'),
  ]);

  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: resourceType,
      },
      (error, result) => {
        if (result) resolve(result);
        else reject(error);
      },
    );

    streamifier.createReadStream(fileBuffer).pipe(stream);
  });
};

export const uploadImageToCloudinary = (fileBuffer, folder) => {
  if (provider === 'cloudinary') {
    return uploadViaCloudinary(fileBuffer, folder, 'image');
  }

  return uploadBufferToS3(fileBuffer, folder, 'image');
};

export const uploadRawToCloudinary = (fileBuffer, folder) => {
  if (provider === 'cloudinary') {
    return uploadViaCloudinary(fileBuffer, folder, 'raw');
  }

  return uploadBufferToS3(fileBuffer, folder, 'raw');
};
