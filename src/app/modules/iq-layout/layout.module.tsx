import { Footer } from "@/app/widgets/footer";
import { IqTestHeader } from "@/app/widgets/iq-test-header";
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
    <div className="min-h-screen h-full w-full bg-slate-100">
      <IqTestHeader />
      <div className="max-w-7xl mx-auto w-full h-full">{children}</div>
      <Footer />
    </div>
  );
};

export default LayoutModule;
