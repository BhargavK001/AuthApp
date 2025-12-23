import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  KeyboardAvoidingView, 
  Platform,
  ScrollView,
  TouchableOpacity,
  Alert
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useAuth } from '../contexts/AuthContext';
import { validateSignupForm } from '../utils/validation';
import Button from '../components/Button';
import Input from '../components/Input';

export default function Signup() {
  const router = useRouter();
  const { signup } = useAuth();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    const validation = validateSignupForm(email, password, confirmPassword);
    
    if (!validation.valid) {
      setErrors(validation.errors);
      return;
    }
    
    setErrors({});
    setLoading(true);
    
    const result = await signup(email, password);
    
    setLoading(false);
    
    if (result.success) {
      Alert.alert(
        'Account Created',
        'Your account has been created successfully!',
        [{ text: 'OK', onPress: () => router.replace('/(protected)/home') }]
      );
    } else {
      Alert.alert('Signup Failed', result.error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Text style={styles.backText}>← Back</Text>
          </TouchableOpacity>

          <View style={styles.headerSection}>
            <Text style={styles.title}>Create Account</Text>
            <Text style={styles.subtitle}>
              Sign up to get started with your new account
            </Text>
          </View>

          <View style={styles.formSection}>
            <Input
              label="Email Address"
              placeholder="Enter your email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              error={errors.email}
            />
            
            <Input
              label="Password"
              placeholder="Create a password (min. 6 characters)"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              error={errors.password}
            />

            <Input
              label="Confirm Password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
              error={errors.confirmPassword}
            />

            <Button 
              title="Create Account" 
              onPress={handleSignup}
              loading={loading}
              style={styles.signupButton}
            />
          </View>

          <View style={styles.footerSection}>
            <Text style={styles.footerText}>Already have an account? </Text>
            <TouchableOpacity onPress={() => router.replace('/login')}>
              <Text style={styles.linkText}>Login</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingBottom: 32,
  },
  backButton: {
    paddingVertical: 16,
  },
  backText: {
    fontSize: 16,
    color: '#4F46E5',
    fontWeight: '500',
  },
  headerSection: {
    marginTop: 16,
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    color: '#6B7280',
    lineHeight: 22,
  },
  formSection: {
    flex: 1,
  },
  signupButton: {
    marginTop: 8,
  },
  footerSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 32,
  },
  footerText: {
    fontSize: 14,
    color: '#6B7280',
  },
  linkText: {
    fontSize: 14,
    color: '#4F46E5',
    fontWeight: '600',
  },
});
