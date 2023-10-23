import React, { useState } from 'react';
import {
  View,
  Text,
  Dimensions,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AwesomeAlert from 'react-native-awesome-alerts';
import { useUser } from './UserContext';

const Login = ({ navigation }) => {
  const { setUserData } = useUser();
  const [email, setEmail] = useState("john@123.com");
  const [password, setPassword] = useState("John@123");
  const [username] = "str";
  const [userid] = "str";

  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [isAccountLocked, setIsAccountLocked] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      // Show a custom error alert when fields are empty
      setShowErrorAlert(true);
      return;
    }
    const user = {
      
      email: email,
      password: password,
      username: username,
      userID: userid 
    };
    console.log(user);
    try {
      const response = await fetch('http://192.168.1.22:5137/api/Users/SignIn', {
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
      
      console.log("userdata : ",userdata )
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
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} // Adjust behavior for iOS and Android
    >
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
          <Text style={styles.headerText1}>Kairos</Text>
          <Text style={styles.headerText2}>MI Diario</Text>
        </LinearGradient>
        <View style={styles.formContainer}>
          <Text style={styles.formTitle}>LOGIN</Text>
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            placeholderTextColor="#808080"
            style={styles.input}
            maxLength={250}
          />
          <TextInput
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            placeholderTextColor="#808080"
            style={styles.input}
            maxLength={256}
          />
          <TouchableOpacity onPress={handleLogin} style={styles.loginButton}>
            <Text style={styles.loginButtonText}>LOGIN</Text>
          </TouchableOpacity>
          <Text style={styles.signupText}>
            Don't have an account?{' '}
            <Text onPress={() => navigation.navigate('Signup')} style={styles.signupLink}>
              Signup
            </Text>
          </Text>
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
          message="User Account Is locked, Please contact Administrator."
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
    </KeyboardAvoidingView>
    </ScrollView>
  );
};

export default Login;

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
    marginTop: 100,
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
