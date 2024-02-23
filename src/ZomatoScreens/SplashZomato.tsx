import {Image, View, StyleSheet} from 'react-native';
import React, {useEffect} from 'react';
import {images} from '../Common/images';

const Splash = ({navigation}: any) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('Login');
    }, 3000);
  }, [navigation]);
  return (
    <View style={styles.container}>
      <Image source={images.Zomato} style={styles.image} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});

export default Splash;
