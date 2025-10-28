import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import ScreenShell from "../../components/ScreenShell.jsx";
import Card from "../../components/Card.jsx";
import PrimaryButton from "../../components/PrimaryButton.jsx";
import { useAuth } from "../../context/AuthContext.jsx";
import { api } from "../../services/api";
import colors from "../../theme/colors";

export default function DashboardScreen({ navigation }) {
  const { client, signOut } = useAuth();
  const [name, setName] = useState("User");
  const [tier, setTier] = useState("Regular");
  const [balance, setBalance] = useState("Loading...");
  const [limits, setLimits] = useState(null);
  const [verif, setVerif] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const r = await api.getProfile(client);
        if (r.data?.success) {
          setName(r.data.user?.full_name || "User");
          setTier(r.data.user?.tier || "Regular");
        }
      } catch {}
      try {
        // Prefer map
        const r2 = await api.getBalancesMap(client);
        const map = r2.data?.balances || {};
        const amount = map.USDT ?? Object.values(map)[0] ?? 0;
        const sym = map.USDT !== undefined ? "USDT" : Object.keys(map)[0] || "USDT";
        setBalance(`${amount} ${sym}`);
      } catch {
        const r3 = await api.getBalanceLegacy(client);
        setBalance(`${r3.data?.balance ?? 0} USDT`);
      }
      try {
        const r4 = await api.getLimits(client);
        setLimits(r4.data || null);
      } catch {}
      try {
        const r5 = await api.getVerification(client);
        setVerif(r5.data || null);
      } catch {}
    })();
  }, []);

  const headerRight = (
    <View style={{ flexDirection: "row", gap: 8 }}>
      <PrimaryButton title="Deposit" onPress={() => navigation.navigate("Deposit")} />
      <PrimaryButton title="Withdraw" onPress={() => navigation.navigate("Withdraw")} />
    </View>
  );

  return (
    <ScreenShell title="Dashboard" right={headerRight}>
      <Card>
        <Text style={{ fontWeight: "700", fontSize: 16, marginBottom: 8 }}>Welcome</Text>
        <Text>{name}</Text>
        <Text style={{ color: colors.muted }}>User Level: {tier}</Text>
      </Card>

      <Card>
        <Text style={{ fontWeight: "700", fontSize: 16, marginBottom: 8 }}>Your Balance</Text>
        <Text style={{ fontSize: 18 }}>{balance}</Text>
      </Card>

      <Card>
        <Text style={{ fontWeight: "700", fontSize: 16, marginBottom: 8 }}>Verification</Text>
        <Text>
          {verif?.is_validated === 1
            ? "Account Verified"
            : verif?.is_validated === 0
            ? "Verification Pending"
            : verif?.is_validated === -1
            ? "Verification Rejected"
            : "Not Verified"}
        </Text>
        {(!verif || verif.is_validated !== 1) && (
          <PrimaryButton title="Verify Now" onPress={() => navigation.navigate("Verification")} />
        )}
      </Card>

      <Card>
        <Text style={{ fontWeight: "700", fontSize: 16, marginBottom: 8 }}>Limits</Text>
        <Text>Daily: {limits?.dailyUsed ?? 0} / {limits?.dailyLimit ?? 0}</Text>
        <Text>Weekly: {limits?.weeklyUsed ?? 0} / {limits?.weeklyLimit ?? 0}</Text>
        <Text>Monthly: {limits?.monthlyUsed ?? 0} / {limits?.monthlyLimit ?? 0}</Text>
      </Card>

      <PrimaryButton title="Transfer" onPress={() => navigation.navigate("Transfer")} />
      <PrimaryButton title="Transactions" onPress={() => navigation.navigate("Transactions")} />
      <PrimaryButton title="Assets" onPress={() => navigation.navigate("Assets")} />
      <PrimaryButton title="Exchange" onPress={() => navigation.navigate("Exchange")} />
      <PrimaryButton title="Profile" onPress={() => navigation.navigate("Profile")} />
      <PrimaryButton title="My QR" onPress={() => navigation.navigate("MyQR")} />
      <PrimaryButton title="Logout" onPress={signOut} />
    </ScreenShell>
  );
}
