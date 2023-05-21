"use client";

import Link from "next/link";
import Image from "next/image";
import HeaderAction from "./HeaderActions";

const Header = () => {
  return (
    <nav
      className="relative flex w-full items-center justify-evenly bg-black  py-5 px-8 text-2xl text-white shadow-lg hover:text-slate-200 focus:text-neutral-700 dark:bg-neutral-600 dark:text-neutral-200 md:flex-wrap md:justify-start"
      data-te-navbar-ref
    >
      <div className="flex w-full flex-wrap items-center justify-between px-10">
        <div className="flex items-center">
          <div
            className="!visible hidden grow basis-[200%] items-center lg:!flex lg:basis-auto"
            id="navbarSupportedContentY"
            data-te-collapse-item
          >
            <HeaderAction />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
