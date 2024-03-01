import Header from "../Header/Header";

const AppLayout = ({ children }: { children: JSX.Element }) => {
  return (
    <>
      <div>
        <Header />
      </div>
      <main className="flex-column h-100">{children}</main>
    </>
  );
};

export default AppLayout;
