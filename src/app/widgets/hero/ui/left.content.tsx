import { AvatarStack, CustomLink } from "@/app/shared";
import { Icon } from "@iconify/react";
import React from "react";

const LeftContent: React.FC = () => {
  return (
    <div className="max-w-xl gap-4 flex flex-col">
      <h1 className="text-5xl font-extrabold inline-block bg-gradient-to-r from-[#2C3345] to-[#424D6A] bg-clip-text text-transparent">
        Want to Know Your
        <span className="font-extrabold text-5xl mt-4 inline-block bg-gradient-to-r from-[#27415F] via-[#007AFF] to-[#007AFF] bg-clip-text pr-2 text-transparent">
          Real IQ Score?
        </span>
      </h1>

      <p className="text-lg/tight text-[#2B2D42]">
        Take our IQ test and unlock your path{" "}
        <span className="inline-block">to self-discovery and development</span>
      </p>

      <div className="flex items-center gap-6 mt-4 flex-col md:flex-row">
        <CustomLink
          className="flex items-center justify-center px-8 py-2.5 rounded-xl w-full md:w-auto"
          type="primary"
          href="/"
          fullWidth={true}
        >
          Start IQ Test Now{" "}
          <Icon
            icon="material-symbols:arrow-forward"
            className="hidden md:inline-block ml-6 text-lg"
            aria-hidden="true"
          />
        </CustomLink>
        <CustomLink
          className="flex items-center justify-center px-8 py-2.5 rounded-xl w-full md:w-auto"
          type="secondary"
          href="/"
          fullWidth={true}
        >
          How It Works
        </CustomLink>
      </div>

      <div className="mt-4">
        <AvatarStack
          images={[
            "/avatars/a1.png",
            "/avatars/a2.png",
            "/avatars/a1.png",
            "/avatars/a3.png",
          ]}
        />
      </div>
    </div>
  );
};

export default LeftContent;
