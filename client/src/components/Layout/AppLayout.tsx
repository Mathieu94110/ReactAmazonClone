import Header from "../Header/Header";

const AppLayout = ({ children }: { children: JSX.Element }) => {
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
