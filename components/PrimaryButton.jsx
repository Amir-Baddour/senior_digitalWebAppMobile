import React from "react";
import { Pressable, Text, StyleSheet } from "react-native";
import colors from "../theme/colors";
import spacing from "../theme/spacing";

export default function PrimaryButton({ title, onPress, disabled, style }) {
  return (
    <Pressable onPress={onPress} disabled={disabled} style={({ pressed }) => [
      styles.btn,
      pressed && { opacity: 0.9 },
      disabled && { opacity: 0.6 },
      style
    ]}>
      <Text style={styles.txt}>{title}</Text>
    </Pressable>
  );
}
const styles = StyleSheet.create({
  btn: {
    backgroundColor: colors.primary,
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: spacing.sm
  },
  txt: { color: "#111827", fontWeight: "700", fontSize: 16 }
});
