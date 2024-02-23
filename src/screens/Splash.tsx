import {Image, View, StyleSheet} from 'react-native';
import React, {useEffect} from 'react';

const Splash = ({navigation}: any) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('ContactUs');
    }, 3000);
  }, [navigation]);
  return (
    <View style={styles.container}>
      <Image source={require('../images/logo.png')} style={styles.image} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 50,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: '20%',
    width: '50%',
    borderRadius: 200,
  },
});

export default Splash;
