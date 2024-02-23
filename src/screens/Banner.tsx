import {Dimensions, Image, View} from 'react-native';
import React from 'react';
import Swiper from 'react-native-swiper';

const {width} = Dimensions.get('window');
const height = width * 0.6;
const images = [
  'https://assets.ajio.com/cms/AJIO/WEB/06082020-D-AHP-topbanner-P1-60to80.jpg',
  'https://assets.ajio.com/cms/AJIO/WEB/15062021-D-NewArrival-Topbanner-Newstylesadded.jpg',
  'https://assets.ajio.com/cms/AJIO/WEB/21122020-D-Stores-Multistore-Sneakerhood.jpg',
  'https://cdn0.desidime.com/topics/photos/1476188/original/12092022-unisex-d-topbanner-p1-brands-5080.jpg?1662921572',
];
const Banner = () => {
  return (
    <View style={{marginTop: 10, width, height}}>
      <Swiper
        autoplay
        autoplayTimeout={3}
        showsPagination
        paginationStyle={{bottom: 70}}
        dotStyle={{
          width: 8,
          height: 8,
          borderRadius: 4,
          backgroundColor: '#ccc',
        }}
        activeDotStyle={{
          width: 8,
          height: 8,
          borderRadius: 4,
          backgroundColor: '#333',
        }}>
        {images.map((image, index) => (
          <View
            key={index}
            style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Image
              source={{uri: image}}
              style={{width: '100%', height, resizeMode: 'contain'}}
            />
          </View>
        ))}
      </Swiper>
    </View>
  );
};

export default Banner;
