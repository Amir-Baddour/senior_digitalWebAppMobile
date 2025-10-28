import React, { useEffect, useState } from "react";
import { View, Text, FlatList } from "react-native";
import ScreenShell from "../../components/ScreenShell.jsx";
import TextField from "../../components/TextField.jsx";
import PrimaryButton from "../../components/PrimaryButton.jsx";
import Card from "../../components/Card.jsx";
import EmptyState from "../../components/EmptyState.jsx";
import { useAuth } from "../../context/AuthContext.jsx";
import { api } from "../../services/api";

export default function TransactionsScreen() {
  const { client } = useAuth();
  const [date, setDate] = useState("");
  const [type, setType] = useState("");
  const [items, setItems] = useState([]);

  const fetchTx = async () => {
    const qs = new URLSearchParams();
    if (date) qs.append("date", date);
    if (type) qs.append("type", type);
    try {
      const res = await api.transactions(client, qs.toString());
      const data = res.data || res;
      setItems(data?.transactions || []);
    } catch {
      setItems([]);
    }
  };

  useEffect(() => { fetchTx(); }, []);

  return (
    <ScreenShell title="Transaction History">
      <TextField label="Date (YYYY-MM-DD)" value={date} onChangeText={setDate} />
      <TextField label="Type (deposit|withdrawal|transfer|exchange)" value={type} onChangeText={setType} />
      <PrimaryButton title="Filter" onPress={fetchTx} />

      {!items.length ? (
        <EmptyState title="No transactions found." />
      ) : (
        <FlatList
          style={{ marginTop: 12 }}
          data={items}
          keyExtractor={(item, i) => `${item.id || i}`}
          renderItem={({ item }) => (
            <Card>
              <Text style={{ fontWeight: "700" }}>{(item.transaction_type || item.type || "-").toString()}</Text>
              <Text>Amount: {String(item.amount ?? "-")}</Text>
              <Text>Date: {item.created_at || "-"}</Text>
              <Text>
                {item.transaction_type === "transfer"
                  ? item.sender_email ? `From: ${item.sender_email}` : item.recipient_email ? `To: ${item.recipient_email}` : "-"
                  : item.transaction_type === "exchange"
                  ? "Currency exchange"
                  : ""}
              </Text>
            </Card>
          )}
        />
      )}
    </ScreenShell>
  );
}
