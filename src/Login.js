import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Dimensions,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Switch
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AwesomeAlert from 'react-native-awesome-alerts';
import { useUser } from './UserContext';
import BASE_URL from './apiConfig';
import commonStyles from './Common/commonStyles';
import { useTranslation } from 'react-i18next';


const Login = ({ navigation }) => {
  const { setUserData } = useUser();
  const [email, setEmail] = useState("john@123.com");
  const [password, setPassword] = useState("John@123");
  const [username] = "str";
  const [userid] = "str";
  const { t, i18n } = useTranslation();
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [isAccountLocked, setIsAccountLocked] = useState(false);
  const [isSpanish, setIsSpanish] = useState(false);

  useEffect(() => {
    i18n.changeLanguage(isSpanish ? 'es' : 'en');
  }, [isSpanish]);
  const toggleLanguage = () => {
    setIsSpanish((prevIsSpanish) => !prevIsSpanish);
  };



  const handleLogin = async () => {
    if (!email || !password) {
      // Show a custom error alert when fields are empty
      setShowErrorAlert(true);
      return;
    }
    const user = {
      confirmPassword: "str",
      phoneNumber: "str",
      email: email,
      password: password,
      username: username,
      userID: userid
    };
    console.log(user);
    try {
      const response = await fetch(`${BASE_URL}/Users/SignIn`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }


      const userdata = await response.json();

      console.log("userdata : ", userdata)
      if (userdata.status === true) {
        // Get the setUserData function from the context
        setUserData(userdata); // Set the userdata globally
        navigation.navigate('Dashboard');
      } else if (userdata.status === false) {
        setIsAccountLocked(true);
      } else {
        setShowErrorAlert(true);
      }

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
              paddingTop: 40,
            }}
          >
            <Text style={commonStyles.headerText1}>Kairos</Text>
            <Text style={commonStyles.headerText2}>MI Diario</Text>
          </LinearGradient>
          <View style={styles.formContainer}>
            <Text style={commonStyles.formTitleText}>{t('signin')}</Text>
            <TextInput
              placeholder={t('emailPlaceholder')}
              value={email}
              onChangeText={setEmail}
              placeholderTextColor="#808080"
              style={styles.input}
              maxLength={250}
            />
            <TextInput
              placeholder={t('passwordPlaceholder')}
              secureTextEntry
              value={password}
              onChangeText={setPassword}
              placeholderTextColor="#808080"
              style={styles.input}
              maxLength={256}
            />
            <Text style={styles.signupLink}>
              <Text onPress={() => navigation.navigate('ForgotPasswordValidation')} style={styles.signupLink}>{t('forgotPasswordText')}</Text>
            </Text>

            <Text style={styles.signupText}>
              {t('signupText')}{' '}
              <Text onPress={() => navigation.navigate('Signup')} style={styles.signupLink}>
                {t('signupLink')}
              </Text>
            </Text>
            <View>
            <Text style={styles.languageSwitchLabel}>{t('switchlanguage')}</Text>
            </View>
            <View style={styles.languageSwitchContainer}>
              <Text style={[styles.languageLabel, !isSpanish && styles.activeLanguageLabel]}>{t('english')}</Text>
              <Switch
                value={isSpanish}
                onValueChange={toggleLanguage}
                thumbColor="#33bbff"
                trackColor={{ false: '#ccc', true: '#33bbff' }}
              />
              <Text style={[styles.languageLabel, isSpanish && styles.activeLanguageLabel]}>{t('spanish')}</Text>
            </View>


            <TouchableOpacity onPress={handleLogin} style={commonStyles.button}>
              <Text style={commonStyles.buttonText}>{t('login')}</Text>
            </TouchableOpacity>
          </View>

          {/* Custom Error Alert */}
          <AwesomeAlert
            show={showErrorAlert}
            titleStyle={styles.errorAlertTitle}
            messageStyle={styles.errorAlertMessage}
            title="! ERROR"
            message="Invalid email or password. Please try again."
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
            message="Account Locked. Contact Administrator: admin@kairos.com"
            showConfirmButton
            confirmText="OK"
            confirmButtonColor="#33bbff"
            onConfirmPressed={() => {
              // Redirect to the login page when OK is clicked
              setIsAccountLocked(false);
              setShowErrorAlert(false); // Clear any previous error alert
              navigation.navigate('Login');
            }}
            closeOnTouchOutside={false}
          />
        </View>
      
    </ScrollView>
  );
};

export default Login;

const styles = {
  languageSwitchLabel: {
    color: '#000000',
    fontSize: 15,
    textAlign: 'center',
    fontWeight: 'bold',

  },

  activeLanguageLabel: {
    color: '#33bbff', // Color for active (English) text
  },

  languageSwitchContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },

  languageLabel: {
    flex: 1,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  headerText1: {
    color: '#000000',
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: -10,
  },
  headerText2: {
    color: '#000000',
    fontSize: 31,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  formContainer: {
    elevation: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    margin: 15,
    marginTop: -20,
    paddingVertical: 50,
    paddingHorizontal: 15,
  },
  formTitle: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#000000',
    textAlign: 'center',
  },
  input: {
    marginTop: 10,
    marginBottom: 10,
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
    marginTop: 50,
    marginBottom: 10,
    backgroundColor: '#33bbff',
  },
  loginButtonText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 19,
  },
  signupText: {
    marginTop: 10,
    marginBottom: 20,
    color: '#000000',
    fontSize: 16,
    textAlign: 'right',
  },
  signupLink: {
    color: 'blue',
    fontSize: 16,
    marginTop: 20,
    fontWeight: 'bold',
    textAlign: 'right',
    textDecorationLine: 'underline',
  },
  // Custom styles for the error alert
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
