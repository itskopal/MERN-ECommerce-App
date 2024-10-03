const express = require("express");

const {
  getFilteredProducts,
  getProductDetails,
  updateProductWishlist,
  getWishlistProducts,
} = require("../../controllers/shop/products-controller");

const router = express.Router();

router.get("/get", getFilteredProducts);
router.get("/get/:id", getProductDetails);
router.put("/wishlist/:userId/:productId", updateProductWishlist);
router.get("/wishlist/:userId", getWishlistProducts);

module.exports = router;
