import { memo } from "react";

function LocationIcon({ color }: { color: string }) {
  return (
    <svg
      width="21"
      height="22"
      viewBox="0 0 21 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_616_1974)">
        <path
          d="M18.375 9.65417C18.375 15.7792 10.5 21.0292 10.5 21.0292C10.5 21.0292 2.625 15.7792 2.625 9.65417C2.625 7.5656 3.45469 5.56256 4.93153 4.08571C6.40838 2.60886 8.41142 1.77917 10.5 1.77917C12.5886 1.77917 14.5916 2.60886 16.0685 4.08571C17.5453 5.56256 18.375 7.5656 18.375 9.65417Z"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M10.5 12.2792C11.9497 12.2792 13.125 11.1039 13.125 9.65417C13.125 8.20443 11.9497 7.02917 10.5 7.02917C9.05025 7.02917 7.875 8.20443 7.875 9.65417C7.875 11.1039 9.05025 12.2792 10.5 12.2792Z"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_616_1974">
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

export default memo(LocationIcon);
