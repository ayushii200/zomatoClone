import {
  Text,
  View,
  StyleSheet,
  Image,
  Animated,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useMemo, useState} from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {images} from '../Common/images';

const AboutScreen = () => {
  const position = useMemo(() => new Animated.Value(0), []);
  const [likes, setLikes] = useState([false, false]);

  const handleLikePress = (index: number) => {
    setLikes(prevLikes => {
      const newLikes = [...prevLikes];
      newLikes[index] = !newLikes[index];
      return newLikes;
    });
  };

  useEffect(() => {
    const animate = () => {
      Animated.loop(
        Animated.timing(position, {
          toValue: 1,
          duration: 4000,
          useNativeDriver: true,
        }),
      ).start();
    };

    animate();

    return () => {
      position.setValue(0);
      Animated.loop(
        Animated.timing(position, {
          toValue: 0,
          duration: 1,
          useNativeDriver: true,
        }),
      ).stop();
    };
  }, [position]);

  const translateX = position.interpolate({
    inputRange: [0, 1],
    outputRange: [-120, 400],
  });

  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.header}>Welcome to AJIO</Text>
      </View>
      <View style={styles.img}>
        <Image source={images.clothes} />
      </View>
      <View style={styles.container}>
        <Animated.Text style={[styles.text, {transform: [{translateX}]}]}>
          Sale Live Now
        </Animated.Text>
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Item
          imageSource={images.sale1}
          price="Rs. 1200"
          isLiked={likes[0]}
          onPress={() => handleLikePress(0)}
        />
        <Item
          imageSource={images.sale2}
          price="Rs. 1000"
          isLiked={likes[1]}
          onPress={() => handleLikePress(1)}
        />
      </View>
    </View>
  );
};

const Item = ({imageSource, price, isLiked, onPress}: any) => {
  return (
    <View style={styles.div}>
      <Image source={imageSource} style={styles.image} />
      <TouchableOpacity onPress={onPress} style={styles.likeButton}>
        <FontAwesome
          name={isLiked ? 'heart' : 'heart-o'}
          size={24}
          color={isLiked ? 'red' : 'black'}
        />
      </TouchableOpacity>
      <Text style={styles.price}>{price}</Text>
    </View>
  );
};
export default AboutScreen;

const styles = StyleSheet.create({
  header: {
    paddingTop: 10,
    color: 'black',
    fontSize: 28,
    fontWeight: 'bold',
    fontFamily: 'ProtestRevolution-Regular',
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'black',
    fontFamily: 'ProtestRevolution-Regular',
  },
  div: {
    width: 150,
    height: 220,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 10,
    overflow: 'hidden',
    position: 'relative',
    margin: 20,
  },
  image: {
    width: '100%',
    height: '90%',
  },
  likeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  price: {
    fontSize: 20,
    marginTop: -5,
    color: 'black',
    paddingLeft: 20,
    fontWeight: 'bold',
  },
});
