// src/ui/components/textInput.tsx
import React, { useState, forwardRef } from "react";
import {
  TextInput as RNTextInput,
  View,
  StyleSheet,
  TextInputProps as RNTextInputProps,
} from "react-native";
import { useTheme } from "../../../contexts/themeProvider";

// Let this component accept normal RN TextInput props (autoFocus, returnKeyType, etc.)
interface TextInputProps extends Omit<RNTextInputProps, "style"> {
  disabled?: boolean;
  secureTextEntry?: boolean;
}

export const TextInput = forwardRef<RNTextInput, TextInputProps>(
  ({ disabled = false, secureTextEntry = false, ...rest }, ref) => {
    const { colors, spacing, typography } = useTheme();
    const [isFocused, setIsFocused] = useState(false);

    const styles = StyleSheet.create({
      container: {
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: spacing.md,
        paddingVertical: spacing["2xs"],
        borderColor: isFocused ? colors.primary : colors.border,
        backgroundColor: disabled ? colors.disabled : colors.surface,
      },
      input: {
        fontFamily: typography.fontFamily.regular,
        fontSize: typography.fontSizes.Body, // <-- was Body (bug)
        color: colors.textPrimary,
      },
    });

    return (
      <View style={styles.container}>
        <RNTextInput
          ref={ref} // <-- forward ref so the screen can call .focus()
          style={styles.input}
          editable={!disabled}
          secureTextEntry={secureTextEntry}
          placeholderTextColor={colors.textTertiary}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...rest}  // <-- pass through value, onChangeText, placeholder, autoFocus, etc.
        />
      </View>
    );
  }
);
TextInput.displayName = "TextInput";
