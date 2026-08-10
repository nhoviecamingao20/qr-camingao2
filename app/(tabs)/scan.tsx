import { CameraView, useCameraPermissions } from 'expo-camera';
import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { COLORS } from '@/constants/colors';
import { STUDENT_ID } from '@/constants/student';
import { registerAttendance } from '@/lib/database';

export default function QRScan() {
  const [permission, requestPermission] = useCameraPermissions();

  const [scanned, setScanned] = useState(false);
  const [lastData, setLastData] = useState<string | null>(null);

  const [message, setMessage] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleBarcodeScanned = ({ data }: { data: string }) => {
    if (scanned) {
      return;
    }

    setScanned(true);
    setLastData(data);

    registerAttendance(data, STUDENT_ID).then((result) => {
      setMessage(result.message);
      setSuccess(result.success);
    });
  };

  const handleScanAgain = () => {
    setScanned(false);
    setLastData(null);
    setMessage(null);
    setSuccess(false);
  };

  // Camera permission has not been checked yet
  if (!permission) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Checking camera permission...</Text>
      </View>
    );
  }

  // Camera permission has not been granted
  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>
          We need camera permission to scan QR codes.
        </Text>

        <TouchableOpacity
          style={styles.button}
          onPress={requestPermission}
        >
          <Text style={styles.buttonText}>Allow Camera</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView
        style={styles.camera}
        facing="back"
        onBarcodeScanned={scanned ? undefined : handleBarcodeScanned}
        barcodeScannerSettings={{
          barcodeTypes: ['qr'],
        }}
      />

      <View style={styles.overlay}>
        <Text style={styles.title}>Scan Attendance QR</Text>

        <View style={styles.scanBox} />

        {scanned && message && (
          <Text
            style={[
              styles.scanResult,
              success ? styles.success : styles.error,
            ]}
          >
            {message}
          </Text>
        )}

        {scanned && lastData && (
          <Text style={styles.scanData}>{lastData}</Text>
        )}

        {scanned && (
          <TouchableOpacity
            style={styles.button}
            onPress={handleScanAgain}
          >
            <Text style={styles.buttonText}>Scan Again</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  camera: {
    flex: 1,
  },

  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },

  title: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
  },

  scanBox: {
    width: 250,
    height: 250,
    borderWidth: 3,
    borderColor: '#FFFFFF',
    borderRadius: 20,
    marginBottom: 30,
  },

  scanResult: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 8,
    fontWeight: '600',
  },

  success: {
    color: '#2E7D32',
  },

  error: {
    color: '#C62828',
  },

  scanData: {
    fontSize: 12,
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 12,
  },

  button: {
    backgroundColor: '#1976D2',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 10,
    marginTop: 12,
  },

  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },

  text: {
    color: COLORS.textPrimary,
    fontSize: 18,
    textAlign: 'center',
    paddingHorizontal: 24,
    marginBottom: 20,
  },
});