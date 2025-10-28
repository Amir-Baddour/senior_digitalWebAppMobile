import React, { useState } from "react";
import { Alert } from "react-native";
import ScreenShell from "../../../components/ScreenShell.jsx";
import TextField from "../../../components/TextField.jsx";
import PrimaryButton from "../../../components/PrimaryButton.jsx";
import { makeClient, api } from "../../../services/api";

export default function ResetPasswordScreen() {
  const client = makeClient();
  const [token, setToken] = useState("");            // In mobile, you can paste token
  const [pwd, setPwd] = useState("");
  const [confirm, setConfirm] = useState("");
  const [busy, setBusy] = useState(false);

  const onReset = async () => {
    if (!token || !pwd || !confirm) return;
    if (pwd !== confirm) return Alert.alert("Error", "Passwords do not match");
    setBusy(true);
    try {
      const form = new FormData();
      form.append("token", token);
      form.append("new_password", pwd);
      form.append("confirm_password", confirm);
      const res = await api.reset(client, form);
      const data = res.data || res;
      if (data.error) Alert.alert("Error", data.error);
      else Alert.alert("Password updated. Please log in.");
    } catch (e) {
      Alert.alert("Error", e?.response?.data?.message || e.message);
    } finally { setBusy(false); }
  };

  return (
    <ScreenShell title="Set a New Password">
      <TextField label="Token" value={token} onChangeText={setToken} />
      <TextField label="New password" secureTextEntry value={pwd} onChangeText={setPwd} />
      <TextField label="Confirm password" secureTextEntry value={confirm} onChangeText={setConfirm} />
      <PrimaryButton title={busy ? "Updating..." : "Update Password"} onPress={onReset} disabled={busy} />
    </ScreenShell>
  );
}
