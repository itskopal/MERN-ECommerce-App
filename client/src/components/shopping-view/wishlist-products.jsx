import { Card, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import { brandOptionsMap, categoryOptionsMap } from "@/config";
import { Badge } from "../ui/badge";
import { Heart, ShoppingCart } from "lucide-react";
import { FaHeart, FaRegHeart } from "react-icons/fa";

function WishlistProductTile({
  product,
  handleGetProductDetails,
  handleAddtoCart,
  handleLikeProduct,
}) {
  return (
    <Card className="w-full max-w-sm mx-auto">
      <div onClick={() => handleGetProductDetails(product?._id)}>
        <div className="relative">
          <img
            src={product?.images[0]}
            alt={product?.title}
            className="w-full h-[300px] object-cover rounded-t-lg cursor-pointer"
          />
          {product?.totalStock === 0 ? (
            <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
              Out Of Stock
            </Badge>
          ) : product?.totalStock < 10 ? (
            <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
              {`Only ${product?.totalStock} items left`}
            </Badge>
          ) : product?.salePrice > 0 ? (
            <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
              Sale
            </Badge>
          ) : null}
        </div>
        <CardContent className="p-4">
          <h2 className="text-xl font-bold mb-2">{product?.title}</h2>
          <div className="flex justify-between items-center mb-2">
            <span className="text-[16px] text-muted-foreground">
              {categoryOptionsMap[product?.category]}
            </span>
            <span className="text-[16px] text-muted-foreground">
              {brandOptionsMap[product?.brand]}
            </span>
          </div>
          <div className="flex justify-between items-center mb-2">
            <span
              className={`${
                product?.salePrice > 0 ? "line-through" : ""
              } text-lg font-semibold text-primary`}
            >
              ${product?.price}
            </span>
            {product?.salePrice > 0 ? (
              <span className="text-lg font-semibold text-primary">
                ${product?.salePrice}
              </span>
            ) : null}
          </div>
        </CardContent>
      </div>
      <CardFooter className="flex justify-between space-x-2">
        {product?.totalStock === 0 ? (
          <Button className="w-full opacity-60 cursor-not-allowed">
            Out Of Stock
          </Button>
        ) : (
          <>
            <Button
              onClick={() => handleAddtoCart(product?._id, product?.totalStock)}
              className="w-full"
            >
              <ShoppingCart className="h-5 w-5 mr-1" />
              Add to cart
            </Button>

            <div
              className="flex items-center justify-center w-12 cursor-pointer"
              onClick={() => handleLikeProduct(product?._id, product.wishlist)}
            >
              {/* <Heart className="h-7 w-7" /> */}
              {product.wishlist ? (
                <FaHeart className="h-7 w-7 text-red-500" />
              ) : (
                <FaRegHeart className="h-7 w-7 text-gray-500" />
              )}
            </div>
          </>
        )}
      </CardFooter>
    </Card>
  );
}

export default WishlistProductTile;
