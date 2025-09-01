import { SVGProps } from "react";

export function ArrowRight(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20px"
      height="20px"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="none"
        stroke="#ffffff"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="3"
        d="M4 12h16m0 0l-6 6m6-6l-6-6"
      />
    </svg>
  );
}
