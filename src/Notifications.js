import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import BASE_URL from './apiConfig';
import { useUser } from './UserContext';
import AwesomeAlert from 'react-native-awesome-alerts';
import { useTranslation } from 'react-i18next';

const Notifications = () => {
  const { t } = useTranslation();
  const [notifications, setNotifications] = useState([]);
  const [currentStatus, setCurrentStatus] = useState('UNREAD');
  const [selectedNotification, setSelectedNotification] = useState(null);
  const { userdata } = useUser();

  useEffect(() => {
    const fetchAllNotifications = async () => {
      try {
        const userID = userdata ? userdata.userID : null;
        console.log(userID);

        const response = await fetch(
          `${BASE_URL}/Notifications/NotificationDetails?UserID=${userID}`
        );

        console.log(response);

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const responseData = await response.json();
        console.log("RESPONSE DATA : ", responseData);

        setNotifications(responseData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchAllNotifications();
  }, [userdata]);

  const filterNotifications = (status) => {
    setCurrentStatus(status);
  };

  const handleNotificationClick = (notification) => {
    setSelectedNotification(notification);
  };

  const handleModalClose = () => {
    setSelectedNotification(null);
  };

  const handleMarkAsRead = async () => {
    if (selectedNotification) {
      try {
        const { id, userID, notificationText } = selectedNotification;

        // Make an API call to mark the notification as read
        const response = await fetch(`${BASE_URL}/Notifications/UpdateNotificationStatus`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id,
            userID,
            notificationText,
            status: true, // Mark as read
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to mark as read');
        }

        // Refresh notifications after marking as read
        const updatedNotifications = notifications.map((notification) =>
          notification.id === id ? { ...notification, status: true } : notification
        );
        setNotifications(updatedNotifications);

        // Close the modal
        handleModalClose();
      } catch (error) {
        console.error('Error marking as read:', error);
      }
    }
  };

  const filteredNotifications = notifications.filter(
    (item) => (currentStatus === 'UNREAD' && !item.status) || (currentStatus === 'READ' && item.status)
  );

  return (
    <View>
      <Text></Text>
      <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center' }}>
        <TouchableOpacity
          onPress={() => filterNotifications('UNREAD')}
          style={[
            styles.click,
            currentStatus === 'UNREAD' && styles.unreadButtonFocused,
          ]}
        >
          <Text style={{ fontSize: 18, fontWeight: 'bold', textDecorationLine: currentStatus === 'UNREAD' ? 'none' : 'none', color: '#33bbff' }}>{t("UNREAD")}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => filterNotifications('READ')}
          style={[
            styles.click,
            currentStatus === 'READ' && styles.readButtonFocused,
          ]}
        >
          <Text style={{ fontSize: 18, fontWeight: 'bold', textDecorationLine: currentStatus === 'READ' ? 'none' : 'none', color: '#33bbff' }}>{t("READ")}</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredNotifications}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleNotificationClick(item)}>
            <View style={styles.card}>
              <Text style={styles.notiText}>{item.notificationText}</Text>
            </View>
          </TouchableOpacity>
        )}
      />

      <AwesomeAlert
        show={selectedNotification !== null}
        showProgress={false}
        // title="Notification"
        message={selectedNotification?.notificationText}
        messageStyle={{ color: '#000000' }}
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
        showCancelButton={false}
        showConfirmButton={true}
        confirmText={t('OK')}
        confirmButtonColor="#33bbff"
        onConfirmPressed={handleMarkAsRead}
      />
    </View>
  );
};

export default Notifications;

const styles = StyleSheet.create({

  unreadButtonFocused: {
    backgroundColor: 'lightgrey',
    marginBottom: 10,
    padding: 5,
    margin: 1,
    borderRadius: 8,
    elevation: 2,
    shadowRadius: 10,
    textDecorationLine: 'none'
  },
  readButtonFocused: {
    backgroundColor: 'lightgrey',
    marginBottom: 10,
    padding: 5,
    margin: 1,
    borderRadius: 8,
    elevation: 2,
    shadowRadius: 10,
    textDecorationLine: 'none'
  },
  card: {
    backgroundColor: 'lightgrey',
    borderRadius: 8,
    elevation: 2, // for Android
    shadowColor: '#000', // for iOS
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    padding: 20,
    margin: 5,
    textAlign: 'left'
  },
  modalContent: {
    flex: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notiText: {
    color: '#000000'
  }
});
