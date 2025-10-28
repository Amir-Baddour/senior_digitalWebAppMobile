import React, { useState } from "react";
import { Alert } from "react-native";
import ScreenShell from "../../components/ScreenShell.jsx";
import TextField from "../../components/TextField.jsx";
import PrimaryButton from "../../components/PrimaryButton.jsx";
import { useAuth } from "../../context/AuthContext.jsx";
import { api } from "../../services/api";

export default function TransferScreen({ navigation }) {
  const { client } = useAuth();
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState("");
  const [busy, setBusy] = useState(false);

  const onTransfer = async () => {
    const v = parseFloat(amount);
    if (!email || !isFinite(v) || v <= 0) return;
    setBusy(true);
    try {
      const res = await api.transfer(client, { recipient_email: email, amount: v });
      const data = res.data || res;
      if (data.error) return Alert.alert("Error", data.error);
      Alert.alert("Success", "Transfer complete.");
      navigation.navigate("Dashboard");
    } catch (e) {
      Alert.alert("Error", e?.response?.data?.message || e.message);
    } finally { setBusy(false); }
  };

  return (
    <ScreenShell title="Internal Transfer">
      <TextField label="Recipient Email" autoCapitalize="none" keyboardType="email-address" value={email} onChangeText={setEmail} />
      <TextField label="Amount (USDT)" keyboardType="decimal-pad" value={amount} onChangeText={setAmount} />
      <PrimaryButton title={busy ? "Processing..." : "Transfer Now"} onPress={onTransfer} disabled={busy} />
    </ScreenShell>
  );
}
