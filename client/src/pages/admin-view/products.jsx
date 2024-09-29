//import ProductImageUpload from "@/components/admin-view/image-upload";
import ProductMultipleImageUpload from "@/components/admin-view/multiple-image-uploads";
import AdminProductTile from "@/components/admin-view/product-tile";
import CommonForm from "@/components/common/form";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { addProductFormElements } from "@/config";
import { useToast } from "@/hooks/use-toast";
import {
  addNewProduct,
  deleteProduct,
  editProduct,
  fetchAllProducts,
} from "@/store/admin/products-slice";
import { CirclePlus, Loader2 } from "lucide-react";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const initialFormData = {
  //image: null,
  images: null,
  image1: null, // New
  image2: null, // New
  image3: null, // New
  image4: null, // New
  image5: null, // New
  title: "",
  description: "",
  category: "",
  brand: "",
  price: "",
  salePrice: "",
  totalStock: "",
  averageReview: 0,
};

function AdminProducts() {
  const [openCreateProductsDialog, setOpenCreateProductsDialog] =
    useState(false);
  const [formData, setFormData] = useState(initialFormData);
  //const [imageFile, setImageFile] = useState(null);
  //const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const [currentEditedId, setCurrentEditedId] = useState(null);
  const [loading, setLoading] = useState(false);

  const { productList } = useSelector((state) => state.adminProducts);
  const dispatch = useDispatch();
  const { toast } = useToast();

  function onSubmit(event) {
    event.preventDefault();
    setLoading(true);

    // Create FormData object to handle file uploads
    const formDataObj = new FormData();

    // Append form data fields to FormData
    formDataObj.append("title", formData.title);
    formDataObj.append("description", formData.description);
    formDataObj.append("category", formData.category);
    formDataObj.append("brand", formData.brand);
    formDataObj.append("price", formData.price);
    formDataObj.append("salePrice", formData.salePrice);
    formDataObj.append("totalStock", formData.totalStock);
    formDataObj.append("averageReview", formData.averageReview);

    // Append each image if available
    if (formData.image1) formDataObj.append("image1", formData.image1);
    if (formData.image2) formDataObj.append("image2", formData.image2);
    if (formData.image3) formDataObj.append("image3", formData.image3);
    if (formData.image4) formDataObj.append("image4", formData.image4);
    if (formData.image5) formDataObj.append("image5", formData.image5);

    currentEditedId !== null
      ? dispatch(
          editProduct({
            id: currentEditedId,
            formData: formDataObj,
            //formData
            // formData: {
            //   ...formData,
            //   images: uploadedImageUrl, // Use multiple image URLs
            // },
          })
        ).then((data) => {
          console.log(data, "edit");

          if (data?.payload?.success) {
            dispatch(fetchAllProducts());
            setFormData(initialFormData);
            setOpenCreateProductsDialog(false);
            setCurrentEditedId(null);
          }
        })
      : dispatch(
          addNewProduct(
            formDataObj
            // {
            //   ...formData,
            //   //images: uploadedImageUrls, // Submit multiple image URLs
            //   image: uploadedImageUrl,
            // }
          )
        )
          .then((data) => {
            if (data?.payload?.success) {
              dispatch(fetchAllProducts());
              setOpenCreateProductsDialog(false);
              //setImageFile(null);
              setFormData(initialFormData);
              toast({
                title: "Product add successfully",
              });
            }
          })
          .finally(() => {
            setLoading(false); // Set loading to false when the process finishes
          });
  }

  function handleDelete(getCurrentProductId) {
    dispatch(deleteProduct(getCurrentProductId)).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchAllProducts());
      }
    });
  }

  function isFormValid() {
    return Object.keys(formData)
      .filter((currentKey) => currentKey !== "averageReview")
      .map((key) => formData[key] !== "")
      .every((item) => item);
  }

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  console.log(productList, "productList");

  return (
    <Fragment>
      <div className="mb-5 w-full flex justify-end">
        <Button onClick={() => setOpenCreateProductsDialog(true)}>
          New Product &nbsp; <CirclePlus />
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
        {productList && productList.length > 0
          ? productList.map((productItem) => (
              <AdminProductTile
                key={productItem.id}
                setFormData={setFormData}
                setOpenCreateProductsDialog={setOpenCreateProductsDialog}
                setCurrentEditedId={setCurrentEditedId}
                product={productItem}
                handleDelete={handleDelete}
              />
            ))
          : null}
      </div>

      <Sheet
        open={openCreateProductsDialog}
        onOpenChange={() => {
          setOpenCreateProductsDialog(false);
          setCurrentEditedId(null);
          setFormData(initialFormData);
        }}
      >
        <SheetContent side="right" className="overflow-auto">
          <SheetHeader>
            <SheetTitle>
              {currentEditedId !== null ? "Edit Product" : "Add New Product"}
            </SheetTitle>
          </SheetHeader>
          {/* <ProductImageUpload
            imageFile={imageFile}
            setImageFile={setImageFile}
            uploadedImageUrl={uploadedImageUrl}
            setUploadedImageUrl={setUploadedImageUrl}
            setImageLoadingState={setImageLoadingState}
            imageLoadingState={imageLoadingState}
            isEditMode={currentEditedId !== null}
          /> */}
          <ProductMultipleImageUpload
            image1={formData.image1}
            image2={formData.image2}
            image3={formData.image3}
            image4={formData.image4}
            image5={formData.image5}
            setFormData={setFormData}
            setImageLoadingState={setImageLoadingState}
            imageLoadingState={imageLoadingState}
            isEditMode={currentEditedId !== null}
          />

          <div className="py-6">
            <CommonForm
              onSubmit={onSubmit}
              formData={formData}
              setFormData={setFormData}
              //buttonText={currentEditedId !== null ? "Edit" : "Add"}
              buttonText={
                loading ? (
                  <Loader2 className="animate-spin" />
                ) : currentEditedId !== null ? (
                  "Edit"
                ) : (
                  "Add"
                )
              }
              formControls={addProductFormElements}
              isBtnDisabled={!isFormValid() || loading} // Disable button during loading
              //isBtnDisabled={!isFormValid()}
            />
          </div>
        </SheetContent>
      </Sheet>
    </Fragment>
  );
}

export default AdminProducts;
