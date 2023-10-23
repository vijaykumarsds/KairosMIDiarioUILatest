import React, { useState } from 'react';
import {
  View,
  Text,
  Dimensions,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AwesomeAlert from 'react-native-awesome-alerts';
import BASE_URL from './apiConfig';
import { useTranslation } from 'react-i18next';

const PasswordChange = ({ route, navigation }) => {
  const { t } = useTranslation();
  const [email, setEmail] = useState(route.params.paramKey);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [username] = "str";
  const [userid] = "str";
  const [phoneNumber] = "str";

  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [isAccountLocked, setIsAccountLocked] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,30}$/;
    return passwordRegex.test(password);
  };
  const handlePasswordChange = (text) => {
    setPassword(text);
    if (!validatePassword(text)) {
      setPasswordError(
        'Password must be at least 6 characters long and must have one uppercase letter, one lowercase letter, one number, and a special character.'
      );
    } else {
      setPasswordError('');
    }
  };
  const handleLogin = async () => {
    if (!email || !password || !confirmPassword) {
      // Show a custom error alert when fields are empty
      setShowErrorAlert(true);
      return;
    }
    if (!password) {
      setPasswordError('Password is required');
      hasError = true;
    } else {
      setPasswordError('');
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError('Passwords do not match');
      hasError = true;
    } else {
      setConfirmPasswordError('');
    }
    if (!email) {
      setEmailError('Email is required');
    }

    if (!password) {
      setPasswordError('Password is required');
    }
    const user = {
      userID: userid,
      eMail: email,
      password: password,
      userName: username,
      phoneNumber: phoneNumber,
      confirmPassword: confirmPassword
    };

    try {
      const response = await fetch(`${BASE_URL}/ForgotPassword/ResetPassWord`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });
      console.log(user)
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      setShowSuccessAlert(true);

    } catch (error) {
      console.error('Error:', error.message);
      // Show a custom error alert for login failure
      setShowErrorAlert(true);
    }
  };

  return (
    <ScrollView>

      <View>
        <LinearGradient
          colors={['#33bbff', '#33bbff', '#33bbff']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={{
            borderBottomLeftRadius: 15,
            borderBottomRightRadius: 15,
            height: Dimensions.get('window').height * 0.2,
            width: '100%',
            alignItems: 'center',
            paddingTop: 10,
          }}
        >
          <Text style={styles.headerText1}>Kairos</Text>
          <Text style={styles.headerText2}>MI Diario</Text>
        </LinearGradient>
        <View style={styles.formContainer}>
          <Text style={styles.formTitle}>{t('Reset Password')}</Text>
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            placeholderTextColor="#808080"
            style={styles.input}
            maxLength={250}
            editable={false}
          />
          <TextInput
            style={[styles.input, passwordError && styles.inputError]}
            placeholder={t('password')}
            secureTextEntry
            value={password}
            onChangeText={handlePasswordChange}
            maxLength={256}
          />
          {passwordError ? (
            <Text style={styles.errorText}>{passwordError}</Text>
          ) : null}

          {/* Confirm Password */}
          <TextInput
            style={styles.input}
            placeholder={t('confirmPassword')}
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            maxLength={256}
          />
          {confirmPasswordError ? (
            <Text style={styles.errorText}>{confirmPasswordError}</Text>
          ) : null}
          <TouchableOpacity onPress={handleLogin} style={styles.loginButton}>
            <Text style={styles.loginButtonText}>{t('Submit')}</Text>
          </TouchableOpacity>
          <Text style={styles.signupText}>
          {t('Go back to')}{' '}
            <Text onPress={() => navigation.navigate('Login')} style={styles.signupLink}>
            {t('login')}
            </Text>
          </Text>
        </View>

        <AwesomeAlert
          show={showSuccessAlert}
          title="SUCCESS"
          message="Password Update successful!"
          showCancelButton={false}
          showConfirmButton
          confirmText="OK"
          titleStyle={{ color: 'green', fontWeight: 'bold' }}
          messageStyle={{ color: '#000000', fontWeight: 'bold' }}
          confirmButtonColor="#33bbff"
          onConfirmPressed={() => {
            setShowSuccessAlert(false);
            navigation.navigate('Login');
          }}
        />
        {/* Custom Error Alert */}
        <AwesomeAlert
          show={showErrorAlert}
          titleStyle={styles.errorAlertTitle}
          messageStyle={styles.errorAlertMessage}
          title="! ERROR"
          message="Invalid email, Password, ConfirmPassword. Please try again."
          showConfirmButton
          confirmText="OK"
          confirmButtonColor="#33bbff"
          onConfirmPressed={() => setShowErrorAlert(false)}
          closeOnTouchOutside={false}
        />

        {/* Account Locked Alert */}
        <AwesomeAlert
          show={isAccountLocked}
          titleStyle={styles.errorAlertTitle}
          messageStyle={styles.errorAlertMessage}
          title="Account Locked"
          message="User Account Is locked, Please contact Administrator."
          showConfirmButton
          confirmText="OK"
          confirmButtonColor="#33bbff"
          onConfirmPressed={() => {

            setIsAccountLocked(false);
            setShowErrorAlert(false);
            navigation.navigate('Forgot');
          }}
          closeOnTouchOutside={false}
        />
      </View>

    </ScrollView>
  );
};

export default PasswordChange;

const styles = {
  headerText1: {
    color: '#000000',
    fontSize: 18,
    fontWeight: 'bold',
    fontStyle: 'italic',
    marginBottom: -10,
  },
  headerText2: {
    color: '#000000',
    fontSize: 31,
    fontWeight: 'bold',
    fontStyle: 'italic',
    marginBottom: 10,
  },
  formContainer: {
    elevation: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    margin: 15,
    marginTop: -20,
    paddingVertical: 100,
    paddingHorizontal: 15,
  },
  formTitle: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#000000',
    textAlign: 'center',
  },
  input: {
    marginTop: 30,
    marginBottom: 20,
    borderBottomWidth: 1,
    borderColor: '#03bafc',
    fontSize: 16,
    paddingLeft: 5,
  },
  loginButton: {
    borderRadius: 100,
    width: 150,
    alignSelf: 'center',
    alignItems: 'center',
    paddingVertical: 5,
    marginTop: 30,
    marginBottom: 10,
    backgroundColor: '#33bbff',
  },
  loginButtonText: {
    color: 'white',
    fontSize: 19,
  },
  signupText: {
    color: '#000000',
    fontSize: 16,
    textAlign: 'center',
  },
  signupLink: {
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  errorAlertTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'red',
  },
  errorAlertMessage: {
    fontSize: 14,
    color: '#000000',
  },
};