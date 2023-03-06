import { HTMLAttributes } from 'react';

export default function PlayIcon(props: HTMLAttributes<SVGElement>) {
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
        d="M56.3,37.1c3.1-1.9,4.2-3.1,4.2-5.1c0-2-1.1-3.2-4.2-5l-44-25.5C10.8,0.6,9.5,0.1,8,0.1c-2.8,0-4.5,2.1-4.5,5.4v53.1
 C3.5,61.8,5.2,64,8,64c1.5,0,2.8-0.6,4.3-1.5L56.3,37.1z"
      />
    </svg>
  );
}
