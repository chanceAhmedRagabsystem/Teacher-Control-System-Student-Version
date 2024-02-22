/* eslint-disable prettier/prettier */
/* eslint-disable no-undef */
/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import {
    StatusBar,
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Image,
    Alert
} from 'react-native';
import { Dimensions } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import Entypo from 'react-native-vector-icons/Entypo';
import SwitchSelector from "react-native-switch-selector";
import { Fumi } from 'react-native-textinput-effects';
import {
    Background,
    initial_color,
    secondary_color,
    gray_color
} from './Colors';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
import AntDesign from 'react-native-vector-icons/AntDesign';
import SelectDropdown from 'react-native-select-dropdown';
import axios from 'axios';
export default function SignUp(props) {
    //student
    const [showHide, setShowHide] = useState(false);
    const [student_name, setstudent_name] = useState('');
    const [studentname_err, setstudentname_err] = useState('');
    const [student_email, setstudent_email] = useState('');
    const [email_err, setemail_err] = useState('');
    const [student_pass, setstudent_pass] = useState('');
    const [pass_err, setpass_err] = useState('');
    const [lockedPass, setlockedPass] = useState(true);
    const [student_confPass, setstudent_confPass] = useState('');
    const [lockedConfPass, setlockedConfPass] = useState(true);
    const [confPass_err, setconfPass_err] = useState('');
    const [student_phone, setstudent_phone] = useState('');
    const [phone_err, setphone_err] = useState('');
    const [student_code, setstudent_code] = useState('');
    const [student_code_err, setstudent_code_err] = useState('');
    const [student_grades, setstudent_grades] = useState([]);
    const [student_group, setstudent_group] = useState([]);
    const [student_grades_err, setstudent_grades_err] = useState('');
    const [student_group_err, setstudent_group_err] = useState('');
    const [selectedItem, setselectedItem] = useState([]);
    const [selectedGroup, setselectedGroup] = useState([]);
    const [student_data, setstudent_data] = useState({});
    const groupDropdownRef = useRef();
    useEffect(() => {
        fetchData();
    }, []);

    fetchData = async () => {
        try {
            const response = await axios.get("http://192.168.1.5/AhmedRagab_System/select_Grades_and_groups.php",
            );
            const grades = response.data;
            setstudent_grades(grades);

        } catch (error) {
            console.error(error);
        }
    };

    //Parents....
    const [parent_name, setparent_name] = useState('');
    const [parent_name_err, setparent_name_err] = useState('');
    const [name, setname] = useState('');
    const [name_err, setname_err] = useState('');
    const [parent_email, setparent_email] = useState('');
    const [parent_email_err, setparent_email_err] = useState('');
    const [parent_pass, setparent_pass] = useState('');
    const [parent_pass_err, setparent_pass_err] = useState('');
    const [locked_parentPass, setlocked_parentPass] = useState(true);
    const [parent_confPass, setparent_confPass] = useState('');
    const [locked_parentConfPass, setlocked_parentConfPass] = useState(true);
    const [parent_confPass_err, setparent_confPass_err] = useState('');
    const [parent_phone, setparent_phone] = useState('');
    const [parent_phone_err, setparent_phone_err] = useState('');
    const [student_code2, setstudent_code2] = useState('');
    const [student_code_err2, setstudent_code_err2] = useState('');
    const [parent_data, setparent_data] = useState({});

    // The Functions of student:
    // eslint-disable-next-line no-undef
    const Validation_student_Before_SignUp = () => {
        let errors = 0;
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/; // asdsadsad@sadjkjshd.skldjlskjd
        //studentNmae Conditions
        if (student_name.trim() == '') {
            setstudentname_err('الرجاء إدخال إسم المستخدم');
            errors++;
        } else {
            setstudentname_err('');
        }
        // Email Conditions
        if (student_email.trim() === '') {
            setemail_err('الرجاء إدخال البريد الإلكتروني');
            errors++;
        } else if (reg.test(student_email.trim()) == false) {
            setemail_err('تأكد من إدخال البريد الإلكتروني بشكل صحيح!'); _
            errors++;
        } else {
            setemail_err('');
        }
        // Pass Conditions
        if (student_pass.trim() == '') {
            setpass_err('الرجاء إدخال كلمة المرور');
            errors++;
        } else if (student_pass.trim() < 6) {
            setpass_err('كلمة المرور يجب ان تكون 6 عناصر او أكثر');
            errors++;
        } else {
            setpass_err('');
        }
        // Confirm Pass Conditions
        if (
            student_confPass.trim() == '' &&
            student_pass.trim() != ''
        ) {
            setconfPass_err('الرجاء تأكيد كلمة المرور');
            errors++;
        } else if (student_confPass.trim() != student_pass) {
            setconfPass_err(
                'تأكيد كلمة المرور يجب ان تكون متطابقة مع كلمة المرور المدخلة اعلاه',
            );
            errors++;
        } else {
            setconfPass_err('');
        }
        //student code Number Conditions
        if (student_phone.trim() == '') {
            setphone_err('الرجاء إدخال رقم الهاتف');
            errors++;
        } else if (student_phone.trim().length != 11) {
            setphone_err('الرجاء التأكد من صحة الرقم المدخل');
            errors++;
        } else {
            setphone_err('');
        }
        if (student_code.trim() == '') {
            setstudent_code_err('الرجاء إدخال كود الطالب');
            errors++;
        } else {
            setstudent_code_err('');
        }
        //grade and group
        if (student_grades == '') {
            setstudent_grades_err("من فضلك قم بأختيار أسم الدفعة");
            errors++;
        } else if (student_group == '') {
            setstudent_group_err('من فضلك قم بأختيار أسم المجموعة');
            errors++;
        } else {
            setstudent_grades_err('');
            setstudent_group_err('');
        }

        if (errors == 0) {
            // props.navigation.navigate('StudentWaiting');
            axios.post('http://192.168.1.5/AhmedRagab_System/signUp.php', {
                user_type: 'student',
                user_name: student_name,
                user_email: student_email,
                user_password: student_pass,
                user_phone: student_phone,
                student_code: student_code,
                student_grade: selectedItem.grade_name,
                student_group: selectedGroup.group_name,
                grade_id: selectedItem.grade_id,
                group_id: selectedGroup.group_id,
            }).then(res => {
                if (typeof res.data == typeof {}) {
                    console.log(res.data)
                    props.navigation.navigate('StudentWaiting', {
                        data: res.data
                    });
                } else if (res.data == 'phone_found') {
                    Alert.alert('تنبيه', 'رقم الهاتف موجود بالفعل');
                } else if (res.data == 'email_found') {
                    Alert.alert('تنبيه', 'البريد الالكتروني موجود بالفعل');
                } else if (res.data == 'student_code already exist') {
                    Alert.alert('تنبيه', 'كود الطالب مسجل لدينا');
                }
            });
        }
    }

    // The Functions:
    const Validation_Before_ParentSignUp = () => {
        let errors = 0;
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/; // asdsadsad@sadjkjshd.skldjlskjd

        //studentNmae Conditions
        if (parent_name.trim() == '') {
            setparent_name_err('الرجاء إدخال الاسم ');
            errors++;
        } else {
            setparent_name_err('');
        }

        // Email Conditions
        if (parent_email.trim() == '') {
            setparent_email_err('الرجاء إدخال البريد الإلكتروني');
            errors++;
        } else if (reg.test(parent_email.trim()) == false) {
            setparent_email_err(
                'تأكد من إدخال البريد الإلكتروني بشكل صحيح!',
            );
            errors++;
        } else {
            setparent_email_err('');
        }

        // Pass Conditions
        if (parent_pass.trim() == '') {
            setparent_pass_err('الرجاء إدخال كلمة المرور');
            errors++;
        } else if (parent_pass.trim().length < 6) {
            setparent_pass_err('كلمة المرور يجب ان تكون 6 عناصر او أكثر');
            errors++;
        } else {
            setparent_pass_err('');
        }

        // Confirm Pass Conditions
        if (
            parent_confPass.trim() == '' &&
            parent_pass.trim() != ''
        ) {
            setparent_confPass_err('الرجاء تأكيد كلمة المرور');
            errors++;
        } else if (
            parent_confPass.trim() != parent_pass
        ) {
            setparent_confPass_err(
                'تأكيد كلمة المرور يجب ان تكون متطابقة مع كلمة المرور المدخلة اعلاه',
            );
            errors++;
        } else {
            setparent_confPass_err('');
        }

        //Phone Number Conditions
        if (parent_phone.trim() == '') {
            setparent_phone_err('الرجاء إدخال رقم الهاتف');
            errors++;
        } else if (parent_phone.trim().length != 11) {
            setparent_phone_err('الرجاء التأكد من صحة الرقم المدخل');
            errors++;
        } else {
            setparent_phone_err('');
        }
        if (student_code2.trim() == '') {
            setstudent_code_err2('الرجاء إدخال كود الطالب');
            errors++;
        } else {
            setstudent_code_err2('');
        }

        if (errors == 0) {
            axios.post('http://192.168.1.5/AhmedRagab_System/signUp.php', {
                user_type: 'parent',
                user_name: parent_name,
                user_email: parent_email,
                user_password: parent_pass,
                user_phone: parent_phone,
                student_code: student_code2,
            }).then(res => {
                if (typeof res.data == typeof {}) {
                    // useState({ user_data: res.data }); 
                    console.log(res.data);
                    props.navigation.navigate('StudentWaiting'
                        , {
                            data: res.data
                        }
                    );
                } else if (res.data == 'phone_found') {
                    Alert.alert('تنبيه', 'رقم الهاتف موجود بالفعل');
                } else if (res.data == 'email_found') {
                    Alert.alert('تنبيه', 'البريد الالكتروني موجود بالفعل');
                }
            });
        }
    }





    // The Page Design:

    return (
        <>
            <StatusBar backgroundColor={initial_color} />
            <ScrollView style={{ flex: 1, backgroundColor: Background }}>

                <View style={{
                    flexDirection: 'row', justifyContent: 'space-around',
                    marginTop: height * 0.03,
                }}>
                    <Text style={styles.pageTittleStyle}>مرحباً بك!</Text>
                    <View style={{
                        width: width * 0.20,
                        height: height * 0.09,
                        backgroundColor: initial_color,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: width * 0.13,
                        // borderRadius: 35,
                        elevation: 10,

                    }}>
                        <Image
                            source={require('../images/AppIcon.png')}
                            style={styles.imgLogoStyle}
                            resizeMode='center'
                        />
                    </View>

                </View>
                {/* Page Tittle */}
                <Text
                    style={[
                        styles.pageTittleStyle,
                        {
                            fontSize: width * 0.042,
                            // fontSize: RFValue(17),
                            marginTop: -30,
                            marginLeft: width * .12,
                            marginBottom: height * 0.04
                        },
                    ]}>
                    قم بإنشاء حسابك
                </Text>

                {/* body */}
                <SwitchSelector
                    initial={0}
                    buttonColor={initial_color}
                    onPress={value => setShowHide(value)}
                    options={[
                        { label: "طالب", value: false },
                        { label: "ولي أمر", value: true },
                    ]}
                    style={{
                        borderColor: '#fff',
                        shadowColor: "#000",
                        shadowOffset: {
                            width: 0,
                            height: 1,
                        },
                        shadowOpacity: 0.22,
                        shadowRadius: 2.22,

                        elevation: 3,
                        width: width * 0.7,
                        // backgroundColor:"#ff0",
                        alignSelf: "center",
                        borderRadius: 40,
                        marginBottom: RFValue(30)
                    }}
                />
                <View>
                    {showHide !== true ?
                        // studentSign up........
                        <ScrollView>
                            <View style={styles.pageContainer}>
                                {/* studentName TextInput */}
                                <Fumi
                                    label={'أسم المستخدم'}
                                    value={student_name}
                                    labelStyle={{
                                        color: '#1D1D1D',
                                        width: 200
                                    }}
                                    onChangeText={value => {
                                        setstudent_name(value);
                                    }}
                                    inputStyle={{
                                        color: '#000'
                                    }}
                                    iconClass={Entypo}
                                    iconName={'user'}
                                    iconColor={secondary_color}
                                    iconSize={20}
                                    iconWidth={40}
                                    inputPadding={16}
                                    borderColor={initial_color}

                                    paddingRight={30}
                                    style={styles.textInputStyle}
                                />
                                {/* studentName Validation Text */}
                                <Text
                                    style={styles.error_txt}>
                                    {studentname_err}
                                </Text>
                                {/* student Email */}
                                <Fumi
                                    label={'البريد الإلكتروني'}
                                    value={student_email}
                                    labelStyle={{
                                        color: '#1D1D1D',
                                        width: 200
                                    }}
                                    onChangeText={value => {
                                        setstudent_email(value);
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
                                    keyboardType='email-address'
                                    paddingRight={30}
                                    style={styles.textInputStyle}
                                />
                                {/* Email Validation Text */}
                                <Text
                                    style={styles.error_txt}>
                                    {email_err}
                                </Text>
                                {/* student Password */}
                                <View
                                // style={{ flexDirection: 'row', justifyContent: 'center' }}
                                >
                                    <Fumi
                                        label={'كلمة المرور'}
                                        value={student_pass}
                                        secureTextEntry={lockedPass ? true : false}
                                        labelStyle={{
                                            color: '#1D1D1D',
                                            width: 200
                                        }}
                                        onChangeText={value => {
                                            setstudent_pass(value)
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
                                        style={styles.textInputStyle}
                                    />
                                    <TouchableOpacity
                                        style={styles.containerOfEyeIconForSecurePass}
                                        onPress={() => {
                                            let locked = lockedPass;
                                            setlockedPass(!locked);
                                        }}>
                                        <Entypo
                                            name={lockedPass ? 'eye-with-line' : 'eye'}
                                            color='#c5c5c5'
                                            size={22}
                                        />
                                    </TouchableOpacity>
                                </View>
                                {/* Password Validation Text */}
                                <Text
                                    style={styles.error_txt}>
                                    {pass_err}
                                </Text>
                                {/* Confirm Password */}
                                <View
                                // style={{ flexDirection: 'row', justifyContent: 'center' }}
                                >
                                    <Fumi
                                        label={'تأكيد كلمة المرور'}
                                        value={student_confPass}
                                        secureTextEntry={lockedConfPass ? true : false}
                                        labelStyle={{
                                            color: '#1D1D1D',
                                            width: 200
                                        }}
                                        onChangeText={value => {
                                            setstudent_confPass(value)
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
                                        style={styles.textInputStyle}
                                    />
                                    <TouchableOpacity
                                        style={styles.containerOfEyeIconForSecurePass}
                                        onPress={() => {
                                            let locked = lockedConfPass;
                                            setlockedConfPass(!locked);
                                        }}>
                                        <Entypo
                                            name={lockedConfPass ? 'eye-with-line' : 'eye'}
                                            color='#c5c5c5'
                                            size={22}
                                        />
                                    </TouchableOpacity>
                                </View>
                                {/* Confirm Password Validation Text */}
                                <Text
                                    style={styles.error_txt}>
                                    {confPass_err}
                                </Text>
                                {/* student_code */}
                                <Fumi
                                    label={'كود الطالب'}
                                    value={student_code}
                                    labelStyle={{
                                        color: '#1D1D1D',
                                        width: 200
                                    }}
                                    onChangeText={value => {
                                        setstudent_code(value);
                                    }}
                                    inputStyle={{
                                        color: '#000'
                                    }}
                                    iconClass={Entypo}
                                    iconName={'key'}
                                    iconColor={secondary_color}
                                    iconSize={20}
                                    iconWidth={40}
                                    inputPadding={16}
                                    borderColor={initial_color}

                                    paddingRight={30}
                                    style={styles.textInputStyle}
                                />
                                {/* studentName Validation Text */}
                                <Text
                                    style={styles.error_txt}>
                                    {student_code_err}
                                </Text>
                                {/* Phone Number */}
                                <Fumi
                                    label={"رقم الهاتف"}
                                    value={student_phone}
                                    labelStyle={{
                                        color: '#1D1D1D',
                                        width: 200
                                    }}
                                    onChangeText={value => {
                                        setstudent_phone(value);
                                    }}
                                    inputStyle={{
                                        color: '#000'
                                    }}
                                    iconClass={Entypo}
                                    iconName={'mobile'}
                                    iconColor={secondary_color}
                                    iconSize={20}
                                    iconWidth={40}
                                    inputPadding={16}
                                    borderColor={initial_color}
                                    keyboardType="phone-pad"
                                    paddingRight={30}
                                    style={styles.textInputStyle}
                                />
                                {/* Phone Number Validation Text */}
                                <Text
                                    style={styles.error_txt}>
                                    {phone_err}
                                </Text>

                                {/* student generation */}
                                <SelectDropdown
                                    data={student_grades}
                                    onSelect={(selectedItem, index) => {
                                        console.log(selectedItem, index);
                                        setselectedItem(selectedItem);
                                        groupDropdownRef.current.reset();
                                        setstudent_group([]);
                                        setstudent_group(selectedItem.groups);
                                    }}

                                    defaultButtonText={"اختار اسم الدفعة"}
                                    buttonTextAfterSelection={(selectedItem, index) => {
                                        return selectedItem.grade_name;
                                    }}
                                    rowTextForSelection={(item, index) => {
                                        return item.grade_name;
                                    }}
                                    buttonStyle={styles.textInputStyle}
                                    buttonTextStyle={{ color: "#000", fontWeight: "bold", fontSize: 18 }}
                                    renderDropdownIcon={isOpened => {
                                        return <AntDesign name={isOpened ? 'caretup' : 'caretdown'} style={{
                                            color: gray_color,
                                            fontSize: 20,
                                            width: 30
                                        }} />
                                    }}
                                    dropdownIconPosition={'left'}
                                />
                                {/* Email Validation Text */}
                                <Text
                                    style={styles.error_txt}>
                                    {student_grades_err}
                                </Text>

                                {/* student group */}
                                <SelectDropdown
                                    ref={groupDropdownRef}
                                    data={student_group}
                                    onSelect={(selectedItem, index) => {
                                        console.log(selectedItem, index)
                                        setselectedGroup(selectedItem);
                                    }}
                                    defaultButtonText={"اختار اسم المجموعة"}
                                    buttonTextAfterSelection={(selectedItem, index) => {
                                        return selectedItem.group_name;
                                    }}
                                    rowTextForSelection={(item, index) => {
                                        return item.group_name;
                                    }}
                                    buttonStyle={[styles.textInputStyle, { marginTop: RFValue(20) }]}
                                    buttonTextStyle={{ color: "#000", fontWeight: "bold", fontSize: 18 }}
                                    renderDropdownIcon={isOpened => {
                                        return <AntDesign name={isOpened ? 'caretup' : 'caretdown'} style={{
                                            color: gray_color,
                                            fontSize: 20,
                                            width: 30
                                        }} />
                                    }}
                                    dropdownIconPosition={'left'}
                                />
                                <Text
                                    style={styles.error_txt}>
                                    {student_group_err}
                                </Text>


                                <TouchableOpacity style={styles.button} onPress={
                                    Validation_student_Before_SignUp
                                }>
                                    <Text style={styles.buttonText}>انشاء حساب</Text>
                                </TouchableOpacity>

                                {/* Sign Up Option */}
                                <View style={styles.contianerOfSignUpOption}>
                                    <Text style={{ color: '#a7a7a7', fontSize: RFValue(13) }}>
                                        هل لديك حساب؟
                                    </Text>

                                    <TouchableOpacity
                                        style={{
                                            marginLeft: width * 0.02,
                                            color: '#a7a7a7',
                                            fontWeight: 'bold',

                                        }}
                                        onPress={() => {
                                            props.navigation.navigate("Login");
                                        }}>
                                        <Text
                                            style={{
                                                color: secondary_color,
                                                fontWeight: 'bold',
                                                fontSize: RFValue(14),
                                                textDecorationLine: 'underline',
                                            }}>
                                            أضغط لتسجيل الدخول
                                        </Text>
                                    </TouchableOpacity>
                                </View>



                            </View>
                        </ScrollView>
                        :
                        // parents signup.....
                        <ScrollView
                            style={{
                                backgroundColor: Background,
                            }}>
                            <View style={styles.pageContainer}>
                                {/* parentName TextInput */}
                                <Fumi
                                    label={'أسم ولي الامر'}
                                    value={parent_name}
                                    labelStyle={{
                                        color: '#1D1D1D',
                                        width: 200
                                    }}
                                    onChangeText={value => {
                                        setparent_name(value);
                                    }}
                                    inputStyle={{
                                        color: '#000'
                                    }}
                                    iconClass={Entypo}
                                    iconName={'user'}
                                    iconColor={secondary_color}
                                    iconSize={20}
                                    iconWidth={40}
                                    inputPadding={16}
                                    borderColor={initial_color}

                                    paddingRight={30}
                                    style={styles.textInputStyle}
                                />
                                {/* studentName Validation Text */}
                                <Text
                                    style={styles.error_txt}>
                                    {parent_name_err}
                                </Text>
                                <View>
                                    {/* student_code */}
                                    <Fumi
                                        label={'كود الطالب'}
                                        value={student_code2}
                                        labelStyle={{
                                            color: '#1D1D1D',
                                            width: 200
                                        }}
                                        onChangeText={value => {
                                            setstudent_code2(value);
                                        }}
                                        inputStyle={{
                                            color: '#000'
                                        }}
                                        iconClass={Entypo}
                                        iconName={'key'}
                                        iconColor={secondary_color}
                                        iconSize={20}
                                        iconWidth={40}
                                        inputPadding={16}
                                        borderColor={initial_color}

                                        paddingRight={30}
                                        style={styles.textInputStyle}
                                    />
                                    {/* studentName Validation Text */}
                                    <Text
                                        style={styles.error_txt}>
                                        {student_code_err2}
                                    </Text>
                                </View>
                                {/* student Email */}
                                <Fumi
                                    label={'البريد الإلكتروني'}
                                    value={parent_email}
                                    labelStyle={{
                                        color: '#1D1D1D',
                                        width: 200
                                    }}
                                    onChangeText={value => {
                                        setparent_email(value);
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
                                    keyboardType='email-address'
                                    paddingRight={30}
                                    style={styles.textInputStyle}
                                />
                                {/* Email Validation Text */}
                                <Text
                                    style={styles.error_txt}>
                                    {parent_email_err}
                                </Text>
                                {/* student Password */}
                                <View
                                // style={{ flexDirection: 'row', justifyContent: 'center' }}
                                >
                                    <Fumi
                                        label={'كلمة المرور'}
                                        value={parent_pass}
                                        secureTextEntry={locked_parentPass ? true : false}
                                        labelStyle={{
                                            color: '#1D1D1D',
                                            width: 200
                                        }}
                                        onChangeText={value => {
                                            setparent_pass(value)
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
                                        style={styles.textInputStyle}
                                    />
                                    <TouchableOpacity
                                        style={styles.containerOfEyeIconForSecurePass}
                                        onPress={() => {
                                            let locked = locked_parentPass;
                                            setlocked_parentPass(!locked);
                                        }}>
                                        <Entypo
                                            name={locked_parentPass ? 'eye-with-line' : 'eye'}
                                            color='#c5c5c5'
                                            size={22}
                                        />
                                    </TouchableOpacity>
                                </View>
                                {/* Password Validation Text */}
                                <Text
                                    style={styles.error_txt}>
                                    {parent_pass_err}
                                </Text>
                                {/* Confirm Password */}
                                <View
                                // style={{ flexDirection: 'row', justifyContent: 'center' }}
                                >
                                    <Fumi
                                        label={'تأكيد كلمة المرور'}
                                        value={parent_confPass}
                                        secureTextEntry={locked_parentConfPass ? true : false}
                                        labelStyle={{
                                            color: '#1D1D1D',
                                            width: 200
                                        }}
                                        onChangeText={value => {
                                            setparent_confPass(value)
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
                                        style={styles.textInputStyle}
                                    />
                                    <TouchableOpacity
                                        style={styles.containerOfEyeIconForSecurePass}
                                        onPress={() => {
                                            let locked = locked_parentConfPass;
                                            setlocked_parentConfPass(!locked);
                                        }}>
                                        <Entypo
                                            name={locked_parentConfPass ? 'eye-with-line' : 'eye'}
                                            color='#c5c5c5'
                                            size={22}
                                        />
                                    </TouchableOpacity>
                                </View>
                                {/* Confirm Password Validation Text */}
                                <Text
                                    style={styles.error_txt}>
                                    {parent_confPass_err}
                                </Text>
                                {/* Phone Number */}
                                <Fumi
                                    label={"رقم الهاتف"}
                                    value={parent_phone}
                                    labelStyle={{
                                        color: '#1D1D1D',
                                        width: 200
                                    }}
                                    onChangeText={value => {
                                        setparent_phone(value);
                                    }}
                                    inputStyle={{
                                        color: '#000'
                                    }}
                                    iconClass={Entypo}
                                    iconName={'mobile'}
                                    iconColor={secondary_color}
                                    iconSize={20}
                                    iconWidth={40}
                                    inputPadding={16}
                                    borderColor={initial_color}
                                    keyboardType="phone-pad"
                                    paddingRight={30}
                                    style={styles.textInputStyle}
                                />
                                {/* Phone Number Validation Text */}
                                <Text
                                    style={styles.error_txt}>
                                    {parent_phone_err}
                                </Text>

                                {/* student generation */}



                                <TouchableOpacity style={styles.button} onPress={
                                    Validation_Before_ParentSignUp
                                }>
                                    <Text style={styles.buttonText}>انشاء حساب</Text>
                                </TouchableOpacity>

                                {/* Sign Up Option */}
                                <View style={styles.contianerOfSignUpOption}>
                                    <Text style={{ color: '#7a7878', fontSize: RFValue(13) }}>
                                        هل لديك حساب؟
                                    </Text>

                                    <TouchableOpacity
                                        style={{
                                            marginLeft: width * 0.02,
                                            color: '#a7a7a7',
                                            fontWeight: 'bold',

                                        }}
                                        onPress={() => {
                                            props.navigation.navigate("Login");
                                        }}>
                                        <Text
                                            style={{
                                                color: secondary_color,
                                                fontWeight: 'bold',
                                                fontSize: RFValue(14),
                                                textDecorationLine: 'underline',
                                            }}>
                                            أضغط لتسجيل الدخول
                                        </Text>
                                    </TouchableOpacity>
                                </View>

                            </View>


                        </ScrollView>
                    }
                </View >

            </ScrollView >

        </>
    );
}

const styles = StyleSheet.create({
    pageContainer: {
        flex: 1,
        paddingTop: height * 0.02,
        backgroundColor: Background,
        alignItems: "center",
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
    contianerOfSignUpOption: {
        alignSelf: 'center',
        alignItems: 'center',
        padding: height * 0.01,
        flexDirection: 'row',
        marginVertical: height * 0.05,
        marginTop: height * 0.003,

    },
    imgLogoStyle: {
        width: width * 0.18,
        height: height * 0.075,
        borderRadius: RFValue(17),
    },
    pageTittleStyle: {
        color: "#000",
        fontSize: width * 0.074,
        fontWeight: 'bold',
    },
    textInputStyle: {
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
    error_txt: {
        fontSize: 15,
        color: secondary_color,
        textAlign: 'center',
        marginBottom: height * 0.01,
        marginTop: height * 0.01,
    }
});