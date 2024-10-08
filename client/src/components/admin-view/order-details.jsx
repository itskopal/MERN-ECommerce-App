import { useState } from "react";
import CommonForm from "../common/form";
import { DialogContent } from "../ui/dialog";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import { Badge } from "../ui/badge";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "@/hooks/use-toast";
import {
  getAllOrdersForAdmin,
  getOrderDetailsForAdmin,
  updateOrderStatus,
} from "@/store/admin/order-slice";
import { Avatar, AvatarImage } from "../ui/avatar";

const initialFormData = {
  status: "",
};

function AdminOrderDetailsView({ orderDetails }) {
  const [formData, setFormData] = useState(initialFormData);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { toast } = useToast();

  //console.log(orderDetails, "orderDetailsorderDetails");

  function handleUpdateStatus(event) {
    event.preventDefault();
    const { status } = formData;
    dispatch(
      updateOrderStatus({ id: orderDetails?._id, orderStatus: status })
    ).then((data) => {
      //console.log(data);

      if (data?.payload?.success) {
        dispatch(getOrderDetailsForAdmin(orderDetails?._id));
        dispatch(getAllOrdersForAdmin());
        setFormData(initialFormData);
        toast({
          title: data?.payload?.message,
        });
      }
    });
  }

  return (
    <DialogContent className="sm:max-w-[800px]">
      <div className="grid gap-6">
        <div className="flex justify-between items-center gap-10 mt-5">
          <div className="w-[50%]">
            <div className="flex mt-1 items-center justify-between">
              <p className="font-medium">Order ID</p>
              <Label className="text-sm text-gray-600">
                {orderDetails?._id}
              </Label>
            </div>
            <div className="flex mt-1 items-center justify-between">
              <p className="font-medium">Order Date</p>
              <Label className="text-sm text-gray-600">
                {orderDetails?.orderDate.split("T")[0]}
              </Label>
            </div>
            <div className="flex mt-1 items-center justify-between">
              <p className="font-medium">Order Price</p>
              <Label className="text-sm text-gray-600">
                ${orderDetails?.totalAmount}
              </Label>
            </div>
          </div>
          <div className="w-[50%]">
            <div className="flex mt-1 items-center justify-between">
              <p className="font-medium">Payment method</p>
              <Label className="text-sm text-gray-600">
                {orderDetails?.paymentMethod}
              </Label>
            </div>
            <div className="flex mt-1 items-center justify-between">
              <p className="font-medium">Payment Status</p>
              <Label className="text-sm text-gray-600">
                {orderDetails?.paymentStatus}
              </Label>
            </div>
            <div className="flex mt-1 items-center justify-between">
              <p className="font-medium">Order Status</p>
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
            <ul className="grid gap-3 h-[150px] overflow-y-auto">
              {orderDetails?.cartItems && orderDetails?.cartItems.length > 0
                ? orderDetails?.cartItems.map((item) => (
                    <li className="flex items-center justify-between">
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

        <div>
          <CommonForm
            formControls={[
              {
                label: "Order Status",
                name: "status",
                componentType: "select",
                options: [
                  { id: "pending", label: "Pending" },
                  { id: "inProcess", label: "In Process" },
                  { id: "inShipping", label: "In Shipping" },
                  { id: "delivered", label: "Delivered" },
                  { id: "rejected", label: "Rejected" },
                ],
              },
            ]}
            formData={formData}
            setFormData={setFormData}
            buttonText={"Update Order Status"}
            onSubmit={handleUpdateStatus}
          />
        </div>
      </div>
    </DialogContent>
  );
}

export default AdminOrderDetailsView;
