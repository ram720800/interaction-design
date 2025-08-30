import Card from "@/components/Card";

const page = () => {
  return (
    <div className="my-6 flex flex-col items-center justify-center">
      <div className="text-xl py-4 font-main opacity-80">
        Day 03: Card To Page Transition
      </div>
      <Card />
    </div>
  );
};

export default page;
