import * as React from "react";

const SvgInstagram = (props) => (
  <svg
    width={27}
    height={27}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <rect
      x={1.425}
      y={1.086}
      width={24.14}
      height={24.14}
      rx={7}
      stroke="#fff"
      strokeWidth={2}
    />
    <circle cx={13.495} cy={13.156} r={5.032} stroke="#fff" strokeWidth={2} />
    <circle r={1.508} transform="matrix(-1 0 0 1 20.03 6.62)" fill="#fff" />
  </svg>
);

export default SvgInstagram;
