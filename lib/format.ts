const inr = new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 });

export const formatPrice = (amount: number) => inr.format(amount);

export const discountPercent = (price: number, compareAt: number | null) =>
  compareAt && compareAt > price ? Math.round((1 - price / compareAt) * 100) : 0;

const SWATCHES: Record<string, string> = {
  black: "#111110",
  white: "#f7f6f2",
  "ivory white": "#f3efe2",
  "off white": "#f1ede1",
  cream: "#ece3cc",
  beige: "#d9c8a9",
  brown: "#6b4a33",
  wood: "#7a5a3c",
  navy: "#1c2541",
  blue: "#2f4f8f",
  sky: "#a9c9e8",
  "light sky": "#c4dcf0",
  cyan: "#5fb7c4",
  aqua: "#7fcfd0",
  green: "#3d6b4a",
  "light green": "#b5cfae",
  "sea green": "#5e9c8a",
  bottle: "#1f4033",
  olive: "#6c6b3c",
  grey: "#8d8d8a",
  "dark grey": "#4a4a48",
  maroon: "#5c1a26",
  wine: "#5a1f33",
  "dark wine purple": "#3f1a33",
  purple: "#5d3a7a",
  "dark purple": "#3a2350",
  magenta: "#a62a6b",
  pink: "#e5b3bd",
  peach: "#f0c4a8",
  orange: "#d2743a",
  red: "#a3262a",
  yellow: "#e2c34d",
};

/** CSS background for a colour name from the catalog. */
export function swatch(color: string) {
  const key = color.trim().toLowerCase();
  if (key === "multicolor") return "conic-gradient(#a3262a, #e2c34d, #3d6b4a, #2f4f8f, #5d3a7a, #a3262a)";
  return SWATCHES[key] ?? "#b9b3a6";
}
