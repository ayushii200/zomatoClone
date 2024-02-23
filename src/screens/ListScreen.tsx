import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  Button,
  TextInput,
  StyleSheet,
  Modal,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const ListScreen = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [limit] = useState(10);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editedItem, setEditedItem] = useState({});
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  const handleSearch = text => {
    setSearchQuery(text);
    const newData = data.filter(item => {
      const itemData = item.title.toLowerCase();
      const textData = text.toLowerCase();
      return itemData.indexOf(textData) > -1;
    });
    setFilteredData(newData);
  };

  useEffect(() => {
    setLoading(true);
    fetchData();
  }, [page]);

  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  const fetchData = async () => {
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${limit}`,
      );
      const responseData = await response.json();
      setData(prevData => [...prevData, ...responseData]);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEndReached = () => {
    if (!loading) {
      setPage(prevPage => prevPage + 1);
    }
  };

  const deleteItem = index => {
    const updatedData = [...data];
    updatedData.splice(index, 1);
    setData(updatedData);
  };

  const handleEdit = (index, item) => {
    setEditingIndex(index);
    setEditedItem(item);
    setIsModalVisible(true);
  };

  const saveEditedItem = () => {
    const updatedData = [...data];
    updatedData[editingIndex] = editedItem;
    setData(updatedData);
    setIsModalVisible(false);
  };

  const handleFilter = type => {
    if (type === 'odd') {
      const oddData = data.filter(item => item.id % 2 !== 0);
      setFilteredData(oddData);
    } else if (type === 'even') {
      const evenData = data.filter(item => item.id % 2 === 0);
      setFilteredData(evenData);
    } else {
      setFilteredData(data);
    }
  };

  return (
    <View
      style={{paddingHorizontal: 20, height: '100%', backgroundColor: 'white'}}>
      <View style={{marginTop: 10}}>
        <TextInput
          style={styles.input}
          placeholder="Search by title..."
          onChangeText={handleSearch}
          value={searchQuery}
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
        }}>
        <Text onPress={() => handleFilter('odd')} style={styles.filterText}>
          Odd
        </Text>
        <Text onPress={() => handleFilter('even')} style={styles.filterText}>
          Even
        </Text>
      </View>

      <FlatList
        data={filteredData}
        renderItem={({item, index}) => (
          <View style={styles.card}>
            <Text style={{color: '#e2007b', fontSize: 20, fontWeight: 'bold'}}>
              Title: {item.title.charAt(0).toUpperCase() + item.title.slice(1)}
            </Text>
            <Text style={{color: 'white', fontSize: 20}}>
              Body: {item.body.charAt(0).toUpperCase() + item.body.slice(1)}
            </Text>
            <Text style={{color: 'white', fontSize: 20}}>Id: {item.id}</Text>
            <View style={styles.buttonContainer}>
              <FontAwesome
                name="edit"
                onPress={() => handleEdit(index, item)}
                color="grey"
                style={{fontSize: 30, paddingRight: 10}}
              />
              <FontAwesome
                name="trash"
                onPress={() => deleteItem(index)}
                color="red"
                style={{fontSize: 30}}
              />
            </View>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.9}
        ListFooterComponent={
          loading && <ActivityIndicator size="large" color="black" />
        }
      />
      <Modal
        visible={isModalVisible}
        animationType="slide"
        onRequestClose={() => setIsModalVisible(false)}>
        <View style={styles.modalContent}>
          <Text style={styles.modalText}>Edit Item</Text>
          <TextInput
            value={editedItem.title}
            onChangeText={text => setEditedItem({...editedItem, title: text})}
            style={styles.input}
          />
          <TextInput
            value={editedItem.body}
            onChangeText={text => setEditedItem({...editedItem, body: text})}
            style={styles.input}
          />
          <Button title="Save" onPress={saveEditedItem} />
        </View>
      </Modal>
    </View>
  );
};

export default ListScreen;

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  modalContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5fcff',
    padding: 20,
  },
  modalText: {
    fontSize: 20,
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  card: {
    backgroundColor: 'black',
    marginBottom: 10,
    padding: 15,
  },
  filterText: {
    fontSize: 20,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginBottom: 3,
  },
});
