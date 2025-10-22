import { Header } from "@/app/widgets";
import { type FC, type ReactNode } from "react";

// interface
interface IProps {
  children: ReactNode;
}

// component
const LayoutModule: FC<Readonly<IProps>> = async (props) => {
  const { children } = props;

  // return
  return (
    <>
      <Header />
      <div className="max-w-7xl mx-auto w-full h-full">{children}</div>
    </>
  );
};

export default LayoutModule;
