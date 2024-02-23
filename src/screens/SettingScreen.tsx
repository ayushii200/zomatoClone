import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';

const SettingScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const navigation = useNavigation();

  const saveData = async () => {
    try {
      const newData = {name, email};
      let existingData = await AsyncStorage.getItem('userData');

      if (!existingData) {
        existingData = '[]';
      }

      let dataArray = JSON.parse(existingData);

      if (!Array.isArray(dataArray)) {
        console.error('Existing data is not an array:', dataArray);
        dataArray = [];
      }

      dataArray.push(newData);

      await AsyncStorage.setItem('userData', JSON.stringify(dataArray));
      setName('');
      setEmail('');
      alert('Data Added successfully!');
      navigation.navigate('ListScreen', {data: dataArray});
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  return (
    <View>
      <View>
        <Text style={styles.labels}>Enter your Name </Text>
        <TextInput
          value={name}
          onChangeText={text => setName(text)}
          style={styles.input}
        />
      </View>
      <View>
        <Text style={styles.labels}>Enter your Email </Text>
        <TextInput
          value={email}
          onChangeText={text => setEmail(text)}
          style={styles.input}
        />
      </View>
      <TouchableOpacity onPress={saveData}>
        <View style={styles.btn}>
          <Text
            style={{
              color: 'black',
              fontSize: 22,
              fontWeight: 'bold',
            }}>
            Add
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default SettingScreen;

const styles = StyleSheet.create({
  input: {
    borderColor: 'black',
    borderWidth: 1,
    marginBottom: 15,
    borderRadius: 1,
    paddingHorizontal: 15,
    paddingVertical: 7,
  },
  labels: {
    fontSize: 20,
    color: 'black',
    marginTop: 10,
    marginBottom: 5,
    fontFamily: 'regular',
  },
  btn: {
    backgroundColor: 'green',
    borderRadius: 200,
    alignItems: 'center',
    // width: 350,
    height: 40,
  },
});
