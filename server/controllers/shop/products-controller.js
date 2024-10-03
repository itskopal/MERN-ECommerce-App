const Product = require("../../models/Product");
const User = require("../../models/User");

const getFilteredProducts = async (req, res) => {
  try {
    const { category = [], brand = [], sortBy = "price-lowtohigh" } = req.query;

    let filters = {};

    if (category.length) {
      filters.category = { $in: category.split(",") };
    }

    if (brand.length) {
      filters.brand = { $in: brand.split(",") };
    }

    let sort = {};

    switch (sortBy) {
      case "price-lowtohigh":
        sort.price = 1;

        break;
      case "price-hightolow":
        sort.price = -1;

        break;
      case "title-atoz":
        sort.title = 1;

        break;

      case "title-ztoa":
        sort.title = -1;

        break;

      default:
        sort.price = 1;
        break;
    }

    const products = await Product.find(filters).sort(sort);
    //const products = await Product.find({});

    res.status(200).json({
      success: true,
      data: products,
    });
  } catch (e) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Some error occured",
    });
  }
};

const getProductDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);

    if (!product)
      return res.status(404).json({
        success: false,
        message: "Product not found!",
      });

    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (e) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Some error occured",
    });
  }
};

// const updateProductWishlist = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { wishlist } = req.body;
//     let findProduct = await Product.findById(id);

//     if (!findProduct)
//       return res.status(404).json({
//         success: false,
//         message: "Product not found",
//       });

//     findProduct.wishlist = wishlist;

//     await findProduct.save();
//     res.status(200).json({
//       success: true,
//       data: findProduct,
//       message: "Wishlist updated successfully",
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({
//       success: false,
//       message: "Error occured",
//     });
//   }
// };

// Add or remove product from wishlist
const updateProductWishlist = async (req, res) => {
  try {
    const { userId, productId } = req.params;

    // Validate input
    if (!userId || !productId) {
      return res.status(400).json({
        success: false,
        message: "User ID and Product ID are required",
      });
    }

    // Find the user and the product
    const user = await User.findById(userId);
    const product = await Product.findById(productId);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    const isWishlisted = user.wishlist.includes(productId);

    // Toggle wishlist status
    if (isWishlisted) {
      user.wishlist = user.wishlist.filter((id) => id.toString() !== productId);
      message = "Product removed from wishlist";
    } else {
      user.wishlist.push(productId);
      message = "Product added to wishlist";
    }

    await user.save();
    return res
      .status(200)
      .json({ success: true, wishlist: user.wishlist, message });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

// Fetch wishlist products for a user
const getWishlistProducts = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId).populate("wishlist");
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    return res.status(200).json({ success: true, wishlist: user.wishlist });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

module.exports = {
  getFilteredProducts,
  getProductDetails,
  updateProductWishlist,
  getWishlistProducts,
};
