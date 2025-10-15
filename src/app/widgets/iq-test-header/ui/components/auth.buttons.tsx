import { CustomLink } from "@/app/shared/ui";

export const AuthButtons = () => {
  return (
    <div className="flex gap-x-3 items-center">
      <CustomLink href="/" type="secondary">
        Log In
      </CustomLink>
      <CustomLink href="/" type="primary">
        Start Test
      </CustomLink>
    </div>
  );
};
