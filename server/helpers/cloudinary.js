const cloudinary = require("cloudinary").v2;
const multer = require("multer");

// cloudinary.config({
//   cloud_name: "codewithkopal",
//   api_key: "896235533169729",
//   api_secret: "vzF8b8wpC_G3bE0J4f82czWWRAQ",
// });

// const storage = new multer.memoryStorage();

// async function imageUploadUtil(file) {
//   const result = await cloudinary.uploader.upload(file, {
//     resource_type: "auto",
//   });

//   return result;
// }

// const upload = multer({ storage });

//module.exports = { upload, imageUploadUtil };

// // 2nd approach

const connectCloudinary = async () => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
};

module.exports = { connectCloudinary };
