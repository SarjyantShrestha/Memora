import { Outlet } from "react-router";
import memoralogo from "../../assets/Memoralogo.svg";
import SideMenu from "../Sidemenu";

const Layout = () => {
  return (
    <div className="flex h-screen bg-white">
      {/* Sidebar */}
      <div className="w-72 bg-white py-8 px-8 text-gray-400 hidden lg:flex flex-col">
        <h2 className="text-3xl font-semibold mb-14 text-black uppercase text-left flex items-center">
          <img src={memoralogo} alt="Memora Logo" className="h-14 w-14 mr-3" />
          Memora
        </h2>
        <SideMenu />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 bg-gray-100 p-10 mt-28 rounded-tl-2xl overflow-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
