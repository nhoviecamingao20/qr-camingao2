import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.logoCircle}>
        <Ionicons name="qr-code-outline" size={40} color="#df4fec" />
      </View>

      <Text style={styles.title}>QR Attendance</Text>

      <View style={styles.content}>
        <Text style={styles.heading}>School Event Attendance</Text>
        <Text style={styles.description}>
          Scan QR Codes to record attendance during school activities.
        </Text>
      </View>

      <TouchableOpacity
  style={styles.primaryButton}
  onPress={() => router.push("/scan")}
>
  <Ionicons name="qr-code-outline" size={24} color="white" />
  <Text style={styles.primaryText}>Scan QR Code</Text>
</TouchableOpacity>

      
      <TouchableOpacity
  style={styles.secondaryButton}
  onPress={() => router.push("/history")}
>
  <Ionicons name="time-outline" size={24} color="#1f2937" />
  <Text style={styles.secondaryText}>Attendance History</Text>
</TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eabcf0",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },

  logoCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#fdfdfd",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },

  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 120,
  },

  content: {
    alignItems: "center",
    marginBottom: 25,
  },

  heading: {
    fontSize: 24,
    fontWeight: "600",
    color: "#df4fec",
  },

  description: {
    marginTop: 8,
    color: "#df4fec",
    textAlign: "center",
    fontSize: 16,
  },

  primaryButton: {
    width: "100%",
    height: 60,
    backgroundColor: "#df4fec",
    borderRadius: 18,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },

  primaryText: {
    color: "white",
    fontSize: 20,
    fontWeight: "600",
    marginLeft: 10,
  },

  secondaryButton: {
    width: "100%",
    height: 60,
    backgroundColor: "white",
    borderRadius: 18,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",

    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 5,
    elevation: 2,
  },

  secondaryText: {
    color: "#111827",
    fontSize: 20,
    fontWeight: "600",
    marginLeft: 10,
  },
});