import React, { useState } from "react";
import { FaStar } from "react-icons/fa";

interface RatingProps {
  totalStars?: number;
  initialRating?: number;
  isHover?: boolean;
  onRatingChange?: (rating: number) => void;
}

const Rating: React.FC<RatingProps> = ({
  totalStars = 5,
  initialRating = 0,
  isHover=false,
  onRatingChange,
}) => {
  const [rating, setRating] = useState(initialRating);
  const [hover, setHover] = useState(0);

  const handleClick = (rate: number) => {
    setRating(rate);
    if (onRatingChange) onRatingChange(rate);
  };

  return (
    <div className="flex">
      {Array.from({ length: totalStars }, (_, index) => {
        const starIndex = index + 1;
        return (
          <button
            key={starIndex}
            type="button"
            className={`focus:outline-none transition-colors duration-200 ${
              starIndex <= (hover || rating)
                ? "text-yellow-500"
                : "text-gray-400"
            }`}
            onClick={() => isHover && handleClick(starIndex)}
            onMouseEnter={() => isHover && setHover(starIndex)}
            onMouseLeave={() => isHover && setHover(0)}
          >
            <FaStar size={24} />
          </button>
        );
      })}
    </div>
  );
};

export default Rating;
