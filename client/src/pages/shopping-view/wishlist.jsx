import ProductDetailsDialog from "@/components/shopping-view/product-details";
import WishlistProductTile from "@/components/shopping-view/wishlist-products";
import { useToast } from "@/hooks/use-toast";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import {
  fetchProductDetails,
  getAllWishlistProduct,
  updateProductWishlist,
} from "@/store/shop/products-slice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function ShoppingWishlist() {
  const dispatch = useDispatch();
  const { toast } = useToast();
  const { wishlistProductList, productDetails } = useSelector(
    (state) => state.shopProducts
  );
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const { user } = useSelector((state) => state.auth);

  function handleGetProductDetails(getCurrentProductId) {
    dispatch(fetchProductDetails(getCurrentProductId));
  }

  function handleAddtoCart(getCurrentProductId) {
    dispatch(
      addToCart({
        userId: user?.id,
        productId: getCurrentProductId,
        quantity: 1,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchCartItems(user?.id));
        toast({
          title: "Product is added to cart",
        });
      }
    });
  }

  function handleLikeProduct(currentUpdatedId, currentWishlistState) {
    // Toggle the wishlist state
    const newWishlistState = !currentWishlistState;

    dispatch(
      updateProductWishlist({
        id: currentUpdatedId,
        wishlist: newWishlistState, // Pass the toggled state
      })
    ).then((data) => {
      console.log(data, "update");

      if (data?.payload?.success) {
        dispatch(getAllWishlistProduct());
        toast({
          title: "Wishlist Updated!",
        });
      }
    });
  }

  useEffect(() => {
    if (productDetails !== null) setOpenDetailsDialog(true);
  }, [productDetails]);

  useEffect(() => {
    dispatch(getAllWishlistProduct());
  }, [dispatch]);

  //console.log("wishlist products", wishlistProductList);

  return (
    <div>
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mt-4 mb-8">Wishlist</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {wishlistProductList && wishlistProductList.length > 0
            ? wishlistProductList.map((productItem) => (
                <WishlistProductTile
                  handleGetProductDetails={handleGetProductDetails}
                  product={productItem}
                  handleAddtoCart={handleAddtoCart}
                  handleLikeProduct={handleLikeProduct}
                />
              ))
            : null}
        </div>
        <ProductDetailsDialog
          open={openDetailsDialog}
          setOpen={setOpenDetailsDialog}
          productDetails={productDetails}
        />
      </div>
    </div>
  );
}

export default ShoppingWishlist;
