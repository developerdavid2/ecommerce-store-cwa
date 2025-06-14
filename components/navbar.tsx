import React from "react";
import Container from "@/components/ui/container";
import Link from "next/link";
import MainNav from "@/components/main-nav";
import { ModeToggle } from "@/components/ui/modletoggle";
import getCategories from "@/actions/get-categories";
import NavbarActions from "@/components/navbar-actions";

const Navbar = async () => {
  const categories = await getCategories();

  // Make sure categories is an array
  const categoriesArray = Array.isArray(categories) ? categories : [];

  return (
    <div className="border-b">
      <Container>
        <div className="relative px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="ml-4 flex lg:ml-0 gap-x-2">
              <p className="font-bold text-xl">STORE</p>
            </Link>

            <MainNav data={categoriesArray} />
          </div>

          <div className="flex items-center gap-4">
            <ModeToggle />
            <NavbarActions />
          </div>
        </div>
      </Container>
    </div>
  );
};
export default Navbar;
