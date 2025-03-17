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
        className={`${isMobileMenuOpen ? "hidden" : " "} lg:hidden fixed top-8 left-8 z-30 p-2 rounded-md bg-white shadow-md`}
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
        </div>

        <SideMenu />
      </div>

      {/* Floating Search Bar */}
      <div className="absolute top-0 left-0 right-0 px-4 lg:px-8 py-4 lg:py-[2.2rem] bg-white lg:left-80 z-0">
        {/* Stack everything vertically on mobile, horizontal on larger screens */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          {/* Search input - full width on all screens */}
          <div className="">
            <Input
              placeholder="Search notes..."
              leftSection={<Search size={20} />}
              size="md"
              className="w-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Sort controls - row on mobile, but flex wrapped */}
          <div className="flex flex-wrap items-center gap-2">
            <p className="text-sm font-medium mr-2">SortBy:</p>
            <div className="flex flex-wrap gap-2 flex-grow">
              <Select
                value={sortBy}
                onChange={(value) => setSortBy(value ?? "createdAt")}
                data={[
                  { value: "createdAt", label: "Date Created" },
                  { value: "title", label: "Title" },
                ]}
                size="sm"
                className="min-w-[120px]"
              />
              <Select
                value={orderBy}
                onChange={(value) => setOrderBy(value ?? "DESC")}
                data={[
                  { value: "ASC", label: "Ascending" },
                  { value: "DESC", label: "Descending" },
                ]}
                size="sm"
                className="min-w-[120px]"
              />
            </div>
          </div>

          {/* User info and logout - always at the bottom on mobile, right-aligned on larger screens */}
          {/*<div className="flex items-center justify-between md:justify-end w-full md:w-auto mt-2 md:mt-0">
            {name && (
              <span className="text-gray-700 font-semibold text-sm lg:text-base mr-2 lg:mr-4">
                Hello, {name}
              </span>
            )}
            <Button color="red" size="sm" onClick={logout}>
              Logout
            </Button>
          </div>*/}
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
