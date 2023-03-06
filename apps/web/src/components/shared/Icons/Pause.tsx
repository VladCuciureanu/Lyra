import { HTMLAttributes } from 'react';

export default function PauseIcon(props: HTMLAttributes<SVGElement>) {
  return (
    <svg
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      viewBox="0 0 64 64"
      {...props}
    >
      <g>
        <path
          d="M13.3,64h9c3.4,0,5.2-1.8,5.2-5.3V5.2c0-3.6-1.8-5.2-5.2-5.2h-9C9.8,0,8,1.8,8,5.2v53.5C8,62.2,9.8,64,13.3,64
   z M41.8,64h8.9c3.5,0,5.2-1.8,5.2-5.3V5.2C56,1.7,54.2,0,50.7,0h-8.9c-3.5,0-5.3,1.8-5.3,5.2v53.5C36.6,62.2,38.4,64,41.8,64z"
        />
      </g>
    </svg>
  );
}
