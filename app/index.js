import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useAuth } from '../contexts/AuthContext';
import Button from '../components/Button';

export default function Welcome() {
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && user) {
      router.replace('/(protected)/home');
    }
  }, [user, loading]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.headerSection}>
          <View style={styles.iconContainer}>
            <Text style={styles.iconText}>🔐</Text>
          </View>
          <Text style={styles.title}>Welcome</Text>
          <Text style={styles.subtitle}>
            Secure authentication made simple. Sign in to access your account or create a new one.
          </Text>
        </View>

        <View style={styles.featuresSection}>
          <View style={styles.featureItem}>
            <Text style={styles.featureIcon}>✓</Text>
            <Text style={styles.featureText}>Secure email authentication</Text>
          </View>
          <View style={styles.featureItem}>
            <Text style={styles.featureIcon}>✓</Text>
            <Text style={styles.featureText}>Persistent login sessions</Text>
          </View>
          <View style={styles.featureItem}>
            <Text style={styles.featureIcon}>✓</Text>
            <Text style={styles.featureText}>Easy account management</Text>
          </View>
        </View>

        <View style={styles.buttonSection}>
          <Button 
            title="Login" 
            onPress={() => router.push('/login')} 
          />
          <View style={styles.spacing} />
          <Button 
            title="Create Account" 
            variant="secondary"
            onPress={() => router.push('/signup')} 
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  loadingText: {
    fontSize: 16,
    color: '#6B7280',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 32,
  },
  headerSection: {
    alignItems: 'center',
    marginBottom: 48,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 24,
    backgroundColor: '#EEF2FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  iconText: {
    fontSize: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 16,
  },
  featuresSection: {
    backgroundColor: '#F9FAFB',
    borderRadius: 16,
    padding: 24,
    marginBottom: 48,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  featureIcon: {
    fontSize: 18,
    color: '#10B981',
    marginRight: 12,
    fontWeight: '700',
  },
  featureText: {
    fontSize: 15,
    color: '#374151',
  },
  buttonSection: {
    marginTop: 'auto',
  },
  spacing: {
    height: 12,
  },
});
