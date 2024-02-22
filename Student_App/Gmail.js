/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
    StatusBar,
    View,
    Text,
    StyleSheet,
    TextInput,
    ScrollView,
    TouchableOpacity,
    Image,
} from 'react-native';
import { Dimensions } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import Entypo from 'react-native-vector-icons/Entypo';
import { Hoshi, Fumi } from 'react-native-textinput-effects';
import {
    Background,
    initial_color,
    beige_color,
    secondary_color,
    Café_color,
} from './Colors';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default class RestorePass extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user_email: '',
            email_err: '',
            // user_data: {},
        };
    }
    // The Functions:
    Email_Validation() {
        console.log(this.state.user_email)
        let errors = 0;
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/; // asdsadsad@sadjkjshd.skldjlskjd

        if (this.state.user_email.trim() == '') {
            this.setState({ email_err: 'الرجاء إدخال البريد الإلكتروني' });
            errors++
        } else if (errors == 0) {
            this.props.navigation.navigate('Otp');
        }
    }

    // The Page Design:
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
                        <View style={{ flex: 0.2, marginTop: width * 0.2 }}>

                            <Image
                                source={require('../images/AppIcon.png')}
                                style={styles.imgLogoStyle}
                                resizeMode="cover"
                            />
                        </View>

                        {/* Page Tittle */}
                        <View style={styles.tittleContainer}>
                            <Text style={styles.pageTittleStyle}>إستعادة كلمة المرور</Text>

                            <Text
                                style={[
                                    styles.pageTittleStyle,
                                    {
                                        fontSize: width * 0.040,
                                        // fontSize: RFValue(17),
                                        marginTop: height * 0.02,
                                        fontWeight: '500'
                                    },
                                ]}>
                                ادخل عنوان البريد الإلكتروني المرتبط بحسابك
                            </Text>
                        </View>

                        {/* Container Of TextInputs */}
                        <Fumi
                            label={'البريد الإلكترونى'}
                            value={this.state.user_email}
                            labelStyle={{
                                color: '#1D1D1D',
                                width: 200
                            }}
                            onChangeText={value => {
                                this.setState({
                                    user_email: value,
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

                        {/* Email Validation Text */}
                        <Text
                            style={{
                                fontSize: 15,
                                color: secondary_color,
                                textAlign: 'center',
                                marginTop: height * 0.014,
                            }}>
                            {this.state.email_err}
                        </Text>


                        {/* Reset Password Button */}
                        <View style={styles.containerOfResetBtn}>
                            <TouchableOpacity
                                style={styles.resetButton}
                                onPress={() => {
                                    this.Email_Validation();
                                }}>
                                <Text style={styles.resetTextStyle}>
                                    إرسال رمز التأكيد
                                </Text>
                            </TouchableOpacity>
                        </View>
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
        paddingTop: height * 0.1,
        backgroundColor: Background,
        justifyContent: 'center'
    },

    imgLogoStyle: {
        width: width * 0.3,
        height: height * 0.14,
        borderRadius: width * 0.15,
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
        fontSize: RFValue(18),
        fontWeight: 'bold',
        alignSelf: 'center',
    },
    containerOfTextInput: {
        flex: 0.4,
        alignItems: 'center',
        marginTop: height * 0.006,
        paddingVertical: height * 0.005,
        paddingHorizontal: height * 0.025,
    },
    containerOfEachTextInput: {
        alignContent: 'center',
        justifyContent: 'center',
        marginBottom: width * 0.005,
        marginTop: height * -0.01,
    },
    containerOfResetBtn: {
        flex: 0.3,
        alignItems: 'center',
        justifyContent: 'center',
        padding: height * 0.04,
    },
    resetButton: {
        backgroundColor: initial_color,
        borderRadius: 10,
        justifyContent: 'center',
        marginVertical: '5%',
        height: height * 0.06,
        width: width * 0.55,
    },
    resetTextStyle: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: width * 0.046,
        color: '#fff',
    },
});
