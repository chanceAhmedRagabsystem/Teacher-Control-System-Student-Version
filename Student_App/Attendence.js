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
import { Background, initial_color, beige_color, secondary_color, Café_color, gray_color } from './Colors'
import Entypo from 'react-native-vector-icons/Entypo';
import { Dimensions } from 'react-native';
import { RightCircleFilled } from '@ant-design/icons/RightCircleFilled';
import { RFValue } from 'react-native-responsive-fontsize';
const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;

export default class Attendence extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            attendence: [
                {
                    text: 'الطالب غائب فى يوم:', attendence_date: new Date().toDateString(), show: 1
                },
                {
                    text: 'الطالب غائب فى يوم:', attendence_date: new Date().toDateString()
                    , show: 1
                },
                {
                    text: 'الطالب غائب فى يوم:', attendence_date: new Date().toDateString()
                    , show: 1
                },


            ]
        };
    }

    render() {
        return (
            <>
                <StatusBar backgroundColor={initial_color} barStyle={'light-content'} />

                {/* Header  */}
                <View style={styles.headerContainer}>
                    {/* Header Tittle  */}
                    <TouchableOpacity
                        style={{ justifyContent: 'center', marginLeft: RFValue(10) }}
                        onPress={() => {
                            this.props.navigation.goBack();
                        }}>
                        <Entypo
                            name="chevron-with-circle-right"
                            color="#000"
                            size={30}
                            style={{ alignSelf: 'center' }}
                        />
                    </TouchableOpacity>
                    <View style={styles.headerTittleContainer}>
                        <Text style={styles.headerTittleTxtStyle}>الغيـاب </Text>
                    </View>

                </View>

                {/* Body */}
                <ScrollView style={{ flex: 1, backgroundColor: Background }}>
                    <View style={styles.bodyContainer}>
                        {this.state.attendence.map((item, index) =>
                            item.show == 1 ? (
                                <View
                                    key={index}
                                    style={styles.contianerOfattendence}>
                                    <Text style={{ color: '#1D1D1D', fontSize: 16, alignSelf: 'center', fontWeight: 'bold' }}>{item.text}</Text>
                                    <Text style={{ alignSelf: 'center', color: gray_color }}>{item.attendence_date}</Text>

                                </View>
                            ) : null,
                        )}
                    </View>
                </ScrollView>
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
        alignItems: 'center',
        backgroundColor: Background,
    },
    contianerOfattendence: {
        backgroundColor: '#FFFFFF',
        elevation: 5,
        width: '95%',
        height: height * .11,
        borderRadius: 15,
        justifyContent: 'center',
        marginTop: 5,
        marginBottom: 5,
        borderLeftWidth: 7,
        borderColor: initial_color,
    },

});
