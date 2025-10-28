import React, { useState } from "react";
import { Alert } from "react-native";
import ScreenShell from "../../components/ScreenShell.jsx";
import TextField from "../../components/TextField.jsx";
import PrimaryButton from "../../components/PrimaryButton.jsx";
import { useAuth } from "../../context/AuthContext.jsx";
import { api } from "../../services/api";

export default function WithdrawScreen({ navigation }) {
  const { client } = useAuth();
  const [amount, setAmount] = useState("");
  const [busy, setBusy] = useState(false);

  const onWithdraw = async () => {
    const v = parseFloat(amount);
    if (!isFinite(v) || v <= 0) return;
    setBusy(true);
    try {
      const res = await api.withdraw(client, { amount: v });
      const data = res.data || res;
      if (data.error) return Alert.alert("Error", data.error);
      Alert.alert("Success", `Withdrawal of ${v} USDT successful.`);
      navigation.navigate("Dashboard");
    } catch (e) {
      Alert.alert("Error", e?.response?.data?.message || e.message);
    } finally { setBusy(false); }
  };

  return (
    <ScreenShell title="Withdraw Funds">
      <TextField label="Amount (USDT)" keyboardType="decimal-pad" value={amount} onChangeText={setAmount} />
      <PrimaryButton title={busy ? "Processing..." : "Withdraw"} onPress={onWithdraw} disabled={busy} />
    </ScreenShell>
  );
}
