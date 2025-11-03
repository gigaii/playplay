import React, { useRef, useState } from "react";
import { View, StyleSheet, Platform, KeyboardAvoidingView, TextInput as RNTextInput, InteractionManager  } from "react-native";
import { useFocusEffect, useRouter } from "expo-router";
import { useTheme } from "../../contexts/themeProvider";
import { useNotification } from "../../contexts/notificationProvider";
import { Text } from "../../src/ui/primitives/text";
import { Button } from "../../src/ui/components/button";
import { TextInput } from "../../src/ui/components/textInput";
import { TextLink } from "../../src/ui/components/textLink";
import { spacing, spacing as TOKENS } from "../../src/ui/tokens/spacing"; // only used in StyleSheet

export default function HomeScreen() {
  const { colors, spacing } = useTheme();
  const router = useRouter();
  const { showModal } = useNotification();
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const userRef = useRef<RNTextInput>(null);
  const passRef = useRef<RNTextInput>(null);

    useFocusEffect(
    React.useCallback(() => {
      const task = InteractionManager.runAfterInteractions(() => {
        userRef.current?.focus(); // ← keyboard appears immediately
      });
      return () => task.cancel();
    }, [])
  );

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}  // ✅ pushes UI up
      keyboardVerticalOffset={0} 
    >
    <View style={[styles.container, { backgroundColor: colors.onPrimary }]}>

      <View style={{ width: "100%", alignItems: "center", gap: spacing["3xs"] }}>
        <Text variant="h2" weight="semibold">Welcome Back!</Text>
        <Text variant="body" color={colors.textSecondary}>
          Login to continue with this app
        </Text>
      </View>

      <View style={{ width: "100%", gap: spacing.sm }}>
        <View style={{ width: "100%", gap: spacing.xs }}>
          <TextInput
          ref={userRef}
            value={name}
            onChangeText={setName}
            returnKeyType="next" 
            onSubmitEditing={() => passRef.current?.focus()}
            blurOnSubmit={false}             
            placeholder="Username"
            keyboardType="ascii-capable"
            autoCapitalize="none"
          />
          <TextInput
          ref={passRef}
            value={password}
            onChangeText={setPassword}
            placeholder="Password"
            secureTextEntry
            keyboardType="ascii-capable"
          />
        </View>

        <View style={{ width: "100%", gap: spacing.xs }}>
          <Button
            title="Sign in"
            variant="secondary"
            size="sm"
            onPress={() => router.replace("/(tabs)")}/>
        <TextLink
          label="Forgot Password?"
          onPress={() => {/* navigate to reset */}}
          size="sm"
          align="left"
        />
        </View>
      </View>
    </View>
    </KeyboardAvoidingView>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    gap: spacing.sm,
    paddingTop : spacing['3xl'],
  },
});
