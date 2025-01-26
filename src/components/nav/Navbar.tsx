import Link from "next/link";
import { Redressed } from "next/font/google";
import React from "react";
import Container from "../Container";
import CartCount from "./CartCount";
import UserMenu from "./UserMenu";
import { getCurrentUser } from "../../../actions/getCurrentUser";
import Categories from "./Categories";
import SearchBar from "./SearchBar";

const redressed = Redressed({ subsets: ["latin"], weight: ["400"] });

const Navbar = async () => {
  const currentUser = await getCurrentUser();

  return (
    <div className="sticky top-0 z-30 w-full bg-slate-200 shadow-sm">
      <div className="py-4 border-b-[1px] border-b-slate-100">
        <Container>
          <div className="flex items-center justify-between gap-3 md:gap-0">
            <Link
              href="/"
              className={`${redressed.className} font-bold text-2xl`}
            >
              Shop Dash
            </Link>
            <div className="hidden md:block">
              <SearchBar />
            </div>
            <div className="flex gap-8 md:gap-12 items-center">
              <CartCount />
              <UserMenu currentUser={currentUser} />
            </div>
          </div>
        </Container>
      </div>
      <Categories />
    </div>
  );
};

export default Navbar;
