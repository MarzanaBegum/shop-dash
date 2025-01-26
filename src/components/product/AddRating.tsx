"use client";
import { Order, Product, Review } from "@prisma/client";
import { SafeUser } from "../../../type";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues, useForm, SubmitHandler } from "react-hook-form";
import Heading from "../Heading";
import { Rating } from "@mui/material";
import Input from "../inputs/Input";
import Button from "../Button";
import toast from "react-hot-toast";
import axios from "axios";

interface AddRatingProps {
  product: Product & {
    reviews: Review[];
  };
  user:
    | (SafeUser & {
        order: Order[];
      })
    | null;
}

const AddRating: React.FC<AddRatingProps> = ({ product, user }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    setValue,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({ defaultValues: { comment: "", rating: 0 } });

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldValidate: true,
      shouldTouch: true,
    });
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);
    if (data.rating === 0) {
      setIsLoading(false);
      toast.error("No rating selected");
    }
    const ratingData = {
      comment: data.comment,
      rating: data.rating,
      userId: user?.id,
      product,
    };
    axios
      .post("/api/rating", ratingData)
      .then(() => {
        toast.success("Rating successfull");
        router.refresh();
        reset();
      })
      .catch((err) => {
        console.log(err, "EEEE");
        toast.error("Something went wrong");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  if (!user || !product) return null;

  const deliveredOrder = user?.order?.some((order: any) =>
    order.products.some(
      (prod: any) =>
        prod.id === product.id && order.deliveryStatus === "delivered"
    )
  );

  const userReview = product.reviews.find(
    (review: Review) => review.userId === user.id
  );

  if (userReview || !deliveredOrder) return null;
  return (
    <div className="flex flex-col gap-2 max-w-[500px]">
      <Heading title="Rate this product" />
      <Rating
        onChange={(event, newValue) => {
          setCustomValue("rating", newValue);
        }}
      />
      <Input
        id="comment"
        label="Comment"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Button
        label={isLoading ? "Loading..." : "Rate Product"}
        onClick={handleSubmit(onSubmit)}
      />
    </div>
  );
};

export default AddRating;
