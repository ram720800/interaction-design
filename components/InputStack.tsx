"use client";

import { cn } from "@/utils/cn";
import { motion, AnimatePresence } from "framer-motion";
import { ButtonHTMLAttributes, HTMLAttributes, useState } from "react";
import { ArrowLeft } from "./ArrowLeft";
import { ArrowRight } from "./ArrowRight";
import { Check } from "./Check";

const InputStack = () => {
  const [current, setCurrent] = useState(1);

  const minimum = 1;
  const maximum = 3;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setCurrent(minimum);

    const form = e.currentTarget;
    form.reset();
  };

  return (
    <div className="flex items-start justify-center flex-col font-geist">
      <p className="text-xl tracking-[0.02em]">Invite a friend</p>
      <form className="mt-10 flex flex-col" onSubmit={handleSubmit}>
        <div className="flex flex-col relative text-foreground">
          <InputStack.Div current={current} index={0}>
            <InputStack.Input
              type="text"
              placeholder="Friend's Name"
              name="friend-name"
            />
          </InputStack.Div>
          <InputStack.Div current={current} index={1}>
            <InputStack.Input
              placeholder="Friend's Email"
              name="friend-email"
              type="email"
            />
          </InputStack.Div>
          <InputStack.Div current={current} index={2}>
            <div className="flex justify-between w-full">
              <p className="text-sm font-medium text-gray4">
                Send a reminder in 7 days
              </p>
              <InputStack.ToggleSwitch name="daily-reminder" />
            </div>
          </InputStack.Div>
        </div>

        <div className="flex items-center justify-between mt-4">
          <InputStack.PreviousButton
            current={current}
            minimum={minimum}
            setCurrent={setCurrent}
          />
          <InputStack.NextButton
            current={current}
            maximum={maximum}
            setCurrent={setCurrent}
          />
        </div>
      </form>
    </div>
  );
};

InputStack.Div = function InputStackDiv({
  current,
  index,
  children,
  ...props
}: {
  current: number;
  index: number;
} & HTMLAttributes<HTMLDivElement>) {
  const [isHovered, setIsHovered] = useState(false);
  const relativeIndex = current - index - 1;
  let y = 0.375 + 0.5 * relativeIndex;
  const scale = relativeIndex >= 0 ? 1 - relativeIndex * 0.05 : 1.1;

  const isVisible = index <= current - 1;

  const maxVisible = 3;
  const hide = index < current - maxVisible;
  const overflow = index >= current + maxVisible - 1;

  const canHover = current >= 3 && index < 2;

  if (canHover && isHovered) {
    y += 1.5;
  }

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        "first:relative absolute transition-all duration-300 blur-none rounded-xl px-4 py-2 border-[2px] border-[#3a3a3a] bg-folder w-full min-h-10 max-h-12 flex justify-between items-center block-shadow",
        current > 1 ? "ease-bounce" : "ease-in-out",
        canHover && "cursor-pointer",
        (!isVisible || hide) && "opacity-0 pointer-events-none blur-sm",
        overflow && "opacity-0 translate-y-6"
      )}
      style={{
        transform: !isVisible ? "translateY(10px)" : `translateY(-${y}rem)`,
        scale,
        zIndex: current - 1 === index ? 10 : canHover && isHovered ? 5 : 0,
      }}
      {...props}
    >
      {children}
    </div>
  );
};

InputStack.NextButton = function InputStackNextButton({
  current,
  setCurrent,
  maximum,
}: {
  current: number;
  setCurrent: (value: number) => void;
  maximum: number;
}) {
  return (
    <button
      className={cn(
        "bg-[#3a3a3a] text-foreground rounded-full px-3 py-2 font-semibold cursor-pointer active:scale-[0.97] transition-all duration-100 ease-out origin-center hover:bg-[#3a3a3a]/90 shadow blur-none overflow-hidden flex items-center justify-center w-[82px] h-[40px]"
      )}
      type={current > maximum ? "submit" : "button"}
      onClick={() => {
        if (current <= maximum) setCurrent(current + 1);
      }}
    >
      <AnimatePresence mode="wait">
        {current >= maximum ? (
          <motion.div
            key="done"
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ staggerChildren: 0.05 }}
            className="flex justify-between items-center gap-1"
          >
            <motion.div
              variants={{
                initial: { opacity: 0 },
                animate: { opacity: 1 },
                exit: { opacity: 0 },
              }}
            >
              <Check />
            </motion.div>
            <div className="relative block overflow-hidden whitespace-nowrap">
              {"Done".split("").map((l, i) => (
                <motion.span
                  key={i}
                  variants={{
                    initial: { y: "100%" },
                    animate: { y: 0 },
                    exit: { y: "100%" },
                  }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                  className="inline-block"
                >
                  {l}
                </motion.span>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="next"
            exit="exit"
            className="flex justify-between items-center gap-1"
          >
            <motion.div
              className="relative block overflow-hidden whitespace-nowrap"
              variants={{
                exit: {},
              }}
            >
              {"Next".split("").map((l, i) => (
                <motion.span
                  key={i}
                  variants={{ exit: { y: "-100%" } }}
                  transition={{
                    duration: 0.25,
                    ease: "easeInOut",
                    delay: 0.025 * i,
                  }}
                  className="inline-block"
                >
                  {l}
                </motion.span>
              ))}
            </motion.div>
            <motion.div
              variants={{ exit: { x: -20, opacity: 0 } }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
            >
              <ArrowRight />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  );
};

InputStack.PreviousButton = function InputStackPreviousButton({
  current,
  setCurrent,
  minimum,
}: {
  current: number;
  setCurrent: (value: number) => void;
  minimum: number;
}) {
  return (
    <button
      className={cn(
        "bg-foreground/30 p-2 rounded-full overflow-hidden flex justify-center items-center shadow-xs cursor-pointer active:scale-[0.97] transition-all duration-150 ease-in-out origin-center",
        current <= minimum && "opacity-0 pointer-events-none blur-xs"
      )}
      type="button"
      onClick={() => {
        if (current <= minimum) return;
        setCurrent(current - 1);
      }}
    >
      <ArrowLeft />
    </button>
  );
};

InputStack.Input = function Input({
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn("outline-none ring-0 font-medium", className)}
      {...props}
    />
  );
};

InputStack.ToggleSwitch = function ToggleSwitch({
  name,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  const [on, setOn] = useState(false);

  return (
    <button
      className={cn(
        "bg-gray4 w-8 max-w-8 rounded-full p-0.5 cursor-pointer relative flex items-center block-shadow",
        on && "bg-foreground"
      )}
      {...props}
      aria-label="toggle"
      onClick={() => setOn(!on)}
      type="button"
    >
      <input type="checkbox" checked={on} readOnly name={name} hidden />
      <div
        className={cn(
          "w-4 h-full bg-background rounded-full translate-x-0 transition-all duration-200 ease-in-out",
          on && "translate-x-[0.725rem] block-shadow"
        )}
      ></div>
    </button>
  );
};

export default InputStack;
