import React, { useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';

const AuthLoadingScreen = ({ navigation }) => {
  useEffect(() => {
    checkLoginStatus();
  }, []);

  const checkLoginStatus = () => {
    const isLoggedIn = true; // Replace with your logic to check if the user is logged in

    if (isLoggedIn) {
      // User is logged in, navigate to the home screen
      navigation.navigate('../../Student_details.js');
    } else {
      // User is not logged in, navigate to the login screen
      navigation.navigate('./Student_App/Login.js');
    }
  };
  return (
    <View>
      <ActivityIndicator />
    </View>
  );
};

export default AuthLoadingScreen;