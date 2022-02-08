import * as React from "react";

const SvgArrowBlack = (props) => (
  <svg
    width={62}
    height={8}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M61.354 4.354a.5.5 0 0 0 0-.708L58.172.464a.5.5 0 1 0-.707.708L60.293 4l-2.828 2.828a.5.5 0 1 0 .707.708l3.182-3.182ZM0 4.5h61v-1H0v1Z"
      fill="#000"
    />
  </svg>
);

export default SvgArrowBlack;
