import { router, Stack } from 'expo-router';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useRef, useState } from 'react';
import { ActivityIndicator, Alert, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { auth } from '../firebaseConfig';

export default function SignUpPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const passwordRef = useRef<TextInput>(null);
  const confirmRef = useRef<TextInput>(null);

  const handleSignUp = async () => {
    let errorMessage = '';
    let hasError = false;

    // Validate all fields are filled
    if (!email || !password || !confirmPassword) {
      errorMessage = 'Please fill in all fields.';
      hasError = true;
    }
    // Check if passwords match
    else if (password !== confirmPassword) {
      errorMessage = 'Passwords do not match.';
      hasError = true;
    }
    // Check password length
    else if (password.length < 6) {
      errorMessage = 'Password must be at least 6 characters long.';
      hasError = true;
    }

    // If there are validation errors, show them and stop
    if (hasError) {
      Alert.alert('Error', errorMessage);
      return;
    }

    // Proceed with account creation
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      Alert.alert('Success', 'Account created successfully!', [
        { text: 'OK', onPress: () => router.push('../screens/login') }
      ]);
    } catch (error: any) {
      let errorMessage = 'Failed to create account';
      console.log(error);
      // Handle specific Firebase auth errors
      switch (error.code) {
        case 'auth/email-already-in-use':
          errorMessage = 'An account with this email already exists';
          break;
        case 'auth/invalid-email':
          errorMessage = 'Invalid email address';
          break;
        case 'auth/weak-password':
          errorMessage = 'Password is too weak. Please choose a stronger password';
          break;
        case 'auth/operation-not-allowed':
          errorMessage = 'Email/password accounts are not enabled. Please contact support';
          break;
        default:
          errorMessage = error.message || 'Failed to create account';
      }
      Alert.alert('Sign Up Error', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleBackToLogin = () => {
    router.push('../screens/login');
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: true, headerTitle: 'Sign Up' }} />

      <View style={styles.container}>
        <Text style={styles.title}>Create Account</Text>
        <Text style={styles.subtitle}>Join med2care.ai</Text>

        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.formWrapper}
          keyboardVerticalOffset={Platform.select({ ios: 60, android: 80 })}
        >
          <ScrollView
            contentContainerStyle={styles.form}
            keyboardShouldPersistTaps="handled"
          >
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              returnKeyType="next"
              onSubmitEditing={() => passwordRef.current?.focus()}
            />

            <TextInput
              ref={passwordRef}
              style={styles.input}
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              autoCapitalize="none"
              autoCorrect={false}
              returnKeyType="next"
              onSubmitEditing={() => confirmRef.current?.focus()}
            />

            <TextInput
              ref={confirmRef}
              style={styles.input}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
              autoCapitalize="none"
              autoCorrect={false}
              returnKeyType="done"
              onSubmitEditing={handleSignUp}
            />

            <TouchableOpacity
              style={[styles.signUpButton, loading && styles.disabledButton]}
              onPress={handleSignUp}
              disabled={loading}
            >
              {loading
                ? <ActivityIndicator />
                : <Text style={styles.signUpText}>Create Account</Text>
              }
            </TouchableOpacity>

            <TouchableOpacity onPress={() => router.replace('../screens/login')}>
              <Text style={styles.loginText}>
                Already have an account? Sign In
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 40,
  },
  form: {
    width: '100%',
    maxWidth: 300,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 16,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  signUpButton: {
    backgroundColor: '#34C759',
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginBottom: 20,
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  signUpText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  loginButton: {
    paddingVertical: 10,
  },
  loginText: {
    color: '#007AFF',
    fontSize: 16,
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
  formWrapper: {
    width: '100%',
    maxWidth: 300,
  }
}); 