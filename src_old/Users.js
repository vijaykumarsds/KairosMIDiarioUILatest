import { StyleSheet, Text, View, FlatList, ScrollView, Modal, TouchableOpacity, Button } from 'react-native';
import React, { useState, useEffect } from 'react';
import { RadioButton } from 'react-native-paper'; // Import RadioButton from react-native-paper

const Users = () => {
  const [UserData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedOption, setSelectedOption] = useState(''); // Initialize the selected radio option
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    fetchAllUsersData();
  }, []);

  const fetchAllUsersData = async () => {
    try {
      const response = await fetch('http://192.168.1.22:5137/api/Users/GetAllUsers');

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

  const handleApprove = () => {
    // Handle user approval logic here
    hideModal();
  };

  const handleReject = () => {
    // Handle user rejection logic here
    hideModal();
  };

  const handleActive = () => {
    // Handle user activation logic here
    if (selectedUser) {
      console.log(`User Activated: ${selectedUser.userName}`);
      // Send 1 to the backend to indicate activation
      // Perform your API call to update the user status with 1
    }
    hideModal();
  };

  const handleDeactivate = () => {
    // Handle user deactivation logic here
    if (selectedUser) {
      console.log(`User Deactivated: ${selectedUser.userName}`);
      // Send 0 to the backend to indicate deactivation
      // Perform your API call to update the user status with 0
    }
    hideModal();
  };

  const handleSave = () => {
    if (selectedUser) {
      // Determine the action based on the selected option
      const action = selectedOption === 'Activate' ? true : false;

      //console.log(selectedUser.id)
      //console.log(action)

      // Send a PUT request to update the user status
      fetch(`http://192.168.1.22:5137/api/Users/UpdateUser/${selectedUser.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: action }),
      })
        .then((response) => {
          //console.log('Response:', response);
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          // Handle success response here if needed
          console.log(`User ${selectedOption}d : ${selectedUser.userName}`);
          hideModal();
        })
        .catch((error) => {
          console.error('Error updating user status:', error);
          hideModal();
        });
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (UserData.length === 0) {
    return (
      <View style={styles.noDataContainer}>
        <Text>No data available.</Text>
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
                  <Text style={styles.headerCell}>UserName</Text>
                  <Text style={styles.headerCell}>Email</Text>
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
      />
    </ScrollView>
  );
};

// Define the UserModal component
const UserModal = ({ isVisible, user, selectedOption, onOptionChange, onApprove, onReject, onActive, onDeactivate, onSave, onClose }) => {
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
      <View style={styles.modalContainer}>
        <View style={[styles.modalContent, { marginTop: 10 }]}>
          <Text style={styles.modalTitle}>User Account</Text>
          <Text>{`${user.userName}`}</Text>
          <View style={styles.radioButtonsContainer}>
            <RadioButton.Group onValueChange={onOptionChange} value={selectedOption}>
              <View style={styles.radioButtonContainer}>
              <RadioButton value="Activate" />
                <Text>Activate</Text>               
              {/* </View>
              <View style={styles.radioButtonContainer}> */}
              <RadioButton value="Deactivate" />
                <Text>Deactivate</Text>                
              </View>
            </RadioButton.Group>
          </View>
          {/* <Text>User Comments: {user.userComments}</Text>
          <View style={styles.buttonContainer}>
            <Button title="Approve" onPress={onApprove} />
            <Button title="Reject" onPress={onReject} />
          </View> */}
          <View style={styles.buttonContainer}>
            {/* <Button title="Save" onPress={() => (selectedOption === 'Activate' ? onActive() : onDeactivate())} /> */}
            <Button title="Save" onPress={onSave} />
            <Button title="Close" onPress={onClose} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
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
    flexDirection: 'column', // Display rows in a column
    marginBottom: 5, // Adjust the space between rows
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: 'lightgray',
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
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  radioButtonsContainer: {
    marginBottom: 10,
  },
  radioButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
});

export default Users;
