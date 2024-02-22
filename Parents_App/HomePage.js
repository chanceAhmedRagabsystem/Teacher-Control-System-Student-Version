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
    ScrollView
} from 'react-native';
import {
    Background,
    initial_color,
    beige_color,
    secondary_color,
    Café_color,
} from '../Student_App/Colors';
import { Dimensions } from 'react-native';
const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;
import Entypo from 'react-native-vector-icons/Entypo';
import { RFValue } from 'react-native-responsive-fontsize';
import ImagePicker from 'react-native-image-crop-picker';
import { Hoshi } from 'react-native-textinput-effects';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';
export default class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            parent_data:this.props.route.params.parent_data,
            data:[],
        };
    }
    componentDidMount(){
       
    }

    componentDidMount() {
       console.log(this.state.parent_data.user_email)
        // this.user_info()
        this.refreshDataInterval = setInterval(this.fetchData, 100);
        // refresh data every 5 seconds
    }
    componentWillUnmount() {
        clearInterval(this.refreshDataInterval);
    }

    fetchData = async () => {
        try {
            const response = await axios.post(
                'http://192.168.1.5/AhmedRagab_System/Select_parent_info.php', {
                user_id: this.state.parent_data.user_id
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


                    {/* Header Tittle  */}
                    <View style={styles.headerTittleContainer}>

                        <Text style={styles.headerTittleTxtStyle}>الصفحة الرئيسية</Text>

                    </View>

                </View>

                {/* Body */}
                <ScrollView style={{ flex: 1, backgroundColor: Background }}>
                    <View style={styles.bodyContainer}>
                        <TouchableOpacity
                            // activeOpacity={0.1}
                            style={styles.contianerOfOptions}
                            onPress={() => {
                                this.props.navigation.navigate('Attendence_Days',{
                                    data:this.state.data
                                });
                            }}>
                            {/* Cases Option Logo  */}
                            <Image
                                source={require('../images/absence.jpg')}
                                resizeMode="center"
                                style={styles.optionLogoStyle}
                            />

                            {/* Cases Option Text  */}
                            <View>
                                <Text
                                    style={[
                                        styles.styleOfOptionTxt,
                                        { marginTop: height * 0.015 },
                                    ]}>
                                    الغياب
                                </Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity
                            // activeOpacity={0.1}
                            style={styles.contianerOfOptions}
                            onPress={() => {
                                this.props.navigation.navigate('Outlay_info',{
                                    data:this.state.data
                                });
                            }}>
                            {/* Cases Option Logo  */}
                            <Image
                                source={require('../images/outlay.jpg')}
                                resizeMode="center"
                                style={styles.optionLogoStyle}
                            />

                            {/* Cases Option Text  */}
                            <View>
                                <Text
                                    style={[
                                        styles.styleOfOptionTxt,
                                        { marginTop: height * 0.015 },
                                    ]}>
                                    المصاريف
                                </Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity
                            // activeOpacity={0.1}
                            style={styles.contianerOfOptions}
                            onPress={() => {
                                this.props.navigation.navigate('Parents_Profile',{
                                    data:this.state.data
                                });
                            }}>
                            {/* Cases Option Logo  */}
                            <Image
                                source={require('../images/profile.jpg')}
                                resizeMode="center"
                                style={styles.optionLogoStyle}
                            />

                            {/* Cases Option Text  */}
                            <View>
                                <Text
                                    style={[
                                        styles.styleOfOptionTxt,
                                        { marginTop: height * 0.015 },
                                    ]}>
                                    المعلومات الشخصية
                                </Text>
                            </View>
                        </TouchableOpacity>

                    </View>
                </ScrollView>

                {/* footer */}


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
        // backgroundColor: '#00f',
    },


    contianerOfOptions: {
        elevation: 10,
        borderRadius: 15,
        shadowRadius: 9.51,
        shadowColor: '#000',
        shadowOpacity: 0.43,
        width: width * 0.52,
        height: height * 0.2,
        // marginLeft: RFValue(15),
        marginTop: height * 0.02,
        // backgroundColor:'#ffffff',
        marginBottom: height * 0.03,
        paddingHorizontal: height * 0.02,
        shadowOffset: { width: 0, height: 7 },
        backgroundColor: '#ffffff',
        borderLeftWidth: 6,
        borderColor: initial_color,
        alignSelf: 'center'
    },
    styleOfOptionTxt: {
        color: '#000',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: RFValue(14),
        // marginTop: height * -0.02,
    },
    optionLogoStyle: {
        width: width * 0.3,
        height: height * 0.13,
        alignSelf: 'center',
    },
});
