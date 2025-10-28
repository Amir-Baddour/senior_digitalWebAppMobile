import React, { useEffect, useState } from "react";
import { Alert } from "react-native";
import ScreenShell from "../../components/ScreenShell.jsx";
import TextField from "../../components/TextField.jsx";
import PrimaryButton from "../../components/PrimaryButton.jsx";
import { useAuth } from "../../context/AuthContext.jsx";
import { api } from "../../services/api";

export default function ProfileScreen({ navigation }) {
  const { client } = useAuth();
  const [form, setForm] = useState({
    full_name: "", date_of_birth: "", phone_number: "",
    street_address: "", city: "", country: ""
  });
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const r = await api.getProfile(client);
        if (r.data?.success) {
          setForm({
            full_name: r.data.user?.full_name || "",
            date_of_birth: r.data.user?.date_of_birth || "",
            phone_number: r.data.user?.phone_number || "",
            street_address: r.data.user?.street_address || "",
            city: r.data.user?.city || "",
            country: r.data.user?.country || ""
          });
        }
      } catch {}
    })();
  }, []);

  const onSave = async () => {
    setBusy(true);
    try {
      const r = await api.updateProfile(client, form);
      const data = r.data || r;
      if (data.success) {
        Alert.alert("Saved", "Profile updated");
        navigation.navigate("Dashboard");
      } else {
        Alert.alert("Error", data.message || "Update failed");
      }
    } catch (e) {
      Alert.alert("Error", e?.response?.data?.message || e.message);
    } finally { setBusy(false); }
  };

  const setField = (k) => (v) => setForm((s) => ({ ...s, [k]: v }));

  return (
    <ScreenShell title="Profile Information">
      <TextField label="Full Name" value={form.full_name} onChangeText={setField("full_name")} />
      <TextField label="Date of Birth (YYYY-MM-DD)" value={form.date_of_birth} onChangeText={setField("date_of_birth")} />
      <TextField label="Phone Number" value={form.phone_number} onChangeText={setField("phone_number")} />
      <TextField label="Street Address" value={form.street_address} onChangeText={setField("street_address")} />
      <TextField label="City" value={form.city} onChangeText={setField("city")} />
      <TextField label="Country" value={form.country} onChangeText={setField("country")} />
      <PrimaryButton title={busy ? "Saving..." : "Save Changes"} onPress={onSave} disabled={busy} />
    </ScreenShell>
  );
}
