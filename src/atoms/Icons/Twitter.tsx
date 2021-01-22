import * as React from 'react';

const SvgTwitter = ({
  fill = '#000',
  width = '100%',
  height = '100%',
  viewBox = '0 0 32 32',
  style = {
    width: '32px',
    height: '32px',
  },
  ...props
}) => (
  <svg
    width={width}
    height={height}
    viewBox={viewBox}
    xmlns="http://www.w3.org/2000/svg"
    fill={fill}
    preserveAspectRatio="xMidYMid meet"
    style={style}
    {...props}
  >
    <path
      d="M21 1.892a8.934 8.934 0 01-2.473.635c.89-.5 1.57-1.293 1.894-2.235-.832.462-1.755.8-2.735.981A4.446 4.446 0 0014.54 0c-2.378 0-4.306 1.808-4.306 4.039 0 .315.037.622.111.919-3.58-.17-6.754-1.777-8.878-4.223a3.846 3.846 0 00-.582 2.031c0 1.4.759 2.638 1.915 3.362a4.527 4.527 0 01-1.952-.504v.05c0 1.957 1.485 3.592 3.458 3.96a4.582 4.582 0 01-1.948.07c.55 1.603 2.141 2.772 4.023 2.808a9.011 9.011 0 01-5.352 1.73A9.06 9.06 0 010 14.186 12.776 12.776 0 006.607 16c7.922 0 12.257-6.157 12.257-11.496 0-.176-.004-.35-.013-.523A8.395 8.395 0 0021 1.893z"
      fill="#111"
      fillRule="nonzero"
    />
  </svg>
);

export default SvgTwitter;
