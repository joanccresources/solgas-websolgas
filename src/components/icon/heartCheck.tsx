import { memo } from "react";

function HeartCheckIcon({
  width = "30",
  height = "29",
}: {
  width?: string;
  height?: string;
}) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 29 27"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="
        M24.2295 4.92758
        C21.7997 2.5707 17.9128 2.45684 15.344 4.59623
        C15.0993 4.80006 14.7994 4.89902 14.5013 4.89527
        C14.2032 4.89902 13.9033 4.80006 13.6586 4.59623
        C11.0898 2.45684 7.20284 2.5707 4.77304 4.92758
        C2.36157 7.26667 2.25129 10.9738 4.4319 13.4373
        C4.46393 13.4735 4.49358 13.511 4.52084 13.5496
        L14.5013 23.2305
        L24.4817 13.5496
        C24.509 13.511 24.5387 13.4735 24.5707 13.4373
        C26.7513 10.9738 26.641 7.26667 24.2295 4.92758
        Z
      "
        fill="#005BBB"
        fillRule="evenodd"
        clipRule="evenodd"
      />
    </svg>
  );
}

export default memo(HeartCheckIcon);
