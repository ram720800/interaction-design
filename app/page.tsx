import Image from "next/image";
import Link from "next/link";

const page = () => {
  return (
    <div className="my-12 flex flex-col items-center justify-center">
      <div className="relative w-80 sm:w-96 h-96 px-6 py-10 rounded-3xl block-shadow overflow-hidden">
        <span className="absolute inset-x-0 top-px bg-gradient-to-r from-transparent via-foreground to-transparent h-px w-3/4 mx-auto"></span>
        <span className="absolute inset-x-0 top-px bg-gradient-to-r from-transparent via-foreground to-transparent h-[5px] w-full mx-auto blur-md"></span>
        <div className="absolute inset-0 bg-white/50" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,#A259FF_0%,#A259FF_65%,rgba(255,255,255,0.65)_100%)] opacity-60" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,#FF8726_0%,rgba(255,255,255,0.65)_100%)] opacity-60" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_150px_at_50%_-15%,transparent_30%,white_65%,transparent_85%,white_100%)] opacity-50 mix-blend-soft-light" />
        <div className="relative z-10 flex flex-col items-center justify-center">
          <Image
            src="/peerlist.svg"
            alt="peerlist"
            width={44}
            height={44}
            className=" rounded-md"
          />
          <div className="text-2xl my-4 sm:text-3xl text-center font-main text-background">
            Interaction Design Challenge
          </div>
          <p className="text-md font-main text-background/80">
            <Link
              href="https://peerlist.io/ram720800"
              target="_blank"
              rel="noopener noreferrer"
            >
              @ram720800
            </Link>
          </p>
          <p className="my-6 text-[16px] font-geist text-background text-center">
            A <strong>7-day</strong> Peerlist Interaction Design Challenge to
            bring designs to life!
          </p>
          <button className="my-8 px-4 py-2 bg-background hover:bg-background/90 text-white rounded-[14px]">
            Challenge Accepted!
          </button>
        </div>
      </div>
    </div>
  );
};

export default page;
