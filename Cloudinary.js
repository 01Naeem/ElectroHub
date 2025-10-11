const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

// 🔐 Configure Cloudinary with your credentials
cloudinary.config({
  cloud_name: 'dwwmqpgrm',
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});


module.exports = cloudinary;