import { ReactNode } from "react";
import Header from "../Header/Header";

const AppLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <div>
        <Header />
      </div>
      <main>{children}</main>
    </>
  );
};

export default AppLayout;
