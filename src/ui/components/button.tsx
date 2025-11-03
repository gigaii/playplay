import React from "react";
import { TouchableOpacity, StyleSheet, ActivityIndicator, Platform } from "react-native";
import { useTheme } from "../../../contexts/themeProvider";
import { Text } from "../primitives/text";
import { Icon } from "../primitives/icon";

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  iconLeft?: React.ComponentProps<typeof Icon>["name"];
  iconRight?: React.ComponentProps<typeof Icon>["name"];
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = "primary",
  size = "md",
  isLoading = false,
  iconLeft,
  iconRight,
}) => {
  const { colors, spacing, typography } = useTheme();

  // 🔹 1. Size map
  const SIZE = {
    sm: {
      fontSize: typography.fontSizes.Subtitle,
      padV: spacing['2xs'],
      padH: spacing.sm,
      icon: typography.fontSizes.Subtitle,
      gap: spacing.xs,
    },
    md: {
      fontSize: typography.fontSizes.Subtitle,
      padV: spacing.sm,
      padH: spacing.lg,
      icon: typography.fontSizes.Subtitle,
      gap: spacing.sm,
    },
    lg: {
      fontSize: typography.fontSizes.Body,
      padV: spacing.md,
      padH: spacing.xl,
      icon: typography.fontSizes.Body,
      gap: spacing.sm,
    },
    xl: {
      fontSize: typography.fontSizes.Body,
      padV: spacing.md,
      padH: spacing.xl,
      icon: typography.fontSizes.Body,
      gap: spacing.sm,
    }
  }[size];

  // 🔹 2. Variant map
  const VARIANT = {
    primary:   { bg: colors.primary,   text: colors.onPrimary, borderWidth: 0, borderColor: "transparent" },
    secondary: { bg: colors.secondary, text: colors.onPrimary, borderWidth: 0, borderColor: "transparent" },
    outline:   { bg: "transparent",    text: colors.primary,   borderWidth: 1, borderColor: colors.border },
    ghost:     { bg: "transparent",    text: colors.primary,   borderWidth: 0, borderColor: "transparent" },
  }[variant];

  // 🔹 3. Resolve correct font file
   const lockedFontFamily = typography.fontFamily.semibold;

  // 🔹 4. Styles
  const buttonStyles = StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 8,
      paddingVertical: SIZE.padV,
      paddingHorizontal: SIZE.padH,
      backgroundColor: VARIANT.bg,
      borderWidth: VARIANT.borderWidth,
      borderColor: VARIANT.borderColor,
      gap: SIZE.gap,
    },
    text: {
      color: VARIANT.text,
      fontSize: SIZE.fontSize,
      fontFamily: lockedFontFamily, // ✅ direct font file (no weight)
      textAlign: "center",
      ...(Platform.OS === "web"
        ? {
            // optional: give browser hint
            fontWeight: "600"
          }
        : null),
    },
  });

  // 🔹 5. Render
  return (
    <TouchableOpacity
      style={buttonStyles.container}
      onPress={onPress}
      disabled={isLoading}
      activeOpacity={0.8}
      hitSlop={{ top: 6, bottom: 6, left: 6, right: 6 }}
      accessibilityRole="button"
      accessibilityState={{ disabled: isLoading }}
    >
      {isLoading ? (
        <ActivityIndicator color={VARIANT.text} />
      ) : (
        <>
          {iconLeft && (
            <Icon
              name={iconLeft}
              color={buttonStyles.text.color as string}
              size={SIZE.icon}
            />
          )}
          <Text style={buttonStyles.text}>{title}</Text>
          {iconRight && (
            <Icon
              name={iconRight}
              color={buttonStyles.text.color as string}
              size={SIZE.icon}
            />
          )}
        </>
      )}
    </TouchableOpacity>
  );
};
