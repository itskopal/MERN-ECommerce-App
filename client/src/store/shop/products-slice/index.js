import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  productList: [],
  productDetails: null,
  userWishlist: [],
};

export const fetchAllFilteredProducts = createAsyncThunk(
  "/products/fetchAllProducts",
  async ({ filterParams, sortParams }) => {
    console.log(fetchAllFilteredProducts, "fetchAllFilteredProducts");

    const query = new URLSearchParams({
      ...filterParams,
      sortBy: sortParams,
    });

    const result = await axios.get(
      `http://localhost:5000/api/shop/products/get?${query}`
      //"http://localhost:5000/api/shop/products/get"
    );

    console.log(result);

    return result?.data;
  }
);

export const fetchProductDetails = createAsyncThunk(
  "/products/fetchProductDetails",
  async (id) => {
    const result = await axios.get(
      `http://localhost:5000/api/shop/products/get/${id}`
    );

    return result?.data;
  }
);

export const updateProductWishlist = createAsyncThunk(
  "/products/updateProductWishlist",
  async ({ userId, productId, wishlist }) => {
    const result = await axios.put(
      `http://localhost:5000/api/shop/products/wishlist/${userId}/${productId}`,
      { wishlist },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return result?.data;
  }
);

export const getAllWishlistProduct = createAsyncThunk(
  "/products/getAllWishlistProduct",
  async (userId) => {
    const result = await axios.get(
      `http://localhost:5000/api/shop/products/wishlist/${userId}`
    );

    return result?.data;
  }
);

const shoppingProductSlice = createSlice({
  name: "shoppingProducts",
  initialState,
  reducers: {
    setProductDetails: (state) => {
      state.productDetails = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllFilteredProducts.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchAllFilteredProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productList = action.payload.data;
      })
      .addCase(fetchAllFilteredProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.productList = [];
      })
      .addCase(fetchProductDetails.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchProductDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productDetails = action.payload.data;
      })
      .addCase(fetchProductDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.productDetails = null;
      })
      .addCase(getAllWishlistProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllWishlistProduct.fulfilled, (state, action) => {
        state.userWishlist = action.payload; // Wishlist array from backend
      })
      .addCase(getAllWishlistProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.userWishlist = [];
      })
      .addCase(updateProductWishlist.fulfilled, (state, action) => {
        state.userWishlist = action.payload; // Updated wishlist
      });
  },
});

export const { setProductDetails } = shoppingProductSlice.actions;

export default shoppingProductSlice.reducer;
