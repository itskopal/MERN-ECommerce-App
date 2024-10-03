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
import EmptyWishlist from "../../assets/wishlist-icon.jpg";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

function ShoppingWishlist() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { userWishlist, productDetails } = useSelector(
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

  // Handle wishlist functionality
  function handleLikeProduct(productId, isWishlisted) {
    const newWishlistState = !isWishlisted;

    dispatch(
      updateProductWishlist({
        userId: user.id,
        productId,
        wishlist: newWishlistState,
      })
    )
      .then((data) => {
        console.log(data);

        if (data.payload.success) {
          dispatch(getAllWishlistProduct(user?.id));
          toast({
            title: "Wishlist Updated!",
            description: newWishlistState
              ? "Product added to your wishlist."
              : "Product removed from your wishlist.",
          });
        }
      })
      .catch((error) => {
        toast({
          title: "Error",
          description: "Failed to update wishlist.",
          type: "error",
        });
      });
  }

  useEffect(() => {
    if (productDetails !== null) setOpenDetailsDialog(true);
  }, [productDetails]);

  useEffect(() => {
    dispatch(getAllWishlistProduct(user?.id));
  }, [dispatch]);

  console.log("User Wishlist:", userWishlist);
  const wishlistCount = userWishlist?.wishlist?.length || 0;

  return (
    <div>
      {wishlistCount === 0 ? (
        <div className="flex flex-col items-center justify-center h-[80vh]">
          <img
            src={EmptyWishlist}
            alt="Empty Wishlist"
            className="w-[150px] h-[150px] sm:w-[250px] sm:h-[250px] mb-4"
          />
          <p className="text-2xl text-red-600 text-center mb-3">
            Your wishlist is empty !!
          </p>
          <p className="text-lg text-gray-600 text-center mb-4">
            Explore more and shortlist some items.
          </p>
          <Button onClick={() => navigate("/shop/listing")}>Explore</Button>
        </div>
      ) : (
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-semibold text-gray-700 mt-4 mb-8">
            Your wishlist
            <span className="text-sm text-gray-500 ml-4">
              {wishlistCount} {wishlistCount === 1 ? "Product" : "Products"}
            </span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {userWishlist &&
            userWishlist.wishlist &&
            userWishlist.wishlist.length > 0
              ? userWishlist.wishlist.map((productItem) => (
                  <WishlistProductTile
                    handleGetProductDetails={handleGetProductDetails}
                    product={productItem}
                    handleAddtoCart={handleAddtoCart}
                    handleLikeProduct={handleLikeProduct}
                    isWishlisted={
                      Array.isArray(userWishlist?.wishlist) &&
                      userWishlist.wishlist.some(
                        (wish) => wish._id === productItem._id
                      )
                    }
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
      )}
    </div>
  );
}

export default ShoppingWishlist;
