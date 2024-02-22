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
} from 'react-native';
import {
    Background,
    initial_color,
    beige_color,
    secondary_color,
    Café_color,
} from './Colors';
import { Dimensions } from 'react-native';
const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;
import Entypo from 'react-native-vector-icons/Entypo';
import { RFValue } from 'react-native-responsive-fontsize';
import ImagePicker from 'react-native-image-crop-picker';
import { Hoshi } from 'react-native-textinput-effects';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


export default class Student_details extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            student_image: require('../images/user.png'),
            student_data: this.props.route.params.student_data,
            data: [],

        };
    }
    componentDidMount() {
        console.log(this.state.student_data)
        // this.user_info()

    }
    componentDidMount() {
        this.refreshDataInterval = setInterval(this.fetchData, 100);
        // refresh data every 5 seconds
    }
    componentWillUnmount() {
        clearInterval(this.refreshDataInterval);
    }

    fetchData = async () => {
        try {
            const response = await axios.post(
                'http://192.168.1.5/AhmedRagab_System/Select_user_info.php', {
                user_id: this.state.student_data.user_id
            });
            const data = response.data;
            this.setState({ data: data });
        } catch (error) {
            console.error(error);
        }
    };

    render() {
        return (
            <>
                <StatusBar backgroundColor={initial_color} barStyle={'light-content'} />
                {/* Header  */}
                <View style={styles.headerContainer}>
                    {/* arrow back */}
                    {/* <TouchableOpacity style={{ justifyContent: 'center', marginLeft: RFValue(10) }}>
                        <Entypo name="chevron-with-circle-right" color='#000' size={30} style={{ alignSelf: 'center' }} />
                    </TouchableOpacity> */}

                    {/* Header Tittle  */}
                    <View style={styles.headerTittleContainer}>

                        <Text style={styles.headerTittleTxtStyle}>الصفحة الرئيسية</Text>

                    </View>

                </View>

                {/* Body */}
                <ScrollView
                    style={{ flex: 1, backgroundColor: Background }}>
                    <View style={styles.bodyContainer}>
                        <View>

                            {/* <View style={{
                                backgroundColor: '#fff',
                                height: height*0.65,
                                width: width*0.9,
                                alignSelf: 'center',
                                justifyContent: "center",
                                alignItems: "center",
                                borderRadius: 15,
                                elevation: 5,
                                marginTop: RFValue(30),
                                marginBottom:RFValue(5),
                               
                            }}> */}
                            {/* image */}
                            <View style={{
                                width: 120, height: 120, alignSelf: 'center',
                                borderRadius: 5, justifyContent: 'center', borderWidth: .2,
                                borderColor: '#000',
                                marginTop: RFValue(45)
                            }}>
                                <Image source={require('../images/user.png')}
                                    style={{ width: 100, height: 100, alignSelf: 'center', borderRadius: 10 }}
                                    resizeMode='center'
                                />
                            </View>

                            {/* student name */}
                            <Text style={styles.TittleTxtStyle}>
                                {this.state.data.user_name}</Text>

                            <TouchableOpacity
                                onPress={() => {
                                    this.props.navigation.navigate('Attendence', {
                                        data: this.state.data
                                    });
                                }}
                                style={styles.contianerOfProfileInfo}>
                                <Image source={require('../images/absence.jpg')}
                                    style={styles.imageIcon} />

                                <View style={{ justifyContent: 'center' }}>
                                    <Text style={{
                                        color: '#1D1D1D', fontSize: 17,

                                        alignSelf: 'center'
                                    }}>الغياب</Text>

                                </View>

                            </TouchableOpacity>


                            <TouchableOpacity
                                onPress={() => {
                                    this.props.navigation.navigate('Outlay', {
                                        data: this.state.data
                                    });
                                }}
                                style={styles.contianerOfProfileInfo}>
                                <Image source={require('../images/outlay.jpg')}
                                    style={styles.imageIcon} />
                                <View style={{ justifyContent: 'center' }}>
                                    <Text style={{
                                        color: '#1D1D1D', fontSize: 17,
                                        alignSelf: 'center'
                                    }}>المصاريف</Text>

                                </View>

                            </TouchableOpacity>




                            <TouchableOpacity
                                onPress={() => {
                                    this.props.navigation.navigate('Student_Profile', {
                                        data: this.state.data
                                    });
                                }}
                                style={[styles.contianerOfProfileInfo, { marginBottom: RFValue(25) }]}>
                                <Image source={require('../images/profile.jpg')}
                                    style={styles.imageIcon}
                                />
                                <View style={{ justifyContent: 'center' }}

                                >

                                    <Text style={{
                                        color: '#1D1D1D', fontSize: 17,
                                        alignSelf: 'center'
                                    }}>المعلومات الشخصية</Text>

                                </View>

                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>

                {/* footer */}
                <View
                    style={{
                        height: height * 0.075,
                        backgroundColor: "#fff",
                        // backgroundColor:"#ff0",
                        // backgroundColor:footerIconsOff,
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
                            الصفحة الرئيسية
                        </Text>
                    </TouchableOpacity>



                    <TouchableOpacity
                        onPress={() => {
                            this.props.navigation.navigate('QR_Scan', {
                                data: this.state.data
                            });
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
                            لمسح الكود
                        </Text>
                    </TouchableOpacity>


                </View>

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
        width: width * 0.9,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        // marginLeft: RFValue(15)
    },
    headerTittleTxtStyle: {
        color: secondary_color,
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 19,
    },

    // Body Style
    // ------------------------------------------------------------------------
    bodyContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: "center",
        // backgroundColor: '#0ff',
    },
    TittleTxtStyle: {
        color: "#1D1D1D",
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 22,
        marginTop: RFValue(25),
        marginBottom: RFValue(10)
    },
    contianerOfpage: {
        // backgroundColor: '#fff',
        // elevation: 2,
        width: '100%',
        height: height * 0.17,
        borderRadius: 15,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignSelf: "center",
        alignItems: 'center',
        marginTop: RFValue(15),
        marginBottom: 10,
        // padding: RFValue(10),
        alignSelf: "center"


    },
    contianerOfInfo: {
        backgroundColor: "#FFF",
        elevation: 5,
        width: '46%',
        height: height * 0.1,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: "center",
        marginTop: 5,
        marginBottom: 10,
        // alignSelf: 'center',
        flexDirection: 'row',
        padding: 5,


    },
    contianerOfProfileInfo: {
        backgroundColor: "#FFF",
        elevation: 5,
        width: width * 0.85,
        height: height * 0.08,
        borderRadius: 15,
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginBottom: RFValue(15),
        alignSelf: 'center',
        padding: 10,
        flexDirection: "row",
        marginTop: RFValue(15),
        borderLeftWidth: 7,
        borderColor: initial_color,
    },
    imageIcon: {
        width: RFValue(50),
        height: RFValue(50),
        alignSelf: 'center',
        borderRadius: 10,
    }

});
