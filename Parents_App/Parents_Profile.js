/* eslint-disable prettier/prettier */
import React from 'react';
import {
    View,
    Text,
    Image,
    StatusBar,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Button,
    Modal,
    Alert
} from 'react-native';
import { Background, initial_color, beige_color, secondary_color, Café_color } from '../Student_App/Colors'
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Dimensions } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import { Hoshi, Fumi } from 'react-native-textinput-effects';
import axios from 'axios';
const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;

export default class Parents_Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: this.props.route.params.data,
            image: '',
            showInfo_name: false,
            showInfo_gmail: false,
            showInfo_phone: false,
            showInfo_studentName: false,
            showInfo_student_code: false
        };
    }
    componentDidMount() {
        console.log(this.state.data);
    }

    render() {
        return (
            <>
                <StatusBar backgroundColor={initial_color} barStyle={'light-content'} />

                {/* Header  */}
                <View style={styles.headerContainer}>

                    {/* Header Tittle  */}
                    <TouchableOpacity style={{ justifyContent: 'center', marginLeft: 15 }}
                        onPress={() => {
                            this.props.navigation.goBack();
                        }}
                    >
                        <Entypo name="chevron-with-circle-right" color='#000' size={30} style={{ alignSelf: 'center' }} />
                    </TouchableOpacity>
                    <View style={styles.headerTittleContainer}>

                        <Text style={styles.headerTittleTxtStyle}>المعلومات الشخصية</Text>

                    </View>

                </View>

                {/* Body */}
                <ScrollView style={{ flex: 1, backgroundColor: Background }}>
                    <View style={{ width: 90, height: 90, alignSelf: 'center', borderRadius: 5, justifyContent: 'center', borderWidth: .2, borderColor: '#000', marginTop: 10 }}>


                        <Image source={require('../images/parents.jpg')} style={{ width: 60, height: 60, alignSelf: 'center', borderRadius: 10 }}
                            resizeMode='stretch'
                        />


                    </View>

                    <View style={styles.bodyContainer}>
                        <Text style={{
                            fontSize: 16, marginLeft: 20,
                            marginTop: 20, fontWeight: 'bold', color: '#1D1D1D'
                        }}>
                            الأسم
                        </Text>

                        <View
                            style={styles.contianerOfInfo}>
                            <TouchableOpacity style={{ justifyContent: 'center' }}
                                onPress={() => {
                                    this.setState({ showInfo_name: true });
                                }}
                            >
                                <FontAwesome name="edit" color={secondary_color} size={25} style={{ alignSelf: 'center' }} />
                            </TouchableOpacity>
                            <Text style={{
                                color: '#1D1D1D', fontSize: 17, marginRight: 10,
                                alignSelf: 'center'
                            }}>{this.state.data.user_name}</Text>

                        </View>

                        <Text style={{
                            fontSize: 16, marginLeft: 20,
                            marginTop: 20, fontWeight: 'bold', color: '#1D1D1D'
                        }}>
                            كود الطالب
                        </Text>

                        <View
                            style={styles.contianerOfInfo}>
                            <TouchableOpacity style={{ justifyContent: 'center' }}
                                onPress={() => {
                                    this.setState({ showInfo_student_code: true });
                                }}
                            >
                                <FontAwesome name="edit" color={secondary_color} size={25} style={{ alignSelf: 'center' }} />
                            </TouchableOpacity>
                            <Text style={{
                                color: '#1D1D1D', fontSize: 17, marginRight: 10,
                                alignSelf: 'center'
                            }}>{this.state.data.student_code}</Text>

                        </View>
                        <Text style={{
                            fontSize: 16, marginLeft: 20,
                            marginTop: 10, fontWeight: 'bold', color: '#1D1D1D'
                        }}>
                            البريد الإلكترونى
                        </Text>

                        <View
                            style={styles.contianerOfInfo}>
                            <TouchableOpacity style={{ justifyContent: 'center' }}
                                onPress={() => {
                                    this.setState({ showInfo_gmail: true });
                                }}
                            >
                                <FontAwesome name="edit" color={secondary_color} size={25} style={{ alignSelf: 'center' }} />
                            </TouchableOpacity>
                            <Text style={{
                                color: '#1D1D1D', fontSize: 17, marginRight: 10,
                                alignSelf: 'center'
                            }}>{this.state.data.user_email}</Text>

                        </View>

                        <Text style={{
                            fontSize: 16, marginLeft: 20,
                            marginTop: 10, fontWeight: 'bold', color: '#1D1D1D'
                        }}>
                            رقم الهاتف
                        </Text>

                        <View
                            style={styles.contianerOfInfo}>
                            <TouchableOpacity style={{ justifyContent: 'center' }}
                                onPress={() => {
                                    this.setState({ showInfo_phone: true });
                                }}
                            >
                                <FontAwesome name="edit" color={secondary_color} size={25} style={{ alignSelf: 'center' }} />
                            </TouchableOpacity>
                            <Text style={{
                                color: '#1D1D1D', fontSize: 17, marginRight: 10,
                                alignSelf: 'center'
                            }}>{this.state.data.user_phone}</Text>

                        </View>
                        <View
                            style={styles.contianerOfInfo}>
                            <TouchableOpacity style={{ justifyContent: 'center' }}
                                onPress={() => {
                                    this.props.navigation.navigate('Change_Password')
                                }}
                            >
                                <FontAwesome name="edit" color={secondary_color} size={25} style={{ alignSelf: 'center' }} />
                            </TouchableOpacity>
                            <Text style={{ color: '#1D1D1D', fontSize: 17, marginRight: 10, alignSelf: 'center', fontWeight: 'bold' }}>تغيير كلمة المرور</Text>

                        </View>
                        <View
                            style={styles.contianerOfInfo}>
                            <TouchableOpacity style={{ justifyContent: 'center' }}
                                onPress={() => {
                                    Alert.alert('تحذير', 'هل تريد تسجيل الخروج', [
                                        { text: 'نعم', onPress: () => this.props.navigation.navigate('Login') },
                                        { text: 'لا', onPress: () => this.props.navigation.navigate('Parents_Profile') }])
                                }}
                            >
                                <AntDesign name="leftcircleo" color={secondary_color} size={25} style={{ alignSelf: 'center' }} />
                            </TouchableOpacity>
                            <Text style={{ color: '#1D1D1D', fontSize: 17, marginRight: 10, alignSelf: 'center', fontWeight: 'bold' }}>تسجيل الخروج</Text>

                        </View>
                    </View>

                </ScrollView>
                {/* name Modal */}
                <Modal
                    transparent
                    statusBarTranslucent
                    visible={this.state.showInfo_name}
                    onRequestClose={() => {
                        showModelInfo = this.state.showInfo_name;
                        this.setState({ showInfo_name: !showModelInfo });
                    }}>
                    <View style={styles.infoModalBackground}>
                        <View style={styles.studentInfoBox}>
                            {/* Header Of Charity Info Box */}
                            <View style={styles.NameImgContainer}>
                                <Hoshi
                                    label={'الأسم'}
                                    value={this.state.data.user_name}
                                    labelStyle={{
                                        color: '#1D1D1D',
                                        width: 200,
                                        fontWeight: 'bold'
                                    }}
                                    onChangeText={value => {
                                        this.setState({
                                            data: {
                                                user_id: this.state.data.user_id,
                                                user_name: value,
                                                user_email: this.state.data.user_email,
                                                user_phone: this.state.data.user_phone,
                                                student_code: this.state.data.student_code,
                                            },
                                        });
                                    }}
                                    inputStyle={{
                                        color: '#1D1D1D',
                                        fontWeight: '400'
                                    }}
                                    // this is used as active border color
                                    borderColor={initial_color}

                                    paddingRight={30}
                                    inputPadding={25}
                                    style={{
                                        borderBottomWidth: .2,
                                        fontSize: 17,
                                        alignSelf: 'center',
                                        width: width * 0.8,
                                        backgroundColor: '#FFFFFF',
                                        shadowColor: '#000',
                                        shadowOffset: {
                                            width: 0,
                                            height: 1,
                                        },
                                        shadowOpacity: 0.2,
                                        shadowRadius: 1.41,
                                        elevation: 1,
                                    }}
                                />
                            </View>

                            <View
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    alignSelf: 'center',
                                }}>
                                <TouchableOpacity
                                    onPress={() => {
                                        // this.props.navigation.navigate('Accounts');
                                        // this.setState({ showInfo: false })
                                        // achievements: this.state.charityDetails,
                                        {
                                            this.setState({ showInfo_name: false });
                                        }
                                    }}
                                    style={[
                                        styles.Btn,
                                        { marginRight: 40, backgroundColor: initial_color },
                                    ]}
                                >
                                    <Text
                                        style={{
                                            color: '#fff',
                                            fontSize: width * 0.053,
                                            // fontSize: RFValue(19),
                                            fontWeight: 'bold',
                                        }}>
                                        الغاء
                                    </Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    onPress={() => {
                                        axios
                                            .post(
                                                'http://192.168.1.5/AhmedRagab_System/edit_ParentData.php',
                                                {
                                                    user_id: this.state.data.user_id,
                                                    user_name: this.state.data.user_name,
                                                },
                                            )
                                            .then(res => {
                                                if (res.data == 'updated') {
                                                    alert('success');

                                                    this.setState({
                                                        user_id: this.state.data.user_id,
                                                        user_name: this.state.data.user_name,
                                                        user_email: this.state.data.user_email,
                                                        user_phone: this.state.data.user_phone,
                                                        student_code: this.state.data.student_code,
                                                    });
                                                } else if (res.data == 'not_updated') {
                                                    alert('failed');
                                                }
                                            });

                                        this.setState({ showInfo_name: false });


                                    }}
                                    style={styles.Btn}
                                >
                                    <Text
                                        style={{
                                            color: '#fff',
                                            fontSize: width * 0.053,
                                            // fontSize: RFValue(19),
                                            fontWeight: 'bold',
                                        }}>
                                        حفظ
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
                {/* student_code */}
                <Modal
                    transparent
                    statusBarTranslucent
                    visible={this.state.showInfo_student_code}
                    onRequestClose={() => {
                        showModelInfo = this.state.showInfo_student_code;
                        this.setState({ showInfo_student_code: !showModelInfo });
                    }}>
                    <View style={styles.infoModalBackground}>
                        <View style={styles.studentInfoBox}>
                            {/* Header Of Charity Info Box */}
                            <View style={styles.NameImgContainer}>
                                <Hoshi
                                    label={'كود الطالب'}
                                    value={this.state.data.student_code}
                                    labelStyle={{
                                        color: '#1D1D1D',
                                        width: 200,
                                        fontWeight: 'bold'
                                    }}
                                    onChangeText={value => {
                                        this.setState({
                                            data: {
                                                user_id: this.state.data.user_id,
                                                user_name: this.state.data.user_name,
                                                user_email: this.state.data.user_email,
                                                user_phone: this.state.data.user_phone,
                                                student_code: value,

                                            },
                                        });
                                    }}
                                    inputStyle={{
                                        color: '#1D1D1D',
                                        fontWeight: '400'
                                    }}
                                    // this is used as active border color
                                    borderColor={initial_color}

                                    paddingRight={30}
                                    inputPadding={25}
                                    style={{
                                        borderBottomWidth: .2,
                                        fontSize: 17,
                                        alignSelf: 'center',
                                        width: width * 0.8,
                                        backgroundColor: '#FFFFFF',
                                        shadowColor: '#000',
                                        shadowOffset: {
                                            width: 0,
                                            height: 1,
                                        },
                                        shadowOpacity: 0.2,
                                        shadowRadius: 1.41,

                                        elevation: 1,
                                    }}
                                />
                            </View>

                            <View
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    alignSelf: 'center',
                                }}>
                                <TouchableOpacity
                                    onPress={() => {

                                        {
                                            this.setState({ showInfo_student_code: false });
                                        }
                                    }}
                                    style={[
                                        styles.Btn,
                                        { marginRight: 40, backgroundColor: initial_color },
                                    ]}
                                >
                                    <Text
                                        style={{
                                            color: '#fff',
                                            fontSize: width * 0.053,
                                            // fontSize: RFValue(19),
                                            fontWeight: 'bold',
                                        }}>
                                        الغاء
                                    </Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    onPress={() => {
                                        axios
                                            .post(
                                                'http://192.168.1.5/AhmedRagab_System/edit_ParentData.php',
                                                {
                                                    user_id: this.state.data.user_id,
                                                    student_code: this.state.data.student_code,
                                                },
                                            )
                                            .then(res => {
                                                if (res.data == 'updated') {
                                                    alert('success');

                                                    this.setState({
                                                        user_id: this.state.data.user_id,
                                                        user_name: this.state.data.user_name,
                                                        user_email: this.state.data.user_email,
                                                        user_phone: this.state.data.user_phone,
                                                        student_code: this.state.data.student_code,
                                                    });
                                                } else if (res.data == 'not_updated') {
                                                    alert('failed');
                                                }
                                            });
                                        this.setState({ showInfo_student_code: false });

                                    }}
                                    style={styles.Btn}
                                >
                                    <Text
                                        style={{
                                            color: '#fff',
                                            fontSize: width * 0.053,
                                            // fontSize: RFValue(19),
                                            fontWeight: 'bold',
                                        }}>
                                        حفظ
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>

                {/* gmail Modal */}
                <Modal
                    transparent
                    statusBarTranslucent
                    visible={this.state.showInfo_gmail}
                    onRequestClose={() => {
                        showModelInfo = this.state.showInfo_gmail;
                        this.setState({ showInfo_gmail: !showModelInfo });
                    }}>
                    <View style={styles.infoModalBackground}>
                        <View style={styles.studentInfoBox}>
                            {/* Header Of Charity Info Box */}
                            <View style={styles.NameImgContainer}>
                                <Hoshi
                                    label={'البريد الإلكترونى'}
                                    value={this.state.data.user_email}
                                    labelStyle={{
                                        color: '#1D1D1D',
                                        width: 200,
                                        fontWeight: 'bold'
                                    }}
                                    onChangeText={value => {
                                        this.setState({
                                            data: {
                                                user_id: this.state.data.user_id,
                                                user_name: this.state.data.user_name,
                                                user_email: value,
                                                user_phone: this.state.data.user_phone,
                                                student_code: this.state.data.student_code,
                                            },
                                        });
                                    }}
                                    inputStyle={{
                                        color: '#1D1D1D',
                                        fontWeight: '400'
                                    }}
                                    // this is used as active border color
                                    borderColor={initial_color}

                                    paddingRight={30}
                                    inputPadding={25}
                                    style={{
                                        borderBottomWidth: .2,
                                        fontSize: 17,
                                        alignSelf: 'center',
                                        width: width * 0.8,
                                        backgroundColor: '#FFFFFF',
                                        shadowColor: '#000',
                                        shadowOffset: {
                                            width: 0,
                                            height: 1,
                                        },
                                        shadowOpacity: 0.2,
                                        shadowRadius: 1.41,

                                        elevation: 1,
                                    }}
                                />
                            </View>

                            <View
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    alignSelf: 'center',
                                }}>
                                <TouchableOpacity
                                    onPress={() => {

                                        {
                                            this.setState({ showInfo_gmail: false });
                                        }
                                    }}
                                    style={[
                                        styles.Btn,
                                        { marginRight: 40, backgroundColor: initial_color },
                                    ]}
                                >
                                    <Text
                                        style={{
                                            color: '#fff',
                                            fontSize: width * 0.053,
                                            // fontSize: RFValue(19),
                                            fontWeight: 'bold',
                                        }}>
                                        الغاء
                                    </Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    onPress={() => {
                                        axios.post(
                                            'http://192.168.1.5/AhmedRagab_System/edit_ParentData.php',
                                            {
                                                user_id: this.state.data.user_id,
                                                user_email: this.state.data.user_email,
                                            },
                                        )
                                            .then(res => {
                                                if (res.data == 'updated') {
                                                    alert('success');

                                                    this.setState({
                                                        user_id: this.state.data.user_id,
                                                        user_name: this.state.data.user_name,
                                                        user_email: this.state.data.user_email,
                                                        user_phone: this.state.data.user_phone,
                                                        student_code: this.state.data.student_code,
                                                    });
                                                } else if (res.data == 'not_updated') {
                                                    alert('failed');
                                                }
                                            });
                                        this.setState({ showInfo_gmail: false });

                                    }}
                                    style={styles.Btn}
                                >
                                    <Text
                                        style={{
                                            color: '#fff',
                                            fontSize: width * 0.053,
                                            // fontSize: RFValue(19),
                                            fontWeight: 'bold',
                                        }}>
                                        حفظ
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
                {/* phone Modal */}
                <Modal
                    transparent
                    statusBarTranslucent
                    visible={this.state.showInfo_phone}
                    onRequestClose={() => {
                        showModelInfo = this.state.showInfo_phone;
                        this.setState({ showInfo_phone: !showModelInfo });
                    }}>
                    <View style={styles.infoModalBackground}>
                        <View style={styles.studentInfoBox}>
                            {/* Header Of Charity Info Box */}
                            <View style={styles.NameImgContainer}>
                                <Hoshi
                                    label={'رقم الهاتف'}
                                    value={this.state.data.user_phone}
                                    labelStyle={{
                                        color: '#1D1D1D',
                                        width: 200,
                                        fontWeight: 'bold'
                                    }}
                                    onChangeText={value => {
                                        this.setState({
                                            data: {
                                                user_id: this.state.data.user_id,
                                                user_name: this.state.data.user_name,
                                                user_email: this.state.data.user_email,
                                                user_phone: value,
                                                student_code: this.state.data.student_code,
                                            },
                                        });
                                    }}
                                    inputStyle={{
                                        color: '#1D1D1D',
                                        fontWeight: '400'
                                    }}
                                    // this is used as active border color
                                    borderColor={initial_color}

                                    paddingRight={30}
                                    inputPadding={25}
                                    style={{
                                        borderBottomWidth: .2,
                                        fontSize: 17,
                                        alignSelf: 'center',
                                        width: width * 0.8,
                                        backgroundColor: '#FFFFFF',
                                        shadowColor: '#000',
                                        shadowOffset: {
                                            width: 0,
                                            height: 1,
                                        },
                                        shadowOpacity: 0.2,
                                        shadowRadius: 1.41,

                                        elevation: 1,
                                    }}
                                />
                            </View>

                            <View
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    alignSelf: 'center',
                                }}>
                                <TouchableOpacity
                                    onPress={() => {
                                        {
                                            this.setState({ showInfo_phone: false });
                                        }
                                    }}
                                    style={[
                                        styles.Btn,
                                        { marginRight: 40, backgroundColor: initial_color },
                                    ]}
                                >
                                    <Text
                                        style={{
                                            color: '#fff',
                                            fontSize: width * 0.053,
                                            // fontSize: RFValue(19),
                                            fontWeight: 'bold',
                                        }}>
                                        الغاء
                                    </Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    onPress={() => {
                                        axios.post(
                                            'http://192.168.1.5/AhmedRagab_System/edit_ParentData.php',
                                            {
                                                user_id: this.state.data.user_id,
                                                user_phone: this.state.data.user_phone,
                                            },
                                        )
                                            .then(res => {
                                                if (res.data == 'updated') {
                                                    alert('success');

                                                    this.setState({
                                                        user_id: this.state.data.user_id,
                                                        user_name: this.state.data.user_name,
                                                        user_email: this.state.data.user_email,
                                                        user_phone: this.state.data.user_phone,
                                                        student_code: this.state.data.student_code,
                                                    });
                                                } else if (res.data == 'not_updated') {
                                                    alert('failed');
                                                }
                                            });
                                        this.setState({ showInfo_phone: false });

                                    }}
                                    style={styles.Btn}
                                >
                                    <Text
                                        style={{
                                            color: '#fff',
                                            fontSize: width * 0.053,
                                            // fontSize: RFValue(19),
                                            fontWeight: 'bold',
                                        }}>
                                        حفظ
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
            </>
        );
    }
}

const styles = StyleSheet.create({
    // Header Style
    // ------------------------------------------------------------------------
    headerContainer: {
        width: width,
        alignSelf: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        height: height * 0.08,
        justifyContent: 'space-around',
        backgroundColor: Background,
    },
    headerTittleContainer: {
        width: width * 0.8,
        // alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        marginRight: width * .1
    },
    headerTittleTxtStyle: {
        color: secondary_color,
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 18,
    },

    // Body Style
    // ------------------------------------------------------------------------
    bodyContainer: {
        flex: 1,
        backgroundColor: Background,
    },
    contianerOfInfo: {
        backgroundColor: '#FFFFFF',
        elevation: 5,
        width: '95%',
        borderRadius: 15,
        justifyContent: 'space-between',
        marginTop: 5,
        marginBottom: 10,
        alignSelf: 'center',
        flexDirection: 'row-reverse',
        padding: 15,
        borderLeftWidth: 6,
        borderColor: initial_color

    },
    infoModalBackground: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    studentInfoBox: {
        alignItems: 'center',
        justifyContent: 'center',
        height: height * 0.25,
        marginTop: height * 0.05,
        paddingHorizontal: height * 0.02,
        paddingVertical: height * 0.015,
        borderRadius: height * 0.013,
        backgroundColor: '#fff',
    },
    NameImgContainer: {
        width: width * 0.8,
        height: height * 0.1,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    Btn: {
        width: width * 0.3,
        alignItems: 'center',
        height: height * 0.05,
        justifyContent: 'center',
        marginTop: height * 0.035,
        borderRadius: height * 0.018,
        backgroundColor: initial_color,
        elevation: 5,
        shadowRadius: 9.51,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 7 },
    },
});