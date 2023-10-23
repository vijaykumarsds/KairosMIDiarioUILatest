import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity, TextInput } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useUser } from './UserContext'; // Import useUser hook to access user data.
import { ScrollView } from 'react-native-gesture-handler';
import BASE_URL from './apiConfig';
import { useTranslation } from 'react-i18next';

const Profile = () => {
    const { t } = useTranslation();
    const { userdata } = useUser(); // Get user data from the context
    const [additionalUserData, setAdditionalUserData] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editedData, setEditedData] = useState({}); // State to store edited data

    useEffect(() => {
        // Fetch additional user data based on userdata.id
        fetchUserData(userdata.id);
    }, [userdata.id]);

    // Function to fetch additional user data from the API
    const fetchUserData = async () => {
        try {
            const numericID = userdata.userID.replace(/\D/g, '');
            console.log(numericID)
            const response = await fetch(`${BASE_URL}/UserDetails/GetUserDetailsById/${numericID}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const userData = await response.json();
            setAdditionalUserData(userData);
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    // Function to handle edit button click
    const handleEditClick = () => {
        setIsEditing(true);
        // Initialize editedData with the current user data when entering edit mode
        setEditedData({ ...additionalUserData });
    };

    // Function to handle save button click
    const handleSaveClick = async () => {
        try {
            if (editedData.password === null) {
                editedData.password = "null";
            }
            const numericID = userdata.userID.replace(/\D/g, '');
            
            editedData.weight = parseFloat(editedData.weight);
            // Send editedData to the API for updating user details
            const response = await fetch(`${BASE_URL}/UserDetails/UpdateUserDetailsById/${numericID}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ...editedData }),
            });
            console.log({ ...editedData })
           

            // Exit edit mode and refetch user data
            setIsEditing(false);
            fetchUserData(userdata.id);
        } catch (error) {
            console.error('Error updating user data:', error);
        }
    };

    return (
        <ScrollView>
            <View style={styles.container}>
                <LinearGradient
                    colors={['#33bbff', '#33bbff', '#33bbff']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.header}
                >
                    <Image source={require('../assets/icons/profile.png')} style={styles.profileIcon} />
                    <Text style={styles.username}>{userdata && userdata.userName}</Text>
                </LinearGradient>

                {/* User Information View */}
                <View style={styles.userInfoContainer}>
                    <View style={styles.row}>
                        <Text style={styles.label}>{t('email')}:</Text>
                        <Text style={[styles.info, isEditing && styles.blurred]}>
                            {userdata && userdata.eMail}
                        </Text>
                    </View>

                    {/* Display additional user information */}
                    {additionalUserData && (
                        <>
                            <View style={styles.row}>
                                <Text style={styles.label}>{ t('dateOfBirth')}:</Text>
                                <Text style={[styles.info, isEditing && styles.blurred]}>
                                    {additionalUserData.dateOfBirth}
                                </Text>
                            </View>
                            <View style={styles.row}>
                                <Text style={styles.label}>{t('Created Date')}:</Text>
                                <Text style={[styles.info, isEditing && styles.blurred]}>
                                    {additionalUserData.createdDate}
                                </Text>
                            </View>
                            {/* Display additional user information */}

                           

                            <View style={styles.row}>
                                <Text style={styles.label}>{t('weight')}:</Text>
                                {isEditing ? (
                                    <TextInput
                                        style={styles.editableInfo}
                                        keyboardType="decimal-pad" // Number keypad for weight
                                        value={editedData.weight.toString()}
                                        onChangeText={(text) => setEditedData({ ...editedData, weight: text })}
                                        maxLength={5} // Limit to 5 characters
                                    />
                                ) : (
                                    <Text style={styles.info}>{parseFloat(additionalUserData.weight).toFixed(3)}</Text>
                                )}
                            </View>



                            <View style={styles.row}>
                                <Text style={styles.label}>{t('insulinDetails')}:</Text>
                                {isEditing ? (
                                    <TextInput
                                        style={styles.editableInfo}
                                        value={editedData.insulinDetails}
                                        onChangeText={(text) => setEditedData({ ...editedData, insulinDetails: text })}
                                        maxLength={2500} // Limit to 2500 characters
                                    />
                                ) : (
                                    <Text style={styles.info}>{additionalUserData.insulinDetails}</Text>
                                )}
                            </View>

                            <View style={styles.row}>
                                <Text style={styles.label}>{t('address1')}:</Text>
                                {isEditing ? (
                                    <TextInput
                                        style={styles.editableInfo}
                                        value={editedData.address1}
                                        onChangeText={(text) => setEditedData({ ...editedData, address1: text })}
                                        maxLength={2000} // Limit to 2000 characters
                                    />
                                ) : (
                                    <Text style={styles.info}>{additionalUserData.address1}</Text>
                                )}
                            </View>

                            <View style={styles.row}>
                                <Text style={styles.label}>{t('address2')}:</Text>
                                {isEditing ? (
                                    <TextInput
                                        style={styles.editableInfo}
                                        value={editedData.address2}
                                        onChangeText={(text) => setEditedData({ ...editedData, address2: text })}
                                        maxLength={2000} // Limit to 2000 characters
                                    />
                                ) : (
                                    <Text style={styles.info}>{additionalUserData.address2}</Text>
                                )}
                            </View>

                            <View style={styles.row}>
                                <Text style={styles.label}>{t('city')}:</Text>
                                {isEditing ? (
                                    <TextInput
                                        style={styles.editableInfo}
                                        value={editedData.city}
                                        onChangeText={(text) => setEditedData({ ...editedData, city: text })}
                                        maxLength={1000} // Limit to 1000 characters
                                    />
                                ) : (
                                    <Text style={styles.info}>{additionalUserData.city}</Text>
                                )}
                            </View>

                            <View style={styles.row}>
                                <Text style={styles.label}>{t('state')}:</Text>
                                {isEditing ? (
                                    <TextInput
                                        style={styles.editableInfo}
                                        value={editedData.state}
                                        onChangeText={(text) => setEditedData({ ...editedData, state: text })}
                                        maxLength={1000} // Limit to 1000 characters
                                    />
                                ) : (
                                    <Text style={styles.info}>{additionalUserData.state}</Text>
                                )}
                            </View>

                            <View style={styles.row}>
                                <Text style={styles.label}>{t('zip')}:</Text>
                                {isEditing ? (
                                    <TextInput
                                        style={styles.editableInfo}
                                        value={editedData.zip}
                                        keyboardType="phone-pad"
                                        onChangeText={(text) => setEditedData({ ...editedData, zip: text })}
                                        maxLength={50} // Limit to 50 characters
                                    />
                                ) : (
                                    <Text style={styles.info}>{additionalUserData.zip}</Text>
                                )}
                            </View>
                            <View style={styles.row}>
                                <Text style={styles.label}>{t('phoneNumber')}:</Text>
                                {isEditing ? (
                                    <TextInput
                                        style={styles.editableInfo}
                                        keyboardType="phone-pad" // Number keypad for phone number
                                        value={editedData.phoneNumber}
                                        onChangeText={(text) => setEditedData({ ...editedData, phoneNumber: text })}
                                        maxLength={10} // Limit to 20 characters
                                    />
                                ) : (
                                    <Text style={styles.info}>{additionalUserData.phoneNumber}</Text>
                                )}
                            </View>


                        </>
                    )}

                    {isEditing ? (
                        <TouchableOpacity style={styles.saveButton} onPress={handleSaveClick}>
                            <Text style={styles.buttonText}>Save</Text>
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity style={styles.editButton} onPress={handleEditClick}>
                            <Text style={styles.buttonText}>{t('Edit')}</Text>
                        </TouchableOpacity>
                    )}
                </View>
            </View>
        </ScrollView>
    );
    
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        height: Dimensions.get('window').height * 0.2,
        width: '100%',
        alignItems: 'center',
        paddingTop: 10,
        },
    profileIcon: {
        width: 95,
        height: 95,
        borderRadius: 50,
        borderWidth: 3,
        borderColor: '#fff',
        marginTop: 5,
    },
    username: {
        color: '#000000',
        fontSize: 20,
        fontWeight: 'bold',
        
    },
    userInfoContainer: {
        elevation: 10,
        paddingHorizontal: 20,
        paddingTop: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        margin: 15,
        marginTop: 0,
        paddingVertical: 100,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
        marginTop: 5,
        borderBottomWidth: 1,
        borderColor: '#03bafc',
        fontSize: 16,
        paddingLeft: 5,
    },
    label: {
        color: '#808080',
        fontSize: 16,
        fontWeight: 'bold',
        width: '45%',
    },
    info: {
        color: '#000000',
        fontSize: 16,
        width: '50%',
        marginBottom: 15,
    },
    editableInfo: {
        color: '#000000',
        fontSize: 16,


    },
    editButton: {
        borderRadius: 100,
        width: 150,
        alignSelf: 'center',
        alignItems: 'center',
        paddingVertical: 5,
        marginTop: 20,
        backgroundColor: '#33bbff',
    },
    saveButton: {
        borderRadius: 100,
        width: 150,
        alignSelf: 'center',
        alignItems: 'center',
        paddingVertical: 5,
        marginTop: 20,
        backgroundColor: 'green',
    },
    buttonText: {
        color: 'white',
        fontSize: 19,
    },
    blurred: {
        opacity: 0.5,
    }
});

export default Profile;
