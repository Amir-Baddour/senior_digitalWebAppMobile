import React, { useRef, useState } from "react";
import { Alert, Button } from "react-native";
import ScreenShell from "../../components/ScreenShell.jsx";
import PrimaryButton from "../../components/PrimaryButton.jsx";
import { useAuth } from "../../context/AuthContext.jsx";
import { api } from "../../services/api";

// RN file picker could be added; for now we simulate a simple call without real file pick
export default function VerificationScreen({ navigation }) {
  const { client } = useAuth();
  const [busy, setBusy] = useState(false);

  const onUpload = async () => {
    // TODO: integrate expo-document-picker for real files
    Alert.alert("Note", "Hook up expo-document-picker to send a real file as 'id_document'.");
  };

  const onSubmit = async (file) => {
    setBusy(true);
    try {
      const form = new FormData();
      form.append("id_document", file); // { uri, name, type }
      form.append("referrer", "mobile");
      const r = await api.exchange(client, form); // reuse multipart logic; or call verifyUpload directly
      // ↑ Replace with: await client.post(endpoints.verifyUpload, form, { headers: {"Content-Type":"multipart/form-data"} })
      Alert.alert("Submitted", "Verification submitted");
      navigation.navigate("Dashboard");
    } catch (e) {
      Alert.alert("Error", e?.response?.data?.message || e.message);
    } finally { setBusy(false); }
  };

  return (
    <ScreenShell title="Let’s Get You Verified">
      <PrimaryButton title="Pick ID Document" onPress={onUpload} />
      <Button title="(Dev) Submit without file" onPress={() => onSubmit({ uri:"file://dummy", name:"id.png", type:"image/png" })} />
    </ScreenShell>
  );
}
