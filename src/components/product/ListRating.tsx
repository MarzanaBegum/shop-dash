"use client";

import moment from "moment";
import Heading from "../Heading";
import Avatar from "../Avatar";
import { Rating } from "@mui/material";
import { Product, Review, User } from "@prisma/client";

interface ListRatingProps {
  product: Product & {
    reviews: (Review & { user: User })[];
  };
}
const ListRating: React.FC<ListRatingProps> = ({ product }) => {
  if (product?.reviews.length === 0) return null;
  return (
    <div>
      <Heading title="Product Review" />
      <div className="mt-2 text-sm">
        {product?.reviews &&
          product?.reviews.map((review) => {
            return (
              <div key={review.id} className="max-w-[300px]">
                <div className="flex gap-2 items-center">
                  <Avatar src={review.user.image} />
                  <div className="font-semibold">{review?.user.name}</div>
                  <div className="font-light">
                    {moment(review.createdAt).fromNow()}
                  </div>
                </div>
                <div className="mt-2">
                  <Rating value={review.rating} readOnly />
                  <div className="ml-2 mt-2">{review.comment}</div>
                  <hr className="mt-4 mb-4" />
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default ListRating;
