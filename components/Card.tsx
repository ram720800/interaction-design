"use client";

import Image from "next/image";
import { F1 } from "@/components/F1";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const MotionImage = motion(Image);
const MotionF1 = motion(F1);

const Card = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          layoutId="card-main"
          onClick={() => setIsOpen(false)}
          className="relative w-full h-[600px] inset-0 p-6 bg-gray2 flex justify-center items-center rounded-3xl block-shadow overflow-hidden mask-radial-from-50% mask-r-from-90% mask-l-from-90% font-f1 cursor-pointer"
        >
          <motion.div
            layoutId="card-nav"
            className="absolute top-0 left-0 w-full px-6 sm:px-40 flex justify-between items-center z-10"
          >
            <div className="flex items-center gap-2">
              <MotionF1 layoutId="card-f1" />
              <motion.p
                layoutId="card-name"
                className="uppercase text-[10px] tracking-[0.2em]"
              >
                The movie
              </motion.p>
            </div>
            <motion.p
              layoutId="card-date"
              className="text-[10px] tracking-[0.2em]"
            >
              Coming-2025
            </motion.p>
          </motion.div>

          <motion.span
            layoutId="card-gradient-top"
            className="absolute inset-x-0 top-px bg-gradient-to-r from-transparent via-foreground to-transparent h-[2px] w-3/4 mx-auto"
          ></motion.span>
          <motion.span
            layoutId="card-gradient-blur-top"
            className="absolute inset-x-0 top-px bg-gradient-to-r from-transparent via-foreground to-transparent h-[30px] w-full mx-auto blur-xl"
          ></motion.span>
          <motion.span
            layoutId="card-gradient-bottom"
            className="absolute inset-x-0 bottom-px bg-gradient-to-r from-transparent via-[#ffd700] to-transparent h-[2px] w-3/4 mx-auto"
          ></motion.span>
          <motion.span
            layoutId="card-gradient-blur-bottom"
            className="absolute inset-x-0 bottom-px bg-gradient-to-r from-transparent via-[#ffd700] to-transparent h-[20px] w-full mx-auto blur-xl"
          ></motion.span>

          <MotionImage
            layoutId="card-poster"
            src="/F1.png"
            alt="poster"
            fill
            className="object-cover opacity-30"
            priority
          />

          <div className="absolute top-40 xl:top-10">
            <MotionImage
              layoutId="card-logo"
              src="/F1-25.png"
              alt="formula1"
              width={280}
              height={160}
              className="object-contain scale-160"
            />
            <motion.div
              initial={{
                filter: "blur(10px)",
                opacity: 0,
              }}
              animate={{
                filter: "blur(0px)",
                opacity: 1,
              }}
              transition={{
                delay: 0.3,
              }}
              className="absolute -px-4 pt-2 text-[12px] tracking-[0.2em] font-bold text-center text-grayA6"
            >
              Racing legend Sonny Hayes is coaxed into leading a struggling
              Formula 1 team—and mentoring a young hotshot driver—while chasing
              one last chance at redemption.
            </motion.div>
            <motion.div className="absolute translate-y-66 xl:translate-y-99 bottom-0 text-center">
              <p className="tracking-[0.2em] text-[11px] sm:text-xs font-bold text-grayA6 pt-10 z-20">
                Starring:
                <motion.span
                  layoutId="card-brad-name"
                  className="text-foreground"
                >
                  &nbsp;Brad Pitt
                </motion.span>
                &nbsp;and&nbsp;
                <motion.span
                  layoutId="card-damson-name"
                  className="text-foreground"
                >
                  Damson
                </motion.span>
              </p>
            </motion.div>
          </div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="absolute -translate-x-40 sm:-translate-x-80 xl:-translate-x-110 translate-y-[150px] sm:translate-y-[-30px] bottom-0"
          >
            <MotionImage
              layoutId="card-brad"
              src="/brad-full.png"
              alt="brad"
              width={280}
              height={160}
              className="object-contain scale-160 opacity-80 mask-b-from-60%"
            />
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="absolute translate-x-40 sm:translate-x-80 xl:translate-x-110 translate-y-[120px] sm:translate-y-[-80px] bottom-0"
          >
            <MotionImage
              layoutId="card-damson"
              src="/damson-full.png"
              alt="damson"
              width={280}
              height={160}
              className="object-contain scale-160 opacity-80 mask-b-from-80%"
            />
          </motion.div>
        </motion.div>
      ) : (
        <motion.div
          layoutId="card-main"
          whileHover={{ scale: 1.02 }}
          onClick={() => setIsOpen(true)}
          className="relative w-80 h-80 sm:w-96 sm:h-96 p-6 bg-gray2 flex justify-center items-center rounded-3xl block-shadow overflow-hidden mask-radial-from-50% font-f1 cursor-pointer"
        >
          <motion.div
            layoutId="card-nav"
            className="absolute top-0 left-0 w-full px-4 flex justify-between items-center z-10"
          >
            <div className="flex items-center gap-2">
              <MotionF1 layoutId="card-f1" />
              <motion.p
                layoutId="card-name"
                className="uppercase text-[10px] tracking-[0.2em]"
              >
                The movie
              </motion.p>
            </div>
            <motion.p
              layoutId="card-date"
              className="text-[10px] tracking-[0.2em]"
            >
              Coming-2025
            </motion.p>
          </motion.div>

          <motion.span
            layoutId="card-gradient-top"
            className="absolute inset-x-0 top-px bg-gradient-to-r from-transparent via-foreground to-transparent h-[2px] w-3/4 mx-auto"
          ></motion.span>
          <motion.span
            layoutId="card-gradient-blur-top"
            className="absolute inset-x-0 top-px bg-gradient-to-r from-transparent via-foreground to-transparent h-[30px] w-full mx-auto blur-xl"
          ></motion.span>
          <motion.span
            layoutId="card-gradient-bottom"
            className="absolute inset-x-0 bottom-px bg-gradient-to-r from-transparent via-[#ffd700] to-transparent h-[2px] w-3/4 mx-auto"
          ></motion.span>
          <motion.span
            layoutId="card-gradient-blur-bottom"
            className="absolute inset-x-0 bottom-px bg-gradient-to-r from-transparent via-[#ffd700] to-transparent h-[20px] w-full mx-auto blur-xl"
          ></motion.span>

          <MotionImage
            layoutId="card-poster"
            src="/F1.png"
            alt="poster"
            fill
            className="object-cover opacity-30"
            priority
          />

          <div className="absolute translate-y-[24px] bottom-0">
            <MotionImage
              layoutId="card-logo"
              src="/F1-25.png"
              alt="formula1"
              width={280}
              height={160}
              className="object-contain opacity-40"
            />
          </div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="absolute translate-y-[60px] -translate-x-30 bottom-0"
          >
            <MotionImage
              layoutId="card-brad"
              src="/brad-full.png"
              alt="brad"
              width={280}
              height={160}
              className="object-contain scale-90 opacity-80 mask-b-from-80%"
            />
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="absolute translate-y-[40px] translate-x-30 bottom-0"
          >
            <MotionImage
              layoutId="card-damson"
              src="/damson-full.png"
              alt="damson"
              width={280}
              height={160}
              className="object-contain scale-80 opacity-80 mask-b-from-80%"
            />
          </motion.div>
          <div className="absolute -translate-x-30 bottom-0 z-20">
            <motion.p
              layoutId="card-brad-name"
              className="text-[#000000] tracking-[0.2em] text-[10px] font-bold"
            >
              Brad Pitt
            </motion.p>
          </div>
          <div className="absolute translate-x-30 bottom-0 z-20">
            <motion.p
              layoutId="card-damson-name"
              className="text-[#000000] tracking-[0.2em] text-[10px] font-bold"
            >
              Damson
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Card;
