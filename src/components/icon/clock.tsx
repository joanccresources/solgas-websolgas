import { memo } from "react";

function ClockIcon({ color }: { color: string }) {
  return (
    <svg
      width="21"
      height="22"
      viewBox="0 0 21 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_616_1977)">
        <path
          d="M10.5 20.1542C15.3325 20.1542 19.25 16.2367 19.25 11.4042C19.25 6.57168 15.3325 2.65417 10.5 2.65417C5.66751 2.65417 1.75 6.57168 1.75 11.4042C1.75 16.2367 5.66751 20.1542 10.5 20.1542Z"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M10.5 6.15417V11.4042L14 13.1542"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_616_1977">
          <rect
            width="21"
            height="21"
            fill="white"
            transform="translate(0 0.904175)"
          />
        </clipPath>
      </defs>
    </svg>
  );
}

export default memo(ClockIcon);
