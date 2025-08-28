import AvatarGallery from "@/components/AvatarGallery";

const page = () => {
  return (
    <div className="my-6 flex flex-col items-center justify-center font-main">
      <div className="text-xl py-4">Day 01: Animated Avatar Stack</div>
      <div className="relative w-80 h-80 sm:w-96 sm:h-96 p-6 bg-gray2 flex justify-center items-center rounded-3xl block-shadow dots">
        <span className="absolute inset-x-0 top-px bg-gradient-to-r from-transparent via-foreground to-transparent h-px w-3/4 mx-auto"></span>
        <span className="absolute inset-x-0 top-px bg-gradient-to-r from-transparent via-foreground to-transparent h-[5px] w-full mx-auto blur-md"></span>
        <AvatarGallery />
      </div>
    </div>
  );
};

export default page;
