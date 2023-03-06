import { HTMLAttributes } from 'react';

export default function SpeakerIcon(props: HTMLAttributes<SVGElement>) {
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
          d="M22.8,41.7h6.8c0.2,0,0.5,0.1,0.6,0.2l10.2,9.6c1.1,1,2,1.5,3.1,1.5c1.6,0,2.7-1.1,2.7-2.7V13.8c0-1.5-1.1-2.8-2.7-2.8
   c-1.1,0-1.9,0.5-3.1,1.6l-10.2,9.5c-0.1,0.1-0.4,0.2-0.6,0.2h-6.8c-3.2,0-5,1.8-5,5.2v8.9C17.8,39.9,19.5,41.7,22.8,41.7z"
        />
      </g>
    </svg>
  );
}
