const multer = require("multer");

const storage = multer.diskStorage({
  filename: function (req, file, callback) {
    callback(null, file.originalname);
  },
});

// const storage = multer.diskStorage({
//   destination: function (req, file, callback) {
//     callback(null, "uploads/"); // Set your uploads folder
//   },
//   filename: function (req, file, callback) {
//     callback(null, Date.now() + "-" + file.originalname);
//   },
// });

const upload = multer({ storage });

module.exports = upload;
