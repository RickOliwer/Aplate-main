import * as React from "react";

const SvgLine = (props) => (
  <svg
    width={35}
    height={1}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path stroke="#fff" d="M0 .5h35" />
  </svg>
);

export default SvgLine;
