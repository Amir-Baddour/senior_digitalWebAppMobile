import React, { useEffect, useState } from "react";
import { FlatList, Text } from "react-native";
import ScreenShell from "../../components/ScreenShell.jsx";
import Card from "../../components/Card.jsx";
import { useAuth } from "../../context/AuthContext.jsx";
import { api } from "../../services/api";
import { fmtAmount, fmtUSD } from "../../utils/format";

export default function AssetsScreen() {
  const { client } = useAuth();
  const [rows, setRows] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    (async () => {
      try {
        const r = await api.wallets(client);
        const wallets = r.data?.wallets || [];
        // Minimal: sum USDT only; extend w/ priceProxy like your web version for multi-asset valuation
        const map = {};
        wallets.forEach(w => {
          const sym = String(w.coin_symbol || "").toUpperCase();
          map[sym] = (map[sym] || 0) + Number(w.balance || 0);
        });
        const list = Object.entries(map).map(([symbol, balance]) => ({ symbol, balance }));
        setRows(list);
        setTotal(map.USDT || 0);
      } catch {}
    })();
  }, []);

  return (
    <ScreenShell title="Assets Overview">
      <Card>
        <Text style={{ fontWeight: "700" }}>Estimated Balance</Text>
        <Text style={{ fontSize: 22, fontWeight: "800" }}>{fmtAmount(total)} <Text style={{ fontSize: 14, color: "#777" }}>USDT</Text></Text>
        <Text>≈ {fmtUSD(total)}</Text>
      </Card>

      <FlatList
        data={rows}
        keyExtractor={(i) => i.symbol}
        renderItem={({ item }) => (
          <Card>
            <Text style={{ fontWeight: "700" }}>{item.symbol}</Text>
            <Text>{fmtAmount(item.balance)}</Text>
          </Card>
        )}
      />
    </ScreenShell>
  );
}
