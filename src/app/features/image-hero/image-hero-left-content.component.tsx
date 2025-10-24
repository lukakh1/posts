import { AvatarStack, CustomLink } from "@/app/shared";
import { Icon } from "@iconify/react";
import React from "react";
import { HeroData } from "./image-hero.types";

const ImageHeroLeftContent: React.FC<{
  heroData: HeroData;
}> = ({ heroData }) => {
  const { title, titleHighlight, description, links, showAvatars, avatarData } =
    heroData;

  return (
    <div className="max-w-xl gap-4 flex flex-col">
      <h1 className="text-5xl font-extrabold inline-block bg-gradient-to-r from-[#2C3345] to-[#424D6A] bg-clip-text text-transparent">
        {title}
        {titleHighlight && (
          <span className="font-extrabold text-5xl mt-4 inline-block bg-gradient-to-r from-[#27415F] via-[#007AFF] to-[#007AFF] bg-clip-text pr-2 text-transparent">
            {titleHighlight}
          </span>
        )}
      </h1>

      <p className="text-lg/tight text-[#2B2D42]">{description}</p>

      <div className="flex items-center gap-6 mt-4 flex-col md:flex-row">
        {links.map((link, index) => (
          <CustomLink
            key={index}
            className="flex items-center justify-center px-8 py-2.5 rounded-xl w-full md:w-auto"
            type={link.type}
            href={link.href}
            fullWidth={true}
          >
            {link.text}
            {link.type === "primary" && (
              <Icon
                icon="material-symbols:arrow-forward"
                className="hidden md:inline-block ml-6 text-lg"
                aria-hidden="true"
              />
            )}
          </CustomLink>
        ))}
      </div>

      {showAvatars && avatarData && (
        <div className="mt-4">
          <AvatarStack images={avatarData.images} rating={avatarData.rating} />
        </div>
      )}
    </div>
  );
};

export default ImageHeroLeftContent;
