/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';

function AuthContent({authStatus, auth}) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isAuthenticatedLoading, setIsAuthenticatedLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const navigation = useNavigation();

  async function handleAuthentication() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(username)) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    if (password.length < 5) {
      setErrorMessage('Password must be at least 5 characters long.');
      return;
    }
    try {
      setIsAuthenticatedLoading(true);
      await authStatus(username, password);
      setIsAuthenticatedLoading(false);
      setErrorMessage('');
    } catch (error) {
      setErrorMessage(error.message);
      setIsAuthenticatedLoading(false);
    }
  }

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#e8ecf4'}}>
      <ScrollView>
        <View style={styles.header}>
          <Image
            alt="App Logo"
            resizeMode="contain"
            style={styles.headerImg}
            source={{uri: 'https://assets.withfra.me/SignIn.2.png'}}
          />
          <Text style={styles.title}>
            {auth === 'login' ? 'Sign in' : 'Sign up'} to{' '}
            <Text style={{color: '#075eec'}}>Book Events</Text>
          </Text>
          <Text style={styles.subtitle}>Get access to register for events</Text>
        </View>
        <View style={styles.form}>
          <View style={styles.input}>
            <Text style={styles.inputLabel}>Email address</Text>
            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              clearButtonMode="while-editing"
              keyboardType="email-address"
              placeholder="john@example.com"
              placeholderTextColor="#6b7280"
              value={username}
              onChangeText={setUsername}
              style={styles.inputControl}
            />
          </View>
          <View style={styles.input}>
            <Text style={styles.inputLabel}>Password</Text>
            <TextInput
              autoCorrect={false}
              value={password}
              clearButtonMode="while-editing"
              onChangeText={setPassword}
              placeholder="********"
              placeholderTextColor="#6b7280"
              style={styles.inputControl}
              secureTextEntry={true}
            />
          </View>
          {/* show error message if credientials is failed */}
          {errorMessage ? (
            <Text style={styles.error}>{errorMessage}</Text>
          ) : null}
          <View style={styles.formAction}>
            <TouchableOpacity onPress={handleAuthentication}>
              <View style={styles.btn}>
                <Text style={styles.btnText}>
                  {isAuthenticatedLoading ? (
                    <ActivityIndicator size="small" color="white" />
                  ) : auth === 'login' ? (
                    'Sign in'
                  ) : (
                    'sign up'
                  )}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate(auth === 'login' ? 'signup' : 'login'); //here my chat gpt habeby
          }}>
          <Text style={styles.formFooter}>
            {auth === 'login' ? "Don't" : ''} have an account?{' '}
            <Text style={{textDecorationLine: 'underline'}}>
              {auth === 'login' ? 'Sign up' : 'sign in'}{' '}
            </Text>
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 24,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1D2A32',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 15,
    fontWeight: '500',
    color: '#929292',
  },
  /** Header */
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 36,
  },
  headerImg: {
    width: 80,
    height: 80,
    alignSelf: 'center',
    marginBottom: 36,
  },
  /** Form */
  form: {
    marginBottom: 24,
    paddingHorizontal: 24,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  formAction: {
    marginTop: 4,
    marginBottom: 16,
  },
  formLink: {
    fontSize: 16,
    fontWeight: '600',
    color: '#075eec',
    textAlign: 'center',
  },
  formFooter: {
    paddingVertical: 24,
    fontSize: 15,
    fontWeight: '600',
    color: '#222',
    textAlign: 'center',
    letterSpacing: 0.15,
  },
  /** Input */
  input: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 17,
    fontWeight: '600',
    color: '#222',
    marginBottom: 8,
  },
  inputControl: {
    height: 50,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    borderRadius: 12,
    fontSize: 15,
    fontWeight: '500',
    color: '#222',
    borderWidth: 1,
    borderColor: '#C9D3DB',
    borderStyle: 'solid',
  },
  /** Button */
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    backgroundColor: '#075eec',
    borderColor: '#075eec',
  },
  btnText: {
    fontSize: 18,
    lineHeight: 26,
    fontWeight: '600',
    color: '#fff',
  },
  error: {
    color: 'red',
    marginBottom: 8,
  },
});
export default AuthContent;
