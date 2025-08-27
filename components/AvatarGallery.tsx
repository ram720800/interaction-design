"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useRef, useState, useEffect } from "react";

type Person = {
  id: number;
  name: string;
  about: string;
  image: string;
};

const useOutSideClick = (callback: () => void) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    };

    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, [callback]);

  return ref;
};

const people: Person[] = [
  {
    id: 1,
    name: "Akash Bhadange",
    about: "Founder Peerlist",
    image: "/akash.jpg",
  },
  {
    id: 2,
    name: "Harkirat Singh",
    about: "Founder 100xDevs",
    image: "/harkirat.jpg",
  },
  {
    id: 3,
    name: "Theo Browne",
    about: "Founder T3 chat",
    image: "/theo.jpg",
  },
  {
    id: 4,
    name: "Guillermo Rauch",
    about: "Founder Vercel",
    image: "/rauch.jpg",
  },
  {
    id: 5,
    name: "Primagen",
    about: "Youtuber",
    image: "/prime.jpg",
  },
  {
    id: 6,
    name: "Manu Arora",
    about: "Founder Aceternity",
    image: "/manu.jpg",
  },
];

export default function AvatarGallery() {
  return (
    <div className="flex space-x-[-20px]">
      {people.map((person) => (
        <Avatar
          key={person.id}
          src={person.image}
          alt={person.name}
          person={person}
        />
      ))}
    </div>
  );
}

const Avatar = ({
  src,
  alt,
  person,
}: {
  src: string;
  alt: string;
  person: Person;
}) => {
  const [hovered, setHovered] = useState(false);
  const [selected, setSelected] = useState<Person | null>(null);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!hovered) {
        setHovered(true);
      }
    },
    [hovered]
  );

  const handleMouseLeave = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      setHovered(false);
    },
    []
  );

  const ref = useOutSideClick(() => setSelected(null));

  return (
    <div className="relative">
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{
              opacity: 0,
              y: 10,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: 2,
            }}
            transition={{
              duration: 0.2,
            }}
            className="absolute opacity-0 sm:opacity-100 -top-10 left-1/2 -translate-x-1/2 px-2 py-0.5 text-xs whitespace-nowrap rounded-sm tooltip-shadow"
          >
            {person.name}
          </motion.div>
        )}
      </AnimatePresence>
      <motion.button
        onClick={() => setSelected(person)}
        initial={{ scale: 0, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{
          type: "tween",
          stiffness: 200,
          delay: person.id * 0.1,
        }}
      >
        <motion.img
          layoutId={`avatar-${person.id}`}
          onMouseEnter={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          src={src}
          alt={alt}
          whileHover={{
            transition: { duration: 0.2 },
            zIndex: 10,
            y: -20,
          }}
          className="w-14 h-14 sm:w-16 sm:h-16 rounded-full border-4 border-gray2 cursor-pointer"
        />
      </motion.button>
      <AnimatePresence>
        {selected && (
          <>
            <motion.div
              ref={ref}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelected(null)}
            />

            <motion.div
              className="fixed inset-0 flex items-center justify-center z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="relative flex items-center justify-between border border-white/20 bg-white/10 backdrop-filter backdrop-blur-md px-4 pt-6 pb-4 rounded-3xl block-shadow w-auto text-start">
                <motion.img
                  src={selected.image}
                  alt={selected.name}
                  className="w-32 h-32 rounded-full mx-auto"
                  layoutId={`avatar-${selected.id}`}
                  transition={{
                    type: "tween",
                    duration: 0.4,
                    ease: "circOut",
                  }}
                />
                <div className="px-2">
                  <motion.h2
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-xl font-bold"
                  >
                    {selected.name}
                  </motion.h2>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-sm mt-1"
                  >
                    {selected.about}
                  </motion.p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
