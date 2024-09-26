import { ArchiveX, PencilLine } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";

function AdminProductTile({
  product,
  setFormData,
  setOpenCreateProductsDialog,
  setCurrentEditedId,
  handleDelete,
}) {
  return (
    <Card className="w-full max-w-sm mx-auto group relative">
      <div>
        <div className="hover:opacity-40">
          <div className="relative w-full">
            <img
              src={product?.images[0]}
              alt={product?.title}
              className="w-full h-[300px] object-cover rounded-t-lg"
            />
          </div>
          <CardContent className="bg-zinc-200">
            <h2 className="text-xl font-bold mb-2 mt-2">{product?.title}</h2>
            <div className="flex justify-between items-center mb-2">
              <span
                className={`${
                  product?.salePrice > 0 ? "line-through" : ""
                } text-lg font-semibold text-primary`}
              >
                ${product?.price}
              </span>
              {product?.salePrice > 0 ? (
                <span className="text-lg font-bold">${product?.salePrice}</span>
              ) : null}
            </div>
          </CardContent>
        </div>

        <CardFooter className="flex gap-2 absolute top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Button
            onClick={() => {
              setOpenCreateProductsDialog(true);
              setCurrentEditedId(product?._id);
              setFormData(product);
            }}
          >
            <PencilLine />
          </Button>
          <Button
            onClick={() => handleDelete(product?._id)}
            className="bg-red-700"
          >
            <ArchiveX />
          </Button>
        </CardFooter>
      </div>
    </Card>
  );
}

export default AdminProductTile;
