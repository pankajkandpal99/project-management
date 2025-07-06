import React from "react";
import { Link, useLocation } from "react-router-dom";
import { NavbarItemType } from "../../types/navbarTypes";
import { cn } from "../../lib/utils";
import { motion } from "framer-motion";

interface NavbarItemProps {
  item: NavbarItemType;
  isMobile?: boolean;
  onClick?: () => void;
}

export const NavbarItem: React.FC<NavbarItemProps> = ({
  item,
  isMobile = false,
  onClick,
}) => {
  const location = useLocation();
  const isActive = location.pathname === item.href;

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={cn("relative", isMobile ? "w-full" : "inline-block")}
    >
      <Link
        to={item.href}
        onClick={onClick}
        className={cn(
          "block px-4 py-2 text-sm font-medium transition-all duration-200",
          "hover:bg-gray-50/80 dark:hover:bg-[#121a2a]/60 rounded-md",
          isActive
            ? "text-[#071579] dark:text-[#6FFFB4] font-semibold"
            : "text-gray-700 dark:text-[#94a3b8] hover:text-[#071579] dark:hover:text-white",
          isMobile ? "text-base py-2.5 px-5" : ""
        )}
        aria-current={isActive ? "page" : undefined}
      >
        {item.label}
        {isActive && (
          <motion.div
            className="absolute bottom-0 left-1/2 w-4/5 h-0.5 bg-[#071579] dark:bg-[#6FFFB4] -translate-x-1/2 rounded-full"
            layoutId="underline"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.3, type: "spring" }}
          />
        )}
      </Link>
    </motion.div>
  );
};
