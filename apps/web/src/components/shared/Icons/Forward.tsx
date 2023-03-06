import { HTMLAttributes } from 'react';

export default function ForwardIcon(props: HTMLAttributes<SVGElement>) {
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
        d="M61.7,28.5L37.9,14.6c-0.9-0.6-1.7-0.9-2.7-0.9c-1.8,0-3.3,1.4-3.3,4V31c-0.3-0.9-1-1.7-2.2-2.5L6,14.6
 c-1-0.6-1.7-0.9-2.7-0.9c-1.8,0-3.3,1.4-3.3,4v28.6c0,2.6,1.5,4,3.3,4c1,0,1.7-0.3,2.7-0.9l23.7-13.9c1.2-0.7,2-1.6,2.2-2.5v13.3
 c0,2.6,1.5,4,3.3,4c1,0,1.7-0.3,2.7-0.9l23.7-13.9c1.6-1,2.3-2.1,2.3-3.5C64,30.7,63.3,29.5,61.7,28.5z"
      />
    </svg>
  );
}
