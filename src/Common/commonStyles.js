
import { StyleSheet } from "react-native";


const commonStyles = StyleSheet.create({
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
    buttonText: {
      color: 'black',
      fontWeight:'bold',
      fontSize: 19,
    },
    button: {
      borderRadius: 100,
      width: 150,
      alignSelf: 'center',
      alignItems: 'center',
      paddingVertical: 5,
      marginTop: 50,
      marginBottom: 10,
      backgroundColor: '#33bbff',    
    },
    formTitleText: {
      fontSize: 19,      
      fontWeight: 'bold',
      color: '#33bbff',
      textAlign: 'center',
    },
});

export default commonStyles