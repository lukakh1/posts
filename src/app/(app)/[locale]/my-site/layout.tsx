import { LayoutModule } from "@/app/modules";
import { type FC, type ReactNode } from "react";

interface IProps {
  children: ReactNode;
  postmodal: ReactNode;
}

const RootLayout: FC<Readonly<IProps>> = (props) => {
  const { children, postmodal } = props;

  return (
    <LayoutModule>
      {postmodal}
      {children}
    </LayoutModule>
  );
};

export default RootLayout;
