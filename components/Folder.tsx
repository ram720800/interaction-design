"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, easeIn } from "framer-motion";
import Image from "next/image";

const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My First Page</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <h1>Welcome to My Project!</h1>
    <img src="mountain.jpg" alt="A mountain landscape">
</body>
</html>`;

const cssContent = `body {
    font-family: Arial, sans-serif;
    background-color: #f0f0f0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
}
h1 {
    color: #333;
}
img {
    width: 270px;
    height: 150px;
    object-fit: cover;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}`;

const useOutSideClick = (callback: () => void) => {
  const useref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (useref.current && !useref.current.contains(event.target as Node)) {
        callback();
      }
    };
    document.addEventListener("click", handleClick, true);
    return () => {
      document.removeEventListener("click", handleClick, true);
    };
  }, [callback]);
  return useref;
};

const Folder: React.FC = () => {
  const [current, setCurrent] = useState<string | null>(null);
  const ref = useOutSideClick(() => setCurrent(null));
  const handleCardClick = (e: React.MouseEvent, card: string) => {
    e.stopPropagation();
    setCurrent(card);
  };

  return (
    <div className="w-[280px] flex flex-col justify-center items-center relative group [perspective:1000px] font-geist">
      <div className="flex justify-start w-[280px]">
        <div className="bg-folder w-[100px] h-[25px] rounded-tl-3xl rounded-tr-[8px]"></div>
        <div className="border-r-[40px] border-r-transparent border-b-[25px] border-b-folder rounded-tl-[2px] -ml-1 "></div>
      </div>
      <div className="bg-folder w-[280px] h-[200px] rounded-b-3xl rounded-tr-3xl"></div>

      <AnimatePresence>
        {current === "html" && (
          <motion.div
            layoutId="file-html"
            ref={ref}
            initial={{ opacity: 0, scale: 0.98, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            exit={{ opacity: 0, scale: 0.98, filter: "blur(10px)" }}
            className="bg-foreground rounded-xl w-72 h-72 sm:w-80 sm:h-80 absolute py-1 px-3 border file-shadow cursor-pointer flex flex-col z-50"
          >
            <motion.div
              layoutId="nav-html"
              className="flex items-center justify-between"
            >
              <motion.div
                layoutId="text-nav-html"
                className="flex items-center gap-0.5"
              >
                <Image src="/html5.svg" alt="html" width={10} height={10} />
                <span className="text-[12px] text-background">index.html</span>
              </motion.div>
              <motion.div layoutId="text-size-html">
                <p className="text-gray4 text-[12px]">Size: 2kb</p>
              </motion.div>
            </motion.div>
            <motion.div
              layoutId="text-code-html"
              className="py-1 text-[12px] text-background overflow-auto flex-1"
            >
              <pre>
                <code>{htmlContent}</code>
              </pre>
            </motion.div>
          </motion.div>
        )}
        {current === "css" && (
          <motion.div
            layoutId="file-css"
            ref={ref}
            initial={{ opacity: 0, scale: 0.98, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            exit={{ opacity: 0, scale: 0.98, filter: "blur(10px)" }}
            className="bg-foreground rounded-xl w-72 h-72 sm:w-80 sm:h-80 absolute py-1 px-3 border file-shadow cursor-pointer flex flex-col z-50"
          >
            <motion.div
              layoutId="nav-css"
              className="flex items-center justify-between"
            >
              <motion.div
                layoutId="text-nav-css"
                className="flex items-center gap-0.5"
              >
                <Image src="/css3.svg" alt="css" width={10} height={10} />
                <span className="text-[12px] text-background">index.css</span>
              </motion.div>
              <motion.div layoutId="text-size-css">
                <p className="text-gray4 text-[12px]">Size: 1kb</p>
              </motion.div>
            </motion.div>
            <motion.div
              layoutId="text-code-css"
              className="py-1 text-[12px] text-background overflow-auto flex-1"
            >
              <pre>
                <code>{cssContent}</code>
              </pre>
            </motion.div>
          </motion.div>
        )}
        {current === "image" && (
          <motion.div
            layoutId="file-image"
            ref={ref}
            initial={{ opacity: 0, scale: 0.98, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            exit={{ opacity: 0, scale: 0.98, filter: "blur(10px)" }}
            className="bg-foreground rounded-xl w-72 h-72 sm:w-80 sm:h-80 absolute py-1 px-3 border file-shadow cursor-pointer flex flex-col z-50"
          >
            <motion.div
              layoutId="nav-img"
              className="flex items-center justify-between"
            >
              <motion.div
                layoutId="text-nav-img"
                className="flex items-center gap-0.5"
              >
                <Image src="/image-file.svg" alt="img" width={12} height={12} />
                <span className="text-[12px] text-background">
                  mountain.png
                </span>
              </motion.div>
              <motion.div layoutId="text-size-img">
                <p className="text-gray4 text-[12px]">Size: 7kb</p>
              </motion.div>
            </motion.div>
            <motion.div
              layoutId="text-preview-img"
              className="py-5 flex items-center justify-center flex-1"
            >
              <Image
                src="/mountain.png"
                alt="mountain"
                width={280}
                height={280}
                className="rounded-md object-contain h-full"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        layoutId="file-html"
        onClick={(e) => handleCardClick(e, "html")}
        className="bg-foreground/90 rounded-xl w-[90%] h-[150px] absolute py-1 px-3 border file-shadow top-10 hover:top-9 transition-all cursor-pointer flex flex-col"
      >
        <motion.div
          layoutId="nav-html"
          className="flex items-center justify-between"
        >
          <motion.div
            layoutId="text-nav-html"
            className="flex items-center gap-0.5"
          >
            <Image src="/html5.svg" alt="html" width={10} height={10} />
            <span className="text-[8px] text-background">index.html</span>
          </motion.div>
          <motion.div layoutId="text-size-html">
            <p className="text-gray4 text-[8px]">Size: 2kb</p>
          </motion.div>
        </motion.div>
        <motion.div
          layoutId="text-code-html"
          className="py-1 text-[8px] text-background overflow-hidden flex-1"
        >
          <pre>
            <code>{htmlContent}</code>
          </pre>
        </motion.div>
      </motion.div>

      <motion.div
        layoutId="file-css"
        onClick={(e) => handleCardClick(e, "css")}
        className="bg-foreground/90 rounded-xl w-[90%] h-[150px] absolute py-1 px-3 border file-shadow top-13 hover:top-12 transition-all cursor-pointer flex flex-col"
      >
        <motion.div
          layoutId="nav-css"
          className="flex items-center justify-between"
        >
          <motion.div
            layoutId="text-nav-css"
            className="flex items-center gap-0.5"
          >
            <Image src="/css3.svg" alt="css" width={10} height={10} />
            <span className="text-[8px] text-background">index.css</span>
          </motion.div>
          <motion.div layoutId="text-size-css">
            <p className="text-gray4 text-[8px]">Size: 1kb</p>
          </motion.div>
        </motion.div>
        <motion.div
          layoutId="text-code-css"
          className="py-1 text-[8px] text-background overflow-hidden flex-1"
        >
          <pre>
            <code>{cssContent}</code>
          </pre>
        </motion.div>
      </motion.div>

      <motion.div
        layoutId="file-image"
        onClick={(e) => handleCardClick(e, "image")}
        className="bg-foreground/90 rounded-xl w-[90%] h-[150px] absolute py-1 px-3 border file-shadow top-16 hover:top-15 transition-all cursor-pointer"
      >
        <motion.div
          layoutId="nav-img"
          className="flex items-center justify-between"
        >
          <motion.div
            layoutId="text-nav-img"
            className="flex items-center gap-0.5"
          >
            <Image src="/image-file.svg" alt="img" width={12} height={12} />
            <span className="text-[8px] text-background">mountain.png</span>
          </motion.div>
          <motion.div layoutId="text-size-img">
            <p className="text-gray4 text-[8px]">Size: 7kb</p>
          </motion.div>
        </motion.div>
        <motion.div
          layoutId="text-preview-img"
          className="py-5 flex items-center justify-center flex-1"
        >
          <Image
            src="/mountain.png"
            alt="mountain"
            width={170}
            height={50}
            className="rounded-md object-contain h-full"
          />
        </motion.div>
      </motion.div>

      <div className="bg-[linear-gradient(to_top,#080808,#14141566)] absolute w-[99%] h-[155px] bottom-[1px] rounded-3xl backdrop-blur flex flex-col justify-end items-center gap-2 py-3 block-shadow transition-all duration-300 group-hover:[transform:rotateX(-30deg)] active:[transform:rotateX(-30deg)] origin-bottom cursor-pointer">
        <p className="text-[12px] text-gray4">MyProject</p>
      </div>
    </div>
  );
};

export default Folder;
