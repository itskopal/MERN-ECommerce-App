import { useSelector } from "react-redux";
import { Badge } from "../ui/badge";
import { DialogContent } from "../ui/dialog";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

function ShoppingOrderDetailsView({ orderDetails }) {
  const { user } = useSelector((state) => state.auth);

  return (
    <DialogContent className="sm:max-w-[600px]">
      <div className="grid gap-6">
        <div className="grid gap-2">
          <div className="flex mt-5 items-center justify-between">
            <p className="font-semibold">Order ID</p>
            <Label className="text-sm text-gray-600">{orderDetails?._id}</Label>
          </div>
          <div className="flex mt-1 items-center justify-between">
            <p className="font-semibold">Order Date</p>
            <Label className="text-sm text-gray-600">
              {orderDetails?.orderDate.split("T")[0]}
            </Label>
          </div>
          <div className="flex mt-1 items-center justify-between">
            <p className="font-semibold">Order Price</p>
            <Label className="text-sm text-gray-600">
              ${orderDetails?.totalAmount}
            </Label>
          </div>
          <div className="flex mt-1 items-center justify-between">
            <p className="font-semibold">Payment method</p>
            <Label className="text-sm text-gray-600">
              {orderDetails?.paymentMethod}
            </Label>
          </div>
          <div className="flex mt-1 items-center justify-between">
            <p className="font-semibold">Payment Status</p>
            <Label className="text-sm text-gray-600">
              {orderDetails?.paymentStatus}
            </Label>
          </div>
          <div className="flex mt-1 items-center justify-between">
            <p className="font-semibold">Order Status</p>
            <Label>
              <Badge
                className={`py-1 px-3 ${
                  orderDetails?.orderStatus === "confirmed"
                    ? "bg-green-500"
                    : orderDetails?.orderStatus === "rejected"
                    ? "bg-red-600"
                    : "bg-black"
                }`}
              >
                {orderDetails?.orderStatus}
              </Badge>
            </Label>
          </div>
        </div>
        <Separator />
        <div className="grid gap-4">
          <div className="grid gap-2">
            <div className="flex justify-between items-center">
              <div className="font-medium">Order Details</div>
              <div className="font-semibold text-sm text-gray-600">
                {orderDetails?.cartItems?.length || 0} Products
              </div>
            </div>
            <ul className="grid gap-3 h-[180px] overflow-y-auto ">
              {orderDetails?.cartItems && orderDetails?.cartItems.length > 0
                ? orderDetails?.cartItems.map((item) => (
                    <li className="flex items-center justify-between">
                      {/* <span>Title: {item.title}</span> */}
                      <span className="flex items-center justify-between gap-2 text-sm text-gray-600">
                        <Avatar className="">
                          <AvatarImage src={item?.images?.[0]} />
                        </Avatar>
                        {item.title}
                      </span>
                      <span className="text-sm text-gray-500">
                        Quantity: {item.quantity}
                      </span>
                      <span className="text-sm text-gray-500">
                        Price: ${item.price}
                      </span>
                    </li>
                  ))
                : null}
            </ul>
          </div>
        </div>
        <Separator />
        <div className="grid gap-4">
          <div className="grid gap-2">
            <div className="font-medium">Shipping Info</div>
            <div className="grid gap-0.5 text-muted-foreground">
              <span>
                {user.userName} | {orderDetails?.addressInfo?.phone}
              </span>
              <span>
                {orderDetails?.addressInfo?.address},{" "}
                {orderDetails?.addressInfo?.city}
              </span>
              <span>{orderDetails?.addressInfo?.pincode}</span>
              {/* <span>{orderDetails?.addressInfo?.notes}</span> */}
            </div>
          </div>
        </div>
      </div>
    </DialogContent>
  );
}

export default ShoppingOrderDetailsView;
