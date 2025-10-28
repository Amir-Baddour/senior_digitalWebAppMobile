import React from "react";
import { SafeAreaView, ScrollView, View, Text, StyleSheet } from "react-native";
import colors from "../theme/colors";
import spacing from "../theme/spacing";

export default function ScreenShell({ title, right, children }) {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        <View>{right}</View>
      </View>
      <ScrollView contentContainerStyle={styles.body}>{children}</ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg, padding: spacing.md },
  header: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.md
  },
  title: { fontSize: 20, fontWeight: "700", color: colors.text },
  body: { paddingBottom: spacing.xl }
});
