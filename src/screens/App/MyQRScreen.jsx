import React, { useEffect, useState } from "react";
import { View, Image, Text } from "react-native";
import ScreenShell from "../../components/ScreenShell.jsx";
import Card from "../../components/Card.jsx";
import endpoints from "../../services/endpoints";

export default function MyQRScreen() {
  const [src, setSrc] = useState(null);

  useEffect(() => {
    // Use stored id if available
    const uid = localStorage.getItem("userId") || "";
    const params = new URLSearchParams({ recipient_id: String(uid), amount: "10" }).toString();
    setSrc(`${endpoints.qr}?${params}`);
  }, []);

  return (
    <ScreenShell title="My QR">
      <Card>
        <Text style={{ fontWeight: "700", fontSize: 16, marginBottom: 8 }}>Scan this QR Code</Text>
        {src ? (
          <Image source={{ uri: src }} style={{ width: 260, height: 260, alignSelf: "center", borderRadius: 12, borderWidth: 1, borderColor: "#e5e7eb" }} />
        ) : null}
      </Card>
    </ScreenShell>
  );
}
