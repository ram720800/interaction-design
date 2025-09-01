import { SVGProps } from "react";

export function ArrowLeft(props: SVGProps<SVGSVGElement>) {
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
        stroke="#000000"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="3"
        d="M20 12H4m0 0l6-6m-6 6l6 6"
      />
    </svg>
  );
}
