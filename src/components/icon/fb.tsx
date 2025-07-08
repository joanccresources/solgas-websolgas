import { memo } from "react";

function FBIcon({
  color,
  height = "16",
  width = "9",
}: {
  color: string;
  height?: string;
  width?: string;
}) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 9 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8.99946 0.557434H6.69714C5.67945 0.557434 4.70344 0.96171 3.98383 1.68132C3.26421 2.40094 2.85994 3.37695 2.85994 4.39464V6.69696H0.557617V9.76672H2.85994V15.9062H5.9297V9.76672H8.23202L8.99946 6.69696H5.9297V4.39464C5.9297 4.1911 6.01056 3.9959 6.15448 3.85197C6.2984 3.70805 6.4936 3.6272 6.69714 3.6272H8.99946V0.557434Z"
        fill={color}
      />
    </svg>
  );
}

export default memo(FBIcon);
