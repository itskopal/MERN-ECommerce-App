const express = require("express");

const {
  getFilteredProducts,
  getProductDetails,
  updateProductWishlist,
  getAllWishlistProduct,
} = require("../../controllers/shop/products-controller");

const router = express.Router();

router.get("/get", getFilteredProducts);
router.get("/get/:id", getProductDetails);
router.put("/update/:id", updateProductWishlist);
router.get("/fetchwishlist", getAllWishlistProduct);

module.exports = router;
