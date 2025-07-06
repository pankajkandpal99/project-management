import React from "react";
import { NavbarItem } from "./NavbarItem";
import { Link } from "react-router-dom";
import { NavbarItemType } from "../../types/navbarTypes";
import AuthButtons from "../auth/AuthButtons";
import MobileMenu from "./MobileMenu";
import { useAdminAuth } from "../../hooks/useAdminAuth";

interface iAppNavbarProps {
  items: NavbarItemType[];
}

export const Navbar: React.FC<iAppNavbarProps> = ({ items }) => {
  const { isAdmin } = useAdminAuth();
  const filteredItems = items.filter(
    (item) => item.href !== "/admin-dashboard" || isAdmin
  );

  return (
    <nav className="sticky top-0 z-40 bg-white/95 dark:bg-[#0a101f]/95 backdrop-blur-md py-3 border-b border-gray-100 dark:border-[#1e293b]/30 shadow-sm dark:shadow-none">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 group">
          <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#071579] to-[#3694FF] transition-all duration-300 group-hover:from-[#3694FF] group-hover:to-[#071579]">
            ProManagement
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-1">
          {filteredItems.map((item) => (
            <NavbarItem key={item.id} item={item} />
          ))}
        </div>

        <div className="flex items-center gap-3 lg:gap-4">
          {/* Desktop Auth Buttons */}
          <div className="hidden lg:flex">
            <AuthButtons />
          </div>

          {/* Mobile Menu */}
          <div className="lg:hidden">
            <MobileMenu items={filteredItems} />
          </div>
        </div>
      </div>
    </nav>
  );
};
