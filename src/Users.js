import { StyleSheet, Text, View, FlatList, ScrollView, Modal, TouchableOpacity, Button, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import { RadioButton } from 'react-native-paper';
import BASE_URL from './apiConfig';
import AwesomeAlert from 'react-native-awesome-alerts';
import { useTranslation } from 'react-i18next';

const Users = () => {
  const { t } = useTranslation();
  const [UserData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedOption, setSelectedOption] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showDeactivateAlert, setShowDeactivateAlert] = useState(false);
  const [ShowSuccessCommentAlert, setShowSuccessCommentAlert] = useState(false);
  const [ShowRejectCommentAlert, setShowRejectCommentAlert] = useState(false);
  const [ShowFoodSuccessAlert, setShowFoodSuccessAlert] = useState(false);
  const [ShowFoodRejectAlert, setShowFoodRejectAlert] = useState(false);

  useEffect(() => {
    fetchAllUsersData();
  }, []);

  const fetchAllUsersData = async () => {
    try {
      const response = await fetch(`${BASE_URL}/Users/GetAllUsers`);

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const userData = await response.json();
      setUserData(userData);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching user data:', error);
      setLoading(false);
    }
  };

  const showModal = (user) => {
    setSelectedUser(user);
    setIsModalVisible(true);
  };

  const hideModal = () => {
    setIsModalVisible(false);
  };
  const handleApprove = async (comments) => {
    if (selectedUser) {
      try {
        const response = await fetch(`${BASE_URL}/UserComments/UpdateUserCommentsById/${selectedUser.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId: selectedUser.id,
            comments: comments,
            reviews: 'str',
            status: 1,
          }),
        });

        if (response.ok) {
          // Handle success
          console.log('User comments approved successfully');
          setShowSuccessCommentAlert(true);
        } else {

          setShowRejectCommentAlert(true);
          // Handle failure
          console.error('Failed to approve user comments');
        }

        hideModal();
      } catch (error) {
        console.error('Error updating user comments:', error);
        hideModal();
      }
    }
  };

  const handleGlobal = async (userFoodDetails) => {
    if (selectedUser) {
      try {
        const response = await fetch(`${BASE_URL}/FoodDetails/InsertFoodDetails`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            foodName: userFoodDetails.foodName,
            foodDescription: userFoodDetails.foodDescription,
            foodNutrition: userFoodDetails.foodNutrition,
          }),
        });

        console.log("Response :", response);
        const foodResponse = await JSON.stringify(response);
        console.log("foodResponse :",foodResponse);

        if (response.ok) {
          // Handle success
          setShowFoodSuccessAlert(true);
          console.log('Food details added as global successfully');
      } else {
          // Handle failure
          setShowFoodRejectAlert(true);
          console.error('Failed to add food details as global');
        }

        hideModal();
      } catch (error) {
        console.error('Error adding food details as global:', error);
        hideModal();
      }
    }
  };

  const handleReject = () => {
    hideModal();
  };

  const handleActive = () => {
    if (selectedUser) {
      console.log(`User Activated: ${selectedUser.userName}`);
    }
    hideModal();
  };

  const handleDeactivate = () => {
    if (selectedUser) {
      console.log(`User Deactivated: ${selectedUser.userName}`);
    }
    hideModal();
  };

  const handleSave = async () => {
    if (selectedUser) {
      const action = selectedOption === 'Activate' ? true : false;

      console.log(selectedUser.id)
      console.log(action)

      const user = {
        email: "email",
        password: "password",
        username: "username",
        userID: "userid",
        confirmPassword: "str",
        phoneNumber: "str",
        status: action
      };

      try {
        const response = await fetch(`${BASE_URL}/Users/UpdateUserById/${selectedUser.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(user),
        });

        const userdata = await response.json();
        console.log("userdata : ", userdata);

        if (userdata.status) {
          setShowSuccessAlert(true);
        }
        else {
          setShowDeactivateAlert(true);
        }
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        console.log(`User ${selectedOption}d : ${selectedUser.userName}`);
        hideModal();
      }
      catch (error) {
        console.error('Error updating user status:', error.message);
        hideModal();
      };
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>{t('Loading...')}</Text>
      </View>
    );
  }

  if (UserData.length === 0) {
    return (
      <View style={styles.noDataContainer}>
        <Text>{t('No data available.')}</Text>
      </View>
    );
  }

  return (
    <ScrollView horizontal={true}>
      <FlatList
        data={UserData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item, index }) => (
          <TouchableOpacity onPress={() => showModal(item)}>
            <View style={styles.rowContainer}>
              {index === 0 && (
                <View style={styles.tableHeader}>
                  <Text style={styles.headerCell}>{t('UserName')}</Text>
                  <Text style={styles.headerCell}>{t('Email')}</Text>
                </View>
              )}
              <View style={styles.tableRow}>
                <Text style={styles.tableCell}>{item.userName}</Text>
                <Text style={styles.tableCell}>{item.eMail}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
      <AwesomeAlert
        show={showSuccessAlert}
        title={t('User Account Activated')}
        message=" "
        showCancelButton={false}
        showConfirmButton
        confirmText="OK"
        titleStyle={{ color: 'green', fontWeight: 'bold' }}
        messageStyle={{ color: '#000000', fontWeight: 'bold' }}
        confirmButtonColor="#33bbff"
        onConfirmPressed={() => {
          setShowSuccessAlert(false);
        }}
      />
      <AwesomeAlert
        show={ShowSuccessCommentAlert}
        title={t('User Comment Approved.')}
        message=" "
        showCancelButton={false}
        showConfirmButton
        confirmText="OK"
        titleStyle={{ color: 'green', fontWeight: 'bold' }}
        messageStyle={{ color: '#000000', fontWeight: 'bold' }}
        confirmButtonColor="#33bbff"
        onConfirmPressed={() => {
          setShowSuccessCommentAlert(false);
        }}
      />
      <AwesomeAlert
        show={ShowFoodSuccessAlert}
        title={t('User Food Approved Globally.')}
        message=" "
        showCancelButton={false}
        showConfirmButton
        confirmText="OK"
        titleStyle={{ color: 'green', fontWeight: 'bold' }}
        messageStyle={{ color: '#000000', fontWeight: 'bold' }}
        confirmButtonColor="#33bbff"
        onConfirmPressed={() => {
          setShowFoodSuccessAlert(false);
        }}
      />
      <AwesomeAlert
        show={ShowFoodRejectAlert}
        title={t('Food Details are already Exists.')}
        message=" "
        showCancelButton={false}
        showConfirmButton
        confirmText="OK"
        titleStyle={{ color: 'red', fontWeight: 'bold' }}
        messageStyle={{ color: '#000000', fontWeight: 'bold' }}
        confirmButtonColor="#33bbff"
        onConfirmPressed={() => {
          setShowFoodRejectAlert(false);
        }}
      />
      <AwesomeAlert
        show={showDeactivateAlert}
        title={t('User Account Deactivated')}
        message=" "
        showCancelButton={false}
        showConfirmButton
        confirmText="OK"
        titleStyle={{ color: 'red', fontWeight: 'bold' }}
        messageStyle={{ color: '#000000', fontWeight: 'bold' }}
        confirmButtonColor="#33bbff"
        onConfirmPressed={() => {
          setShowDeactivateAlert(false);
        }}
      />
      <AwesomeAlert
        show={ShowRejectCommentAlert}
        title={t('User Comment Rejected.')}
        message=" "
        showCancelButton={false}
        showConfirmButton
        confirmText="OK"
        titleStyle={{ color: 'red', fontWeight: 'bold' }}
        messageStyle={{ color: '#000000', fontWeight: 'bold' }}
        confirmButtonColor="#33bbff"
        onConfirmPressed={() => {
          setShowRejectCommentAlert(false);
        }}
      />
      <UserModal
        isVisible={isModalVisible}
        user={selectedUser}
        selectedOption={selectedOption}
        onOptionChange={(option) => setSelectedOption(option)}
        onApprove={handleApprove}
        onReject={handleReject}
        onActive={handleActive}
        onDeactivate={handleDeactivate}
        onSave={handleSave}
        onClose={hideModal}
        makeGlobal={handleGlobal}
      />
    </ScrollView>
  );
};

// Define the UserModal component
const UserModal = ({ isVisible, user, selectedOption, onOptionChange, onApprove, onReject, onActive, onDeactivate, onSave, onClose, makeGlobal }) => {

  const [userComments, setUserComments] = useState('');
  const [userFoodDetails, setUserFoodDetails] = useState({});

  useEffect(() => {
    if (user) {
      // Fetch user comments
      fetch(`${BASE_URL}/UserComments/GetUserCommentsById/${user.id}`)
        .then((response) => response.json())
        .then((data) => setUserComments(data.comments))
        // console.log("UserComments Data", data.comments)
        .catch((error) => console.error('Error fetching user comments:', error));

      // Fetch user food details
      fetch(`${BASE_URL}/UserFoodDetails/GetUserFoodDetailsById/${user.id}`)
        .then((response) => response.json())
        .then((data) => setUserFoodDetails(data))
        .catch((error) =>
          console.error('Error fetching user food details:', error)
        );
    }
  }, [user]);

  if (!isVisible || !user) {
    return null;
  }

  return (
    <Modal
      visible={isVisible}
      transparent={false}
      animationType="slide"
      onRequestClose={onClose}
    >
     
      <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style = {styles.background}> 
        <View style={styles.modalContainer}>
          <View style={[styles.modalContent, { marginTop: 10 }]}>
            <View style={styles.radioButtonsContainer}>
              <RadioButton.Group onValueChange={onOptionChange} value={selectedOption}>
                <View style={styles.radioButtonContainer}>
                  <Text style={styles.modalTitle}>{t('User Account')}</Text>
                  <RadioButton value="Activate" />
                  <Text style={styles.radioButtonText}>{t('Activate')}</Text>
                  <RadioButton value="Deactivate" />
                  <Text style={styles.radioButtonText}>{t('Deactivate')}</Text>
                  <Button style={styles.buttonContainer} title={t('Save')} onPress={onSave} />
                </View>
              </RadioButton.Group>
            </View>
            <View>
              <Text style={styles.modalTitle}>{t('User Comments')}</Text>
              <View>
                <Text> </Text>
                <Text style={styles.radioButtonText}>{userComments}</Text>
                <Button style={styles.buttonContainer} title={t('Approve')} onPress={() => onApprove(userComments)} />
                <Text> </Text>
              </View>
            </View>
            <View>
              <Text style={styles.modalTitle}>{t('User Food Details')}</Text>
              <View>
                <Text> </Text>
                <Text style={styles.boldText}> {t('Food Name')} : <Text style={styles.radioButtonText}>{userFoodDetails.foodName}</Text></Text>
                <Text style={styles.boldText}> {t('Food Description')}: <Text style={styles.radioButtonText}>{userFoodDetails.foodDescription}</Text></Text>
                <Text style={styles.boldText}> {t('Food Nutrition')} : <Text style={styles.radioButtonText}>{userFoodDetails.foodNutrition}</Text></Text>
                <Button style={styles.buttonContainer} title={t('Approve Food As Global')} onPress={() => makeGlobal(userFoodDetails)} />
              </View>
            </View>
          </View>
        </View>
        </View>
      </ScrollView>
      
    </Modal>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noDataContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rowContainer: {
    flexDirection: 'column',
    marginBottom: 5,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#33bbff',
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    flexWrap: 'nowrap',
    textAlign: 'center',
  },
  headerCell: {
    fontWeight: 'bold',
    width: 200,
    height: 20,
    textAlign: 'center',
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    textAlign: 'center',
  },
  tableCell: {
    width: 200,
    height: 20,
    alignContent: 'center',
    marginBottom: 5,
    textAlign: 'center',
    color: '#000000',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',    
  },
  background: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '100%',
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 10,
    elevation: 15,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    alignItems: 'center',
    color: '#000000'
  },
  radioButtonsContainer: {
    marginBottom: 10,
    textAlign: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    // justifyContent: 'space-around',
  },
  radioButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    textAlign: 'center'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 10,
  },
  radioButtonText: {
    marginLeft: 3,
    marginRight: 8,
    color: '#777777',
    fontWeight: 'bold',
    fontSize: 15,
  },
  boldText: {
    fontWeight: 'bold',
    color: '#000000'
  },
});

export default Users;