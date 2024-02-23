import {
  Alert,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect} from 'react';
import {TextInput} from 'react-native-gesture-handler';
import {
  GestureHandlerRootView,
  NativeViewGestureHandler,
} from 'react-native-gesture-handler';
import CheckBox from 'react-native-check-box';
import {darkGreen} from '../Common/Constants';
import {Formik} from 'formik';
import * as Yup from 'yup';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ContactUs = ({navigation}: any) => {
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .matches(/^[a-zA-Z]+$/, 'Name must contain only letters')
      .required('Name is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
    agree: Yup.boolean()
      .oneOf([true], 'You must agree to T&C')
      .required('You must agree to T&C'),
  });

  useEffect(() => {
    checkLoggedIn();
  }, []);

  const checkLoggedIn = async () => {
    const userData = await AsyncStorage.getItem('userData');
    if (userData) {
      navigation.navigate('HomeScreen');
    }
  };
  return (
    <GestureHandlerRootView>
      <NativeViewGestureHandler>
        <ImageBackground source={require('../images/dark.jpg')}>
          <View style={styles.mainContainer}>
            <Text style={styles.mainHeader}>Login Form</Text>
            <Text style={styles.description}>You can reach us anytime.</Text>
            <Formik
              initialValues={{name: '', password: '', agree: false}}
              validationSchema={validationSchema}
              onSubmit={async (values, {resetForm}) => {
                await AsyncStorage.setItem('userData', JSON.stringify(values));
                Alert.alert(
                  'Login Successful',
                  'You have successfully logged in!',
                  [
                    {
                      text: 'OK',
                      onPress: () => {
                        resetForm();
                        navigation.navigate('HomeScreen');
                      },
                    },
                  ],
                );
              }}>
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                setFieldValue,
                values,
                errors,
                touched,
              }) => (
                <>
                  <View style={styles.inputContainer}>
                    <Text style={styles.labels}>Enter your Name </Text>
                    <TextInput
                      style={styles.inputStyle}
                      autoCapitalize="none"
                      autoCorrect={false}
                      onChangeText={handleChange('name')}
                      onBlur={handleBlur('name')}
                      value={values.name}
                    />
                    {errors.name && touched.name && (
                      <Text style={styles.errorText}>{errors.name}</Text>
                    )}
                  </View>
                  <View style={styles.inputContainer}>
                    <Text style={styles.labels}>Enter your password</Text>
                    <TextInput
                      style={styles.inputStyle}
                      autoCapitalize="none"
                      autoCorrect={false}
                      secureTextEntry={true}
                      onChangeText={handleChange('password')}
                      onBlur={handleBlur('password')}
                      value={values.password}
                    />
                    {errors.password && touched.password && (
                      <Text style={styles.errorText}>{errors.password}</Text>
                    )}
                  </View>
                  <View style={styles.wrapper}>
                    <CheckBox
                      isChecked={values.agree}
                      onClick={() => setFieldValue('agree', !values.agree)}
                      checkedCheckBoxColor="green"
                      uncheckedCheckBoxColor="white"
                      checkBoxColor="white"
                    />
                    <Text style={{color: 'white'}}>I agree to T&C.</Text>
                    {errors.agree && touched.agree && (
                      <Text style={styles.errorText}>{errors.agree}</Text>
                    )}
                  </View>
                  <TouchableOpacity onPress={() => handleSubmit()}>
                    <View style={styles.btn}>
                      <Text
                        style={{
                          color: 'white',
                          fontSize: 22,
                          fontWeight: 'bold',
                        }}>
                        Login
                      </Text>
                    </View>
                  </TouchableOpacity>
                </>
              )}
            </Formik>
          </View>
        </ImageBackground>
      </NativeViewGestureHandler>
    </GestureHandlerRootView>
  );
};

export default ContactUs;

const styles = StyleSheet.create({
  mainContainer: {
    height: '100%',
    paddingHorizontal: 30,
    paddingTop: 30,
    color: 'white',
  },
  mainHeader: {
    fontSize: 25,
    color: 'white',
    fontWeight: '500',
    paddingTop: 20,
    paddingBottom: 15,
  },
  description: {
    fontSize: 20,
    color: 'white',
    paddingBottom: 20,
    lineHeight: 25,
    fontFamily: 'regular',
  },
  inputContainer: {
    marginTop: 20,
  },
  labels: {
    fontSize: 18,
    color: 'white',
    marginTop: 10,
    marginBottom: 5,
    fontFamily: 'regular',
  },
  inputStyle: {
    borderWidth: 1,
    borderColor: 'white',
    color: 'white',
    paddingHorizontal: 15,
    paddingVertical: 7,
    borderRadius: 1,
    fontFamily: 'regular',
    fontSize: 18,
  },
  wrapper: {
    paddingTop: 30,
    flex: 1,
    flexDirection: 'row',
    color: 'white',
  },
  errorText: {
    color: 'red',
  },
  btn: {
    backgroundColor: darkGreen,
    borderRadius: 100,
    alignItems: 'center',
    width: 350,
    height: 40,
  },
});
