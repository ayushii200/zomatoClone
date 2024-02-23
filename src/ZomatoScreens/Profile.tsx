import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {images} from '../Common/images';

const data = [
  {
    id: 1,
    name: 'App update available',
    images: images.refresh,
  },
  {
    id: 2,
    name: 'Your Profile',
    images: images.user,
  },
  {
    id: 3,
    name: 'Your Rating',
    images: images.star,
  },
];
const sections = [
  {
    title: 'Food orders',
    data2: [
      {
        id: 1,
        name: 'Your orders',
        images: images.packages,
      },
      {
        id: 2,
        name: 'Favorite orders',
        images: images.heart,
      },
      {
        id: 3,
        name: 'Address book',
        images: images.book,
      },
      {
        id: 4,
        name: 'Hidden Restaurants',
        images: images.eye,
      },
      {
        id: 5,
        name: 'Online ordering help',
        images: images.message,
      },
    ],
  },
  {
    title: 'Dining',
    data2: [
      {
        id: 1,
        name: 'Your deals & transactions',
        images: images.timer,
      },
      {
        id: 2,
        name: 'Your dining rewards',
        images: images.box,
      },
      {
        id: 3,
        name: 'Your table bookings',
        images: images.table,
      },
      {
        id: 4,
        name: 'Dining help',
        images: images.message,
      },
      {
        id: 5,
        name: 'Frequently asked questions',
        images: images.question,
      },
    ],
  },
  {
    title: 'More',
    data2: [
      {
        id: 1,
        name: 'Choose language',
        images: images.language,
      },
      {
        id: 2,
        name: 'About',
        images: images.info,
      },
      {
        id: 3,
        name: 'Send feedback',
        images: images.feedback,
      },
      {
        id: 4,
        name: 'Get Fedding India receipt',
        images: images.refresh,
      },
      {
        id: 5,
        name: 'Report a safety emergency',
        images: images.mark,
      },
      {
        id: 6,
        name: 'Settings',
        images: images.settings,
      },
      {
        id: 7,
        name: 'Logout',
        images: images.logout,
      },
    ],
  },
];

const Profile = ({navigation}) => {
  const handleGoBack = () => {
    navigation.goBack();
  };

  const randomColor = () => {
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
  };

  return (
    <ScrollView>
      <View style={{padding: 10}}>
        <View>
          <TouchableOpacity onPress={handleGoBack}>
            <FontAwesome name="arrow-left" size={20} color="black" />
          </TouchableOpacity>
          <View style={styles.box}>
            <View style={[styles.circle, {backgroundColor: randomColor()}]}>
              <Text style={styles.alphabet}>A</Text>
            </View>
            <View style={{flexDirection: 'column', gap: 40}}>
              <Text style={{fontSize: 30, fontWeight: 'bold', color: 'black'}}>
                Ayushi
              </Text>
              <Text style={{color: 'red', fontWeight: 'bold'}}>
                View activity
              </Text>
              <FontAwesome
                name="caret-right"
                style={{position: 'absolute', top: 80, right: 0}}
                size={20}
                color="red"
              />
            </View>
          </View>
          <View style={{flexDirection: 'row', marginTop: 20}}>
            <View style={styles.grid}>
              <View style={styles.circles}>
                <FontAwesome
                  name="heart-o"
                  size={18}
                  color="black"
                  style={{marginTop: 7}}
                />
              </View>
              <Text style={styles.txt}>Favourites</Text>
            </View>
            <View style={styles.grid}>
              <View style={styles.circles}>
                <Image
                  source={images.rupees}
                  style={{height: 18, marginTop: 7, width: 18}}
                />
              </View>
              <Text style={styles.txt}>Money</Text>
            </View>
          </View>
          {data.map((datas, index) => (
            <View style={styles.info} key={index}>
              <View style={styles.circles}>
                <Image
                  source={datas.images}
                  style={{marginTop: 5, height: 19, width: 18}}
                />
              </View>
              <Text style={styles.txt}>{datas.name}</Text>
              <View style={{flex: 1, alignItems: 'flex-end', marginRight: 10}}>
                <FontAwesome name="angle-right" size={24} />
              </View>
            </View>
          ))}
          {sections.map((section, index) => (
            <View
              style={{marginTop: 20, backgroundColor: 'white', padding: 5}}
              key={index}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <View
                  style={{
                    width: 4,
                    height: '100%',
                    backgroundColor: 'red',
                    marginRight: 10,
                  }}
                />
                <Text style={styles.txts}>{section.title}</Text>
              </View>
              <View style={{backgroundColor: 'white', padding: 5}}>
                {section.data2.map((datas, dataIndex) => (
                  <View key={dataIndex}>
                    <View style={{flexDirection: 'row', marginTop: 20}}>
                      <View style={styles.circles}>
                        <Image
                          source={datas.images}
                          style={{marginTop: 5, height: 19, width: 18}}
                        />
                      </View>
                      <Text style={styles.txt}>{datas.name}</Text>
                      <View
                        style={{
                          flex: 1,
                          alignItems: 'flex-end',
                          marginRight: 10,
                        }}>
                        <FontAwesome name="angle-right" size={24} />
                      </View>
                    </View>
                    {dataIndex !== section.data2.length - 1 && (
                      <View style={styles.line} />
                    )}
                  </View>
                ))}
              </View>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  box: {
    backgroundColor: 'white',
    marginTop: 20,
    borderRadius: 15,
    height: 150,
    alignItems: 'center',
    padding: 10,
    flexDirection: 'row',
    elevation: 5,
  },
  circle: {
    width: 80,
    height: 80,
    borderRadius: 50,
    justifyContent: 'center',
    marginRight: 15,
  },
  alphabet: {
    fontSize: 40,
    textAlign: 'center',
  },
  grid: {
    backgroundColor: 'white',
    width: '49%',
    height: 110,
    marginRight: 10,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txt: {
    color: 'black',
    fontSize: 18,
    fontWeight: '500',
  },
  txts: {
    color: 'black',
    fontSize: 20,
    fontWeight: '500',
  },
  circles: {
    backgroundColor: '#DCE1E3',
    borderRadius: 50,
    height: 30,
    width: 30,
    zIndex: -1,
    alignItems: 'center',
    marginHorizontal: 15,
  },
  info: {
    backgroundColor: 'white',
    height: 60,
    marginTop: 15,
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 10,
  },
  line: {
    borderTopColor: 'gray',
    borderWidth: 0.2,
    marginTop: 10,
    marginLeft: 60,
  },
});
