import React, { useState } from "react";
import { TextInput as RNTextInput, View, StyleSheet } from "react-native";
import { useTheme } from "../../../contexts/themeProvider";

interface TextInputProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  disabled?: boolean;
  secureTextEntry?: boolean;
}

export const TextInput: React.FC<TextInputProps> = ({
  value,
  onChangeText,
  placeholder,
  disabled = false,
  secureTextEntry = false,
}) => {
  const { colors, spacing, typography } = useTheme();
  const [isFocused, setIsFocused] = useState(false);

  const styles = StyleSheet.create({
    container: {
      borderWidth: 1,
      borderRadius: 8,
      paddingHorizontal: spacing.md,
      paddingVertical: spacing['2xs'],
      borderColor: isFocused ? colors.primary : colors.border,
      backgroundColor: disabled ? colors.disabled : colors.surface,
    },
    input: {
      fontFamily: typography.fontFamily.regular,
      fontSize: typography.fontSizes.body,
      color: colors.textPrimary,
    },
  });

  return (
    <View style={styles.container}>
      <RNTextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.textTertiary}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        editable={!disabled}
        secureTextEntry={secureTextEntry}
      />
    </View>
  );
};
