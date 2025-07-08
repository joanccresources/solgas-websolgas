import { memo } from "react";

function InstagramIcon({
  color,
  width = "17",
  height = "18",
}: {
  color: string;
  width?: string;
  height?: string;
}) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 17 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_1372_14440)">
        <path
          d="M11.9876 2.25537H5.01083C3.08426 2.25537 1.52246 3.81717 1.52246 5.74374V12.7205C1.52246 14.647 3.08426 16.2088 5.01083 16.2088H11.9876C13.9141 16.2088 15.4759 14.647 15.4759 12.7205V5.74374C15.4759 3.81717 13.9141 2.25537 11.9876 2.25537Z"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M11.2895 8.7926C11.3756 9.37324 11.2764 9.96624 11.0061 10.4873C10.7357 11.0083 10.308 11.4308 9.78364 11.6947C9.25933 11.9586 8.66515 12.0505 8.08562 11.9572C7.50609 11.8639 6.97072 11.5903 6.55566 11.1753C6.1406 10.7602 5.86698 10.2248 5.77373 9.64531C5.68047 9.06578 5.77233 8.4716 6.03623 7.94728C6.30014 7.42297 6.72265 6.99521 7.24367 6.72487C7.76469 6.45452 8.35769 6.35534 8.93832 6.44144C9.53059 6.52927 10.0789 6.80525 10.5023 7.22863C10.9257 7.65201 11.2017 8.20033 11.2895 8.7926Z"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12.3359 5.3949H12.3429"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_1372_14440">
          <rect
            width="16.7442"
            height="16.7442"
            fill="white"
            transform="translate(0.126953 0.860046)"
          />
        </clipPath>
      </defs>
    </svg>
  );
}

export default memo(InstagramIcon);
