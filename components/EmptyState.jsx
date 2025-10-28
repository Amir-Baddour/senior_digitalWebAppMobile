import React from "react";
import { View, Text, StyleSheet } from "react-native";
import colors from "../theme/colors";
export default function EmptyState({ title="Nothing here yet", subtitle }) {
  return (
    <View style={styles.wrap}>
      <Text style={styles.title}>{title}</Text>
      {subtitle ? <Text style={styles.sub}>{subtitle}</Text> : null}
    </View>
  );
}
const styles = StyleSheet.create({
  wrap:{ padding:16, alignItems:"center" },
  title:{ color:colors.muted, fontWeight:"600" },
  sub:{ color:colors.muted, marginTop:6 }
});
