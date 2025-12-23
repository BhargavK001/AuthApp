import { Slot } from 'expo-router';
import { AuthProvider } from '../contexts/AuthContext';
import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet } from 'react-native';

export default function RootLayout() {
  return (
    <AuthProvider>
      <View style={styles.container}>
        <StatusBar style="dark" />
        <Slot />
      </View>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
});
