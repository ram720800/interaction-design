import WrapOverlay from "@/components/WrapOverlay";

const page = () => {
  return (
    <div className="my-6 flex flex-col items-center justify-center">
      <div className="text-xl py-4 font-main">Day 06: Wrap Overlay</div>
      <div className="relative w-80 h-[460px] sm:w-96 sm:h-96 p-3 bg-gray2 flex justify-start rounded-3xl block-shadow">
        <span className="absolute inset-x-0 top-px bg-gradient-to-r from-transparent via-foreground to-transparent h-px w-3/4 mx-auto"></span>
        <span className="absolute inset-x-0 top-px bg-gradient-to-r from-transparent via-foreground to-transparent h-[5px] w-full mx-auto blur-md"></span>
        <WrapOverlay />
      </div>
    </div>
  );
};

export default page;
