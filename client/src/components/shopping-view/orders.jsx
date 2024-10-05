import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Dialog } from "../ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { useDispatch, useSelector } from "react-redux";
import { Badge } from "../ui/badge";
import {
  getAllOrdersByUserId,
  getOrderDetails,
  resetOrderDetails,
} from "@/store/shop/order-slice";
import ShoppingOrderDetailsView from "./order-details";
import Pagination from "../common/pagination";
import { useNavigate } from "react-router-dom";
import orderNotFound from "../../assets/no-data.png";
import { DotLoader } from "react-spinners";

function ShoppingOrders() {
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1); // State for pagination
  const ordersPerPage = 10;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { orderList, orderDetails } = useSelector((state) => state.shopOrder);

  function handleFetchOrderDetails(getId) {
    dispatch(getOrderDetails(getId));
  }

  // useEffect(() => {
  //   dispatch(getAllOrdersByUserId(user?.id));
  // }, [dispatch]);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      await dispatch(getAllOrdersByUserId(user?.id));
      setLoading(false); // Set loading to false when data is fetched
    };

    fetchOrders();
  }, [dispatch]);

  useEffect(() => {
    if (orderDetails !== null) setOpenDetailsDialog(true);
  }, [orderDetails]);

  //console.log(orderDetails, "orderDetails");

  // Sort orders by orderDate in descending order (latest orders first)
  const sortedOrders = orderList
    .slice()
    .sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate));

  // Calculate the indices for slicing
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = sortedOrders.slice(indexOfFirstOrder, indexOfLastOrder); // Slice the orders for the current page

  const totalPages = Math.ceil(orderList.length / ordersPerPage);
  const totalOrders = orderList.length;

  // Change page
  const onPageChange = (pageNumber) => setCurrentPage(pageNumber);

  const ordersCount = orderList?.length || 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Order History</CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex justify-center items-center ">
            <DotLoader className="bg-gray-400" />{" "}
          </div>
        ) : ordersCount === 0 ? (
          <div className="flex flex-col justify-center items-center">
            <img
              src={orderNotFound}
              alt="No Order Yet"
              className="w-[150px] h-[150px] sm:w-[250px] sm:h-[250px] mb-4"
            />
            <p className="text-2xl text-red-600 text-center mb-6">
              Orders Not Found !!
            </p>
            <Button onClick={() => navigate("/shop/listing")}>
              View Products
            </Button>
          </div>
        ) : (
          <div>
            <Table className="mb-4">
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Order Date</TableHead>
                  <TableHead>Order Status</TableHead>
                  <TableHead>Order Price</TableHead>
                  <TableHead>
                    <span className="sr-only">Details</span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentOrders && currentOrders.length > 0
                  ? currentOrders.map((orderItem) => (
                      <TableRow key={orderItem?._id}>
                        <TableCell>{orderItem?._id}</TableCell>
                        <TableCell>
                          {orderItem?.orderDate.split("T")[0]}
                        </TableCell>
                        <TableCell>
                          <Badge
                            className={`py-1 px-3 ${
                              orderItem?.orderStatus === "confirmed"
                                ? "bg-green-500"
                                : orderItem?.orderStatus === "rejected"
                                ? "bg-red-600"
                                : "bg-black"
                            }`}
                          >
                            {orderItem?.orderStatus}
                          </Badge>
                        </TableCell>
                        <TableCell>${orderItem?.totalAmount}</TableCell>
                        <TableCell>
                          <Dialog
                            open={openDetailsDialog}
                            onOpenChange={() => {
                              setOpenDetailsDialog(false);
                              dispatch(resetOrderDetails());
                            }}
                          >
                            <Button
                              onClick={() =>
                                handleFetchOrderDetails(orderItem?._id)
                              }
                              className="bg-blue-500 hover:bg-blue-600"
                            >
                              View Details
                            </Button>
                            <ShoppingOrderDetailsView
                              orderDetails={orderDetails}
                            />
                          </Dialog>
                        </TableCell>
                        <TableCell>
                          {orderItem?.orderStatus === "delivered" ? (
                            <Button
                              onClick={() =>
                                navigate("/order-invoice", {
                                  state: {
                                    orderId: orderItem?._id,
                                    orderDetails: orderItem,
                                  },
                                })
                              }
                              className="bg-gray-400 hover:bg-gray-600"
                            >
                              Download Invoice
                            </Button>
                          ) : (
                            <Button
                              disabled
                              className="bg-gray-300 cursor-not-allowed"
                            >
                              Download Invoice
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    ))
                  : null}
              </TableBody>
            </Table>

            {/* Pagination Section */}
            <div className="flex justify-between items-center mt-4">
              {/* Showing Entries */}
              <p className="text-sm text-gray-600 font-semibold">
                Showing {indexOfFirstOrder + 1} to{" "}
                {Math.min(indexOfLastOrder, totalOrders)} of {totalOrders}{" "}
                orders
              </p>

              {/* Pagination Component */}
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={onPageChange}
              />
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default ShoppingOrders;

{
  /* {orderList && orderList.length > 0
              ? orderList.map((orderItem) => (
                  <TableRow>
                    <TableCell>{orderItem?._id}</TableCell>
                    <TableCell>{orderItem?.orderDate.split("T")[0]}</TableCell>
                    <TableCell>
                      <Badge
                        className={`py-1 px-3 ${
                          orderItem?.orderStatus === "confirmed"
                            ? "bg-green-500"
                            : orderItem?.orderStatus === "rejected"
                            ? "bg-red-600"
                            : "bg-black"
                        }`}
                      >
                        {orderItem?.orderStatus}
                      </Badge>
                    </TableCell>
                    <TableCell>${orderItem?.totalAmount}</TableCell>
                    <TableCell>
                      <Dialog
                        open={openDetailsDialog}
                        onOpenChange={() => {
                          setOpenDetailsDialog(false);
                          dispatch(resetOrderDetails());
                        }}
                      >
                        <Button
                          onClick={() =>
                            handleFetchOrderDetails(orderItem?._id)
                          }
                          className="bg-cyan-700"
                        >
                          View Details
                        </Button>
                        <ShoppingOrderDetailsView orderDetails={orderDetails} />
                      </Dialog>
                    </TableCell>
                    <TableCell>
                      <Button className="bg-slate-500">Download Invoice</Button>
                    </TableCell>
                  </TableRow>
                ))
              : null} */
}
