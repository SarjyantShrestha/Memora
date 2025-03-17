import { useState, useEffect } from "react";
import { Outlet } from "react-router";
import memoralogo from "../../assets/Memoralogo.svg";
import SideMenu from "../Sidemenu";
import { Search, Menu, X } from "lucide-react";
import { Input, Button, Select } from "@mantine/core";
import { useAppContext } from "../../context/Contexts";
import { jwtDecode } from "jwt-decode";

const Layout = () => {
  const {
    logout,
    name,
    sortBy,
    orderBy,
    setSortBy,
    setOrderBy,
    searchQuery,
    setSearchQuery,
    setName,
  } = useAppContext();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const accessToken = localStorage.getItem("accessToken");
  const decodedToken: any = accessToken ? jwtDecode(accessToken) : null;
  useEffect(() => {
    if (decodedToken?.name) {
      setName(decodedToken.name);
    }
  }, [decodedToken, setName]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="flex h-screen bg-white relative">
      {/* Hamburger Menu Button (Mobile Only) */}
      <button
        className="lg:hidden fixed top-8 left-8 z-30 p-2 rounded-md bg-white shadow-md"
        onClick={toggleMobileMenu}
        aria-label="Toggle menu"
      >
        <Menu size={24} />
      </button>

      {/* Sidebar - Desktop (always visible) & Mobile (conditionally visible with animation) */}
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

          {/* X button inside the header area for better alignment */}
          <button
            className="lg:hidden p-2 rounded-md hover:bg-gray-100"
            onClick={toggleMobileMenu}
            aria-label="Close menu"
          >
            <X size={24} />
          </button>
        </div>

        <SideMenu />
      </div>

      {/* Floating Search Bar */}
      <div className="absolute top-0 left-0 right-0 px-8 py-[2.2rem] bg-white lg:left-72 lg:right-8 w-[calc(100%-4rem)] lg:w-[calc(100%-18rem)] z-0">
        <div className="flex items-center justify-center flex-wrap gap-2">
          <Input
            placeholder="Search notes..."
            leftSection={<Search size={20} />}
            size="md"
            className="ml-0 lg:ml-8 w-full md:w-auto"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          <div className="flex items-center flex-wrap gap-2">
            <p className="mr-2">SortBy:</p>
            <Select
              value={sortBy}
              onChange={(value) => setSortBy(value ?? "createdAt")}
              data={[
                { value: "createdAt", label: "Date Created" },
                { value: "title", label: "Title" },
              ]}
            />
            <Select
              value={orderBy}
              onChange={(value) => setOrderBy(value ?? "DESC")}
              data={[
                { value: "ASC", label: "Ascending" },
                { value: "DESC", label: "Descending" },
              ]}
              className="ml-0 lg:ml-2"
            />
          </div>

          <div className="ml-0 lg:ml-auto mt-2 lg:mt-0 w-full lg:w-auto flex justify-end">
            {name && (
              <span className="mr-4 text-gray-700 font-semibold">
                Hello, {name}
              </span>
            )}
            <Button color="red" onClick={logout}>
              Logout
            </Button>
          </div>
        </div>
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
