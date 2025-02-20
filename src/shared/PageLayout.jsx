import Header from "@/shared/Header";

const PageLayout = ({ children }) => {
  return (
    <div id="page" className="min-h-screen">
      <div className="max-w-[90%] md:max-w-[80%] mx-auto pt-5">
        <Header />
        <div>{children}</div>
      </div>
    </div>
  );
};

export default PageLayout;
