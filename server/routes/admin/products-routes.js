const express = require("express");

const {
  //handleImageUpload,
  addProduct,
  fetchAllProducts,
  editProduct,
  deleteProduct,
} = require("../../controllers/admin/products-controller");
const upload = require("../../middleware/multer");

//const { upload } = require("../../helpers/cloudinary");

const router = express.Router();

router.post(
  "/add",
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 },
    { name: "image5", maxCount: 1 },
  ]),
  addProduct
);

router.put("/edit/:id", editProduct);
router.delete("/delete/:id", deleteProduct);
router.get("/get", fetchAllProducts);

module.exports = router;

//router.post("/upload-image", upload.single("my_file"), handleImageUpload);
//router.post("/add", addProduct);

// Handle multiple image uploads (up to 5 images)
// router.post(
//   "/upload-images",
//   upload.array("my_files", 5),
//   handleMultipleImageUploads
// );

// Add product with multiple images
// router.post(
//   "/add",
//   upload.array("my_files", 5),
//   addProduct
// );
