"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Delete } from "@/components/Delete";
import { cn } from "@/utils/cn";

type Inbox = {
  id: number;
  text: string;
  label: string;
  image: string;
};

const checkItems: Inbox[] = [
  {
    id: 1,
    text: "Apple",
    label:
      "Say hello to the new iPhone 16 lineup now powered by Apple Intelligence",
    image: "/apple.png",
  },
  {
    id: 2,
    text: "Tom Holland",
    label: "Tom Holland is wondering if you've seen No Way Home yet",
    image: "/tom.jpg",
  },

  {
    id: 3,
    text: "Flighty",
    label:
      "Ready for your flight to LA? Track all the most important stats with Flighty",
    image: "/flighty.jpg",
  },
  {
    id: 4,
    text: "Peerlist",
    label:
      "Discover and connect with professionals who share your interests on Peerlist",
    image: "/peerlist.png",
  },
];

const WrapOverlay = () => {
  const [items, setItems] = useState(checkItems);
  const [checkedItems, setCheckedItems] = useState(
    Array(checkItems.length).fill(false)
  );
  const [shakingItem, setShakingItem] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleToggle = (index: any) => {
    const updated = [...checkedItems];
    updated[index] = !updated[index];
    setCheckedItems(updated);

    setShakingItem(index);
    setTimeout(() => {
      setShakingItem(null);
    }, 500);
  };

  const handleDeleteConfirmed = () => {
    const newItems = items.filter((_, index) => !checkedItems[index]);
    setItems(newItems);
    setCheckedItems(Array(newItems.length).fill(false));
    setShowConfirm(false);
  };

  const numSelected = checkedItems.filter(Boolean).length;

  const shakeAnimation = {
    shake: {
      x: [-1, 1, -0.5, 0.5, 0],
      transition: { duration: 0.4 },
    },
  };

  const gradientStyle = {
    backgroundImage: `radial-gradient(circle at 12% 24%, #F5AA41, transparent 70%),
    radial-gradient(circle at 70% 26%, #FF607F, transparent 70%),
    radial-gradient(circle at 100% 80%, #CCC1F0, transparent 70%),
    radial-gradient(circle at 10% 70%, #32ADE6, transparent 70%)`,
  };

  return (
    <div className="relative w-[100%] bg-folder p-4 rounded-2xl font-geist">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">
          Inbox {numSelected > 0 && `(${numSelected})`}
        </h1>
        <motion.button
          layoutId="wrap-overlay"
          onClick={() => setShowConfirm(true)}
          className="p-1.5 rounded-full cursor-pointer"
          style={gradientStyle}
        >
          <motion.div layoutId="wrap-delete">
            <Delete />
          </motion.div>
        </motion.button>
      </div>
      <motion.div
        initial={false}
        transition={{ duration: 0.3 }}
        className="space-y-4 my-4"
      >
        {items.map((item, index) => {
          const isChecked = checkedItems[index];
          return (
            <div
              key={item.id}
              className="flex flex-row-reverse items-start justify-between cursor-pointer gap-1"
              onClick={() => handleToggle(index)}
            >
              <div className="relative">
                <AnimatePresence mode="wait">
                  {!isChecked ? (
                    <motion.svg
                      width="20"
                      height="20"
                      viewBox="0 0 55 54"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      key="svg"
                    >
                      <motion.path
                        d="M44.5 2H10.5C6.08172 2 2.5 5.58172 2.5 10V44C2.5 48.4183 6.08172 52 10.5 52H44.5C48.9183 52 52.5 48.4183 52.5 44V10C52.5 5.58172 48.9183 2 44.5 2Z"
                        stroke="#ffffff"
                        strokeWidth="4"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        exit={{ pathLength: 0 }}
                        transition={{ duration: 0.5 }}
                      />
                    </motion.svg>
                  ) : (
                    <motion.div
                      key="check"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      transition={{
                        type: "spring",
                        stiffness: 200,
                        damping: 20,
                      }}
                    >
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 58 58"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g filter="url(#filter0_d_162_7)">
                          <motion.path
                            d="M42 0H8C3.58172 0 0 3.58172 0 8V42C0 46.4183 3.58172 50 8 50H42C46.4183 50 50 46.4183 50 42V8C50 3.58172 46.4183 0 42 0Z"
                            fill="#ededed"
                            fillOpacity="0.9"
                          />
                          <motion.path
                            d="M12.7171 27.0784C12.8861 29.1223 16.5203 33.4709 19.4196 36.6416C21.1866 38.574 24.2759 38.1687 25.5881 35.9028L37.6251 15.1182C38.032 14.4156 38.9925 14.2856 39.5715 14.8549V14.8549"
                            stroke="#0a0a0a"
                            strokeWidth="5"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            exit={{ pathLength: 0 }}
                            transition={{ duration: 1 }}
                          />
                        </g>
                        <defs>
                          <filter
                            id="filter0_d_162_7"
                            x="0"
                            y="0"
                            width="58"
                            height="58"
                            filterUnits="userSpaceOnUse"
                            colorInterpolationFilters="sRGB"
                          >
                            <feFlood
                              floodOpacity="0"
                              result="BackgroundImageFix"
                            />
                            <feColorMatrix
                              in="SourceAlpha"
                              type="matrix"
                              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                              result="hardAlpha"
                            />
                            <feOffset dx="4" dy="4" />
                            <feGaussianBlur stdDeviation="2" />
                            <feComposite in2="hardAlpha" operator="out" />
                            <feColorMatrix
                              type="matrix"
                              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                            />
                            <feBlend
                              mode="normal"
                              in2="BackgroundImageFix"
                              result="effect1_dropShadow_162_7"
                            />
                            <feBlend
                              mode="normal"
                              in="SourceGraphic"
                              in2="effect1_dropShadow_162_7"
                              result="shape"
                            />
                          </filter>
                        </defs>
                      </svg>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="relative overflow-hidden">
                <motion.span
                  className={cn(isChecked ? "text-gray4" : "text-foreground")}
                  animate={shakingItem === index ? "shake" : ""}
                  variants={shakeAnimation}
                >
                  <div className="flex items-start justify-between gap-2">
                    <img
                      src={item.image}
                      alt={item.text}
                      className={cn(
                        isChecked ? "opacity-50" : "opacity-100",
                        "w-8 h-8 rounded-full object-cover"
                      )}
                    />
                    <div className="gap-1 items-center">
                      <div className="text-md font-semibold">{item.text}</div>
                      <div className="text-sm text-gray4 overflow-hidden leading-4.5">
                        {item.label}
                      </div>
                    </div>
                  </div>
                </motion.span>
              </div>
            </div>
          );
        })}
      </motion.div>
      <AnimatePresence>
        {showConfirm && (
          <motion.div
            layoutId="wrap-overlay"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="absolute inset-0 flex items-center justify-center z-10 rounded-3xl"
            style={gradientStyle}
          >
            <div className="absolute inset-0 bg-black/20 backdrop-blur-lg rounded-3xl" />
            <div className="relative text-center z-10">
              <div className="flex items-center justify-center mb-4 gap-1 whitespace-nowrap">
                <h2 className="text-md sm:text-xl font-bold text-white ">
                  Are you sure to
                </h2>
                <motion.button layoutId="wrap-delete">
                  <Delete className="w-8 h-8" />
                </motion.button>
                <h2 className="text-md sm:text-xl font-bold text-white">
                  {numSelected} Inbox item{numSelected > 1 ? "s" : ""}?
                </h2>
              </div>

              <p className="mb-6 text-white/80">
                This action cannot be undone.
              </p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={() => setShowConfirm(false)}
                  className="px-3 py-2 rounded-xl bg-white/20 hover:bg-white/30 text-white font-semibold"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteConfirmed}
                  className="px-3 py-2 rounded-xl bg-red-500 hover:bg-red-600 text-white font-semibold"
                >
                  Delete
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default WrapOverlay;
