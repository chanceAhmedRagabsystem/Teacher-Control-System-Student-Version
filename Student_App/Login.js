import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Image,
  ScrollView,
  Alert,ActivityIndicator
} from 'react-native';
import {
  Background,
  initial_color,
  beige_color,
  secondary_color,
  Café_color,
} from './Colors';
// import Icon from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import { Dimensions } from 'react-native';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import { Hoshi, Fumi } from 'react-native-textinput-effects';
import axios from 'axios';
const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;
export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // data:this.props.route.params.data,
      user_email: '',
      password: '',
      lockedPass: true,
      email_err: '',
      pass_err: '',
      student_data: {},
      parent_data: {},
      // isLoggedIn: false,
      showLogin: true,
      isLoggedIn:false,

    };
  }

  toggleShowPassword = () => {
    this.setState(prevState => ({
      showPassword: !prevState.showPassword,
    }));
  };

  // handleLoginSuccess = user_data => {
  //   // Save the user data to AsyncStorage
  //   AsyncStorage.setItem('user_data', JSON.stringify(user_data))
  //     .then(() => {
  //       // User data saved successfully, navigate to the home page
  //       this.setState({ showLogin: false, user_data });
  //     })
  //     .catch(error => {
  //       console.log('Error saving user data:', error);
  //     });
  // };

  login() {
    let errors = 0;
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/; // asdsadsad@sadjkjshd.skldjlskjd
    axios
      .post('http://192.168.1.5/AhmedRagab_System/Login.php', {
        user_email: this.state.user_email,
        user_password: this.state.password,
      })
      .then(res => {
        //empty password
        if (this.state.user_email.trim() == '') {
          this.setState({ email_err: 'الرجاء إدخال البريد الإلكتروني' });
          Alert.alert('تنبيه', this.state.email_err)
          errors++;
        } else if (this.state.password.trim() == '') {
          this.setState({ pass_err: 'الرجاء إدخال كلمة المرور' });
          Alert.alert('تنبيه', this.state.pass_err)
          errors++;
        }
        //password incorrect
        else if (res.data == 'password_inCorrect') {
          this.setState({ pass_err: 'كلمة مرور غير صحيحة' });
          Alert.alert('تنبيه', this.state.pass_err)
          errors++;
        }
        //correct password
        else if (
          typeof res.data == typeof {}
        ) {
          this.setState({isLoggedIn:true});

          if (res.data.user_type == 'student') {
            this.setState({ email_err: '' });
            this.props.navigation.navigate('Student_details', {
              student_data: res.data,
            });
            // console.log(this.state.student_data);
          } else if (res.data.user_type == 'parent') {
            this.setState({ email_err: '' });

            this.props.navigation.navigate('HomePage', {
              parent_data: res.data,
            });
            // console.log(this.state.parent_data);
          }
        }
        //user not found
        else if (res.data == 'user_not_found') {
          this.setState({ email_err: 'الرجاء التأكد من صحة البريد الإلكتروني' });
          Alert.alert('تنبيه', this.state.email_err)
          errors++;
        }
        //call supporrt
        else if (res.data == 'call_support') {
          alert('call support');
        }
      });
  }

  render() {
    return (
      <>
        <View style={{ flex: 1, backgroundColor: Background }}>
          <StatusBar
            backgroundColor={initial_color}
            barStyle={'light-content'}
          />
          <ScrollView>
            {/* Header  */}
            <View
              style={{
                //   flexDirection: 'row',
                marginTop: width * 0.12,
                //   flexWrap: 'wrap',
                alignItems: 'center',
              }}>
              {/* img_view */}
              <View
              // style={{
              //   width: width * 0.25,
              //   height: height * 0.14,
              //   backgroundColor: initial_color,
              //   alignItems: 'center',
              //   justifyContent: 'center',
              //   borderRadius: width * 0.1,
              //   marginBottom: 10,
              //   // borderRadius: 35,
              //   elevation: 10,
              //   // backgroundColor: '#000',
              // }}
              >
                <Image
                  source={require('../images/welcome.gif')}
                  style={{
                    width: width * 0.3,
                    height: height * 0.19,
                    borderRadius: width * 0.15,
                  }}
                  resizeMode="cover"
                />
              </View>
            </View>
            <View
              style={{
                flex: 1,
                // borderTopLeftRadius: 30,
                // borderTopRightRadius: 35,
                //   marginTop: '-7%',
                backgroundColor: Background,
                justifyContent: 'center',
              }}>
              <View style={styles.tittleContainer}>
                <Text style={styles.pageTittleStyle}>مرحباً بعودتك!</Text>

                <Text
                  style={[
                    styles.pageTittleStyle,
                    {
                      fontSize: RFValue(17),
                    },
                  ]}>
                  قم بتسجيل دخولك
                </Text>
              </View>
              <View style={styles.container}>
                <Fumi
                  label={'البريد الإلكترونى'}
                  value={this.state.user_email}
                  labelStyle={{
                    color: '#1D1D1D',
                    width: 200
                  }}
                  onChangeText={value => {
                    this.setState({
                      5: value,
                    });
                  }}
                  inputStyle={{
                    color: '#000'
                  }}
                  iconClass={Entypo}
                  iconName={'mail'}
                  iconColor={secondary_color}
                  iconSize={20}
                  iconWidth={40}
                  inputPadding={16}
                  borderColor={initial_color}

                  paddingRight={30}
                  style={{
                    fontSize: 17,
                    alignSelf: 'center',
                    width: width * 0.9,
                    backgroundColor: '#FFFFFF',
                    shadowColor: '#000',
                    shadowOffset: {
                      width: 0,
                      height: 1,
                    },
                    shadowOpacity: 0.2,
                    shadowRadius: 1.41,
                    elevation: 5,
                    borderRadius: 10
                  }}
                />
                {/* <Text
                    style={{
                      fontSize: width * 0.04,
                      // fontSize: 15,
                      color: secondary_color,
                      textAlign: 'center',
                      marginBottom: height * 0.01,
                      marginTop:height*.01
                    }}>
                    {this.state.email_err}
                  </Text> */}
                <View
                // style={{ flexDirection: 'row', justifyContent: 'center' }}
                >
                  <Fumi
                    label={'كلمة المرور'}
                    value={this.state.password}
                    secureTextEntry={this.state.lockedPass ? true : false}
                    labelStyle={{
                      color: '#1D1D1D',
                      width: 200
                    }}
                    onChangeText={value => {
                      this.setState({
                        password: value,
                      });
                    }}
                    iconClass={Entypo}
                    iconName={'lock'}
                    iconColor={secondary_color}
                    inputStyle={{
                      color: '#000'
                    }}
                    iconSize={20}
                    iconWidth={40}
                    inputPadding={20}
                    borderColor={initial_color}

                    paddingRight={60}
                    style={{
                      fontSize: 17,
                      alignSelf: 'center',
                      marginTop: height * .03,
                      width: width * 0.9,
                      backgroundColor: '#FFFFFF',
                      shadowColor: '#000',
                      shadowOffset: {
                        width: 0,
                        height: 1,
                      },
                      shadowOpacity: 0.2,
                      shadowRadius: 1.41,
                      elevation: 5,
                      borderRadius: 10
                    }}
                  />
                  <TouchableOpacity
                    style={styles.containerOfEyeIconForSecurePass}
                    onPress={() => {
                      let locked = this.state.lockedPass;
                      this.setState({ lockedPass: !locked });
                    }}>
                    <Entypo
                      name={this.state.lockedPass ? 'eye-with-line' : 'eye'}
                      color='#c5c5c5'
                      size={22}
                    />
                  </TouchableOpacity>

                </View>
                <TouchableOpacity
                  onPress={
                    () => {
                      this.props.navigation.navigate('Gmail')
                    }
                  }
                  style={{ alignSelf: 'flex-start', marginLeft: width * .06 }}
                >
                  <Text
                    style={{
                      color: '#7a7878',
                      fontSize: 15,
                      fontWeight: 'bold',
                      textDecorationLine: 'underline',
                      marginTop: 20
                    }}>
                    هل نسيت كلمة المرور
                  </Text>
                </TouchableOpacity>
                {/* <Text
                    style={{
                      fontSize: width * 0.04,
                      // fontSize: 15,
                      color: secondary_color,
                      textAlign: 'center',
                      marginBottom: height * 0.002,
                    }}>
                    {this.state.pass_err}
                  </Text> */}

                <TouchableOpacity style={styles.button}
                  onPress={() => {
                    this.login()
                  }}
                >
                  <Text style={styles.buttonText}>تسجيل الدخول</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={
                    {
                      //   marginBottom: '3%',
                    }
                  }></TouchableOpacity>
                {/* Sign Up Option */}
                <View style={styles.contianerOfSignUpOption}>
                  <Text style={{ color: '#7a7878', fontSize: RFValue(15) }}>
                    ليس لديك حساب؟
                  </Text>

                  <TouchableOpacity
                    onPress={() => {
                      this.props.navigation.navigate('SignUp')
                    }}
                  >
                    <Text
                      style={{
                        color: secondary_color,
                        fontWeight: 'bold',
                        fontSize: RFValue(15),
                        textDecorationLine: 'underline',
                        marginLeft: 5
                      }}>
                      أضغط لإنشاء حساب
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
      </>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: height * 0.02,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: '3%',
    color: '#170000',
    // marginBottom: height * 0.05,
  },
  input: {
    width: width * 0.85,
    fontSize: 20,
    height: height * 0.06,
    padding: 8,
    borderWidth: 0.5,
    borderColor: '#95A0A8',
    borderRadius: 4,
    marginBottom: 16,
  },
  tittleContainer: {
    flex: 0.1,
    marginTop: height * 0.017,
    justifyContent: 'center',
    marginBottom: height * 0.02,
  },
  pageTittleStyle: {
    color: '#000',
    fontSize: width * 0.074,
    fontSize: RFValue(23),
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  button: {
    backgroundColor: initial_color,
    borderRadius: 10,
    justifyContent: 'center',
    marginVertical: '5%',
    height: height * 0.06,
    width: width * 0.55,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 20,
  },
  headerContainer: {
    width: width,
    alignSelf: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    height: height * 0.25,
    backgroundColor: Background,
  },

  contianerOfSignUpOption: {
    alignSelf: 'center',
    alignItems: 'center',
    padding: height * 0.01,
    flexDirection: 'row',
    marginVertical: height * 0.05,
    marginTop: height * 0.003,
  },
  containerOfEyeIconForSecurePass: {
    width: width * 0.06,
    alignItems: 'center',
    height: height * 0.07,
    justifyContent: 'center',
    borderTopRightRadius: RFValue(15),
    borderBottomRightRadius: RFValue(15),
    backgroundColor: '#FFFFFF',
    marginTop: RFValue(-53),
    marginLeft: width * .82
  },
  iconContainerStyle: {
    width: width * 0.17,
    height: height * 0.06,
    // backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: width * 0.35,
    // borderRadius: 35,
    // elevation: 10,
    marginTop: height * -0.065,
  },
});
