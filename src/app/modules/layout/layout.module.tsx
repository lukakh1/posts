import { Header } from "@/app/features";
import { type FC, type ReactNode } from "react";

interface IProps {
  children: ReactNode;
}

const LayoutModule: FC<Readonly<IProps>> = async (props) => {
  const { children } = props;

  return (
    <>
      <Header />
      <div className="max-w-7xl mx-auto w-full h-full">{children}</div>
    </>
  );
};

export default LayoutModule;
