import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ActivityIndicator } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BASE_URL from './apiConfig';
import { useVotes } from './VotesContext';

const UserStoriesList = () => {
  const navigation = useNavigation();
  const { votes, setVotes } = useVotes();

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleThumbsUp = (itemId) => {
    setVotes((prevVotes) => {
      const newVotes = { ...prevVotes };

      // Check if the user has already liked this item
      if (newVotes[itemId] && newVotes[itemId].liked) {
        // If already liked, decrease thumbs up count and set liked to false
        newVotes[itemId].thumbsUp -= 1;
        newVotes[itemId].liked = false;
      } else {
        // If not liked, increase thumbs up count and set liked to true
        newVotes[itemId] = {
          thumbsUp: (newVotes[itemId]?.thumbsUp || 0) + 1,
          liked: true,
        };
      }

      return newVotes;
    });
  };

  useEffect(() => {
    fetchUserStories();
    loadVotesFromStorage();
  }, []);

  const fetchUserStories = async () => {
    try {
      const response = await fetch(`${BASE_URL}/UserComments/GetAllUserComments`);
      const userStories = await response.json();

      const filteredStories = userStories.filter((story) => story.status === true);

      const userStoriesWithNames = await Promise.all(
        filteredStories.map(async (story) => {
          const numericID = story.userID.replace(/\D/g, '');
          const userDetailsResponse = await fetch(
            `${BASE_URL}/UserDetails/GetUserDetailsById/${numericID}`
          );
          const userDetails = await userDetailsResponse.json();
          return { ...story, username: userDetails.firstName + ' ' + userDetails.lastName };
        })
      );

      setData(userStoriesWithNames);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const navigateToRecipeDetails = (item) => {
    // Implement this function to navigate to the story details page
  };

  const loadVotesFromStorage = async () => {
    try {
      const storedVotes = await AsyncStorage.getItem('votes');
      if (storedVotes) {
        const parsedVotes = JSON.parse(storedVotes);
        setVotes(parsedVotes);
      }
    } catch (error) {
      console.error('Error loading votes from AsyncStorage:', error);
    }
  };

  const saveVotesToStorage = async () => {
    try {
      await AsyncStorage.setItem('votes', JSON.stringify(votes));
    } catch (error) {
      console.error('Error saving votes to AsyncStorage:', error);
    }
  };

  useEffect(() => {
    saveVotesToStorage();
  }, [votes]);

  const renderItem = ({ item }) => (
    
    <View style={styles.listItemContainer}>
      
      <View style={styles.listItemContent}>
        <Text style={styles.listItemUsername}>{item.username} </Text>
        <Text style={styles.listItemTitle}>{item.comments}</Text>
        <View style={styles.votingContainer}>
          <TouchableOpacity onPress={() => handleThumbsUp(item.id)}>
            <Image
              source={votes[item.id]?.liked ? require('../assets/icons/bluethumbsup.png') : require('../assets/icons/whitethumbsup.png')}
              style={styles.voteIcon}
            />
          </TouchableOpacity>
          <Text style={styles.voteCount}>{votes[item.id]?.thumbsUp || 0}</Text>
        </View>
      </View>
    </View>
  );

  return (
    
    <View style={styles.container}>
      
      {isLoading ? (
        <ActivityIndicator size="large" color="#33bbff" />
      ) : (
        <FlatList
          data={data}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'lightgrey',
  },
  listItemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    marginBottom: 10,
    padding: 15,
    borderRadius: 5,
  },
  listItemContent: {
    flex: 1,
  },
  listItemUsername: {
    fontSize: 16,
    color: 'blue',
    marginBottom: 5,
  },
  listItemTitle: {
    fontSize: 16,
    color: 'black',
  },
  votingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  voteIcon: {
    width: 25,
    height: 25,
    margin: 5,
  },
  voteCount: {
    fontSize: 16,
  },
});

export default UserStoriesList;
