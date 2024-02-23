import React, {useState} from 'react';
import {
  View,
  Text,
  FlatList,
  Button,
  TextInput,
  StyleSheet,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect} from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const ToDoList = () => {
  const [data, setData] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editedName, setEditedName] = useState('');
  const [editedEmail, setEditedEmail] = useState('');
  const [displayCount, setDisplayCount] = useState(8);

  const toggleDisplay = () => {
    setDisplayCount(prevCount => (prevCount === data.length ? 5 : data.length));
  };

  const fetchData = async () => {
    try {
      const existingData = await AsyncStorage.getItem('userData');
      if (existingData) {
        const dataArray = JSON.parse(existingData);
        setData(dataArray);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchData();
    }, []),
  );

  const deleteItem = index => {
    const updatedData = [...data];
    updatedData.splice(index, 1);
    setData(updatedData);
  };

  const handleEdit = (index, name, email) => {
    setEditingIndex(index);
    setEditedName(name);
    setEditedEmail(email);
  };

  const saveEditedItem = async () => {
    try {
      const updatedData = [...data];
      updatedData[editingIndex] = {name: editedName, email: editedEmail};
      await AsyncStorage.setItem('userData', JSON.stringify(updatedData));
      setData(updatedData);
      setEditingIndex(null);
    } catch (error) {
      console.error('Error saving edited item:', error);
    }
  };

  return (
    <View style={{backgroundColor: '', height: '100%'}}>
      {/* <Text style={styles.labels}>List of Data:</Text> */}
      <FlatList
        data={data.slice(0, displayCount)}
        renderItem={({item, index}) => (
          <View>
            {editingIndex === index ? (
              <View>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={{fontSize: 20}}>Name:</Text>
                  <TextInput
                    value={editedName}
                    onChangeText={setEditedName}
                    style={{fontSize: 20}}
                  />
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={{fontSize: 20}}>Email:</Text>
                  <TextInput
                    value={editedEmail}
                    onChangeText={setEditedEmail}
                    style={{fontSize: 20}}
                  />
                </View>
                <Button title="Save" onPress={saveEditedItem} />
              </View>
            ) : (
              <View style={{backgroundColor: 'black', marginBottom: 10, padding: 10}}>
                <Text style={{fontSize: 20, color:'#e2007b', fontWeight: 'bold'}}>Name: {item.name}</Text>
                <Text style={{fontSize: 20, color: 'white'}}>Email: {item.email}</Text>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                    marginTop: -20,
                  }}>
                  <FontAwesome
                    name="edit"
                    onPress={() => handleEdit(index, item.name, item.email)}
                    color="grey"
                    style={{fontSize: 20, paddingRight: 10}}
                  />
                  <FontAwesome
                    name="trash"
                    onPress={() => deleteItem(index)}
                    color="red"
                    style={{fontSize: 20}}
                  />
                </View>
              </View>
            )}
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
      {data.length > displayCount && (
        <Button title="Load" onPress={toggleDisplay} color="black" />
      )}
    </View>
  );
};

export default ToDoList;

const styles = StyleSheet.create({
  labels: {
    fontSize: 25,
    color: 'black',
    marginTop: 10,
    marginBottom: 5,
    fontFamily: 'regular',
  },
});
