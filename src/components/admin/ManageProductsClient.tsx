"use client";
import { Product } from "@prisma/client";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { formatePrice } from "../../../utils/formate";
import Heading from "@/components/Heading";
import Status from "@/components/Status";
import axios from "axios";
import {
  MdCached,
  MdClose,
  MdDelete,
  MdDone,
  MdRemoveRedEye,
} from "react-icons/md";
import ActionBtn from "@/components/ActionBtn";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
// import { deleteObject, getStorage, ref } from "firebase/storage";

interface ManageProductClientProps {
  products: Product[];
}
const ManageProductsClient: React.FC<ManageProductClientProps> = ({
  products,
}) => {
  const router = useRouter();
  // const storage = getStorage(firebaseApp);
  let rows: any = [];
  if (products) {
    rows = products.map((product) => {
      return {
        id: product.id,
        name: product.name,
        price: formatePrice(product.price),
        brand: product.brand,
        category: product.category,
        inStock: product.inStock,
        images: product.images,
      };
    });
  }
  const paginationModel = { page: 0, pageSize: 9 };

  const handleToggleStock = useCallback((id: string, inStock: boolean) => {
    axios
      .put("/api/product", { id, inStock: !inStock })
      .then(() => {
        toast.success("Product status changed");
        router.refresh();
      })
      .catch(() => {
        toast.error("Oops! Something went wrong");
      });
  }, []);

  const handleDelete = useCallback(async (id: string, images: any[]) => {
    toast("Deleting product,please wait...");
    console.log(images);
    // const handleImageDelete = async () => {
    //   try {
    //     for (const item of images) {
    //       if (item.image) {
    //         const imageRef = ref(storage, item.image);
    //         await deleteObject(imageRef);
    //         console.log("Image deleted", item.image);
    //       }
    //     }
    //   } catch (error: any) {
    //     toast.error(error);
    //   }
    // };
    // await handleImageDelete();

    await axios
      .delete(`/api/product/${id}`)
      .then(() => {
        toast.success("Product deleted");
        router.refresh();
      })
      .catch(() => {
        toast.error("Failed to delete product");
      });
  }, []);

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 220 },
    { field: "name", headerName: "Name", width: 220 },
    {
      field: "price",
      headerName: "Price(USD)",
      width: 100,
      renderCell: (params) => {
        return (
          <div className="font-bold text-slate-800">{params.row.price}</div>
        );
      },
    },
    { field: "category", headerName: "Category", width: 100 },
    { field: "brand", headerName: "Brand", width: 100 },
    {
      field: "inStock",
      headerName: "inStock",
      width: 120,
      renderCell: (params) => {
        return (
          <div className="flex items-center h-full">
            {params.row.inStock === true ? (
              <Status
                text="in stock"
                icon={MdDone}
                bg="bg-teal-200"
                color="text-teal-700"
              />
            ) : (
              <Status
                text="out of stock"
                icon={MdClose}
                bg="bg-rose-200"
                color="text-rose-700"
              />
            )}
          </div>
        );
      },
    },
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="flex justify-between gap-4 w-full items-center h-full">
            <ActionBtn
              icon={MdCached}
              onClick={() =>
                handleToggleStock(params.row.id, params.row.inStock)
              }
            />
            <ActionBtn
              icon={MdDelete}
              onClick={() => handleDelete(params.row.id, params.row.images)}
            />
            <ActionBtn
              icon={MdRemoveRedEye}
              onClick={() => {
                router.push(`/product/${params.row.id}`);
              }}
            />
          </div>
        );
      },
    },
  ];
  return (
    <div className="max-w-[1150px] m-auto text-xl">
      <div className="mb-4 mt-5">
        <Heading title="Manage Products" center />
      </div>
      <div style={{ height: 600, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[9, 20]}
          checkboxSelection
          sx={{ border: 0 }}
          disableRowSelectionOnClick
        />
      </div>
    </div>
  );
};

export default ManageProductsClient;
