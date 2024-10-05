import { useLocation } from "react-router-dom";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import { useSelector } from "react-redux";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

function OrderInvoice() {
  const location = useLocation();
  const { orderId, orderDetails } = location.state || {};
  const { user } = useSelector((state) => state.auth);

  const generatePdf = () => {
    const input = document.getElementById("pdfDownload");

    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      pdf.save("invoice.pdf");
      //pdf.save(`${user.userName}.pdf`)
    });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-2xl">
        <div className="w-full max-w-2xl p-8 mb-6" id="pdfDownload">
          <h1 className="text-2xl font-semibold mb-6 text-center">
            Order Invoice
          </h1>

          <div className="sm:max-w-[1140px] mx-auto">
            <div className="grid gap-6">
              <div className="grid gap-2">
                <div className="flex mt-5 items-center justify-between">
                  <p className="font-semibold">Order ID</p>
                  <Label className="text-sm text-gray-600">
                    {orderDetails?._id}
                  </Label>
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
                  <div className="flex justify-between items-center mb-2">
                    <div className="font-medium">Order Details</div>
                    <div className="font-semibold text-sm text-gray-600">
                      {orderDetails?.cartItems?.length || 0} Products
                    </div>
                  </div>
                  <ol className="grid gap-3 ">
                    {orderDetails?.cartItems &&
                    orderDetails?.cartItems.length > 0
                      ? orderDetails?.cartItems.map((item, index) => (
                          <li
                            key={index}
                            className="flex items-center justify-between"
                          >
                            <span className=" text-sm text-gray-600">
                              {index + 1}. Title: {item.title}
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
                  </ol>
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
          </div>
        </div>

        <Separator />
        {/* Download Invoice Button */}
        <div className="text-center mt-6">
          <Button
            onClick={generatePdf}
            className="bg-blue-500 hover:bg-blue-600"
          >
            Download Invoice
          </Button>
        </div>
      </div>
    </div>
  );
}

export default OrderInvoice;
