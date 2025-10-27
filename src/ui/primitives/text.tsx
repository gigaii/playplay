import React from "react";
import { Text as RNText, TextProps, StyleSheet } from "react-native";
import { useTheme } from "../../../contexts/themeProvider";
import { typography } from "../tokens/typography";

interface AppTextProps extends TextProps {
  variant?: keyof typeof styles;
  color?: string;
}

export const Text: React.FC<AppTextProps> = ({
  variant = "body",
  color,
  style,
  children,
  ...rest
}) => {
  const { colors, typography } = useTheme();

  const variantStyle = StyleSheet.flatten([
    styles[variant],
    {
      color: color || colors.textPrimary,
      fontFamily: typography.fontFamily.regular,
    },
    style,
  ]);

  return (
    <RNText style={variantStyle} {...rest}>
      {children}
    </RNText>
  );
};

const styles = StyleSheet.create({
  h1: {
    fontSize: typography.fontSizes.h1,
    fontWeight: typography.fontWeights.semibold,
    lineHeight: typography.lineHeights.h1,
    fontFamily: typography.fontFamily.regular,
  },
  h2: {
    fontSize: typography.fontSizes.h2,
    fontWeight: typography.fontWeights.medium,
    lineHeight: typography.lineHeights.h2,
    fontFamily: typography.fontFamily.regular,
  },
  body: {
    fontSize: typography.fontSizes.body,
    fontWeight: typography.fontWeights.normal,
    lineHeight: typography.lineHeights.body,
    fontFamily: typography.fontFamily.regular,
  },
});

