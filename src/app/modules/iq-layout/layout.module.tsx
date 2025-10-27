import { Footer, IqTestHeader } from "@/app/features";
import { type FC, type ReactNode } from "react";

interface IProps {
  children: ReactNode;
}

const LayoutModule: FC<Readonly<IProps>> = async (props) => {
  const { children } = props;

  return (
    <div className="min-h-screen h-full w-full bg-slate-100">
      <IqTestHeader />
      <div className="max-w-7xl mx-auto w-full h-full">{children}</div>
      <Footer />
    </div>
  );
};

export default LayoutModule;
