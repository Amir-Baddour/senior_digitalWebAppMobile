import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import colors from "../theme/colors";
import spacing from "../theme/spacing";

export default function TextField({ label, ...props }) {
  return (
    <View style={styles.wrap}>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <TextInput style={styles.input} placeholderTextColor="#9CA3AF" {...props} />
    </View>
  );
}
const styles = StyleSheet.create({
  wrap: { marginBottom: spacing.md },
  label: { marginBottom: 6, color: colors.text, fontWeight: "600" },
  input: {
    backgroundColor: "#F9FAFB",
    borderWidth: 2,
    borderColor: colors.border,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 12,
    color: colors.text
  }
});
