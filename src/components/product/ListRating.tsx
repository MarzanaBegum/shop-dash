"use client";

import moment from "moment";
import Heading from "../Heading";
import Rating from "./Rating";
import Avatar from "../Avatar";
import { productType, ReviewsType } from "../../../utils/constant";

interface ListRatingProps {
  product?: productType;
}
const ListRating: React.FC<ListRatingProps> = ({ product }) => {
  return (
    <div>
      <Heading title="Product Review" />
      <div className="mt-2 text-sm">
        {product?.reviews &&
          product?.reviews.map((review: ReviewsType) => {
            return (
              <div key={review.id} className="max-w-[300px]">
                <div className="flex gap-2 items-center">
                  <Avatar src={review.user.image} />
                  <div className="font-semibold">{review?.user.name}</div>
                  <div className="font-light">
                    {moment(review.createdDate).fromNow()}
                  </div>
                </div>
                <div className="mt-2">
                  <Rating initialRating={review.rating} />
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
