import {Alert, StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Formik} from 'formik';
import {TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {darkGreen} from '../Common/Constants';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const EditProfile = () => {
  const [formValues, setFormValues] = useState({
    name: '',
    password: '',
  });

  const checkLoggedIn = async () => {
    const userDataString = await AsyncStorage.getItem('userData');
    if (userDataString) {
      const userData = JSON.parse(userDataString);
      setFormValues({
        name: userData.name,
        password: userData.password,
      });
    }
  };

  useEffect(() => {
    checkLoggedIn();
  }, []);

  const [passwordVisible, setPasswordVisible] = useState([false, false]);
  const togglePasswordVisibility = () => {
    setPasswordVisible(prev => !prev);
  };

  return (
    <View>
      <Formik
        enableReinitialize={true}
        initialValues={{
          name: formValues.name,
          password: formValues.password,
        }}
        onSubmit={values => {
          Alert.alert('Edit', 'Updated!', [
            {
              text: 'OK',
            },
          ]);
        }}>
        {({handleChange, handleBlur, handleSubmit, values}) => (
          <>
            <View style={styles.inputContainer}>
              <Text style={styles.labels}>Name </Text>
              <TextInput
                style={styles.inputStyle}
                autoCapitalize="none"
                autoCorrect={false}
                onChangeText={handleChange('name')}
                onBlur={handleBlur('name')}
                value={values.name}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.labels}>Password</Text>
              <TextInput
                style={styles.inputStyle}
                autoCapitalize="none"
                autoCorrect={false}
                secureTextEntry={!passwordVisible}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
              />
              <View>
                <TouchableOpacity
                  style={{position: 'absolute', right: 10, bottom: 10}}
                  onPress={togglePasswordVisibility}>
                  {passwordVisible ? (
                    <FontAwesome name="eye" size={22} color="#64748B" />
                  ) : (
                    <FontAwesome name="eye-slash" size={22} color="#64748B" />
                  )}
                </TouchableOpacity>
              </View>
            </View>
            <TouchableOpacity onPress={() => handleSubmit()}>
              <View style={styles.btn}>
                <Text
                  style={{
                    color: 'white',
                    fontSize: 22,
                    fontWeight: 'bold',
                  }}>
                  Edit
                </Text>
              </View>
            </TouchableOpacity>
          </>
        )}
      </Formik>
    </View>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  inputContainer: {
    marginTop: 20,
    padding: 10,
  },
  labels: {
    fontSize: 18,
    color: 'black',
    marginTop: 10,
    marginBottom: 5,
    fontFamily: 'regular',
  },
  inputStyle: {
    borderWidth: 1,
    borderColor: 'black',
    color: 'black',
    paddingHorizontal: 15,
    paddingVertical: 7,
    borderRadius: 1,
    fontFamily: 'regular',
    fontSize: 18,
  },
  btn: {
    backgroundColor: darkGreen,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    width: 350,
    height: 40,
    left: 20,
  },
});
