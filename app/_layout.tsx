import React, { useEffect, useCallback } from "react";
import { Slot } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { ThemeProvider } from "../contexts/themeProvider";
import { NotificationProvider } from "../contexts/notificationProvider";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { StatusBar, StyleSheet } from "react-native";

import {
  useFonts,
  IBMPlexSans_400Regular as IBMPlexRegular,
  IBMPlexSans_500Medium  as IBMPlexMedium,
  IBMPlexSans_600SemiBold as IBMPlexSemiBold, // 👈 add this
  IBMPlexSans_700Bold    as IBMPlexBold,
} from "@expo-google-fonts/ibm-plex-sans";
import { PressStart2P_400Regular as PressStart2PRegular } from "@expo-google-fonts/press-start-2p";
import { spacing } from "../src/ui/tokens/spacing";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
const [fontsLoaded] = useFonts({
  "IBMPlex-Regular":  IBMPlexRegular,
  "IBMPlex-Medium":   IBMPlexMedium,
  "IBMPlex-SemiBold": IBMPlexSemiBold, // 👈 register 600
  "IBMPlex-Bold":     IBMPlexBold,
  "PressStart2P-Regular": PressStart2PRegular,
});

  const onReady = useCallback(async () => {
    if (fontsLoaded) await SplashScreen.hideAsync();
  }, [fontsLoaded]);

  useEffect(() => {
    onReady();
  }, [onReady]);

  if (!fontsLoaded) return null;

  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <NotificationProvider>
          <StatusBar translucent backgroundColor="transparent" />
          <SafeAreaView style={styles.safeArea}>
            <Slot />
          </SafeAreaView>
        </NotificationProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingHorizontal: spacing.xs, // ← only left & right spacing
    paddingVertical: 0,    // ← no top/bottom padding
  },
});
