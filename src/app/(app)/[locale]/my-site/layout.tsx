import { LayoutModule } from "@/app/modules";
import { type FC, type ReactNode } from "react";

interface IProps {
  children: ReactNode;
}

// component
const RootLayout: FC<Readonly<IProps>> = (props) => {
  const { children } = props;

  return <LayoutModule>{children}</LayoutModule>;
};

export default RootLayout;
