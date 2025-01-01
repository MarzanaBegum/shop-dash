import Link from "next/link";
import { Redressed } from "next/font/google";
import React from "react";
import Container from "../Container";
import CartCount from "./CartCount";


const redressed = Redressed({ subsets: ["latin"], weight: ["400"] });

const Navbar = () => {
  return (
    <div className="sticky top-0 z-30 w-full bg-slate-200 shadow-sm">
      <div className="py-4 border-b-[1px] border-b-slate-100">
        <Container>
          <div className="flex items-center justify-between gap-3 md:gap-0">
            <Link href="/" className={`${redressed.className} font-bold text-2xl`}>Shop Dash</Link>
            <div className="hidden md:block">Search</div>
            <div className="flex gap-8 md:gap-12 items-center">
              <CartCount/>
              <div>Usermenu</div>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Navbar;
