import React, { useState } from 'react';
import {
  View,
  Text,
  Dimensions,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AwesomeAlert from 'react-native-awesome-alerts';
import DatePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';

const Signup = ({ navigation }) => {
  // State variables
  const [showAlert, setShowAlert] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [gender, setGender] = useState('');
  const [weight, setWeight1] = useState('');
  const [isT1D, setIsT1D] = useState('');
  const [insulinDetails, setInsulinDetails] = useState(''); // New field for insulin details
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zip, setZip] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [mobileNo, setMobileNo] = useState(''); // New field for mobile number

  // Error messages
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [firstNameError, setFirstNameError] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [dateOfBirthError, setDateOfBirthError] = useState('');
  const [genderError, setGenderError] = useState('');
  const [isT1DError, setIsT1DError] = useState('');

  const [showDatePicker, setShowDatePicker] = useState(false);

  // Function to handle date change in date picker
  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      const currentDate = selectedDate.toISOString().split('T')[0];
      setDateOfBirth(currentDate);
    }
  };

  // Function to validate email
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Function to validate password
  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,30}$/;
    return passwordRegex.test(password);
  };

  // Function to handle email change
  const handleEmailChange = (text) => {
    setEmail(text);
    if (!validateEmail(text)) {
      setEmailError('Invalid email address');
    } else {
      setEmailError('');
    }
  };

  // Function to handle password change
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

  // Function to handle signup button press
  const handleSignup = async () => {
    let hasError = false;

    // Validation checks for all fields
    if (!firstName) {
      setFirstNameError('First Name is required');
      hasError = true;
    } else {
      setFirstNameError('');
    }

    if (!lastName) {
      setLastNameError('Last Name is required');
      hasError = true;
    } else {
      setLastNameError('');
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

    if (!dateOfBirth) {
      setDateOfBirthError('Date of Birth is required');
      hasError = true;
    } else {
      setDateOfBirthError('');
    }

    if (!gender) {
      setGenderError('Gender is required');
      hasError = true;
    } else {
      setGenderError('');
    }

    if (!isT1D) {
      setIsT1DError('T1D status is required');
      hasError = true;
    } else {
      setIsT1DError('');
    }

    if (!email){
      setEmailError('Email is required');
    }
    
    if (!password) {
      setPasswordError('Password is required');
    }    

    if (hasError) {
      setShowAlert(true);
      return;
    }

    // Convert gender and T1D status to numbers
    const genderValue = gender === 'Male' ? 1 : gender === 'Female' ? 2 : 3;
    const t1dStatusValue = isT1D === 'Yes' ? true : false;

    // Create a user object with the signup data
    const user = {
      userID: "",
      firstName: firstName,
      lastName: lastName,
      dateOfBirth: dateOfBirth,
      gender: genderValue,
      t1D: t1dStatusValue,
      weight: weight,
      insulinDetails: insulinDetails,
      address1: address1,
      address2: address2,
      city: city,
      state: state,
      zip: zip,
      email: email,
      password: password,
      phoneNumber: mobileNo,
      createdDate: "2023-09-11T06:30:41.359Z"
    };
    
console.log(user)
    try {
      
      const response = await fetch('http://192.168.1.22:5137/api/UserDetails/SignUp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });

      console.log(response)
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      // Show success alert
      setShowSuccessAlert(true);

      // Continue processing the response if it's successful
    } catch (error) {
      console.error('Error:', error.message);
      setShowAlert(true); // Show failure alert
    }
  };

  return (
    <ScrollView>
      <View>
        <LinearGradient
          colors={['#33bbff', '#33bbff', '#33bbff']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.gradientHeader}
        >
          <Text style={styles.headerText1}>Kairos</Text>
          <Text style={styles.headerText2}>MI Diario</Text>
        </LinearGradient>

        <View style={styles.formContainer}>
          <Text style={styles.formTitle}>Register</Text>
          <TextInput
            style={[styles.input, firstNameError && styles.inputError]}
            placeholder="First Name"
            value={firstName}
            onChangeText={setFirstName}
            maxLength={250}
          />
          {firstNameError ? (
            <Text style={styles.errorText}>{firstNameError}</Text>
          ) : null}
          <TextInput
            style={[styles.input, lastNameError && styles.inputError]}
            placeholder="Last Name"
            value={lastName}
            onChangeText={setLastName}
            maxLength={250}
          />
          {lastNameError ? (
            <Text style={styles.errorText}>{lastNameError}</Text>
          ) : null}

          {/* Date of Birth */}
          <TouchableOpacity
            style={[styles.datePickerInput, dateOfBirthError && styles.inputError]}
            onPress={() => setShowDatePicker(true)}
          >
            <Text style={styles.datePickerText}>
              {dateOfBirth ? dateOfBirth : 'Date of Birth'}
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

          {/* Gender */}
          <View style={[styles.pickerContainer, genderError && styles.inputError]}>
            <Picker
              selectedValue={gender}
              onValueChange={(itemValue, itemIndex) => setGender(itemValue)}
              style={{ color: '#808080', marginLeft: -15 }}
            >
              <Picker.Item label="Select Gender" value="" />
              <Picker.Item label="Male" value="Male" />
              <Picker.Item label="Female" value="Female" />
              <Picker.Item label="Other" value="Other" />
            </Picker>
          </View>
          {genderError ? (
            <Text style={styles.errorText}>{genderError}</Text>
          ) : null}

          {/* T1D (boolean) */}
          <View style={[styles.pickerContainer, isT1DError && styles.inputError]}>
            <Picker
              selectedValue={isT1D}
              onValueChange={(itemValue, itemIndex) => setIsT1D(itemValue)}
              style={{ color: '#808080', marginLeft: -15 }}
            >
              <Picker.Item label="T1D status" value="" />
              <Picker.Item label="Yes" value="Yes" />
              <Picker.Item label="No" value="No" />
            </Picker>
          </View>
          {isT1DError ? (
            <Text style={styles.errorText}>{isT1DError}</Text>
          ) : null}
          {/* Insulin Details */}
          {isT1D === 'Yes' && (
            <TextInput
              style={styles.input}
              placeholder="Insulin Details"
              value={insulinDetails}
              onChangeText={setInsulinDetails}
              maxLength={2500}
            />
          )}

          {/* Weight */}
          <TextInput
            style={styles.input}
            placeholder="Weight (in lbs)"
            value={weight}
            onChangeText={setWeight1}
            keyboardType="numeric"
            maxLength={5}
          />

          {/* Address fields */}
          <TextInput
            style={styles.input}
            placeholder="Address 1"
            value={address1}
            onChangeText={setAddress1}
            maxLength={2000}
          />

          <TextInput
            style={styles.input}
            placeholder="Address 2"
            value={address2}
            onChangeText={setAddress2}
            maxLength={2000}
          />

          <TextInput
            style={styles.input}
            placeholder="City"
            value={city}
            onChangeText={setCity}
            maxLength={1000}
          />

          <TextInput
            style={styles.input}
            placeholder="State"
            value={state}
            onChangeText={setState}
            maxLength={1000}
          />

          <TextInput
            style={styles.input}
            placeholder="Zip"
            value={zip}
            onChangeText={setZip}
            keyboardType="numeric"
            maxLength={50}
          />

          {/* Mobile Number */}
          <TextInput
            style={styles.input}
            placeholder="Mobile Number"
            value={mobileNo}
            onChangeText={setMobileNo}
            keyboardType="numeric"
            maxLength={10}
          />

          <TextInput
            style={[styles.input, emailError && styles.inputError]}
            placeholder="Email"
            value={email}
            onChangeText={handleEmailChange}
            maxLength={250}
          />
          {emailError ? (
            <Text style={styles.errorText}>{emailError}</Text>
          ) : null}

          <TextInput
            style={[styles.input, passwordError && styles.inputError]}
            placeholder="Password"
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
            placeholder="Confirm Password"
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            maxLength={256}
          />
          {confirmPasswordError ? (
            <Text style={styles.errorText}>{confirmPasswordError}</Text>
          ) : null}

          <TouchableOpacity onPress={handleSignup} style={styles.signupButton}>
            <Text style={styles.signupButtonText}>SIGNUP</Text>
          </TouchableOpacity>

          {/* <AwesomeAlert
            show={showAlert}
            title="! ERROR"
            message="Registration failed. Please try again."
            showCancelButton={false}
            showConfirmButton
            confirmText="OK"
            titleStyle={{ color: 'red', fontWeight: 'bold' }}
            messageStyle={{ color: '#000000' }}
            confirmButtonColor="#33bbff"
            onConfirmPressed={() => setShowAlert(false)}
          /> */}

          <AwesomeAlert
            show={showSuccessAlert}
            title="SUCCESS"
            message="Registration successful!"
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

          <Text style={styles.loginText}>
            Already have an account?{' '}
            <Text
              onPress={() => navigation.navigate('Login')}
              style={styles.loginLink}
            >
              Login
            </Text>
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default Signup;


const styles = StyleSheet.create({
  
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
  gradientHeader: {
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    height: Dimensions.get('window').height * 0.2,
    width: '100%',
    alignItems: 'center',
    paddingTop: 40,
  },
  headerText: {
    color: 'white',
    fontSize: 31,
    fontWeight: 'bold',
    fontStyle: 'italic',
  },
  formContainer: {
    elevation: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    margin: 15,
    marginTop: -20,
    paddingVertical: 20,
    paddingHorizontal: 15,
  },
  formTitle: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#000000',
    textAlign: 'center',
  },
  input: {
    borderBottomWidth: 1,
    borderColor: '#33bbff',
    marginBottom: 15,
    fontSize: 16,
    paddingLeft: 5,
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
  },
  signupButton: {
    borderRadius: 100,
    width: 150,
    alignSelf: 'center',
    alignItems: 'center',
    paddingVertical: 5,
    marginTop: 20,
    backgroundColor: '#33bbff',
  },
  signupButtonText: {
    color: 'white',
    fontSize: 19,
  },
  loginText: {
    color: '#000000',
    fontSize: 16,
    textAlign: 'center',
  },
  loginLink: {
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginTop: 5,
  },
  inputError: {
    borderColor: 'red', // Change the border color to red for fields with errors
  },
  pickerUnderline: {
    borderBottomColor: '#33bbff', // You can change the color here
    borderBottomWidth: 1, // You can change the thickness here
  },
  pickerContainer: {
    borderBottomWidth: 1,
    borderColor: '#33bbff', // Add this line to set a blue border color
    marginBottom: 15,
  },
});
