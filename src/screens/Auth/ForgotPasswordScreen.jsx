import React, { useState } from "react";
import { Alert } from "react-native";
import ScreenShell from "../../../components/ScreenShell.jsx";
import TextField from "../../../components/TextField.jsx";
import PrimaryButton from "../../../components/PrimaryButton.jsx";
import { makeClient, api } from "../../services/api";

export default function ForgotPasswordScreen() {
  const client = makeClient();
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);

  const onSubmit = async () => {
    if (!email) return;
    setBusy(true);
    try {
      const form = new FormData();
      form.append("email", email);
      const res = await api.forgot(client, form);
      const data = res.data || res;
      if (data.error) Alert.alert("Error", data.error);
      else Alert.alert("If this email exists, a reset link has been sent.");
    } catch (e) {
      Alert.alert("Error", e?.response?.data?.message || e.message);
    } finally { setBusy(false); }
  };

  return (
    <ScreenShell title="Forgot Password">
      <TextField label="Email" autoCapitalize="none" keyboardType="email-address" value={email} onChangeText={setEmail} />
      <PrimaryButton title={busy ? "Sending..." : "Send Reset Link"} onPress={onSubmit} disabled={busy} />
    </ScreenShell>
  );
}
