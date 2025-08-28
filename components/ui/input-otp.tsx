"use client";

import { useContext, useState, createContext } from "react";

import { OTPInput, OTPInputContext } from "input-otp";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";

import { cn } from "@/utils/cn";

type InputOTPProps = React.ComponentProps<typeof OTPInput>;

const OTPStatusContext = createContext<{ status: string }>({ status: "idle" });

export function InputOTP({
  containerClassName,
  className,
  ...props
}: InputOTPProps) {
  const [value, setValue] = useState("");
  const [status, setStatus] = useState("idle");

  const handleChange = (newValue: string) => {
    setValue(newValue);
    if (status === "verifying") return;

    if (newValue.length === props.maxLength) {
      setStatus("verifying");
      setTimeout(() => {
        if (newValue === "123456") {
          setStatus("valid");
        } else {
          setStatus("invalid");
        }

        setTimeout(() => {
          setStatus("idle");
          setValue("");
        }, 2000);
      }, 1000);
    }
  };

  return (
    <OTPStatusContext.Provider value={{ status }}>
      <motion.div
        animate={{ x: status === "invalid" ? [0, -8, 8, -4, 4, 0] : 0 }}
        transition={{ duration: 0.4 }}
      >
        <OTPInput
          value={value}
          onChange={handleChange}
          data-slot="input-otp"
          containerClassName={cn(
            "flex items-center gap-2 has-disabled:opacity-50",
            containerClassName
          )}
          className={cn("disabled:cursor-not-allowed flex flex-col", className)}
          {...props}
        />
      </motion.div>
    </OTPStatusContext.Provider>
  );
}

type InputOTPGroupProps = React.ComponentProps<"div">;

export function InputOTPGroup({ className, ...props }: InputOTPGroupProps) {
  return (
    <div
      data-slot="input-otp-group"
      className={cn("flex items-center gap-1", className)}
      {...props}
    />
  );
}

type InputOTPAnimatedNumberProps = {
  value: string | null;
};

function InputOTPAnimatedNumber({ value }: InputOTPAnimatedNumberProps) {
  const animationProps = {
    initial: { opacity: 0.2, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 0 },
  };

  return (
    <div className="relative flex size-[inherit] items-center justify-center overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.span
          key={value ?? "0"}
          data-slot="input-otp-animated-number"
          transition={{ duration: 0.09, ease: "easeOut" }}
          {...animationProps}
        >
          {value ?? "0"}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}

type InputOTPSlotProps = {
  index: number;
} & React.ComponentProps<typeof motion.div>;

export function InputOTPSlot({
  index,
  className,
  ...props
}: InputOTPSlotProps) {
  const inputOTPContext = useContext(OTPInputContext);
  const { status } = useContext(OTPStatusContext);
  const { char, hasFakeCaret, isActive } = inputOTPContext?.slots[index] ?? {};

  const activeSlots =
    inputOTPContext?.slots.filter((slot) => slot.isActive) ?? [];
  const isMultiSelect = activeSlots.length > 1;

  const isVerifying = status === "verifying";
  const isValid = status === "valid";
  const isInvalid = status === "invalid";

  return (
    <MotionConfig reducedMotion="user">
      <motion.div
        data-slot="input-otp-slot"
        className={cn(
          "group relative flex h-10 w-10 items-center justify-center rounded-[10px] border border-main-foreground bg-main-foreground font-medium text-base text-primary-foreground mx-0.5 sm:mx-1",
          "aria-invalid:border-red-500 data-[active=true]:aria-invalid:border-red-500 data-[active=true]:aria-invalid:ring-2 data-[active=true]:aria-invalid:ring-red-500",
          {
            "opacity-50 transition-opacity duration-300": isVerifying,
          },
          className
        )}
        {...props}
      >
        <InputOTPAnimatedNumber value={char} />

        {hasFakeCaret && <FakeCaret />}

        <AnimatePresence mode="wait">
          {isActive && status === "idle" && (
            <motion.div
              key={`${isActive}-${isMultiSelect}`}
              layoutId={isMultiSelect ? `indicator-${index}` : "indicator"}
              className="absolute inset-0 z-10 rounded-[inherit] ring-2 ring-border bg-muted-blue"
              transition={{ duration: 0.12, ease: "easeInOut" }}
            />
          )}
        </AnimatePresence>

        <AnimatePresence>
          {(isValid || isInvalid) && (
            <motion.div
              className={cn("absolute inset-0 z-20 rounded-[inherit] ring-2", {
                "ring-success bg-muted-success": isValid,
                "ring-invalid bg-muted-invalid": isInvalid,
              })}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeIn" }}
            />
          )}
        </AnimatePresence>
      </motion.div>
    </MotionConfig>
  );
}

type InputOTPSeparatorProps = React.ComponentProps<"div">;

export function InputOTPSeparator({
  className,
  ...props
}: InputOTPSeparatorProps) {
  return (
    <div
      data-slot="input-otp-separator"
      aria-hidden
      className={cn("h-1 w-3 rounded-full bg-main-foreground", className)}
      {...props}
    />
  );
}

function FakeCaret() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 flex items-center justify-center"
    >
      <div className="h-4.5 w-px bg-primary-muted motion-safe:animate-caret-blink motion-safe:duration-1000" />
    </div>
  );
}
