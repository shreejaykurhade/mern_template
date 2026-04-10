const multer = require('multer');
const path = require('path');
const ApiError = require('../utils/ApiError');

/**
 * Multer configuration for file uploads.
 * Files are stored in memory for further processing (e.g., Cloudinary upload).
 */
const storage = multer.memoryStorage();

const fileFilter = (_req, file, cb) => {
  const allowedMimeTypes = [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/gif',
    'image/webp',
  ];

  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new ApiError(
        400,
        `Invalid file type: ${path.extname(file.originalname)}. Only JPEG, PNG, GIF, and WebP are allowed.`,
      ),
      false,
    );
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB max
    files: 5, // max 5 files per request
  },
});

module.exports = upload;
