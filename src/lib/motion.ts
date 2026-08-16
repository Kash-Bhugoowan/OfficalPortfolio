// Approximates the Figma-exported spring easing (0.744s, slight overshoot)
export const linkHoverTransition = {
  type: "spring" as const,
  visualDuration: 0.744,
  bounce: 0.25,
};
