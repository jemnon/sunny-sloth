import * as React from 'react';
import styled from 'styled-components';

const SVG = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    viewBox="0 0 17 17"
    preserveAspectRatio="xMidYMid meet"
    {...props}
  >
    <path d="M0 8.5a8.5 8.5 0 005.4 7.91 8.34 8.34 0 010-2.44c.16-.66 1-4.22 1-4.22a3.11 3.11 0 01-.25-1.26c0-1.18.68-2.06 1.53-2.06a1.06 1.06 0 011.11 1.19 17 17 0 01-.7 2.83A1.23 1.23 0 009.34 12c1.51 0 2.67-1.6 2.67-3.9a3.35 3.35 0 00-3.54-3.46 3.68 3.68 0 00-3.84 3.69 3.27 3.27 0 00.63 1.93.27.27 0 01.06.25c-.07.27-.21.85-.24 1s-.12.19-.28.12A3.82 3.82 0 013.07 8.3c0-2.68 1.93-5.14 5.62-5.14a5 5 0 015.24 4.9c0 2.93-1.85 5.29-4.41 5.29a2.29 2.29 0 01-1.95-1S7.14 14 7 14.39a9.2 9.2 0 01-1 2.23 8.4 8.4 0 002.5.38A8.5 8.5 0 100 8.5z" />
  </svg>
);

const SvgPinterest = styled(SVG)`
  display: ${({ display = 'inline-block' }) => display};
  font-size: ${({ fontSize = '32px' }) => fontSize};
  color: ${({ color = '#111' }) => color};
  vertical-align: middle;
  shape-rendering: inherit;
  transform: translate3d(0, 0, 0);
`;
export default SvgPinterest;
