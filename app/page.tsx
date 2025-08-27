import Image from "next/image";

const page = () => {
  return (
    <div className="my-20">
      <div className="flex flex-col items-center justify-center gap-4 sm:gap-10">
        <Image
          src="/peerlist.png"
          alt="peerlist"
          width={128}
          height={128}
          className="rounded-md"
        />
        <div className="text-2xl sm:text-6xl font-main">Interaction Design Challenge</div>
        <p className="text-sm sm:text-md font-main">@ram720800</p>
      </div>
    </div>
  );
};

export default page;
