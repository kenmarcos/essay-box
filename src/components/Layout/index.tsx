import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <Header />
      <main className="pt-20 min-h-[calc(100vh-64px)] px-4 bg-primary-300">
        <div className="max-w-6xl mx-auto">
          <Outlet />
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Layout;
