import { Icon } from "@iconify/react";
import React from "react";

interface StarRatingProps {
  rating: number;
  maxStars?: number;
  size?: string;
  className?: string;
}

export const StarRating: React.FC<StarRatingProps> = ({
  rating,
  maxStars = 5,
  size = "text-lg",
  className = "",
}) => {
  const renderStars = () => {
    const stars = [];

    for (let i = 1; i <= maxStars; i++) {
      const isFilled = i <= Math.floor(rating);
      const isHalfFilled = i === Math.ceil(rating) && rating % 1 !== 0;

      if (isFilled) {
        // Fully filled star
        stars.push(
          <Icon
            key={i}
            icon="material-symbols:star"
            className={`${size} text-yellow-500 ${className}`}
          />
        );
      } else if (isHalfFilled) {
        // Half-filled star
        stars.push(
          <Icon
            key={i}
            icon="material-symbols:star-half"
            className={`${size} text-yellow-500 ${className}`}
          />
        );
      } else {
        // Empty star
        stars.push(
          <Icon
            key={i}
            icon="material-symbols:star-outline"
            className={`${size} text-yellow-500 ${className}`}
          />
        );
      }
    }

    return stars;
  };

  return <div className="flex items-center">{renderStars()}</div>;
};
