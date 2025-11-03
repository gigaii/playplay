export const typography = {
  fontFamily: {
    regular:  "IBMPlex-Regular",
    medium:   "IBMPlex-Medium",
    semibold: "IBMPlex-SemiBold", // 👈 must match _layout.tsx exactly
    bold:     "IBMPlex-Bold",
    monospace:"PressStart2P-Regular",
  },
  fontSizes: {
    extraLarge: 36,
    Large: 30,
    Medium: 24,
    Header: 18,
    Body: 16,
    Subtitle: 14,
  },
  fontWeights: {
    light: "300",
    normal: "400",
    medium: "500",
    semibold: "700",
    bold: "800",
  },
  lineHeights: {
    extraLarge: 44,
    Large: 44,
    Medium: 36,
    Normal: 30,
    Small: 28,
    extraSmall: 24,
  },
  letterSpacings: {
    tight: -0.4,
    normal: 0,
    wide: 0.6, // exaggerated spacing for silly vibe
  },
};
