import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import PrimaryButton from '../../components/PrimaryButton';
import SecondaryButton from '../../components/SecondaryButton';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Icon Container */}
      <View style={styles.iconContainer}>
        <Ionicons name="school" size={64} color="#1E63B5" />
      </View>

      {/* Title */}
      <Text style={styles.title}>QR Attendance</Text>

      {/* Subtitle */}
      <Text style={styles.subtitle}>School Event Attendance</Text>

      {/* Description */}
      <Text style={styles.description}>
        Scan QR Codes to record attendance during school activities.
      </Text>

      {/* Buttons */}
      <View style={styles.buttonContainer}>
        <PrimaryButton
          label="Scan QR Code"
          icon="qr-code"
          onPress={() => router.push('/scan')}
        />

        <SecondaryButton
          label="Attendance History"
          icon="time-outline"
          onPress={() => router.push('/history')}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EEF2F5',
    paddingHorizontal: 24,
    paddingTop: 120,
    alignItems: 'center',
  },

  iconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#D6E4F0',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },

  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1F2429',
    textAlign: 'center',
    marginBottom: 12,
  },

  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1E63B5',
    textAlign: 'center',
    marginBottom: 8,
  },

  description: {
    fontSize: 15,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 40,
    paddingHorizontal: 20,
  },

  buttonContainer: {
    width: '100%',
    gap: 18,
  },
});