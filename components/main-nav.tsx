"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Category } from "@/types";

interface MainNavProps {
  data: Category[];
}

const MainNav: React.FC<MainNavProps> = ({ data }) => {
  const pathname = usePathname();

  const routes = data.map((route) => ({
    href: `/categories/${route.id}`,
    label: route.name,
    active: pathname === `/categories/${route.id}`,
  }));

  return (
    <nav className="mx-6 flex items-center space-x-4 lg:space-x-6">
      {routes.map((route) => (
        <Link
          href={route.href}
          key={route.href}
          className="text-sm font-medium transition-colors text-gray-500 dark:text-white hover:text-gray-700"
        >
          {route.label}
        </Link>
      ))}
    </nav>
  );
};
export default MainNav;
