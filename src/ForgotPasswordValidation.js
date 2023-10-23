import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import AwesomeAlert from 'react-native-awesome-alerts';
import { useUser } from './UserContext';
import DatePicker from '@react-native-community/datetimepicker';
import BASE_URL from './apiConfig';
import HeaderTexts from './HeaderTexts';
import commonStyles from './Common/commonStyles';
import { useTranslation } from 'react-i18next';

const ForgotPasswordValidation = ({ navigation }) => {
  const { t } = useTranslation();
  const { setUserData } = useUser();
  const [email, setEmail] = useState();
  const [dateOfBirth, setdateOfBirth] = useState();
  const [phonenumber,setPhonenumber] = useState();
  const [username] = "username";
  const [userid] = "userid";
  const [password] = "password";
  const [confirmPassword] =  "confirmPassword";
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [isAccountLocked, setIsAccountLocked] = useState(false);
  const [dateOfBirthError, setDateOfBirthError] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      const currentDate = selectedDate.toISOString().split('T')[0];
      setdateOfBirth(currentDate);
    }
  };
  const handleLogin = async () => {
    if (!email || !dateOfBirth || !phonenumber) {
      
      setShowErrorAlert(true);
      return;
    }
    if (!dateOfBirth) {
        setDateOfBirthError('Date of Birth is required');
        hasError = true;
      } else {
        setDateOfBirthError('');
      }
      
    const user = {
      
      email: email,
      dateOfBirth: dateOfBirth,
      phonenumber: phonenumber,
      userid:userid,
      password:password,
      confirmPassword:confirmPassword,
      username:username
    };
    console.log(user)
    try {
      const response = await fetch(`${BASE_URL}/ForgotPassword/UserValidation`, {
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
      console.log(userdata)
      if (userdata.status === true) {
        setUserData(userdata); 
        navigation.navigate('PasswordChange',{paramKey:email});
      } else if (userdata.status === false) {
        setIsAccountLocked(true);
      } else {
        setShowErrorAlert(true);
      }

    } catch (error) {
      console.error('Error:', error.message);
      
      setShowErrorAlert(true);
    }
  };

  return (
    <ScrollView>
   <View>      
  <HeaderTexts></HeaderTexts>
        <View style={styles.formContainer}>
          <Text style={styles.formTitle}>{t('Security Questions')}</Text>
          <TextInput
            placeholder={t('emailPlaceholder')}
            value={email}
            onChangeText={setEmail}
            placeholderTextColor="#808080"
            style={styles.input}
            maxLength={250}
          />
         
          <TouchableOpacity
            style={[styles.datePickerInput, dateOfBirthError]}
            onPress={() => setShowDatePicker(true)}
          >
            <Text style={styles.datePickerText}>
              {dateOfBirth ? dateOfBirth : t('dateOfBirth')}
            </Text>
          </TouchableOpacity>
          {dateOfBirthError ? (
            <Text style={styles.errorText}>{dateOfBirthError}</Text>
          ) : null}

          {showDatePicker && (
            <DatePicker
              value={dateOfBirth ? new Date(dateOfBirth) : new Date()}
              mode="date"
              display="spinner"
              onChange={handleDateChange}
            />
          )}
          <TextInput
            placeholder={t('phoneNumber')}
            secureTextEntry
            value={phonenumber}
            onChangeText={setPhonenumber}
            placeholderTextColor="#808080"
            style={styles.input}
            maxLength={10}
          />
          <TouchableOpacity onPress={handleLogin} style={commonStyles.button}>
            <Text style={commonStyles.buttonText}>{t('Submit')}</Text>
          </TouchableOpacity>
          <Text style={styles.signupText}>
          {t('Go back to')}{' '}
             <Text onPress={() => navigation.navigate('Login')} style={styles.signupLink}>
             {t('login')}
            </Text>
          </Text>
        </View>

        {/* Custom Error Alert */}
        <AwesomeAlert
          show={showErrorAlert}
          titleStyle={styles.errorAlertTitle}
          messageStyle={styles.errorAlertMessage}
          title={t('Error')}
          message={t('Invalid email, DateOfBirth, PhoneNumber. Please try again.')}
          showConfirmButton
          confirmText={t('OK')}
          confirmButtonColor="#33bbff"
          onConfirmPressed={() => setShowErrorAlert(false)}
          closeOnTouchOutside={false}
        />

        {/* Account Locked Alert */}
        <AwesomeAlert
          show={isAccountLocked}
          titleStyle={styles.errorAlertTitle}
          messageStyle={styles.errorAlertMessage}
          title={t('Account Locked')}
          message={t('User Account Is locked, Please contact Administrator.')}
          showConfirmButton
          confirmText={t('OK')}
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

export default ForgotPasswordValidation;

const styles = {
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
    marginTop: 20,
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
    marginTop: 50,
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
  datePickerInput: {
    borderBottomWidth: 1,
    borderColor: '#33bbff',
    marginBottom: 15,
    fontSize: 16,
    paddingTop: 10,
    paddingBottom: 10,
  },
  datePickerText: {
    fontSize: 16,
  }
};