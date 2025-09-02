export default function SkeletonAnimation() {
  const skeletonContent = (
    <>
      <div className="space-y-3 p-4">
        <div className="flex space-x-2 ml-0 animate-pulse">
          <div className="w-32 h-4 rounded-full bg-blue-200" />
          <div className="w-16 h-4 rounded-full bg-blue-400" />
          <div className="size-4 rounded-full bg-zinc-400" />
        </div>
        <div className="flex space-x-2 ml-6 animate-pulse">
          <div className="w-16 h-4 rounded-full bg-blue-200" />
          <div className="size-4 rounded-full bg-zinc-400" />
        </div>
        <div className="flex space-x-2 ml-12 animate-pulse">
          <div className="w-24 h-4 rounded-full bg-blue-200" />
        </div>
        <div className="flex space-x-2 ml-12 animate-pulse">
          <div className="w-32 h-4 rounded-full bg-blue-200" />
        </div>
        <div className="flex space-x-2 ml-12 animate-pulse">
          <div className="w-24 h-4 rounded-full bg-blue-200" />
        </div>
        <div className="flex space-x-2 ml-6 animate-pulse">
          <div className="size-4 rounded-full bg-zinc-400" />
        </div>
        <div className="flex space-x-2 ml-0 animate-pulse">
          <div className="size-4 rounded-full bg-zinc-400" />
        </div>
      </div>

      <div className="space-y-3 p-4">
        <div className="flex space-x-2 ml-0 animate-pulse">
          <div className="w-20 h-4 rounded-full bg-blue-200" />
          <div className="w-12 h-4 rounded-full bg-green-200" />
          <div className="w-16 h-4 rounded-full bg-blue-400" />
          <div className="size-4 rounded-full bg-zinc-400" />
        </div>
        <div className="flex space-x-2 ml-2 animate-pulse">
          <div className="w-10 h-4 rounded-full bg-blue-200" />
          <div className="w-14 h-4 rounded-full bg-blue-400" />
          <div className="w-30 h-4 rounded-full bg-blue-200" />
          <div className="size-4 rounded-full bg-zinc-400" />
        </div>
        <div className="flex space-x-2 ml-6 animate-pulse">
          <div className="w-14 h-4 rounded-full bg-blue-200" />
          <div className="w-14 h-4 rounded-full bg-blue-400" />
          <div className="w-24 h-4 rounded-full bg-blue-200" />
        </div>
        <div className="flex space-x-2 ml-6 animate-pulse">
          <div className="w-14 h-4 rounded-full bg-blue-200" />
          <div className="w-24 h-4 rounded-full bg-blue-400" />
          <div className="w-16 h-4 rounded-full bg-blue-200" />
        </div>
        <div className="flex space-x-2 ml-6 animate-pulse">
          <div className="w-16 h-4 rounded-full bg-blue-200" />
          <div className="size-4 rounded-full bg-zinc-400" />
        </div>
        <div className="flex space-x-2 ml-2 animate-pulse">
          <div className="w-44 h-4 rounded-full bg-blue-200" />
        </div>
        <div className="flex space-x-2 ml-2 animate-pulse">
          <div className="size-4 rounded-full bg-zinc-200" />
        </div>
      </div>

      <div className="space-y-3 p-4">
        <div className="flex space-x-2 ml-1 animate-pulse">
          <div className="w-28 h-4 rounded-full bg-blue-200" />
          <div className="size-4 rounded-full bg-zinc-400" />
        </div>
        <div className="flex space-x-2 ml-8 animate-pulse">
          <div className="w-28 h-4 rounded-full bg-blue-200" />
        </div>
        <div className="flex space-x-2 ml-8 animate-pulse">
          <div className="w-44 h-4 rounded-full bg-blue-200" />
        </div>
        <div className="flex space-x-2 ml-8 animate-pulse">
          <div className="w-44 h-4 rounded-full bg-blue-200" />
        </div>
        <div className="flex space-x-2 ml-0 animate-pulse">
          <div className="size-4 rounded-full bg-zinc-200" />
        </div>
      </div>
    </>
  );

  return (
    <div className="relative w-full h-64 overflow-hidden bg-background rounded-lg mask-radial-from-0% mask-r-from-50%">
      <div className="absolute w-full flex flex-col animate-scroll">
        {skeletonContent}
        {skeletonContent}
      </div>
    </div>
  );
}