"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

type UrlRoute = {
  path: string;
  title: string;
};

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
    path: "/interactive-otp-input",
    title: "Day 02",
  },
  {
    path: "/card-transition",
    title: "Day 03",
  },
  {
    path: "/interactive-folder",
    title: "Day 04",
  },
  {
    path: "/progressive-input-stack",
    title: "Day 05",
  },
  {
    path: "/wrap-overlay",
    title: "Day 06",
  },
  {
    path: "/autofill-ai",
    title: "Day 07",
  },
];

const Navbar = () => {
  const pathname = usePathname();

  return (
    <div className="mx-2 sm:mx-4 flex justify-between items-center py-4 font-main">
      <Image
        src="/peerlist.png"
        alt="peerlist"
        width={32}
        height={32}
        className="rounded-full"
      />
      <div className="flex items-center sm:justify-center gap-4 sm:gap-10 overflow-x-auto mx-4 py-2">
        {routes.map((route) => {
          return (
            <Link
              key={route.title}
              href={route.path}
              className={`${
                pathname === route.path ? "" : "hover:text-foreground/50"
              } relative rounded-full px-3 py-1.5 whitespace-nowrap`}
            >
              {pathname === route.path && (
                <motion.div
                  layoutId="active-pill"
                  className="absolute inset-0 app-shadow"
                  style={{ borderRadius: 9999 }}
                ></motion.div>
              )}
              <span className="relative z-20">{route.title}</span>
            </Link>
          );
        })}
      </div>
      <Link
        href="https://x.com/Ram720800"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Image
          src="/me.jpeg"
          alt="ram"
          width={32}
          height={32}
          className="rounded-full"
        />
      </Link>
    </div>
  );
};

export default Navbar;
