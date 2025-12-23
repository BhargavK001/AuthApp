import React from 'react';
import { View, Text, StyleSheet, Alert, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useAuth } from '../../contexts/AuthContext';
import Button from '../../components/Button';

export default function Home() {
  const router = useRouter();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            const result = await logout();
            if (result.success) {
              router.replace('/');
            } else {
              Alert.alert('Error', result.error);
            }
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.headerSection}>
          <View style={styles.avatarContainer}>
            <Text style={styles.avatarText}>
              {user?.email?.charAt(0)?.toUpperCase() || '?'}
            </Text>
          </View>
          <Text style={styles.greeting}>Welcome!</Text>
          <Text style={styles.email}>{user?.email}</Text>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.cardTitle}>Account Status</Text>
          <View style={styles.statusRow}>
            <View style={styles.statusDot} />
            <Text style={styles.statusText}>Logged In</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Email Verified</Text>
            <Text style={[styles.infoValue, { color: user?.emailVerified ? '#10B981' : '#F59E0B' }]}>
              {user?.emailVerified ? 'Yes' : 'No'}
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>User ID</Text>
            <Text style={styles.infoValueSmall} numberOfLines={1}>
              {user?.uid?.substring(0, 12)}...
            </Text>
          </View>
        </View>

        <View style={styles.placeholderCard}>
          <Text style={styles.placeholderIcon}>🎉</Text>
          <Text style={styles.placeholderTitle}>You're all set!</Text>
          <Text style={styles.placeholderText}>
            Your authentication is working. Add your app features here.
          </Text>
        </View>

        <View style={styles.logoutSection}>
          <Button 
            title="Logout" 
            variant="secondary"
            onPress={handleLogout}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 32,
  },
  headerSection: {
    alignItems: 'center',
    marginBottom: 32,
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#4F46E5',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarText: {
    fontSize: 32,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  greeting: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 4,
  },
  email: {
    fontSize: 15,
    color: '#6B7280',
  },
  infoCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 16,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  statusDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#10B981',
    marginRight: 8,
  },
  statusText: {
    fontSize: 14,
    color: '#10B981',
    fontWeight: '500',
  },
  divider: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  infoLabel: {
    fontSize: 14,
    color: '#6B7280',
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '600',
  },
  infoValueSmall: {
    fontSize: 12,
    color: '#9CA3AF',
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
    maxWidth: 150,
  },
  placeholderCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 32,
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  placeholderIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  placeholderTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 8,
  },
  placeholderText: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 20,
  },
  logoutSection: {
    marginTop: 'auto',
  },
});
