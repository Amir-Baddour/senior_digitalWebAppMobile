import React, { useState } from "react";
import { Alert } from "react-native";
import ScreenShell from "../../components/ScreenShell.jsx";
import TextField from "../../components/TextField.jsx";
import PrimaryButton from "../../components/PrimaryButton.jsx";
import { makeClient, api } from "../../services/api";

export default function RegisterScreen({ navigation }) {
  const client = makeClient();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [busy, setBusy] = useState(false);

  const onRegister = async () => {
    if (!email || !password || !confirm) return;
    if (password !== confirm) return Alert.alert("Error", "Passwords do not match");
    setBusy(true);
    try {
      const body = new URLSearchParams({ email, password, confirm_password: confirm });
      const res = await api.register(client, body);
      const data = res.data || res;
      Alert.alert("Register", data.message || "Check your email if required");
      navigation.navigate("Login");
    } catch (e) {
      Alert.alert("Error", e?.response?.data?.message || e.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <ScreenShell title="Create Your Wallet">
      <TextField label="Email" autoCapitalize="none" keyboardType="email-address" value={email} onChangeText={setEmail} />
      <TextField label="Password" secureTextEntry value={password} onChangeText={setPassword} />
      <TextField label="Confirm Password" secureTextEntry value={confirm} onChangeText={setConfirm} />
      <PrimaryButton title={busy ? "Creating..." : "Create Wallet"} onPress={onRegister} disabled={busy} />
    </ScreenShell>
  );
}
