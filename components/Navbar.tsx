"use client";

import Image from "next/image";

type UrlRoute = {
    path: string;
    title: string;
}

const routes: UrlRoute[] = [
  {
    path: "/",
    title: "Home",
  },
  {
    path: "/animated-avatar-stack",
    title: "Day 01",
  },
  {
    path: "/2",
    title: "Day 02",
  },
  {
    path: "/3",
    title: "Day 03",
  },
  {
    path: "/4",
    title: "Day 04",
  },
  {
    path: "/5",
    title: "Day 05",
  },
  {
    path: "/6",
    title: "Day 06",
  },
  {
    path: "/7",
    title: "Day 07",
  },
];

const Navbar = () => {
  return (
    <div className="mx-2 sm:mx-4 flex justify-between items-center py-4 font-main">
      <Image
        src="/peerlist.png"
        alt="peerlist"
        width={32}
        height={32} 
        className="rounded-full"
      />
      <div className="flex items-center sm:justify-center gap-4 sm:gap-10 overflow-x-auto mx-4">
        {routes.map((route) => {
          return (
            <a
              key={route.path}
              href={route.path}
              className="whitespace-nowrap"
            >
              {route.title}
            </a>
          );
        })}
      </div>
      <Image
        src="/me.jpeg"
        alt="ram"
        width={32}
        height={32}
        className="rounded-full"
      />
    </div>
  );
};

export default Navbar;
