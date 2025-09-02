import AutofillWithAi from "@/components/AutofillWithAi";

const page = () => {
  return (
    <div className="my-1 flex flex-col items-center justify-center">
      <div className="text-xl py-2 font-main">Day 07: Autofill w/ AI</div>
      <div className="relative w-96 sm:w-[1200px] sm:h-[530px] p-3 bg-folder rounded-3xl block-shadow">
        <span className="absolute inset-x-0 top-px bg-gradient-to-r from-transparent via-foreground to-transparent h-px w-3/4 mx-auto"></span>
        <span className="absolute inset-x-0 top-px bg-gradient-to-r from-transparent via-foreground to-transparent h-[5px] w-full mx-auto blur-md"></span>
        <AutofillWithAi />
      </div>
    </div>
  );
};

export default page;
