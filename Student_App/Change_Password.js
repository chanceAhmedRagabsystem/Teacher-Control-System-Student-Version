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
    TextInput
} from 'react-native';
import { Background, initial_color, beige_color, secondary_color, Café_color } from './Colors'
import Entypo from 'react-native-vector-icons/Entypo';
import { Dimensions } from 'react-native';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import { Hoshi, Fumi } from 'react-native-textinput-effects';
const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;
import axios from 'axios';
export default class Change_Password extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: this.props.route.params.data,
            newPass: '',
            lockedPass: true,
            passwordErrorNew: '',

            //Confirm Password:
            confirmPass: '',
            lockedConfPass: true,
            passwordErrorConfirm: '',
            pastPass: '',
            pass_err: '',
            pastLockedPass: true,
        };

    }
    componentDidMount() {
        console.log(this.state.data.user_id)
    }
    changePass() {
        let errors = 0;
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/; // asdsadsad@sadjkjshd.skldjlskjd
        axios
            .post('http://192.168.1.5/AhmedRagab_System/update_password.php', {
                user_id: this.state.data.user_id,
                user_password: this.state.newPass,
                old_password: this.state.pastPass,
            })
            .then(res => {
                //empty password
                if (this.state.pastPass.trim() == '') {
                    this.setState({ pass_err: 'الرجاء إدخال كلمة المرور' });
                    errors++;
                }
                if (this.state.newPass.trim() == '') {
                    this.setState({ passwordErrorNew: 'من فضلك ادخل كلمة المرور' });
                    errors++;
                } else if (this.state.newPass.trim().length < 6) {
                    this.setState({
                        passwordErrorNew: 'كلمة المرور يجب ان تكون 6 احرف او اكثر',
                    });
                    errors++;
                } else {
                    this.setState({ passwordErrorNew: '' });
                }
                if (this.state.confirmPass.trim() == '') {
                    this.setState({ passwordErrorConfirm: '' });
                    errors++;
                }
                //password incorrect
                else if (this.state.confirmPass.trim() != this.state.newPass) {
                    this.setState({ passwordErrorConfirm: 'تأكيد كلمة المرور يجب ان تكون متطابقة مع كلمة المرور المدخلة اعلاه' });
                    errors++;
                } else {
                    this.setState({ passwordErrorConfirm: '' });
                }
                if (errors == 0) {
                    if (res.data == "i") {
                      this.setState({
                        newPass: this.state.data.user_password
                      });
                      console.log(this.state.data);
                      this.props.navigation.navigate('Login', {
                        // data: this.state.data,
                      });
                    } else if (res.data == 'failed') {
                      alert('لم يتم تحديث رقم المرور')
                    } 
                    else if (res.data == 'wrong_old_password') {
                        alert('كلمة المرور القديمة غير صحيحة')
                      }
                    //user not found
                    else if (res.data == 'user_not_found') {
                      alert('الرجاء التأكد من صحة البيانات');
                      errors++;
                    }
                  }

            });
    }
    render() {
        return (
            <>
                <StatusBar backgroundColor={initial_color} barStyle={'light-content'} />

                {/* Header  */}


                {/* Body */}
                <ScrollView style={{ flex: 1, backgroundColor: Background }}>
                    <View
                        style={{
                            backgroundColor: Background,
                            flex: 1,
                        }}>
                        <View style={{ flex: 0.2, marginTop: width * .25, alignSelf: 'center' }}>
                            <View style={{
                                width: width * 0.20,
                                height: height * 0.1,
                                backgroundColor: initial_color,
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: width * 0.13,
                                // borderRadius: 35,
                                elevation: 10,
                            }}>
                                <Image
                                    source={require('../images/lock.png')}
                                    style={styles.imgLogoStyle}
                                    resizeMode='center'
                                />
                            </View>
                        </View>
                        <View
                            style={{
                                // backgroundColor: '#f0f',
                                flex: 0.1,
                                justifyContent: 'center',
                                marginTop: 15
                            }}>
                            <Text
                                style={{
                                    color: '#1D1D1D',
                                    fontSize: 20,
                                    fontWeight: 'bold',
                                    textAlign: 'center',
                                }}>
                                انشاء كلمة مرور جديده
                            </Text>
                        </View>

                        {/* User Password */}
                        <View
                        // style={{ flexDirection: 'row', justifyContent: 'center' }}
                        >
                            <Fumi
                                label={' كلمة المرور القديمة'}
                                value={this.state.pastPass}
                                secureTextEntry={this.state.pastLockedPass ? true : false}
                                labelStyle={{
                                    color: '#1D1D1D',
                                    width: 200
                                }}
                                onChangeText={value => {
                                    this.setState({
                                        pastPass: value,
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
                                    marginTop: height * .02,
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
                                    let locked = this.state.pastLockedPass;
                                    this.setState({ pastLockedPass: !locked });
                                }}
                            >
                                <Entypo
                                    name={this.state.pastLockedPass ? 'eye-with-line' : 'eye'}
                                    color='#c5c5c5'
                                    size={22}
                                />
                            </TouchableOpacity>
                        </View>

                    </View>
                    <Text
                        style={{
                            fontSize: 15,
                            color: secondary_color,
                            textAlign: 'center',
                            marginTop: height * 0.014,
                        }}>
                        {this.state.pass_err}
                    </Text>

                    {/* User Password */}
                    <View
                    // style={{ flexDirection: 'row', justifyContent: 'center' }}
                    >
                        <Fumi
                            label={' كلمة المرور الجديدة'}
                            value={this.state.newPass}
                            secureTextEntry={this.state.lockedPass ? true : false}
                            labelStyle={{
                                color: '#1D1D1D',
                                width: 200
                            }}
                            onChangeText={value => {
                                this.setState({
                                    newPass: value,
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
                                marginTop: height * .01,
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
                            }}
                        >
                            <Entypo
                                name={this.state.lockedPass ? 'eye-with-line' : 'eye'}
                                color='#c5c5c5'                            
                                size={22}
                            />
                        </TouchableOpacity>
                    </View>

                    {/* Password Validation Text */}
                    <Text
                        style={{
                            fontSize: 15,
                            color: secondary_color,
                            textAlign: 'center',
                            marginTop: height * 0.014,
                        }}>
                        {this.state.passwordErrorNew}
                    </Text>

                    {/* Confirm Password */}
                    <View
                    // style={{ flexDirection: 'row', justifyContent: 'center' }}
                    >
                        <Fumi
                            label={'تأكيد كلمة المرور'}
                            value={this.state.confirmPass}
                            secureTextEntry={this.state.lockedConfPass ? true : false}
                            labelStyle={{
                                color: '#1D1D1D',
                                width: 200
                            }}
                            onChangeText={value => {
                                this.setState({
                                    confirmPass: value,
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
                                marginTop: height * .01,
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
                                let locked = this.state.lockedConfPass;
                                this.setState({ lockedConfPass: !locked });
                            }}
                        >
                            <Entypo
                                name={this.state.lockedConfPass ? 'eye-with-line' : 'eye'}
                                color='#c5c5c5'
                                size={22}
                            />
                        </TouchableOpacity>
                    </View>
                    {/* Confirm Password Validation Text */}
                    <Text
                        style={{
                            fontSize: 15,
                            color: secondary_color,
                            textAlign: 'center',
                            marginTop: height * 0.02,
                        }}>
                        {this.state.passwordErrorConfirm}
                    </Text>
                    <View
                        style={{
                            flex: 0.3,
                            // backgroundColor: '#f0f',
                            marginBottom: height * 0.1,
                        }}>
                        <TouchableOpacity
                            style={{
                                width: width * 0.5,
                                alignSelf: 'center',
                                backgroundColor: initial_color,
                                height: width * 0.14,
                                marginTop: height * 0.02,
                                borderRadius: 30,
                                justifyContent: 'center',
                                marginBottom: height * 0.1,
                                elevation: 10,
                            }}
                            onPress={() => {
                                this.changePass();
                            }}
                        >
                            <Text
                                style={{
                                    textAlign: 'center',
                                    fontWeight: 'bold',
                                    fontSize: 20,
                                    color: '#fff',
                                }}>
                                حفظ
                            </Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </>
        );
    }
}

const styles = StyleSheet.create({
    imgLogoStyle: {
        width: width * 0.12,
        height: height * 0.09,
        borderRadius: 40
    },
    containerOfEachTextInputX: {
        alignContent: 'center',
        justifyContent: 'center',
        marginBottom: height * 0.01,
        marginTop: height * 0.03,
    },
    containerOfEachTextInput: {
        alignContent: 'center',
        justifyContent: 'center',
        marginBottom: width * 0.005,
        marginTop: height * 0.01,
    },

    containerOfPassTxtInput: {
        elevation: 10,
        alignItems: 'center',
        width: width * 0.9,
        height: height * 0.07,
        flexDirection: 'row',
        borderRadius: RFValue(35),
        backgroundColor: '#FFFFFF',
    },
    passTextInputStyle: {
        color: '#000',
        textAlign: 'right',
        // padding: RFValue(7),
        width: width * 0.77,
        height: height * 0.07,
        fontSize: width * 0.049,
        // fontSize: RFValue(17),
        paddingLeft: width * 0.22,
        borderTopRightRadius: RFValue(35),
        borderBottomRightRadius: RFValue(35),
        backgroundColor: '#FFFFFF',
    },
    containerOfEyeIconForSecurePass: {
        width: width * 0.13,
        alignItems: 'center',
        height: height * 0.07,
        justifyContent: 'center',
        borderTopRightRadius: RFValue(35),
        borderBottomRightRadius: RFValue(35),
        backgroundColor: '#FFFF',
        marginTop: RFValue(-55),
        marginLeft: RFValue(275)
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
    containerOfTextInputs: {
        flex: 0.4,
        alignItems: 'center',
        marginTop: height * 0.006,
        paddingVertical: height * 0.005,
        paddingHorizontal: height * 0.025,
    },

});