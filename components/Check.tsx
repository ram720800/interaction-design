import { SVGProps } from "react";

export function Check(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20px"
      height="20px"
      viewBox="0 0 24 24"
      {...props}
    >
      {/* Icon from Humbleicons by Jiří Zralý - https://github.com/zraly/humbleicons/blob/master/license */}
      <path
        fill="none"
        stroke="#ffffff"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="3"
        d="m5 14l4 4L19 8"
      />
    </svg>
  );
}
