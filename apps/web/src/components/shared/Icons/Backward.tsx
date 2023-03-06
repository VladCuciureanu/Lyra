import { HTMLAttributes } from 'react';

export default function BackwardIcon(props: HTMLAttributes<SVGElement>) {
  return (
    <svg
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      viewBox="0 0 64 64"
      {...props}
    >
      <path
        d="M2.3,28.5l23.7-13.9c0.9-0.6,1.7-0.9,2.7-0.9c1.8,0,3.3,1.4,3.3,4V31c0.3-0.9,1-1.7,2.2-2.5L58,14.6c1-0.6,1.7-0.9,2.7-0.9
 c1.8,0,3.3,1.4,3.3,4v28.6c0,2.6-1.5,4-3.3,4c-1,0-1.7-0.3-2.7-0.9L34.3,35.5c-1.2-0.7-2-1.6-2.2-2.5v13.3c0,2.6-1.5,4-3.3,4
 c-1,0-1.7-0.3-2.7-0.9L2.3,35.5C0.7,34.5,0,33.3,0,32C0,30.7,0.7,29.5,2.3,28.5z"
      />
    </svg>
  );
}
