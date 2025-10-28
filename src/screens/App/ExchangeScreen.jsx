import React, { useEffect, useState } from "react";
import ScreenShell from "../../components/ScreenShell.jsx";
import TextField from "../../components/TextField.jsx";
import PrimaryButton from "../../components/PrimaryButton.jsx";
import { useAuth } from "../../context/AuthContext.jsx";
import { api } from "../../services/api";

export default function ExchangeScreen({ navigation }) {
  const { client } = useAuth();
  const [fromSym, setFromSym] = useState("USDT");
  const [toSym, setToSym] = useState("BTC");
  const [amount, setAmount] = useState("");
  const [busy, setBusy] = useState(false);

  const onConvert = async () => {
    const v = parseFloat(amount);
    if (!isFinite(v) || v <= 0) return;
    setBusy(true);
    try {
      const form = new FormData();
      // In your web version you use ids + symbols; fetch ids via coins_proxy if needed
      form.append("from_id", fromSym.toLowerCase());
      form.append("from_sym", fromSym);
      form.append("to_id", toSym.toLowerCase());
      form.append("to_sym", toSym);
      form.append("amount", String(v));
      const r = await api.exchange(client, form);
      const data = r.data || r;
      if (data.success) {
        alert(`Success! Converted ${v} ${fromSym} → ${toSym}.`);
        navigation.navigate("Assets");
      } else alert(data.error || "Conversion failed");
    } catch (e) {
      alert(e?.response?.data?.error || e.message);
    } finally { setBusy(false); }
  };

  return (
    <ScreenShell title="Coin Exchange">
      <TextField label="From (Symbol)" value={fromSym} onChangeText={setFromSym} />
      <TextField label="To (Symbol)" value={toSym} onChangeText={setToSym} />
      <TextField label="Amount" keyboardType="decimal-pad" value={amount} onChangeText={setAmount} />
      <PrimaryButton title={busy ? "Converting..." : "Convert"} onPress={onConvert} disabled={busy} />
    </ScreenShell>
  );
}
