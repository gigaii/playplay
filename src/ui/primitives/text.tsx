import React from "react";
import { Text as RNText, TextProps, StyleSheet, Platform } from "react-native";
import { useTheme } from "../../../contexts/themeProvider";

type Variant = "h1" | "h2" | "h3" | "h4" | "body" | "subtitle";
type Weight  = "regular" | "medium" | "semibold" | "bold";

interface AppTextProps extends TextProps {
  variant?: Variant;
  color?: string;
  /** Optional weight override (defaults are defined per variant below) */
  weight?: Weight;
}

export const Text: React.FC<AppTextProps> = ({
  variant = "body",
  color,
  style,
  weight,
  children,
  ...rest
}) => {
  const { colors, typography } = useTheme();

  // ⚙️ Variant spec reads ONLY from tokens (no hardcoded numbers)
  const variantMap: Record<
    Variant,
    { fontSize: number; lineHeight: number; defaultWeight: Weight }
  > = {
    h1:       { fontSize: typography.fontSizes.extraLarge,       lineHeight: typography.lineHeights.extraLarge,       defaultWeight: "bold" },
    h2:       { fontSize: typography.fontSizes.Large,       lineHeight: typography.lineHeights.Large,       defaultWeight: "semibold" },
    h3:       { fontSize: typography.fontSizes.Medium,       lineHeight: typography.lineHeights.Medium,       defaultWeight: "semibold" },
    h4:       { fontSize: typography.fontSizes.Header,       lineHeight: typography.lineHeights.Normal,    defaultWeight: "medium" },
    body:     { fontSize: typography.fontSizes.Body,     lineHeight: typography.lineHeights.Small,     defaultWeight: "regular" },
    subtitle: { fontSize: typography.fontSizes.Subtitle, lineHeight: typography.lineHeights.extraSmall, defaultWeight: "regular" },
  };

  const spec = variantMap[variant];
  const resolvedWeight: Weight = weight ?? spec.defaultWeight;
  const resolvedFamily = typography.fontFamily[resolvedWeight];

  const variantStyle = StyleSheet.flatten([
    {
      color: color || colors.textPrimary,
      fontSize: spec.fontSize,
      lineHeight: spec.lineHeight,
      // Use the actual font file for platform-native accuracy
      fontFamily: resolvedFamily,
      // Web-only hint to ensure correct face selection in the browser
      ...(Platform.OS === "web"
        ? {
            fontWeight:
              resolvedWeight === "bold"
                ? "700"
                : resolvedWeight === "semibold"
                ? "600"
                : resolvedWeight === "medium"
                ? "500"
                : "400",
          }
        : null),
    },
    style,
  ]);

  return (
    <RNText style={variantStyle} {...rest}>
      {children}
    </RNText>
  );
};
