/* eslint-disable react-native/no-inline-styles */
import {
  Alert,
  Dimensions,
  FlatList,
  Image,
  PermissionsAndroid,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {images} from '../Common/images';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Geolocation from '@react-native-community/geolocation';
import Swiper from 'react-native-swiper';
import ModalComponent from './Modal';

const {width} = Dimensions.get('window');
const height = width * 0.6;
const image = [
  'https://static.businessworld.in/article/article_extra_large_image/1673692174_GSNBze_jkbkhv_1_.png',
  'https://images.moneycontrol.com/static-mcnews/2023/01/Zomato-Blinkit-770x435.jpg?impolicy=website&width=770&height=431',
  'https://www.myhoardings.com/blog/wp-content/uploads/2019/01/Zomato-1.jpg',
  'https://www.nurphoto.com/en/photo/10142678/picture/pictland',
];
const Home = ({navigation}) => {
  const [position, setPosition] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  useEffect(() => {
    Geolocation.getCurrentPosition(
      pos => {
        setPosition(JSON.stringify(pos));
      },
      error => Alert.alert('GetCurrentPosition Error', JSON.stringify(error)),
      {enableHighAccuracy: true},
    );
  }, []);
  useEffect(() => {
    if (Platform.OS === 'android') {
      requestLocationPermission();
    } else {
      getCurrentLocation();
    }
    getCurrentLocation();
  }, []);

  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message:
            'This app needs access to your location to provide location information.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        getCurrentLocation();
      } else {
        setErrorMessage('Location permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };
  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        setLocation({latitude, longitude});
        reverseGeocode(latitude, longitude);
      },
      error => {
        setErrorMessage(error.message);
      },
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
    );
  };
  const reverseGeocode = async (latitude, longitude) => {
    console.log('working');
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyDZRv3gVT_6Guw8aR2gBex86wuZ2huxRKw`,
      );
      const data = await response.json();
      Alert.alert('data');
      if (data.results && data.results.length > 0) {
        const address = data.results[0].formatted_address;
        Alert.alert('Address:', address);
      } else {
        setErrorMessage('No address found for the provided coordinates.');
      }
    } catch (error) {
      console.error('Error fetching reverse geocode:', error);
      setErrorMessage('Error fetching reverse geocode.');
    }
  };
  const data = [
    {
      id: '1',
      imageUrl: images.food,
      info: 'Flat',
      rs: '60% OFF',
      name: 'Hanuman Dhaba',
      type: 'North Indian',
      time: '25-30 min',
    },
    {
      id: '2',
      imageUrl: images.food2,
      info: 'Flat $150',
      rs: 'OFF',
      name: 'Glutton Monkey',
      type: 'Shake',
      time: '25-30 min',
    },
    {
      id: '3',
      imageUrl: images.food3,
      info: '60% OFF',
      rs: 'up to $120',
      name: 'Burger King',
      type: 'Burger',
      time: '15-20 min',
    },
    {
      id: '4',
      imageUrl: images.food4,
      info: 'Flat $125',
      rs: 'OFF',
      name: 'Klever Kitchen',
      type: 'North Indian',
      time: '15-20 min',
    },
  ];
  const data2 = [
    {id: '1', text: 'Offers', imageUrl: images.offer, info: 'upto $100'},
    {
      id: '2',
      text: 'Gourmet',
      imageUrl: images.gourmet,
      info: 'Selections',
    },
    {
      id: '3',
      text: 'Healthy',
      imageUrl: images.healthy,
      info: 'Curated Dishes',
    },
  ];
  const renderItems = ({item}) => (
    <View>
      <View style={styles.box}>
        <View style={{justifyContent: 'space-between', padding: 5}}>
          <Image
            source={item.imageUrl}
            style={{width: 94.1, height: 100, borderRadius: 30}}
          />
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 20,
              color: 'black',
              textAlign: 'center',
            }}>
            {item.text}
          </Text>
          <Text style={{fontSize: 15, textAlign: 'center', fontWeight: '500'}}>
            {item.info}
          </Text>
        </View>
      </View>
    </View>
  );
  const renderItem = ({item}) => (
    <View style={styles.item}>
      <View style={{flexDirection: 'row'}}>
        <Image source={item.imageUrl} style={{width: 100, height: 120}} />
        <TouchableOpacity style={styles.like}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <FontAwesome name="heart" size={24} color="rgba(0, 0, 0, 0.6)" />
            <FontAwesome
              name="heart-o"
              size={24}
              color="white"
              style={{position: 'absolute'}}
            />
          </View>
        </TouchableOpacity>
        <View style={styles.gradientOverlay} />
        <Text style={styles.infoText}>{item.info}</Text>
        <Text style={styles.rsText}>{item.rs}</Text>
        <View style={{padding: 10}}>
          <Text
            style={{
              fontSize: 17,
              color: 'black',
              fontWeight: 'bold',
              width: 90,
            }}>
            {item.name}
          </Text>
          <Text style={{fontWeight: '600'}}>{item.type}</Text>
          <Text style={{fontWeight: '600', marginTop: 10}}>{item.time}</Text>
        </View>
      </View>
    </View>
  );

  const randomColor = () => {
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
  };

  const openModal = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const profile = () => {
    navigation.navigate('Profile');
  };

  return (
    <View style={{flex: 1}}>
      <ScrollView style={{flex: 1}}>
        <View style={{backgroundColor: 'white'}}>
          <View
            style={{
              flexDirection: 'row',
              padding: 10,
              justifyContent: 'space-between',
            }}>
            <Image source={images.location} style={{height: 25, width: 20}} />
            <Text />
            <View style={{flexDirection: 'row', paddingRight: 5}}>
              <View
                style={{
                  borderRadius: 10,
                  borderWidth: 1,
                  padding: 5,
                  marginRight: 5,
                }}>
                <TouchableOpacity onPress={openModal}>
                  <Image
                    source={images.language}
                    style={{height: 15, width: 20}}
                  />
                </TouchableOpacity>
                <ModalComponent
                  isVisible={isModalVisible}
                  closeModal={closeModal}
                />
              </View>
              <TouchableOpacity onPress={profile}>
                <View style={[styles.circle, {backgroundColor: randomColor()}]}>
                  <Text style={styles.alphabet}>A</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{backgroundColor: 'white'}}>
            <View
              style={{
                marginTop: 15,
                paddingHorizontal: 10,
                zIndex: 2,
                top: 0,
                left: 0,
                right: 0,
              }}>
              <TextInput
                style={styles.input}
                placeholder="Search"
                placeholderTextColor="gray"
              />
              <Image
                source={images.search}
                style={{
                  height: 20,
                  width: 25,
                  position: 'absolute',
                  left: 17,
                  top: 10,
                  tintColor: 'red',
                }}
              />
              <FontAwesome
                name="microphone"
                style={{
                  position: 'absolute',
                  fontSize: 24,
                  right: 19,
                  top: 7,
                  color: 'red',
                }}
              />
            </View>
            <View style={styles.you}>
              <View style={styles.line} />
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 18,
                  paddingHorizontal: 5,
                  color: 'gray',
                }}>
                FOR YOU
              </Text>
              <View style={styles.line} />
            </View>
            <View style={styles.block}>
              <Text style={styles.text}>Recommended</Text>
              <View style={styles.lines} />
              <TouchableOpacity style={styles.likeButton}>
                <FontAwesome name="heart-o" size={16} color="red" />
              </TouchableOpacity>
              <Text style={{fontSize: 20, marginRight: 15, color: 'black'}}>
                Favourites
              </Text>
            </View>
            <FlatList
              horizontal
              data={data}
              renderItem={renderItem}
              keyExtractor={item => item.id}
              showsHorizontalScrollIndicator={false}
            />
            <View style={styles.you}>
              <View style={styles.line} />
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 18,
                  paddingHorizontal: 5,
                  color: 'gray',
                }}>
                EXPLORE
              </Text>
              <View style={styles.line} />
            </View>
            <FlatList
              horizontal
              data={data2}
              renderItem={renderItems}
              keyExtractor={item => item.id}
            />
            <View style={styles.you}>
              <View style={styles.linee} />
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 18,
                  paddingHorizontal: 5,
                  color: 'gray',
                }}>
                WHAT'S ON YOUR MIND?
              </Text>
              <View style={styles.linee} />
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={{flexDirection: 'column'}}>
                <Image
                  source={images.burger}
                  style={{
                    width: 100,
                    height: 140,
                  }}
                />
                <Text
                  style={{
                    marginTop: -30,
                    marginBottom: 10,
                    textAlign: 'center',
                    color: 'black',
                  }}>
                  Burger
                </Text>
                <Image
                  source={images.salad}
                  style={{
                    width: 120,
                    height: 80,
                    marginBottom: 15,
                  }}
                />
                <Text
                  style={{
                    marginTop: -20,
                    marginBottom: 10,
                    textAlign: 'center',
                    color: 'black',
                  }}>
                  Salad
                </Text>
              </View>
              <View>
                <Image
                  source={images.tacos}
                  style={{
                    width: 120,
                    height: 100,
                    marginBottom: 25,
                    top: 20,
                  }}
                />
                <Text
                  style={{
                    marginTop: -20,
                    marginBottom: 10,
                    textAlign: 'center',
                    color: 'black',
                  }}>
                  Tacos
                </Text>
                <Image
                  source={images.sandwhich}
                  style={{width: 120, height: 90, marginBottom: 15}}
                />
                <Text
                  style={{
                    marginTop: -20,
                    marginBottom: 10,
                    textAlign: 'center',
                    color: 'black',
                  }}>
                  Sandwich
                </Text>
              </View>
              <View style={{flexDirection: 'column'}}>
                <Image
                  source={images.thali}
                  style={{
                    width: 140,
                    height: 70,
                    marginBottom: 55,
                    top: 40,
                    marginLeft: 20,
                  }}
                />
                <Text
                  style={{
                    marginTop: -20,
                    marginBottom: 10,
                    textAlign: 'center',
                    color: 'black',
                  }}>
                  Chicken
                </Text>
                <Image
                  source={images.fries}
                  style={{
                    width: 120,
                    height: 90,
                    marginBottom: 15,
                    marginLeft: 20,
                  }}
                />
                <Text
                  style={{
                    marginTop: -20,
                    marginBottom: 10,
                    textAlign: 'center',
                    color: 'black',
                  }}>
                  Fries
                </Text>
              </View>
              <View style={{flexDirection: 'column'}}>
                <Image
                  source={images.cookies}
                  style={{
                    width: 120,
                    height: 90,
                    top: 20,
                    marginBottom: 15,
                    marginLeft: 20,
                  }}
                />
                <Text
                  style={{
                    marginBottom: 10,
                    textAlign: 'center',
                    color: 'black',
                  }}>
                  Cookies
                </Text>
              </View>
            </ScrollView>
            <View style={styles.you}>
              <View style={styles.liness} />
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 18,
                  paddingHorizontal: 5,
                  color: 'gray',
                }}>
                BRAND HIGHLIGHTS
              </Text>
              <View style={styles.liness} />
            </View>
            <View style={{marginTop: 10, width, height}}>
              <Swiper
                autoplay
                autoplayTimeout={3}
                showsPagination
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
                  backgroundColor: 'red',
                }}>
                {image.map((image, index) => (
                  <View
                    key={index}
                    style={{
                      flex: 1,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Image
                      source={{uri: image}}
                      style={{width: '100%', height}}
                    />
                  </View>
                ))}
              </Swiper>
              <View style={styles.you}>
                <View style={styles.liness} />
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: 18,
                    paddingHorizontal: 5,
                    color: 'gray',
                  }}>
                  ALL RESTAURANTS
                </Text>
                <View style={styles.liness} />
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  input: {
    height: 40,
    position: 'relative',
    borderWidth: 0.2,
    borderRadius: 13,
    paddingHorizontal: 40,
    color: 'black',
  },
  circle: {
    width: 30,
    height: 30,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  alphabet: {
    fontSize: 15,
    color: 'white',
    fontWeight: 'bold',
  },
  you: {
    alignItems: 'center',
    marginTop: 20,
    marginHorizontal: 20,
    flexDirection: 'row',
  },
  block: {
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'center',
    marginHorizontal: 40,
    alignItems: 'center',
    borderRadius: 10,
    width: '80%',
    height: 40,
    borderWidth: 0.4,
  },
  box: {
    borderRadius: 15,
    margin: 5,
    padding: 10,
    elevation: 109,
  },
  likeButton: {
    marginTop: 7,
    marginRight: 5,
    marginLeft: 9,
  },
  text: {
    fontSize: 20,
    marginHorizontal: 15,
    color: 'black',
  },
  like: {
    position: 'absolute',
    padding: 8,
  },
  liness: {
    borderBottomColor: 'gray',
    borderBottomWidth: 0.3,
    width: '28%',
  },
  line: {
    borderBottomColor: 'gray',
    borderBottomWidth: 0.3,
    width: '40%',
  },
  linee: {
    borderBottomColor: 'gray',
    borderBottomWidth: 0.3,
    width: '23%',
  },
  lines: {
    borderRightWidth: 0.4,
    height: '100%',
  },
  item: {
    flex: 1,
    justifyContent: 'center',
    margin: 4,
    borderColor: 'gray',
    width: 220,
    marginTop: 20,
    borderRadius: 10,
    elevation: 100,
    padding: 15,
  },
  gradientOverlay: {
    position: 'absolute',
    left: 0,
    width: 100,
    bottom: 0,
    height: '40%',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  infoText: {
    position: 'absolute',
    fontWeight: '900',
    color: 'white',
    padding: 10,
    top: 60,
    fontSize: 18,
  },
  rsText: {
    position: 'absolute',
    top: 90,
    padding: 10,
    color: 'white',
    fontWeight: '700',
  },
});
