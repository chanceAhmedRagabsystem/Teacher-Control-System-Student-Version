import React from 'react';
import {
  View,
  Text,
  Image,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Linking,
  AppRegistry,
  Alert
} from 'react-native';
import {
  Background,
  initial_color,
  beige_color,
  secondary_color,
  Café_color,
} from './Colors';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { Dimensions } from 'react-native';
const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { RFValue } from 'react-native-responsive-fontsize';
import { PermissionsAndroid } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import axios from 'axios';
import moment from 'moment';

const requestLocationPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Geolocation Permission',
        message: 'Can we access your location?',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    console.log('granted', granted);
    if (granted === 'granted') {
      console.log('You can use Geolocation');
      return true;
    } else {
      console.log('You cannot use Geolocation');
      return false;
    }
  } catch (err) {
    return false;
  }
};

export default class QR_Scan extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      student_data: this.props.route.params.data,
      // time:new Date().toLocaleTimeString(),
      group_data: {},
      now: moment().format('YYYY-MM-DD'),
      location: false
    };
  }

  componentDidMount() {
    this.getLocation()
    this.group_info()
  }
  group_info() {
    axios.post('http://192.168.1.5/AhmedRagab_System/select_group.php', {
      group_id: this.state.student_data.group_id
    }).then(res => {
      console.log(res.data)
      if (typeof res.data == typeof {}) {
        this.setState({ group_data: res.data })
        console.log(this.state.group_data[0].start_time)
      } else if (res.data == 'Error') {
        console.log('error')
      }
    })
  }

  getLocation() {
    const result = requestLocationPermission();
    result.then(res => {
      console.log('res is:', res);
      if (res) {
        Geolocation.getCurrentPosition(
          position => {
            console.log(position);
            this.setState({ location: position });
          },
          error => {
            // See error code charts below.
            console.log(error.code, error.message);
            this.setState({ location: false });
          },
          { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
        );
      }
    });
    console.log(this.state.location);
  };

  onSuccess = e => {
    // Alert.alert(e.data)
    if (e.data == this.state.now + this.state.location) {
      // if((this.state.group_data.start_time <= this.state.time <=this.state.group_data.end_time)){
      axios
        .post('http://192.168.1.5/AhmedRagab_System/insert_student_attendance.php', {
          student_code: this.state.student_data.student_code,
          grade_id: this.state.student_data.grade_id,
          group_id: this.state.student_data.group_id,
          attendance_status: 'Presence',
          start_time: this.state.group_data.start_time,
          end_time: this.state.group_data.end_time,
          now: this.state.now,
        })
        .then(res => {
          if (res.data == 'student_added') {
            Alert.alert('تم تسجيل غياب هذا الطالب');
          } else if (res.data == 'failed_to_add_student') {
            Alert.alert('خطأ فى تسجيل غياب الطالب');
          } else if (res.data == 'student_found') {
            Alert.alert('تم تسجيل غياب هذا الطالب مسبقا')
          } else if (res.data = 'not found') {
            Alert.alert('تنبيه', 'تعذر تسجيل الغياب لأنك غير مسجل بهذه المجموعة')
          } else if (res.data = 'error') {
            Alert.alert('تنبيه', 'الطالب غير موجود')
          }
        });
    }
  }
  render() {
    return (
      <>

        <StatusBar backgroundColor={initial_color} barStyle={'light-content'} />

        {/* header */}
        <View style={styles.headerContainer}>
          {/* Header Tittle  */}
          <View style={styles.headerTittleContainer}>
            <Text style={styles.headerTittleTxtStyle}>الغيـاب </Text>
          </View>

        </View>

        {/* body */}
        <View
          style={{
            flex: 1,
            backgroundColor: Background,
          }}>
          <View
            style={{
              backgroundColor: '#fff',
              height: '85%',
              width: '90%',
              alignSelf: 'center',
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 15,
              elevation: 5,
              marginTop: RFValue(25)
            }}>
            <QRCodeScanner
              onRead={this.onSuccess}
              // flashMode={RNCamera.Constants.FlashMode.torch}
              cameraStyle={{
                height: '80%',
                width: '80%',
                alignSelf: 'center',
                marginTop: RFValue(60),

              }}
              topContent={
                <Text
                  style={{
                    fontSize: RFValue(14),
                    marginTop: '5%',
                    color: '#000',
                    textAlign: "center"
                  }}>
                  امسح الكود لتسجيل الغياب
                </Text>
              }
              bottomContent={
                <Text
                  style={{
                    fontSize: RFValue(14),
                    color: '#000',
                    marginTop: '-10%',
                  }}>
                  ستتم قراءة الكود تلقائيا
                </Text>
              }
              reactivate={true}
              reactivateTimeout={2000}
              showMarker={true}
            // markerStyle={{borderColor: '#FFF', borderWidth: 2}}
            />
          </View>

          {/* <TouchableOpacity
            onPress={null}
            style={{
              alignSelf: 'center',
              justifyContent: 'center',

              height: height * 0.052,
              width: width * 0.5,
              backgroundColor: initial_color,
              marginVertical: '10%',
              borderRadius: 15,
            }}>
            <Text
              style={{
                textAlign: 'center',
                color: '#fff',
                fontSize: RFValue(20),
                fontWeight: '800',
              }}>
              الذهاب للملف الشخصي
            </Text>
          </TouchableOpacity> */}
        </View>

        {/* footer */}
        <View
          style={{
            height: height * 0.075,
            backgroundColor: "#fff",
            flexDirection: 'row',
            flexWrap: 'wrap',
            elevation: 5,
            shadowRadius: 9.51,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 7 },
            shadowOpacity: 0.43,
            justifyContent: 'space-around',
            bottom: 0,
          }}>


          {/* home page */}

          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate('Student_details', {
                student_data: this.state.data
              });
            }}
            style={{
              alignItems: 'center',
              width: width * 0.16,
              height: height * 0.08,
              justifyContent: 'center',
              // marginRight: width * 0.1,
            }}>
            <FontAwesome
              name="home"
              size={30}
              style={{
                color: Café_color,
                marginTop: -10,
              }}
            />

            <Text
              style={{
                color: Café_color,
                fontSize: width * 0.02,
                marginTop: 4,
                fontWeight: 'bold',
              }}>
              الصفحة الرئيسية
            </Text>
          </TouchableOpacity>



          <TouchableOpacity
            onPress={() => {
              // this.props.navigation.navigate('QR_Scan');
            }}
            style={{
              alignItems: 'center',
              width: width * 0.16,
              height: height * 0.08,
              justifyContent: 'center',
              // marginRight: width * 0.1,
            }}>
            <MaterialCommunityIcons
              name="qrcode-scan"
              size={30}
              style={{
                color: initial_color,
                marginTop: -10,
              }}
            />

            <Text
              style={{
                color: initial_color,
                fontSize: width * 0.02,
                marginTop: 4,
                fontWeight: 'bold',
              }}>
              لمسح الكود
            </Text>
          </TouchableOpacity>


        </View>

      </>
    );
  }
}
AppRegistry.registerComponent('default', () => QR_Scan);
const styles = StyleSheet.create({
  headerContainer: {
    width: width,
    alignSelf: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    height: height * 0.08,
    justifyContent: 'center',
    backgroundColor: Background,
  },
  headerTittleContainer: {
    width: width,
    // alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  headerTittleTxtStyle: {
    color: secondary_color,
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 18,
  },
});
