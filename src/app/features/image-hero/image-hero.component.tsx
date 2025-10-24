import React from "react";
import ImageHeroLeftContent from "./image-hero-left-content.component";
import ImageHeroRightContent from "./image-hero-right-content.component";
import { ImageHeroProps } from "./image-hero.types";

const ImageHero: React.FC<ImageHeroProps> = ({ heroData }) => {
  return (
    <section className={`py-10`}>
      <div className="container mx-auto flex flex-col-reverse lg:flex-row items-center gap-12 px-5 md:px-3 xl:px-0">
        <div className="lg:w-1/2 w-full">
          <ImageHeroLeftContent heroData={heroData} />
        </div>

        <div className="lg:w-1/2 w-full flex justify-center">
          <ImageHeroRightContent heroData={heroData} />
        </div>
      </div>
    </section>
  );
};

export default ImageHero;
