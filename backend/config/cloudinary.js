const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'patho_news', // You can change folder name
    allowed_formats: ['jpg', 'png', 'jpeg'],
    transformation: [{ width: 800, height: 600, crop: 'limit' }],
  },
});

// PDF storage
const pdfStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'patho_pdfs',
    resource_type: 'raw', // 👈 Important
    allowed_formats: ['pdf'],
  },
});

module.exports = { cloudinary, storage ,pdfStorage};
