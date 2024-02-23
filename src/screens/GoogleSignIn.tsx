import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';

const GoogleSignIn = () => {
  const [userInfo, setUserInfo] = useState(null);
  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '799922389855-vp9j84vjvk42bs02daqqtqus7m4vs0vm.apps.googleusercontent.com',
    });
  }, []);
  console.log('userInfo', userInfo);

  const googleLogin = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const usrInfo = await GoogleSignin.signIn();
      // setState({ userInfo });
      setUserInfo(usrInfo);
      console.log('userInfo', usrInfo);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
        console.log(error);
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
        console.log(error);
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
        console.log(error);
      } else {
        // some other error happened
        console.log(error);
      }
    }
  };
  return (
    <View>
      {userInfo !== null && <Text>{userInfo.user.name}</Text>}
      {userInfo !== null && <Text>{userInfo.user.email}</Text>}
      {userInfo !== null && (
        <Image
          source={{uri: userInfo.user.photo}}
          style={{width: 100, height: 100}}></Image>
      )}
      {userInfo === null ? (
        <TouchableOpacity style={styles.btnStyle} onPress={googleLogin}>
          <Text>GoogleSignIn</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.btnStyle}>
          <Text>GoogleSignOut</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};
export default GoogleSignIn;

const styles = StyleSheet.create({
  btnStyle: {
    height: 50,
    paddingHorizontal: 8,
    backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginBottom: 9,
  },
});
