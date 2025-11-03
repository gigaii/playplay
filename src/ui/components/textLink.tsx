// src/ui/components/textLink.tsx
import React from "react";
import { Pressable, StyleSheet, Platform, ViewStyle } from "react-native";
import { useTheme } from "../../../contexts/themeProvider";
import { Text } from "../primitives/text";

type Size = "sm" | "md";
type Align = "left" | "center" | "right";

interface TextLinkProps {
  label: string;
  onPress: () => void;
  size?: Size;             // controls font size & touch padding
  align?: Align;           // left (default), center, right
  disabled?: boolean;
  style?: ViewStyle;       // optional container overrides (e.g., marginTop)
}

export const TextLink: React.FC<TextLinkProps> = ({
  label,
  onPress,
  size = "md",
  align = "left",
  disabled = false,
  style,
}) => {
  const { colors, spacing, typography } = useTheme();

  const SIZE = {
    sm: { fontSize: typography.fontSizes.Subtitle, },
    md: { fontSize: typography.fontSizes.Body, },
  }[size];

  const styles = StyleSheet.create({
    wrap: {
      alignSelf:
        align === "left" ? "flex-start" : align === "right" ? "flex-end" : "center",
    },
    text: {
      color: colors.primary,
      fontSize: SIZE.fontSize,
      fontFamily: typography.fontFamily.medium, // link weight locked
      textAlign: "left",
      ...(Platform.OS === "web" ? { fontWeight: "600", cursor: "pointer" } : null),
      opacity: disabled ? 0.5 : 1,
    },
  });

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [styles.wrap, pressed && !disabled && { opacity: 0.7 }, style]}
      hitSlop={8}
      accessibilityRole="button"
      accessibilityLabel={label}
    >
      <Text variant="body" style={styles.text}>{label}</Text>
    </Pressable>
  );
};
