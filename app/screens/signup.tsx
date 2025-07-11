import { Stack } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

export default function SignUpPage() {
  return (
    <>
      <Stack.Screen options={{ headerShown: true, headerTitle: 'Sign Up' }} />
      <View style={styles.container}>
        <Text style={styles.title}>Sign Up</Text>
        <Text style={styles.subtitle}>Create your account</Text>
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
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  subtitle: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
  },
}); 