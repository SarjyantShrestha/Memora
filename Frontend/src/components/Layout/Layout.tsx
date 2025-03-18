import { useState } from "react";
import { Outlet } from "react-router";
import memoralogo from "../../assets/Memoralogo.svg";
import SideMenu from "../Sidemenu";
import { Search, Menu, ChevronRight, ChevronLeft } from "lucide-react";
import { Input, Select } from "@mantine/core";
import { useAppContext } from "../../context/Contexts";

const Layout = () => {
  const {
    sortBy,
    orderBy,
    setSortBy,
    setOrderBy,
    searchQuery,
    setSearchQuery,
    page,
    setPage,
  } = useAppContext();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="flex h-screen bg-white relative">
      <div
        className={`fixed lg:relative lg:w-80 bg-white py-8 px-8 text-gray-400 flex flex-col z-20 h-full
                   transition-all duration-300 ease-in-out
                   ${isMobileMenuOpen ? "left-0" : "-left-full lg:left-0"}`}
      >
        <div className="flex justify-between items-center mb-14">
          <h2 className="text-3xl font-semibold text-black uppercase text-left flex items-center">
            <img
              src={memoralogo}
              alt="Memora Logo"
              className="h-14 w-14 mr-3"
            />
            Memora
          </h2>
        </div>

        <SideMenu />
      </div>

      {/* Floating Search Bar */}
      <div className="absolute top-6 lg:top-8 left-0 right-0 px-4 lg:px-8 bg-white lg:left-80 z-0">
        {/* Stack everything vertically on mobile, horizontal on larger screens */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-center lg:gap-16 gap-1">
          <div className="flex justify-center gap-4 items-center">
            <button
              className="lg:hidden p-2 bg-gray-200 rounded-sm"
              onClick={toggleMobileMenu}
            >
              <Menu size={24} />
            </button>

            {/* Search input - full width on all screens */}
            <Input
              placeholder="Search notes..."
              leftSection={<Search size={20} />}
              size="sm"
              className="w-lg"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Sort controls - row on mobile, but flex wrapped */}
          <div className="flex flex-wrap items-center justify-end gap-2">
            <Select
              value={sortBy}
              onChange={(value) => setSortBy(value ?? "createdAt")}
              data={[
                { value: "createdAt", label: "Date" },
                { value: "title", label: "Title" },
              ]}
              size="sm"
              className="w-24"
            />
            <Select
              value={orderBy}
              onChange={(value) => setOrderBy(value ?? "DESC")}
              data={[
                { value: "ASC", label: "ASC" },
                { value: "DESC", label: "DES" },
              ]}
              size="sm"
              className="w-24"
            />
          </div>
        </div>
      </div>
      <div className="absolute bottom-5 right-10">
        <button
          onClick={() => setPage((prevPage) => Math.max(1, prevPage - 1))} // Decrement page (min 1)
          className="bg-blue-200 p-2 rounded-md cursor-pointer"
        >
          <ChevronLeft size={10} />
        </button>

        <span className="text-gray-700 text-sm mx-2">{page}</span>

        <button
          onClick={() => setPage((prevPage) => prevPage + 1)} // Increment page
          className="bg-blue-200 p-2 rounded-sm cursor-pointer"
        >
          <ChevronRight size={10} />
        </button>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 bg-gray-100 p-8 mt-28 rounded-tl-2xl overflow-auto">
        <Outlet />
      </div>

      {/* Mobile Menu Overlay - with fade animation */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50  z-10 transition-opacity duration-300 ease-in-out"
          onClick={toggleMobileMenu}
        />
      )}
    </div>
  );
};

export default Layout;
