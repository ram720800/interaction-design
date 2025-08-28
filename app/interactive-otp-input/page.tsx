"use client";

import { InputOTPPatternExample } from "@/components/OtpInput";
import { useMotionTemplate, useMotionValue, motion } from "framer-motion";
import { MouseEvent } from "react";

const page = () => {
  let mouseX = useMotionValue(0);
  let mouseY = useMotionValue(0);

  function handleMouseMove({ clientX, clientY, currentTarget }: MouseEvent) {
    let { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }
  return (
    <div className="my-6 flex flex-col items-center justify-center font-main">
      <div className="text-xl py-4">Day 02: Interactive OTP Input</div>
      <div
        onMouseMove={handleMouseMove}
        className="relative w-80 h-80 sm:w-96 sm:h-96 p-6 bg-gray2 flex justify-center items-center rounded-3xl block-shadow group"
      >
        <span className="absolute inset-x-0 top-px bg-gradient-to-r from-transparent via-foreground to-transparent h-px w-3/4 mx-auto"></span>
        <span className="absolute inset-x-0 top-px bg-gradient-to-r from-transparent via-foreground to-transparent h-px w-3/4 mx-auto"></span>
        <span className="absolute inset-x-0 top-px bg-gradient-to-r from-transparent via-foreground to-transparent h-[5px] w-full mx-auto blur-md"></span>
        <motion.div
          className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition duration-300 rounded-3xl"
          style={{
            background: useMotionTemplate`radial-gradient(100px circle at ${mouseX}px ${mouseY}px,rgba(28, 115, 160, 0.15),transparent 80%)`,
          }}
        />
        <InputOTPPatternExample />
        <span className="absolute inset-x-0 bottom-px bg-gradient-to-r from-transparent via-success to-transparent h-px w-3/4 mx-24"></span>
        <span className="absolute inset-x-0 bottom-px bg-gradient-to-r from-transparent via-success to-transparent h-[8px] w-full mx-24 blur-md"></span>
        <div className="absolute bottom-0 right-0 pb-1 pr-4 text-sm text-gray4">
          Success OTP: 123-456
        </div>
      </div>
    </div>
  );
};

export default page;
