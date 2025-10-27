import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { useTheme } from "../../contexts/themeProvider";
import { useNotification } from "../../contexts/notificationProvider";
import { Text } from "../../src/ui/primitives/text";
import { Icon } from "../../src/ui/primitives/icon";
import { Button } from "../../src/ui/components/button";
import { TextInput } from "../../src/ui/components/textInput";
import { spacing } from "../../src/ui/tokens/spacing";

export default function HomeScreen() {
  const { colors, spacing } = useTheme();
  const { showToast, showModal } = useNotification();
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>

      <View style={{ width: "100%" }}>
        <View style={{ width: "100%", gap: spacing['2xs'], alignItems: "center" }}>
          <Text
          variant="h1"
          style={{ color: colors.textPrimary }}
          >
          Welcome Back!
          </Text>

          <Text
          variant="body"
          style={{ color: colors.textSecondary, }}
          >
          Login to continue with this app
          </Text>
        </View>
      </View>

      {/* Themed Input Group */}
      <View style={{ width: "100%" }}>
        <View style={{ width: "100%", gap: spacing.xs }}>
          <TextInput
          value={name}
          onChangeText={setName}
          placeholder="Username"
        />

          <TextInput
          value={password}
          onChangeText={setPassword}
          placeholder="Password"
          secureTextEntry
        />
        </View>
      </View>

      {/* Themed Button */}
      <View style={{ width: "100%", gap: spacing.md }}>
        <Button
          title="Sign In"
          onPress={() => alert(`Hey ${name || "there"} 👋`)}
          variant="primary"
        />

        <Button
          title="Show Modal"
          onPress={() =>
            showModal({
              title: "This is a modal!",
              message: "You can put any content you want here.",
            })
          }
          variant="outline"
        />
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.sm,
  },
});