import Header from "../Header/Header";

const AppLayout = ({ children }) => {
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
