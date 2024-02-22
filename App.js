/* eslint-disable prettier/prettier */
import React from 'react';
import {
  Background,
  initial_color,
} from './Student_App/Colors';
import {
  View,
  Text,
  StatusBar,
  Image,
  Dimensions,ActivityIndicator
} from 'react-native';
const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();
import AuthLoadingScreen from './component/AuthLoadingScreen';
// Student Application:
import Parents_Profile from './Parents_App/Parents_Profile'
import Outlay from './Student_App/Outlay';
import Student_Profile from './Student_App/Student_Profile';
import QR_Scan from './Student_App/QR_Scan';
import Change_Password from './Student_App/Change_Password';
import Login from './Student_App/Login';
import Attendence from './Student_App/Attendence';
import Gmail from './Student_App/Gmail'
import Otp from './Student_App/Otp';
import New_Password from './Student_App/New_Password'
import Student_details from './Student_App/Student_details';
import SignUp from './Student_App/SignUp';
import StudentWaiting from './Student_App/StudentWaiting';
import Attendence_Days from './Parents_App/Attendence_Days';
import Outlay_info from './Parents_App/Outlay_info';

import HomePage from './Parents_App/HomePage'
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: true,
    };
  }
  Hide_Splash_Screen = () => {
    this.setState({
      isVisible: false,
    });
  };
  componentDidMount() {
    var that = this;
    setTimeout(function () {
      that.Hide_Splash_Screen();
    }, 1000);
  }
  render() {
    return (
      <>
        {this.state.isVisible === true ? (
          <>
                  <View
              style={{
                backgroundColor: Background,
                justifyContent: 'center',
                // alignSelf: 'center',
                flex: 1,
              }}>
              <StatusBar
                backgroundColor={initial_color}
                barStyle={'light-content'}
              />
              {/* <View
                style={{
                  width: width * 0.3,
                  height: height * 0.2,
                  backgroundColor: initial_color,
                  alignItems: 'center',
                  justifyContent: 'center',
                  alignSelf: 'center',
                  borderRadius: width * 0.255,
                  // borderRadius: 35,
                  elevation: 10,
                  // backgroundColor: '#000',
                }}> */}
              <Image
                source={require('./images/AppIcon.png')}
                style={{
                  width: width * 0.4,
                  height: height * 0.17,
                  alignSelf: 'center',
                  // borderRadius: width * 0.2,
                }}
                resizeMode="center"
              />
              {/* </View> */}
              <Text
                style={{
                  color: '#000',
                  alignSelf: 'center',
                  fontSize: 20,
                  fontWeight: 'bold',
                  marginTop: width * 0.08,
                }}>
                Ahmed Ragab System
              </Text>
            </View>
          </>
        ) : (
          <>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}
            initialRouteName="AuthLoading"
            >

            {/* Introduction */}
            <Stack.Screen name='SignUp' component={SignUp} />
            <Stack.Screen name='StudentWaiting' component={StudentWaiting} />
            {/* <Stack.Screen name="AuthLoading" component={AuthLoadingScreen} /> */}
            <Stack.Screen name='HomePage' component={HomePage} />
             <Stack.Screen name='Login' component={Login} />
            {/* Student_App */}
            <Stack.Screen name='Gmail' component={Gmail} />
            <Stack.Screen name='Otp' component={Otp} />
            <Stack.Screen name='New_Password' component={New_Password} />
            <Stack.Screen name='Student_details' component={Student_details} />
            <Stack.Screen name='Attendence' component={Attendence} />
            <Stack.Screen name="Outlay" component={Outlay} />
            <Stack.Screen name="Student_Profile" component={Student_Profile} />
            <Stack.Screen name='Change_Password' component={Change_Password} />
            <Stack.Screen name='QR_Scan' component={QR_Scan} />


            {/* Parents_App */}
            <Stack.Screen name='Attendence_Days' component={Attendence_Days} />
            <Stack.Screen name='Outlay_info' component={Outlay_info} />
            <Stack.Screen name='Parents_Profile' component={Parents_Profile} />

          </Stack.Navigator>
        </NavigationContainer>
        </>
    )
          }
        </>
    );
  }
}

export default App;
