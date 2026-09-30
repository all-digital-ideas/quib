import type { SVGProps } from "react";

type Props = SVGProps<SVGSVGElement>;

const base = (props: Props) => ({
  width: 20,
  height: 20,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.25,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
  ...props,
});

export const SearchIcon = (p: Props) => (
  <svg {...base(p)}>
    <circle cx="11" cy="11" r="6.5" />
    <path d="m20 20-4.2-4.2" />
  </svg>
);
export const UserIcon = (p: Props) => (
  <svg {...base(p)}>
    <circle cx="12" cy="8" r="3.75" />
    <path d="M4.5 20.5c.8-4 3.8-6 7.5-6s6.700 2 7.500 6" />
  </svg>
);
export const HeartIcon = (p: Props) => (
  <svg {...base(p)}>
    <path d="M12 20.500S3.500 15.600 3.500 9.400A4.400 4.400 0 0 1 12 7.700a4.400 4.400 0 0 1 8.500 1.700c0 6.200-8.500 11.100-8.500 11.100Z" />
  </svg>
);
export const BagIcon = (p: Props) => (
  <svg {...base(p)}>
    <path d="M5 8.500h14l-.9 12H5.900L5 8.500Z" />
    <path d="M8.750 8.500V7a3.250 3.250 0 0 1 6.500 0v1.500" />
  </svg>
);
export const MenuIcon = (p: Props) => (
  <svg {...base(p)}>
    <path d="M3.500 8h17M3.500 16h17" />
  </svg>
);
export const CloseIcon = (p: Props) => (
  <svg {...base(p)}>
    <path d="m5.500 5.500 13 13M18.500 5.500l-13 13" />
  </svg>
);
export const ArrowIcon = (p: Props) => (
  <svg {...base(p)}>
    <path d="M4 12h16M14 6l6 6-6 6" />
  </svg>
);
export const PlusIcon = (p: Props) => (
  <svg {...base(p)}>
    <path d="M12 5v14M5 12h14" />
  </svg>
);
export const MinusIcon = (p: Props) => (
  <svg {...base(p)}>
    <path d="M5 12h14" />
  </svg>
);
export const StarIcon = (p: Props) => (
  <svg {...base({ fill: "currentColor", stroke: "none", ...p })}>
    <path d="m12 3 2.700 5.800 6.300.800-4.600 4.400 1.200 6.300L12 17.200 6.400 20.300l1.200-6.300L3 9.600l6.300-.800L12 3Z" />
  </svg>
);
