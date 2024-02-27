import React, {useEffect, useState} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {images} from '../Common/images';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';

const Login = ({navigation}: any) => {
  const [userInfo, setUserInfo] = useState(null);
  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '961053648955-1froe9dumagvppj43rblf29rrd7g1pn1.apps.googleusercontent.com',
    });
  }, []);
  console.log('userInfo', userInfo);

  const googleLogin = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const usrInfo = await GoogleSignin.signIn();
      // setState({ userInfo });
      setUserInfo(usrInfo);
      // console.log(usrInfo);
      console.log('userInfo', usrInfo);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
        console.log(error, 'error1');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
        console.log(error, 'error2');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
        console.log(error, 'error3');
      } else {
        // some other error happened
        console.log(error, 'error');
      }
    }
  };

  return (
    <Formik
      initialValues={{phoneNumber: ''}}
      validationSchema={Yup.object().shape({
        phoneNumber: Yup.string()
          .matches(/^[0-9]+$/, 'Must be only digits')
          .min(10, 'Must be exactly 10 digits')
          .max(10, 'Must be exactly 10 digits')
          .required('Phone number is required'),
      })}
      onSubmit={values => {
        console.log(values);
        navigation.navigate('Home');
      }}>
      {({
        values,
        handleChange,
        errors,
        setFieldTouched,
        touched,
        handleSubmit,
      }) => (
        <View>
          <View style={styles.container}>
            <View
              style={{
                height: '40%',
                backgroundColor: 'black',
              }}>
              <Image source={images.zomato} style={styles.image} />
            </View>
            <View style={styles.form}>
              <Text style={styles.txt}>
                India's #1 Food Delivery and Dining App
              </Text>
              <View style={styles.text}>
                <View style={styles.line} />
                <Text style={{marginTop: 15, fontSize: 18, fontWeight: 'bold', color: 'black'}}>
                  {'  '}Log in or sign up{'  '}
                </Text>
                <View style={styles.line} />
              </View>
              <View style={{flexDirection: 'row'}}>
                <View
                  style={{
                    marginTop: 15,
                    flexDirection: 'row',
                    borderWidth: 0.2,
                    borderRadius: 5,
                    padding: 15,
                    width: '20%',
                  }}>
                  <Image source={images.india} style={styles.india} />
                  <FontAwesome
                    name="caret-down"
                    style={{fontSize: 18, marginLeft: 7}}
                  />
                </View>
                <View
                  style={{
                    width: '77%',
                    borderWidth: 0.2,
                    borderRadius: 5,
                    marginLeft: 10,
                    marginTop: 18,
                    paddingHorizontal: 20,
                  }}>
                  <Text
                    style={{
                      position: 'absolute',
                      fontWeight: 'bold',
                      fontSize: 18,
                      color: 'black',
                      paddingHorizontal: 20,
                      marginTop: 10,
                    }}>
                    +91
                  </Text>
                  <TextInput
                    placeholder="Enter Phone Number"
                    placeholderTextColor="gray"
                    style={{position: 'relative', marginLeft: 40}}
                    keyboardType={'numeric'}
                    maxLength={10}
                    onChangeText={handleChange('phoneNumber')}
                    onBlur={() => setFieldTouched('phoneNumber')}
                    value={values.phoneNumber}
                  />
                </View>
              </View>
              {touched.phoneNumber && errors.phoneNumber && (
                <Text style={{color: 'red', marginLeft: 90}}>
                  {errors.phoneNumber}
                </Text>
              )}
              <TouchableOpacity
                onPress={() => {
                  handleSubmit();
                }}>
                <View style={styles.btn}>
                  <Text
                    style={{
                      color: 'white',
                      fontSize: 19,
                      textAlign: 'center',
                    }}>
                    Continue
                  </Text>
                </View>
              </TouchableOpacity>
              <View style={styles.text}>
                <View style={styles.lines} />
                <Text style={{marginTop: 15, fontSize: 18, fontWeight: 'bold', color: 'black'}}>
                  {'  '}or{'  '}
                </Text>
                <View style={styles.lines} />
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: 15,
                  justifyContent: 'center',
                }}>
                <TouchableOpacity onPress={googleLogin}>
                  <View
                    style={{
                      borderWidth: 0.2,
                      borderRadius: 30,
                      padding: 15,
                      width: 50,
                      alignItems: 'center',
                    }}>
                    <Image source={images.google} style={styles.india} />
                  </View>
                </TouchableOpacity>
                <View
                  style={{
                    borderWidth: 0.2,
                    borderRadius: 30,
                    width: 50,
                    marginLeft: 40,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Image source={images.more} style={styles.india} />
                </View>
              </View>
              <View>
                <Text style={styles.tc}>
                  By continuing, you agree to our {'\n'}
                  <Text style={styles.policy}>Terms of Service</Text>{' '}
                  <Text style={styles.policy}>Privacy Policy</Text>{' '}
                  <Text style={styles.policy}>Content Policy</Text>
                </Text>
              </View>
            </View>
          </View>
        </View>
      )}
    </Formik>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    height: '100%',
  },
  image: {
    height: '100%',
    width: '100%',
  },
  txt: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
  },
  line: {
    borderBottomColor: 'gray',
    borderBottomWidth: 0.3,
    width: '35%',
    height: 25,
  },
  lines: {
    borderBottomColor: 'gray',
    borderBottomWidth: 0.3,
    width: '52%',
    height: 25,
  },
  form: {
    paddingHorizontal: 30,
    marginTop: 50,
  },
  text: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  india: {
    width: 25,
    height: 20,
    borderRadius: 2,
  },
  btn: {
    backgroundColor: '#DC143C',
    borderRadius: 5,
    justifyContent: 'center',
    height: 40,
    marginTop: 20,
  },
  tc: {
    textAlign: 'center',
    marginTop: 20,
    color: 'black',
  },
  policy: {
    textDecorationLine: 'underline',
  },
});
