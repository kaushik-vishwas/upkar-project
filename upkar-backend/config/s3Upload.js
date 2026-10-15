import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import crypto from 'crypto';
import dotenv from 'dotenv';

dotenv.config();

let s3Client;

function getS3Client() {
  if (s3Client) return s3Client;

  const config = {
    region: process.env.AWS_REGION,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
  };

  // Optional endpoint lets uploads move to any S3-compatible store later.
  if (process.env.AWS_S3_ENDPOINT) {
    config.endpoint = process.env.AWS_S3_ENDPOINT;
    config.forcePathStyle = process.env.AWS_S3_FORCE_PATH_STYLE !== 'false';
  }

  s3Client = new S3Client(config);
  return s3Client;
}

function assertS3Config() {
  const missing = [
    'AWS_ACCESS_KEY_ID',
    'AWS_SECRET_ACCESS_KEY',
    'AWS_REGION',
    'AWS_S3_BUCKET',
  ].filter((key) => !process.env[key]);

  if (missing.length) {
    throw new Error(`Missing S3 configuration: ${missing.join(', ')}`);
  }
}

function detectFile(buffer, resourceType) {
  const bytes = buffer || Buffer.alloc(0);

  if (bytes.length >= 3 && bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff) {
    return { contentType: 'image/jpeg', ext: 'jpg' };
  }
  if (
    bytes.length >= 8 &&
    bytes[0] === 0x89 &&
    bytes[1] === 0x50 &&
    bytes[2] === 0x4e &&
    bytes[3] === 0x47
  ) {
    return { contentType: 'image/png', ext: 'png' };
  }
  if (bytes.length >= 6 && bytes.toString('ascii', 0, 6) === 'GIF87a') {
    return { contentType: 'image/gif', ext: 'gif' };
  }
  if (bytes.length >= 6 && bytes.toString('ascii', 0, 6) === 'GIF89a') {
    return { contentType: 'image/gif', ext: 'gif' };
  }
  if (
    bytes.length >= 12 &&
    bytes.toString('ascii', 0, 4) === 'RIFF' &&
    bytes.toString('ascii', 8, 12) === 'WEBP'
  ) {
    return { contentType: 'image/webp', ext: 'webp' };
  }
  if (bytes.length >= 4 && bytes.toString('ascii', 0, 4) === '%PDF') {
    return { contentType: 'application/pdf', ext: 'pdf' };
  }
  if (
    bytes.length >= 8 &&
    bytes[0] === 0xd0 &&
    bytes[1] === 0xcf &&
    bytes[2] === 0x11 &&
    bytes[3] === 0xe0
  ) {
    return { contentType: 'application/msword', ext: 'doc' };
  }
  if (bytes.length >= 4 && bytes[0] === 0x50 && bytes[1] === 0x4b) {
    return {
      contentType:
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      ext: 'docx',
    };
  }

  if (resourceType === 'image') {
    return { contentType: 'image/jpeg', ext: 'jpg' };
  }

  return { contentType: 'application/octet-stream', ext: 'bin' };
}

function publicUrl(key) {
  const encodedKey = key
    .split('/')
    .map((part) => encodeURIComponent(part))
    .join('/');

  if (process.env.S3_PUBLIC_BASE_URL) {
    return `${process.env.S3_PUBLIC_BASE_URL.replace(/\/$/, '')}/${encodedKey}`;
  }

  if (process.env.AWS_S3_ENDPOINT) {
    return `${process.env.AWS_S3_ENDPOINT.replace(/\/$/, '')}/${process.env.AWS_S3_BUCKET}/${encodedKey}`;
  }

  return `https://${process.env.AWS_S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${encodedKey}`;
}

export const uploadBufferToS3 = async (fileBuffer, folder, resourceType = 'image') => {
  assertS3Config();

  if (!fileBuffer || !fileBuffer.length) {
    throw new Error('Cannot upload an empty file');
  }

  const { contentType, ext } = detectFile(fileBuffer, resourceType);
  const safeFolder = String(folder || 'uploads')
    .replace(/\\/g, '/')
    .replace(/^\/+|\/+$/g, '')
    .replace(/\.\./g, '');
  const key = `${safeFolder}/${Date.now()}-${crypto.randomBytes(8).toString('hex')}.${ext}`;

  const params = {
    Bucket: process.env.AWS_S3_BUCKET,
    Key: key,
    Body: fileBuffer,
    ContentType: contentType,
  };

  if (process.env.S3_OBJECT_ACL) {
    params.ACL = process.env.S3_OBJECT_ACL;
  }

  await getS3Client().send(new PutObjectCommand(params));

  const url = publicUrl(key);

  // Same fields controllers already read from Cloudinary responses.
  return {
    secure_url: url,
    url,
    public_id: key,
    key,
    resource_type: resourceType,
    content_type: contentType,
  };
};
