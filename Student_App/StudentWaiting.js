/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  Text,
  Image,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';

import { Dimensions } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { Background, initial_color, beige_color, secondary_color, Café_color } from './Colors'
import axios from 'axios';
const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;

export default class StudentWaiting extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.route.params.data,
      //   categories: [],
      approved: false,
      data_arr: []
    };
  }

  componentDidMount() {
    this.fetchData()
    console.log(this.state.data)
  }

  fetchData = async () => {
    try {
      const response = await axios
        .post('http://192.168.1.5/AhmedRagab_System/select_waiting_info.php', {
          user_id: this.state.data.user_id
        })
      const data_arr = response.data;
      this.setState({ data_arr: data_arr });
    } catch (error) {
      console.error(error);
    }
  };

  // getdata() {
  //   axios
  //     .post('http://192.168.1.5/AhmedRagab_System/select_waiting_info.php', {
  //       user_id: 177
  //     })
  //     .then(res => {
  //       console.log(res.data)
  //       if (res.status == 200) {
  //         if (res.data == 'Error') {
  //           Alert.alert('try again');
  //         } else if (typeof res.data == typeof []) {
  //           this.setState({ data_arr: res.data });
  //           // console.log(this.state.data_arr[0].user_status)
  //         }
  //       }
  //     });
  // }

  // approval() {
  //   if (this.state.data.user_status == 'approved') {
  //     Alert.alert('قبول', 'تم قبول طلبك يمكنك الان الدخول', [
  //       {
  //         text: 'OK',
  //         onPress: () => {
  //           this.props.navigation.navigate('Login', {
  //             student_data: this.state.data,
  //           });
  //         },
  //       },
  //     ]);
  //   } else {
  //     Alert.alert('الطلب', 'طلبك قيد المراجعه برجاء الانتظار', [
  //       {
  //         text: 'OK',
  //         onPress: () => {
  //           console.log('OK Pressed');
  //         },
  //       },
  //     ]);
  //   }


  // }

  render() {
    return (
      <>
        <StatusBar backgroundColor={initial_color} barStyle={'light-content'} />


        <ScrollView style={{ flex: 1, backgroundColor: Background }}>
          <View style={styles.bodyContainer}>
            <View
              style={{
                flex: 1,
                alignSelf: 'center',
                justifyContent: 'center',
                marginTop: width * 0.45,
              }}>
              <Image
                source={require('../images/Waiting.png')}
                resizeMode="contain"
                style={{ width: 300, height: 300 }}
              />
              <Text
                style={{
                  fontSize: 18,
                  alignSelf: 'center',
                  fontWeight: 'bold',
                  color: '#1D1D1D',
                  textAlign: 'center',
                }}>
                البيانات قيد المراجعه
              </Text>
            </View>
            <View style={styles.containerOfLogInBtn}>
              <TouchableOpacity
                style={styles.logInButton}
                onPress={() => {
                  axios
                    .post('http://192.168.1.5/AhmedRagab_System/select_waiting_info.php', {
                      user_id: this.state.data.user_id
                    })
                    .then(res => {
                      console.log(res.data)
                      if (res.status == 200) {
                        if (res.data == 'Error') {
                          Alert.alert('try again');
                        } else if (typeof res.data == typeof []) {
                          this.setState({ data_arr: res.data });
                          // console.log(this.state.data_arr[0].user_status)
                        }
                      }
                    });
                  if (this.state.data_arr[0].user_status == 'approved') {
                    Alert.alert('قبول', 'تم قبول طلبك يمكنك الان الدخول', [
                      {
                        text: 'OK',
                        onPress: () => {
                          this.props.navigation.navigate('Student_details', {
                            student_data: this.state.data,
                          });
                        },
                      },
                    ]);
                  } else {
                    Alert.alert('الطلب', 'طلبك قيد المراجعه برجاء الانتظار', [
                      {
                        text: 'OK',
                        onPress: () => {
                          console.log('OK Pressed');
                        },
                      },
                    ]);
                  }
                }}
              >
                <Text style={styles.logInBtnTextStyle}>تحديث</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  bodyContainer: {
    flex: 1,
    alignItems: 'center',
    // backgroundColor: bigBackground,
    backgroundColor: Background,
  },

  containerOfLogInBtn: {
    flex: 0.3,
    alignItems: 'center',
    justifyContent: 'center',
    padding: height * 0.03,
    paddingTop: height * 0.01,
    marginTop: width * 0.1,
  },
  logInButton: {
    elevation: 7,
    borderRadius: RFValue(30),
    width: width * 0.5,
    alignSelf: 'center',
    height: width * 0.14,
    justifyContent: 'center',
    backgroundColor: initial_color,
    // marginTop: height * 0.07,
    // marginBottom: height * 0.1,
  },
  logInBtnTextStyle: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: width * 0.051,
    color: '#fff',
  },
});
