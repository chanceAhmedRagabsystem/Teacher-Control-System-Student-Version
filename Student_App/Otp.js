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
const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;


class Otp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // user_data: this.props.route.params.user_data,
      // user_email: this.props.route.params.user_email,
      otp1: '',
      otp2: '',
      otp3: '',
      otp4: '',
      otp: ''
    };
  }
  // componentDidMount() {
  //   console.log(this.state.user_email)
  // }

  check_otp() {
    let errors = 0;
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/; // asdsadsad@sadjkjshd.skldjlskjd
    if (this.state.otp4.trim() + this.state.otp3.trim() + this.state.otp2.trim() + this.state.otp1.trim() == '') {
      this.setState({ otp_err: 'الرجاء إدخال رمز التأكيد' });
      errors++;

    } else if (errors == 0) {
      this.props.navigation.navigate('New_Password')
    }
  }

  render() {
    return (
      <>
        <StatusBar backgroundColor={initial_color} />
        <ScrollView
          style={{
            backgroundColor: Background,
            flex: 1,
          }}>
          <View style={styles.pageContainer}>
            {/* Logo Img */}
            <View style={{ flex: 0.2, marginTop: width * .2 }}>
              <View>
                <Image
                  source={require('../images/mail.gif')}
                  style={styles.imgLogoStyle}
                  resizeMode="cover"
                />
              </View>
            </View>

            <View style={styles.view_text}>
              <Text style={styles.text_container}> التحقق من</Text>
              <Text style={styles.text_container_2}>  البريد الإلكترونى</Text>
            </View>

            <View style={styles.view_2}>
              <Text style={styles.text_2}>
                الرجاء إدخال الرمز المكون من 4 ارقام
              </Text>
              <Text style={styles.text_22}>
                {' '}
                المرسل إلى عنوان بريدك الإلكتروني .
              </Text>
            </View>




            <View style={styles.otpContainer}>

              <View style={styles.otpBox}>
                <TextInput style={styles.otpText}
                  keyboardType="number-pad"
                  maxLength={1}
                  value={this.state.otp1}
                  onChangeText={value => {
                    this.setState({ otp1: value });
                  }}
                />

              </View>

              <View style={styles.otpBox}>
                <TextInput style={styles.otpText}
                  keyboardType="number-pad"
                  maxLength={1}
                  value={this.state.otp2}
                  onChangeText={value => {
                    this.setState({ otp2: value });
                  }}
                />
              </View>

              <View style={styles.otpBox}>
                <TextInput style={styles.otpText}
                  keyboardType="number-pad"
                  maxLength={1}
                  value={this.state.otp3}
                  onChangeText={value => {
                    this.setState({ otp3: value });
                  }}
                />
              </View>

              <View style={styles.otpBox}>
                <TextInput style={styles.otpText}
                  keyboardType="number-pad"
                  maxLength={1}
                  value={this.state.otp4}
                  onChangeText={value => {
                    this.setState({ otp4: value });
                  }}
                />
              </View>

            </View>



            <View style={styles.view_reply}>
              <TouchableOpacity
                onPress={() => {

                }}>

                <Text style={styles.text_4}> إعادة الإرسال</Text>
              </TouchableOpacity>
            </View>
            <Text style={{ fontSize: 16, alignSelf: 'center', color: secondary_color }}>{this.state.otp_err}</Text>

            <TouchableOpacity
              onPress={() => {
                this.check_otp(),
                  console.log(this.state.otp4 + this.state.otp3 + this.state.otp2 + this.state.otp1)
              }}>
              <View style={styles.view_verify}>
                <Text style={styles.t_verify}> التحقق </Text>
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    alignItems: 'center',
    paddingTop: height * 0.02,
    backgroundColor: Background,
  },
  imgLogoStyle: {
    width: width * 0.25,
    height: height * 0.12,
  },

  view_text: {
    flexDirection: 'column',
    alignItems: 'center',
  },

  text_container: {
    color: initial_color,
    fontSize: RFValue(20),
    marginTop: height * 0.03,
    fontWeight: 'bold',
  },

  text_container_2: {
    color: initial_color,
    fontSize: RFValue(20),
    fontWeight: 'bold',
  },

  view_2: {
    alignItems: 'center',
    flexDirection: 'column',
  },

  text_2: {
    color: '#000',
    fontSize: RFValue(16),
    marginTop: height * 0.03,
    alignself: 'center',
  },

  text_22: {
    color: '#000',
    fontSize: RFValue(16),
    alignself: 'center',
  },

  view_otp: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'space-around',
    marginTop: height * 0.02,
    backgroundColor: '#E5ECF4',
    width: width * 0.8,
    height: height * 0.1,
  },

  Otp: {
    width: width * 0.15,
    height: height * 0.08,
    backgroundColor: '#A2C6DC',
    borderRadius: 15,
    fontSize: 18,
    alignItems: 'center',
  },

  view_reply: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    // marginTop: height *0.02,
    // backgroundColor:"#000"
    marginBottom: height * 0.02,
  },

  text_4: {
    alignSelf: 'center',
    color: initial_color,
    fontSize: 17,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },

  view_verify: {
    backgroundColor: initial_color,
    alignSelf: 'center',
    alignItems: 'center',
    height: '19%',
    width: width * .4,
    borderRadius: 17,
    marginBottom: height * 0.2,
    marginTop: RFValue(20),
  },

  t_verify: {
    color: '#FFFFFF',
    fontSize: 22,
    marginTop: height * 0.02,
    fontWeight: 'bold',
    fontFamily: 'sans-serif',
    // textAlign: 'center',
  },


  otpContainer: {
    marginBottom: 20,
    justifyContent: 'space-between',
    flexDirection: "row",
  },

  otpBox: {
    marginTop: 15,
    marginLeft: 3,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: initial_color,
    elevation: 5,
    borderRadius: 5,
    marginLeft: 10
  },

  otpText: {
    fontSize: 25,
    color: "#000",
    textAlign: "center",
    paddingHorizontal: 18,
    paddingVertical: 10,

  }



});

export default Otp;
