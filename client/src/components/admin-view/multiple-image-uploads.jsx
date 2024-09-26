import { FileIcon, UploadCloudIcon, XIcon } from "lucide-react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";

function ProductMultipleImageUpload({
  image1,
  image2,
  image3,
  image4,
  image5,
  setFormData,
  imageLoadingState,
  setImageLoadingState,
  isEditMode,
  isCustomStyling = false,
}) {
  const inputRef = useRef(null);

  //   const [image1, setImage1] = useState(false);
  //   const [image2, setImage2] = useState(false);
  //   const [image3, setImage3] = useState(false);
  //   const [image4, setImage4] = useState(false);
  //   const [image5, setImage5] = useState(false);

  function handleImageFileChange(event, index) {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      // Update the formData state for the specific image
      setFormData((prevFormData) => ({
        ...prevFormData,
        [`image${index}`]: selectedFile,
      }));
    }
  }

  function handleDragOver(event) {
    event.preventDefault();
  }

  // Handle drag and drop for multiple files
  function handleDrop(event, index) {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files?.[0];
    if (droppedFile) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [`image${index}`]: droppedFile,
      }));
    }
  }

  function handleRemoveImage(index) {
    // Remove the image from the formData state
    setFormData((prevFormData) => ({
      ...prevFormData,
      [`image${index}`]: null,
    }));

    // Clear the input field
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }

  return (
    <div
      className={`w-full  mt-4 ${isCustomStyling ? "" : "max-w-md mx-auto"}`}
    >
      <Label className="text-lg font-semibold mb-2 block">
        {`${isEditMode ? "" : "Upload Five Product Images"}`}
      </Label>

      <div
        onDragOver={handleDragOver}
        onDrop={(e) => handleDrop(e, 1)}
        className={`${
          isEditMode ? "opacity-60" : ""
        } border-2 border-dashed rounded-lg p-4`}
      >
        <Input
          id="image-upload1"
          type="file"
          className="hidden"
          ref={inputRef}
          //onChange={(e)=>setImage1(e.target.files[0])}
          onChange={(e) => handleImageFileChange(e, 1)}
          disabled={isEditMode}
        />

        {!image1 ? (
          <Label
            htmlFor="image-upload1"
            className={`${
              isEditMode ? "cursor-not-allowed" : "cursor-pointer"
            } flex flex-col items-center justify-center h-24 `}
          >
            <UploadCloudIcon className="w-10 h-10 text-muted-foreground mb-2" />
            <span>Drag & drop or click to upload image</span>
          </Label>
        ) : imageLoadingState ? (
          <Skeleton className="h-10 bg-gray-100" />
        ) : (
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <FileIcon className="w-8 text-primary mr-2 h-8" />
            </div>
            <p className="text-sm font-medium">{image1.name}</p>
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:text-foreground"
              onClick={() => handleRemoveImage(1)}
            >
              <XIcon className="w-4 h-4" />
              <span className="sr-only">Remove File</span>
            </Button>
          </div>
        )}
      </div>

      <div
        onDragOver={handleDragOver}
        onDrop={(e) => handleDrop(e, 2)}
        className={`${
          isEditMode ? "opacity-60" : ""
        } border-2 border-dashed rounded-lg p-4`}
      >
        <Input
          id="image-upload2"
          type="file"
          className="hidden"
          ref={inputRef}
          // onChange={(e)=>setImage2(e.target.files[0])}
          onChange={(e) => handleImageFileChange(e, 2)}
          disabled={isEditMode}
        />
        {!image2 ? (
          <Label
            htmlFor="image-upload2"
            className={`${
              isEditMode ? "cursor-not-allowed" : "cursor-pointer"
            } flex flex-col items-center justify-center h-24 `}
          >
            <UploadCloudIcon className="w-10 h-10 text-muted-foreground mb-2" />
            <span>Drag & drop or click to upload image</span>
          </Label>
        ) : imageLoadingState ? (
          <Skeleton className="h-10 bg-gray-100" />
        ) : (
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <FileIcon className="w-8 text-primary mr-2 h-8" />
            </div>
            <p className="text-sm font-medium">{image2.name}</p>
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:text-foreground"
              onClick={() => handleRemoveImage(2)}
            >
              <XIcon className="w-4 h-4" />
              <span className="sr-only">Remove File</span>
            </Button>
          </div>
        )}
      </div>

      <div
        onDragOver={handleDragOver}
        onDrop={(e) => handleDrop(e, 3)}
        className={`${
          isEditMode ? "opacity-60" : ""
        } border-2 border-dashed rounded-lg p-4`}
      >
        <Input
          id="image-upload3"
          type="file"
          className="hidden"
          ref={inputRef}
          //onChange={(e)=>setImage3(e.target.files[0])}
          onChange={(e) => handleImageFileChange(e, 3)}
          disabled={isEditMode}
        />
        {!image3 ? (
          <Label
            htmlFor="image-upload3"
            className={`${
              isEditMode ? "cursor-not-allowed" : "cursor-pointer"
            } flex flex-col items-center justify-center h-24 `}
          >
            <UploadCloudIcon className="w-10 h-10 text-muted-foreground mb-2" />
            <span>Drag & drop or click to upload image</span>
          </Label>
        ) : imageLoadingState ? (
          <Skeleton className="h-10 bg-gray-100" />
        ) : (
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <FileIcon className="w-8 text-primary mr-2 h-8" />
            </div>
            <p className="text-sm font-medium">{image3.name}</p>
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:text-foreground"
              onClick={() => handleRemoveImage(3)}
            >
              <XIcon className="w-4 h-4" />
              <span className="sr-only">Remove File</span>
            </Button>
          </div>
        )}
      </div>

      <div
        onDragOver={handleDragOver}
        onDrop={(e) => handleDrop(e, 4)}
        className={`${
          isEditMode ? "opacity-60" : ""
        } border-2 border-dashed rounded-lg p-4`}
      >
        <Input
          id="image-upload4"
          type="file"
          className="hidden"
          ref={inputRef}
          //onChange={(e)=>setImage4(e.target.files[0])}
          onChange={(e) => handleImageFileChange(e, 4)}
          disabled={isEditMode}
        />
        {!image4 ? (
          <Label
            htmlFor="image-upload4"
            className={`${
              isEditMode ? "cursor-not-allowed" : "cursor-pointer"
            } flex flex-col items-center justify-center h-24 `}
          >
            <UploadCloudIcon className="w-10 h-10 text-muted-foreground mb-2" />
            <span>Drag & drop or click to upload image</span>
          </Label>
        ) : imageLoadingState ? (
          <Skeleton className="h-10 bg-gray-100" />
        ) : (
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <FileIcon className="w-8 text-primary mr-2 h-8" />
            </div>
            <p className="text-sm font-medium">{image4.name}</p>
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:text-foreground"
              onClick={() => handleRemoveImage(4)}
            >
              <XIcon className="w-4 h-4" />
              <span className="sr-only">Remove File</span>
            </Button>
          </div>
        )}
      </div>

      <div
        onDragOver={handleDragOver}
        onDrop={(e) => handleDrop(e, 5)}
        className={`${
          isEditMode ? "opacity-60" : ""
        } border-2 border-dashed rounded-lg p-4`}
      >
        <Input
          id="image-upload5"
          type="file"
          className="hidden"
          ref={inputRef}
          //onChange={(e)=>setImage5(e.target.files[0])}
          onChange={(e) => handleImageFileChange(e, 5)}
          disabled={isEditMode}
        />
        {!image5 ? (
          <Label
            htmlFor="image-upload5"
            className={`${
              isEditMode ? "cursor-not-allowed" : "cursor-pointer"
            } flex flex-col items-center justify-center h-24 `}
          >
            <UploadCloudIcon className="w-10 h-10 text-muted-foreground mb-2" />
            <span>Drag & drop or click to upload image</span>
          </Label>
        ) : imageLoadingState ? (
          <Skeleton className="h-10 bg-gray-100" />
        ) : (
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <FileIcon className="w-8 text-primary mr-2 h-8" />
            </div>
            <p className="text-sm font-medium">{image5.name}</p>
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:text-foreground"
              onClick={() => handleRemoveImage(5)}
            >
              <XIcon className="w-4 h-4" />
              <span className="sr-only">Remove File</span>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductMultipleImageUpload;

{
  /* {!imageFile ? (
          <Label
            htmlFor="image-upload"
            className={`${
              isEditMode ? "cursor-not-allowed" : ""
            } flex flex-col items-center justify-center h-32 cursor-pointer`}
          >
            <UploadCloudIcon className="w-10 h-10 text-muted-foreground mb-2" />
            <span>Drag & drop or click to upload image</span>
          </Label>
        ) : imageLoadingState ? (
          <Skeleton className="h-10 bg-gray-100" />
        ) : (
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <FileIcon className="w-8 text-primary mr-2 h-8" />
            </div>
            <p className="text-sm font-medium">{imageFile.name}</p>
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:text-foreground"
              onClick={handleRemoveImage}
            >
              <XIcon className="w-4 h-4" />
              <span className="sr-only">Remove File</span>
            </Button>
          </div>
        )} */
}
