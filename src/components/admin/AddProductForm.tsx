"use client";

import Heading from "@/components/Heading";
import CustomCheckbox from "@/components/inputs/CustomCheckbox";
import Input from "@/components/inputs/Input";
import TextArea from "@/components/inputs/TextArea";
import { useCallback, useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import CategoryInput from "@/components/inputs/CategoryInput";
import { colors } from "../../../utils/Colors";
import SelectColor from "@/components/inputs/SelectColor";
import { SelectedImgType, UploadedImgType } from "../../../utils/constant";
import Button from "@/components/Button";
import toast from "react-hot-toast";
import firebaseApp from "../../../libs/firebase";
import { categories } from "../../../utils/Categories";
import axios from "axios";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { useRouter } from "next/navigation";

const AddProductForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState<SelectedImgType[] | null>();
  const [isProductCreated, setIsProductCreated] = useState(false);
  const {
    register,
    reset,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      description: "",
      price: "",
      brand: "",
      category: "",
      inStock: false,
      images: [],
    },
  });

  useEffect(() => {
    setCustomValue("images", images);
  }, [images]);

  useEffect(() => {
    reset();
    setImages(null);
    setIsProductCreated(false);
  }, [isProductCreated]);

  const category = watch("category");

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldValidate: true,
      shouldTouch: true,
    });
  };

  const addImageToState = useCallback((value: SelectedImgType) => {
    setImages((prev) => {
      if (!prev) {
        return [value];
      }
      return [...prev, value];
    });
  }, []);

  const removeImageFromState = useCallback((value: SelectedImgType) => {
    setImages((prev) => {
      if (prev) {
        const filtered = prev.filter((item) => item.color !== value.color);
        return filtered;
      }
      return prev;
    });
  }, []);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log(data, "data...");
    setIsLoading(true);

    const uploadedImages: UploadedImgType[] = [];

    if (!data.category) {
      setIsLoading(false);
      return toast.error("Category is not selected");
    }
    if (!data.images || data.images.length === 0) {
      setIsLoading(false);
      return toast.error("No selected image");
    }

    const handleUploadImage = async () => {
      toast("Creating product.Please wait...");
      try {
        for (const item of data.images) {
          if (item.image) {
            const filename = new Date() + "-" + item.image.name;
            const storage = getStorage(firebaseApp);
            const storageRef = ref(storage, `products/${filename}`);
            const uploadTask = uploadBytesResumable(storageRef, item.name);

            await new Promise<void>((resolve, reject) => {
              uploadTask.on(
                "state_changed",
                (snapshot) => {
                  const progress =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                  console.log("Upload is " + progress + "% done");
                  switch (snapshot.state) {
                    case "paused":
                      console.log("Upload is paused");
                      break;
                    case "running":
                      console.log("Upload is running");
                      break;
                  }
                },
                (error) => {
                  setIsLoading(false);
                  console.log("Error uploading image", error);
                  reject(error);
                },
                () => {
                  getDownloadURL(uploadTask.snapshot.ref)
                    .then((downloadURL) => {
                      uploadedImages.push({ ...item, image: downloadURL });
                      console.log("File available at", downloadURL);
                      resolve();
                    })
                    .catch((error) => {
                      console.log("Error getting download URL", error);
                      reject(error);
                    });
                }
              );
            });
          }
        }
      } catch (err: any) {
        setIsLoading(false);
        toast.error("Error handling image upload", err);
      }
    };
    await handleUploadImage();
    const productData = { ...data, images: uploadedImages };
    console.log(productData, "productData..");

    axios
      .post("/api/product", productData)
      .then(() => {
        toast.success("Product Created");
        setIsProductCreated(true);
        router.refresh();
      })
      .catch((error) => {
        toast.error(
          "Something went wrong when saving the product to db",
          error
        );
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  return (
    <>
      <Heading title="Add a Product" />
      <Input
        id="name"
        label="Name"
        register={register}
        errors={errors}
        required
        disabled={isLoading}
      />
      <Input
        id="price"
        label="Price"
        type="number"
        register={register}
        errors={errors}
        required
        disabled={isLoading}
      />
      <Input
        id="brand"
        label="Brand"
        register={register}
        errors={errors}
        required
        disabled={isLoading}
      />
      <TextArea
        id="description"
        label="Discription"
        register={register}
        errors={errors}
        required
        disabled={isLoading}
      />
      <CustomCheckbox
        id="inStock"
        register={register}
        label="This product is in stock"
      />
      <div className="w-full font-medium">
        <div className="font-semibold mb-2">Select a category</div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 overflow-y-auto max-h-[50vh]">
          {categories.map((item) => {
            if (item.label === "All") return null;
            return (
              <div key={item.label} className="col-span">
                <CategoryInput
                  label={item.label}
                  icon={item.icon}
                  selected={category === item.label}
                  onClick={(category) => setCustomValue("category", category)}
                />
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex flex-col flex-wrap gap-4 w-full">
        <div>
          <div className="font-bold">
            Select the available product colors and upload their images
          </div>
          <div className="text-sm">
            You must upload an image for each of the color selected otherwise
            your color section will be ignored
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {colors.map((item: any, index) => {
            return (
              <SelectColor
                key={index}
                item={item}
                addImageToState={addImageToState}
                removeImageFromState={removeImageFromState}
                isProductCreated={isProductCreated}
              />
            );
          })}
        </div>
        <Button
          label={isLoading ? "Loading..." : "Add Product"}
          onClick={handleSubmit(onSubmit)}
        />
      </div>
    </>
  );
};

export default AddProductForm;
