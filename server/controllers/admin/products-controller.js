//const { imageUploadUtil } = require("../../helpers/cloudinary");
const cloudinary = require("cloudinary").v2;
const { imageUploadUtil } = require("../../middleware/multer");
const Product = require("../../models/Product");

//handle single image upload
const handleImageUpload = async (req, res) => {
  try {
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    const url = "data:" + req.file.mimetype + ";base64," + b64;
    const result = await imageUploadUtil(url);

    res.json({
      success: true,
      result,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Error occured",
    });
  }
};

//add a new product with single image
// const addProduct = async (req, res) => {
//   try {
//     const {
//       image,
//       title,
//       description,
//       category,
//       brand,
//       price,
//       salePrice,
//       totalStock,
//       averageReview,
//     } = req.body;

//     console.log(averageReview, "averageReview");

//     const newlyCreatedProduct = new Product({
//       image,
//       title,
//       description,
//       category,
//       brand,
//       price,
//       salePrice,
//       totalStock,
//       averageReview,
//     });

//     await newlyCreatedProduct.save();
//     res.status(201).json({
//       success: true,
//       data: newlyCreatedProduct,
//     });
//   } catch (e) {
//     console.log(e);
//     res.status(500).json({
//       success: false,
//       message: "Error occured",
//     });
//   }
// };

//handle multiple image upload
// const handleMultipleImageUploads = async (req, res) => {
//   try {

//     const imageUrls = [];

//     for (const file of req.files) {
//       const b64 = Buffer.from(file.buffer).toString("base64");
//       const url = "data:" + file.mimetype + ";base64," + b64;
//       const result = await imageUploadUtil(url);
//       imageUrls.push(result.secure_url); // Push each image URL to the array
//     }

//     res.json({
//       success: true,
//       imageUrls,
//     });
//   } catch (error) {
//     console.log(error);
//     res.json({
//       success: false,
//       message: "Error occurred",
//     });
//   }
// };

//add a new product with multiple image
// const addProduct = async (req, res) => {
//   try {

//     const {
//       title,
//       description,
//       category,
//       brand,
//       price,
//       salePrice,
//       totalStock,
//       averageReview,
//     } = req.body;

//     // Assuming req.files contains multiple uploaded images
//     const images = [];
//     for (const file of req.files) {
//       const b64 = Buffer.from(file.buffer).toString("base64");
//       const url = "data:" + file.mimetype + ";base64," + b64;
//       const result = await imageUploadUtil(url);
//       images.push(result.secure_url); // Collecting image URLs
//     }

//     const newlyCreatedProduct = new Product({
//       images, // Storing the array of image URLs
//       title,
//       description,
//       category,
//       brand,
//       price,
//       salePrice,
//       totalStock,
//       averageReview,
//     });

//     await newlyCreatedProduct.save();
//     res.status(201).json({
//       success: true,
//       data: newlyCreatedProduct,
//     });
//   } catch (e) {
//     console.log(e);
//     res.status(500).json({
//       success: false,
//       message: "Error occurred",
//     });
//   }
// };

// 2nd appproach
const addProduct = async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock,
      averageReview,
    } = req.body;

    // Logging req.files to debug the upload process
    //console.log(req.files);

    const image1 = req.files.image1 && req.files?.image1?.[0];
    const image2 = req.files.image2 && req.files?.image2?.[0];
    const image3 = req.files.image3 && req.files?.image3?.[0];
    const image4 = req.files.image4 && req.files?.image4?.[0];
    const image5 = req.files.image5 && req.files?.image5?.[0];

    const images = [image1, image2, image3, image4, image5].filter(
      (item) => item !== undefined
    );

    //if using disk storage
    // let imagesUrl = await Promise.all(
    //   images.map(async (item) => {
    //     let result = await cloudinary.uploader.upload(item.path, {
    //       resource_type: "image",
    //     });
    //     return result.secure_url;
    //   })
    // );

    // Helper function to upload buffer to Cloudinary {if using memorystorage}
    const uploadImageToCloudinary = (file) => {
      return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { resource_type: "image" },
          (error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve(result.secure_url);
            }
          }
        );
        uploadStream.end(file.buffer); // Pass the file buffer to Cloudinary
      });
    };

    // Upload all images and get URLs
    let imagesUrl = await Promise.all(
      images.map(async (item) => {
        return await uploadImageToCloudinary(item);
      })
    );

    // console.log(images);
    // console.log(imagesUrl);

    const newlyCreatedProduct = new Product({
      images: imagesUrl,
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock,
      averageReview,
    });

    await newlyCreatedProduct.save();
    res.status(201).json({
      success: true,
      data: newlyCreatedProduct,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error occurred",
    });
  }
};

//fetch all products
const fetchAllProducts = async (req, res) => {
  try {
    const listOfProducts = await Product.find({});
    res.status(200).json({
      success: true,
      data: listOfProducts,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error occured",
    });
  }
};

//edit a product
const editProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      images,
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock,
      averageReview,
    } = req.body;

    let findProduct = await Product.findById(id);

    if (!findProduct)
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });

    findProduct.title = title || findProduct.title;
    findProduct.description = description || findProduct.description;
    findProduct.category = category || findProduct.category;
    findProduct.brand = brand || findProduct.brand;
    findProduct.price = price === "" ? 0 : price || findProduct.price;
    findProduct.salePrice =
      salePrice === "" ? 0 : salePrice || findProduct.salePrice;
    findProduct.totalStock = totalStock || findProduct.totalStock;
    findProduct.images = images || findProduct.images;
    findProduct.averageReview = averageReview || findProduct.averageReview;

    await findProduct.save();
    res.status(200).json({
      success: true,
      data: findProduct,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error occured",
    });
  }
};

//delete a product
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);

    if (!product)
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });

    res.status(200).json({
      success: true,
      message: "Product delete successfully",
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error occured",
    });
  }
};

module.exports = {
  handleImageUpload,
  //handleMultipleImageUploads,
  addProduct,
  fetchAllProducts,
  editProduct,
  deleteProduct,
};
