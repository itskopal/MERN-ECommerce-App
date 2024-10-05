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
import AdminOrderDetailsView from "./order-details";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllOrdersForAdmin,
  getOrderDetailsForAdmin,
  resetOrderDetails,
} from "@/store/admin/order-slice";
import { Badge } from "../ui/badge";
import Pagination from "../common/pagination";
import { DotLoader } from "react-spinners";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";

function AdminOrdersView() {
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [startDate, setStartDate] = useState(""); // Start date for filtering
  const [endDate, setEndDate] = useState(""); // End date for filtering
  const [currentPage, setCurrentPage] = useState(1); // State for pagination
  const ordersPerPage = 10;
  const { orderList, orderDetails } = useSelector((state) => state.adminOrder);
  const dispatch = useDispatch();

  function handleFetchOrderDetails(getId) {
    dispatch(getOrderDetailsForAdmin(getId));
  }

  // useEffect(() => {
  //   dispatch(getAllOrdersForAdmin());
  // }, [dispatch]);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      await dispatch(getAllOrdersForAdmin());
      setLoading(false);
    };

    fetchOrders();
  }, [dispatch]);

  //console.log(orderDetails, "orderList");

  useEffect(() => {
    if (orderDetails !== null) setOpenDetailsDialog(true);
  }, [orderDetails]);

  // Filter orders based on the selected date range
  const filteredOrders = orderList.filter((order) => {
    const orderDate = new Date(order.orderDate).setHours(0, 0, 0, 0); // Normalize the order date to start of the day
    const start = startDate ? new Date(startDate).setHours(0, 0, 0, 0) : null;
    const end = endDate ? new Date(endDate).setHours(23, 59, 59, 999) : null;

    // Check if the order matches the selected status
    const matchesStatus =
      selectedStatus === "all" || order.orderStatus === selectedStatus;

    // Filter by date range
    const matchesDate =
      (!start || orderDate >= start) && // If start date is provided, check if order is after or on start date
      (!end || orderDate <= end); // If end date is provided, check if order is before or on end date

    return matchesStatus && matchesDate;
  });

  // Sort the filtered orders by orderDate in descending order (latest first)
  const sortedOrders = filteredOrders.sort(
    (a, b) => new Date(b.orderDate) - new Date(a.orderDate)
  );

  // Calculate the indices for slicing
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = sortedOrders.slice(indexOfFirstOrder, indexOfLastOrder); // Slice the orders for the current page

  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);
  const totalOrders = filteredOrders.length;

  // Change page
  const onPageChange = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Orders</CardTitle>
      </CardHeader>
      <CardContent>
        {/* Date Filter Section */}
        <div className="flex justify-end items-center gap-2 mb-8">
          <div className="flex space-x-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Start Date
              </label>
              <input
                type="date"
                className="border rounded p-2"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                End Date
              </label>
              <input
                type="date"
                className="border rounded p-2"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
            <Button
              className="bg-blue-500 hover:bg-blue-600 mt-5"
              onClick={() => setCurrentPage(1)} // Reset to first page after filter
            >
              Apply
            </Button>
          </div>

          {/* Optional Reset Filter Button */}
          <Button
            className="bg-gray-400 hover:bg-gray-500 mt-4"
            onClick={() => {
              setStartDate("");
              setEndDate("");
              setCurrentPage(1);
            }}
          >
            Reset
          </Button>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-[50vh] ">
            <DotLoader className="bg-gray-400" />{" "}
          </div>
        ) : (
          <div>
            <div className="flex items-center justify-between">
              <Tabs
                defaultValue={selectedStatus}
                onValueChange={setSelectedStatus}
              >
                <TabsList>
                  <TabsTrigger value="all">All Orders</TabsTrigger>
                  <TabsTrigger value="delivered">Delivered</TabsTrigger>
                  <TabsTrigger value="pending">Pending</TabsTrigger>
                  <TabsTrigger value="inProcess">InProcess</TabsTrigger>
                  <TabsTrigger value="confirmed">Confirmed</TabsTrigger>
                </TabsList>
              </Tabs>
              <p className="text-sm text-gray-400 font-semibold">
                {filteredOrders.length} Products
              </p>
            </div>
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
              {filteredOrders.length === 0 ? (
                <div className=" text-gray-500 mt-8 px-4">No orders found.</div>
              ) : (
                <>
                  <TableBody>
                    {currentOrders && currentOrders.length > 0
                      ? currentOrders.map((orderItem) => (
                          <TableRow>
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
                                <AdminOrderDetailsView
                                  orderDetails={orderDetails}
                                />
                              </Dialog>
                            </TableCell>
                          </TableRow>
                        ))
                      : null}
                  </TableBody>
                </>
              )}
            </Table>

            {/* Pagination Section */}
            <div className="flex justify-between items-center mt-4">
              {/* Showing Entries */}
              <p className="text-sm text-gray-600 font-semibold">
                Showing {indexOfFirstOrder + 1} to{" "}
                {Math.min(indexOfLastOrder, totalOrders)} of {totalOrders}{" "}
                orders
              </p>

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

export default AdminOrdersView;
