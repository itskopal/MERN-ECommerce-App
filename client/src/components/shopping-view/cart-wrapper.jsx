import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import UserCartItemsContent from "./cart-items-content";
import { ShoppingCart } from "lucide-react";
import emptyCart from "../../assets/empty-cart.webp";

function UserCartWrapper({ cartItems, setOpenCartSheet }) {
  const navigate = useNavigate();

  const totalCartAmount =
    cartItems && cartItems.length > 0
      ? cartItems.reduce(
          (sum, currentItem) =>
            sum +
            (currentItem?.salePrice > 0
              ? currentItem?.salePrice
              : currentItem?.price) *
              currentItem?.quantity,
          0
        )
      : 0;

  return (
    <SheetContent className="sm:max-w-md flex flex-col h-full">
      <SheetHeader>
        <SheetTitle className="flex gap-1 items-center ">
          Your Cart <ShoppingCart className="h-5 w-5" />
        </SheetTitle>
      </SheetHeader>

      {/* Cart Items with scrollable area */}
      <div className="mt-4 space-y-4 flex-grow overflow-y-auto">
        {cartItems && cartItems.length > 0 ? (
          cartItems.map((item) => (
            <UserCartItemsContent key={item.id} cartItem={item} />
          ))
        ) : (
          <div className="flex flex-col justify-center items-center">
            <img
              src={emptyCart}
              alt="cart is empty"
              className="w-[450px] h-[250px] mb-4"
            />
            <p className="text-lg text-red-600 text-center mb-4">
              Your cart is empty !!
            </p>
          </div>
        )}
      </div>

      {/* Fixed Total and Checkout Button */}
      <div className="space-y-4 mt-2 sticky bottom-0 bg-white pt-4 border-t">
        <div className="flex justify-between">
          <span className="font-bold">Total</span>
          <span className="font-bold">${totalCartAmount}</span>
        </div>
        <Button
          onClick={() => {
            navigate("/shop/checkout");
            setOpenCartSheet(false);
          }}
          className="w-full"
        >
          Checkout
        </Button>
      </div>
    </SheetContent>
  );
}

export default UserCartWrapper;
