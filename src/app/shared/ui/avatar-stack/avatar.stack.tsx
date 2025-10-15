import Image from "next/image";
import React from "react";
import { StarRating } from "../star-rating";

type AvatarStackProps = {
  images: string[];
  size?: number;
  rating?: number;
};

const AvatarStack: React.FC<AvatarStackProps> = ({
  images,
  size = 50,
  rating = 4.9,
}) => {
  return (
    <div className="flex items-center">
      <div className="flex -space-x-6">
        {images.slice(0, 4).map((src, i) => (
          <Image
            key={i}
            src={src}
            alt={`avatar-${i}`}
            style={{ width: size, height: size }}
            width={9}
            height={9}
            className="rounded-full border-4 border-slate-100 object-cover"
          />
        ))}
      </div>
      <div className="ml-4 text-sm">
        <div className="text-[#2B2D42] font-medium text-lg flex items-center gap-2">
          Excellent user reviews <StarRating rating={rating} size="text-lg" />
        </div>
        <div className="text-[#2B2D42] text-lg">
          <span className="font-bold">12024</span> IQ tests taken today!
        </div>
      </div>
    </div>
  );
};

export default AvatarStack;
