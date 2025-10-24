import Image from "next/image";
import React from "react";
import { HeroData } from "./image-hero.types";

interface ImageHeroRightContentProps {
  heroData: HeroData;
  className?: string;
}

const ImageHeroRightContent: React.FC<ImageHeroRightContentProps> = ({
  heroData,
  className,
}) => {
  const { imageUrl, imageAlt = "Hero image" } = heroData;

  return (
    <div className={`w-full max-w-lg ${className || ""}`}>
      <div className="relative w-full h-[320px]">
        <Image src={imageUrl} alt={imageAlt} fill className="object-contain" />
      </div>
    </div>
  );
};

export default ImageHeroRightContent;
