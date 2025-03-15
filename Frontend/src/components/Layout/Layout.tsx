import { Outlet } from "react-router";
import memoralogo from "../../assets/Memoralogo.svg";
import SideMenu from "../Sidemenu";
import { Search } from "lucide-react";
import { Input, Button } from "@mantine/core";
import { useAppContext } from "../../context/Contexts";

const Layout = () => {
  const { logout, name } = useAppContext();
  return (
    <div className="flex h-screen bg-white relative">
      {/* Sidebar */}
      <div className="w-80 bg-white py-8 px-8 text-gray-400 hidden lg:flex flex-col z-10">
        <h2 className="text-3xl font-semibold mb-14 text-black uppercase text-left flex items-center">
          <img src={memoralogo} alt="Memora Logo" className="h-14 w-14 mr-3" />
          Memora
        </h2>
        <SideMenu />
      </div>

      {/* Floating Search Bar */}
      <div className="absolute top-0 left-0 right-0 px-8 py-[2.2rem] bg-white lg:left-72 lg:right-8 w-[calc(100%-4rem)] lg:w-[calc(100%-18rem)]">
        <div className="flex items-center justify-center">
          <Input
            placeholder="Search notes..."
            leftSection={<Search size={20} />}
            size="md"
            className="ml-auto"
          />
          <div className="ml-auto">
            {/*Display username*/}
            {name && (
              <span className="mr-8 text-gray-700 uppercase font-semibold">
                {name}
              </span>
            )}
            <Button color="red" onClick={logout} className="ml-auto">
              Logout
            </Button>
          </div>
        </div>
        {/* Logout Button */}
      </div>

      {/* Main Content Area */}
      <div className="flex-1 bg-gray-100 p-8 mt-28 rounded-tl-2xl overflow-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
